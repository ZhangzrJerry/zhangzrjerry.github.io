# Cyber Tutorial 2025

This is a series of FRC programming tutorials. Through this tutorial, new developers can quickly master the skills required for FRC code development, including commands pattern, hardware drivers, simulation development, and advanced algorithms. 



Each section is accompanied by an exercise project (in simulation) that we have carefully designed for you. You need to fill in all the blanks in the TODOs so that the code can achieve the specified task as required.

## 00 Setup

In this section, you are expected to install all the dependencies and successfully build a template project.

### TODO 01: Install Dependencies

Please refer to [NI Programming Resources](https://github.com/frcnextinnovation/NI-Programming-Resources).

### TODO 02: Environment Setup



### Expected Result

Successfully build the CTRE Clean Test Project.

## 01 Swerve

In this section, you are expected to complete the development of the basic functions of the swerve chassis, including inverse kinematics, going to the specified navigation point, and tracking a specified trajectory. We will provide a basic framework and hardware driver. We hope you can pay more attention to the algorithm implementation of the swerve chassis in this tutorial, without worrying about trivial engineering problems.

### TODO 01: Forward Kinematics

SwerveDriveKinematics.toChassisSpeeds()

### TODO 02: Inverse Kinematics

SwerveDriveKinematics.toSwerveModuleStates()

### TODO 03: Headless Mode

ChassisSpeeds.fromFieldRelativeSpeeds()

### TODO 04: Align Controller



### TODO 05: Trajectory Controller



### Expected Results

1. The chassis can move in headless mode following the joystick's commands.
2. The chassis can attach to the specific way point selected by node selector.
3. The chassis can follow a pre-generated trajectory in auto mode.



