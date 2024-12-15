import time
from dm_control import mujoco
import cv2
import numpy as np
import random
import ikpy.chain
import ikpy.utils.plot as plot_utils
import transformations as tf
import PIL
import sys
import copy
from tqdm import tqdm

def check_collision(model, q):
    model.data.qpos[:6] = q[:6]
    model.forward()
    if model.data.ncon == 0:
        return True
    all_contact_pairs = []
    for i in range(model.data.ncon):
        id_1, id_2 = model.data.contact[i].geom1, model.data.contact[i].geom2
        name_geom1, name_geom2 = model.model.id2name(id_1, "geom"), model.model.id2name(id_2, 'geom')
        all_contact_pairs.append((name_geom1, name_geom2))
    return (("a1_right/a1_8_gripper_finger_touch_right", "banana_collision") in all_contact_pairs) or (("a1_right/a1_8_gripper_finger_touch_left", "banana_collision") in all_contact_pairs)
# def check_collision() end

def render(model, chain, path, video_name, fps=58.5, width=640, height=480):
    if len(path) < 1:
        print("No path to render")
        return
    k = len(path[0])
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_name, fourcc, fps, (width*2, height*2))
    model.data.qpos[:6] = path[0][:6]
    model.forward()
    # iterate over path begin
    for q in tqdm(path):
        model.data.ctrl[:k] = q[:k]
        # render
        se = chain.forward_kinematics(model.data.qpos[:7])
        model.data.cam_xpos[3] = se[:3, 3] + se[:3, :3].dot(np.array([0, 0, -0.1]))
        model.data.cam_xmat[3] = (se[:3, :3] * tf.euler_matrix(0, 0, 0)[:3, :3]).reshape(-1)
        frame_1 = model.render(camera_id=0, width=width, height=height)
        frame_2 = model.render(camera_id=1, width=width, height=height)
        frame_3 = model.render(camera_id=2, width=width, height=height)
        frame_4 = model.render(camera_id=3, width=width, height=height)
        frame_combined = np.concatenate((np.concatenate((frame_1, frame_2), axis=1), np.concatenate((frame_3, frame_4), axis=1)), axis=0)
        frame_bgr = cv2.cvtColor(frame_combined, cv2.COLOR_RGB2BGR)
        # write to video
        out.write(frame_bgr)
        model.step()
    # iterate over path end
    out.release()
    print("Video saved as {}".format(video_name))
    return
# def render(model, path, video_name) end

class Node:
    def __init__(self, q):
        self.q = q
        self.path_q = []
        self.parent = None
    # def __init__() end
# class Node end

def rrt_planning(model, np_start_q, np_goal_q, joint_limits, expand_distance=0.05, path_resolution=0.05, goal_sample_rate=100, max_iter=100):
    start_node, goal_node = Node(np_start_q), Node(np_goal_q)
    node_list = [start_node]
    for iter in tqdm(range(max_iter)):
    # for iter in range(max_iter):
        # sample random node
        np_random_q = np.array([random.uniform(joint_min, joint_max) for joint_min, joint_max in joint_limits]) if random.randint(0, 100) > goal_sample_rate else np_goal_q

        # find nearest node
        dist_list = [np.linalg.norm(np.array(node.q) - np_random_q) for node in node_list]
        nearest_node = node_list[
            np.argmin(dist_list)
        ]

        # insert new node
        new_node = copy.deepcopy(nearest_node)
        min_dist = np.min(dist_list)
        n_steps = int(max(min_dist, expand_distance) // path_resolution)
        normal_q = (np_random_q- np.array(nearest_node.q)) / (min_dist + 1e-12) # for numerical stability
        for step in range(n_steps):
            new_node_q = nearest_node.q + normal_q * path_resolution
            new_node.q = np.clip(new_node_q, joint_limits[:, 0], joint_limits[:, 1])
            new_node.path_q.append(new_node.q)
        new_node.parent = nearest_node

        # check collision
        if check_collision(model, new_node.q):
            node_list.append(new_node)
        
        # terminate if close to goal
        if np.linalg.norm(np_goal_q - np.array(node_list[-1].q)) <= expand_distance:
            # insert final node
            final_node = copy.deepcopy(node_list[-1])
            min_dist = np.linalg.norm(np_goal_q - np.array(node_list[-1].q))
            n_steps = int(max(min_dist, expand_distance) // path_resolution)
            normal_q = np_goal_q - np.array(node_list[-1].q) / (min_dist + 1e-12)
            for step in range(n_steps):
                final_node_q = node_list[-1].q + normal_q * path_resolution
                final_node.q = np.clip(final_node_q, joint_limits[:, 0], joint_limits[:, 1])
                final_node.path_q.append(final_node.q)
            final_node.parent = node_list[-1]

            # check collision
            if check_collision(model, final_node.q):
                path = [np_goal_q]
                node = node_list[-1]
                while node.parent is not None:
                    path.append(node.q)
                    node = node.parent
                path.append(np_start_q)
                return path[::-1]
    # iter end
    return None
# def rrt_planning() end
                

if __name__ == '__main__':
    # params begin
    joint_limits = np.array([(-3, 3)] * 6)
    joint_limits[2] = (-3, 0) # elbow
    joint_limits[3] = (-1.5, 1.5) # forearm_roll
    relax_finger = np.array([-0, 0])
    open_finger = np.array([0.02, -0.02])
    close_finger = np.array([-0.03, 0.03])
    # params end

    # objects begin
    model = mujoco.Physics.from_xml_path('assets/banana.xml')
    my_chain = ikpy.chain.Chain.from_urdf_file("assets/a1_right.urdf")
    # objects end

    # control points begin
    node0 = np.array([0] * 6)
    node1 = my_chain.inverse_kinematics([0.3, 0.45, 0.35], tf.euler_matrix(0, 0, 0)[:3, :3], "all")[1:]
    node2 = my_chain.inverse_kinematics([0.3, 0.45, 0.18], tf.euler_matrix(0, 0, 0)[:3, :3], "all")[1:]
    node3 = my_chain.inverse_kinematics([0, 0.355, 0.54], tf.euler_matrix(1.57, 0, 0)[:3, :3], "all")[1:]
    node4 = my_chain.inverse_kinematics([0, 0.345, 0.54], tf.euler_matrix(1.57, 0, 0)[:3, :3], "all")[1:]
    node5 = my_chain.inverse_kinematics([0, 0.34, 0.55], tf.euler_matrix(1.57, 0, 0)[:3, :3], "all")[1:]
    node6 = my_chain.inverse_kinematics([0.17, 0.3, 0.55], tf.euler_matrix(1.57, 0, -1.57/3)[:3, :3], "all")[1:]
    node7 = np.array([0] * 6)
    # control points end

    # path begin
    wait0 = [node0] * 10
    path10 = rrt_planning(model, node0, node1, joint_limits, max_iter=100)
    if path10 is None:
        print("Path 01 not found")
        sys.exit(-1)
    path01, k = [], 5
    for i in range(k):
        subpath = rrt_planning(model, path10[len(path10)*i//k], path10[min(len(path10)-1,len(path10)*(i+1)//k)], joint_limits, expand_distance=0.01, max_iter=101+i, goal_sample_rate=100, path_resolution=0.01)
        if subpath is None:
            print("Subpath {} in Path 01 not found".format(i))
            sys.exit(-1)
        path01 += subpath
    wait1 = [node1] * 10
    path12 = rrt_planning(model, node1, node2, joint_limits, max_iter=110, path_resolution=0.01)
    if path12 is None:
        print("Path 12 not found")
        sys.exit(-1)
    wait2 = [node2] * 100
    path32 = rrt_planning(model, node2, node3, joint_limits, max_iter=120)
    if path32 is None:
        print("Path 23 not found")
        sys.exit(-1)
    path23, k = [], 5
    for i in range(k):
        subpath = rrt_planning(model, path32[len(path32)*i//k], path32[min(len(path32)-1,len(path32)*(i+1)//k)], joint_limits, expand_distance=0.01, max_iter=121+i, goal_sample_rate=100, path_resolution=0.01)
        if subpath is None:
            print("Subpath {} in Path 23 not found".format(i))
            sys.exit(-1)
        path23 += subpath
    wait3 = [node3] * 100
    path34 = rrt_planning(model, node3, node4, joint_limits, goal_sample_rate=10, path_resolution=0.1, max_iter=130, expand_distance=0.1)
    if path34 is None:
        print("Path 34 not found")
        sys.exit(-1)
    wait41 = [node4] * 50
    wait42 = [node4] * 100
    path45 = rrt_planning(model, node4, node5, joint_limits, path_resolution=0.01, expand_distance=0.05, max_iter=140, goal_sample_rate=0)
    if path45 is None:
        print("Path 45 not found")
        sys.exit(-1)
    path65 = rrt_planning(model, node5, node6, joint_limits, path_resolution=0.1, expand_distance=0.1, max_iter=150)
    if path65 is None:
        print("Path 56 not found")
        sys.exit(-1)
    path56, k = [], 5
    for i in range(k):
        subpath = rrt_planning(model, path65[len(path65)*i//k], path65[min(len(path65)-1,len(path65)*(i+1)//k)], joint_limits, expand_distance=0.1, max_iter=151+i, goal_sample_rate=100, path_resolution=0.005)
        if subpath is None:
            print("Subpath {} in Path 56 not found".format(i))
            sys.exit(-1)
        path56 += subpath
    path76 = rrt_planning(model, node6, node7, joint_limits, path_resolution=0.1, expand_distance=0.1, max_iter=160)
    if path76 is None:
        print("Path 56 not found")
        sys.exit(-1)
    path67, k = [], 5
    for i in range(k):
        subpath = rrt_planning(model, path76[len(path76)*i//k], path76[min(len(path76)-1,len(path76)*(i+1)//k)], joint_limits, expand_distance=0.01, max_iter=161+i, goal_sample_rate=100, path_resolution=0.01)
        if subpath is None:
            print("Subpath {} in Path 56 not found".format(i))
            sys.exit(-1)
        path67 += subpath
    wait7 = [node7] * 200
    

    path = np.vstack([
        np.hstack((wait0, [relax_finger] * len(wait0))),
        np.hstack((path01, [relax_finger] * len(path01))),
        np.hstack((wait1, [open_finger] * len(wait1))),
        np.hstack((path12, [open_finger] * len(path12))),
        np.hstack((wait2, [open_finger] * len(wait2))),
        np.hstack((wait2, [close_finger] * len(wait2))),
        np.hstack((path23, [close_finger] * len(path23))),
        np.hstack((wait3, [close_finger] * len(wait3))),
        np.hstack((path34, [close_finger] * len(path34))),
        np.hstack((wait41, [close_finger] * len(wait41))),
        np.hstack((wait42, [relax_finger] * len(wait42))),
        np.hstack((path45, [relax_finger] * len(path45))),
        np.hstack((path56, [relax_finger] * len(path56))),
        np.hstack((path67, [relax_finger] * len(path67))),
        np.hstack((wait7, [relax_finger] * len(wait7)))
    ])
    # path end


    render(model, my_chain, path, "rrt.mp4")
    sys.exit(0)
