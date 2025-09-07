<script setup>
const posts = [
    {
        time: 'Sep. 2025',
        type:'project',
        title: 'Cyber Planner Report',
        detail:'Cyber Planner: A Convex Optimization Framework for FRC Robotic Arm Trajectory Planning',
        tags:['math','robotics'],
        url:'/posts/2025/cyber-planner'
    },
    {
        time: 'May. 2025',
        type:'thesis',
        title: '🌟 Detailed derivation of On-Manifold IMU Preintegration',
        detail:'Reading notes of "On-Manifold Preintegration for Real-Time Visual--Inertial Odometry"',
        tags:['math','robotics'],
        url:'/posts/2025/imu-preintegration'
    },
    {
        time: 'May. 2025',
        type: 'thesis',
        title: 'Innovations in BIM-based Localization',
        detail: 'Reading Notes of three BIM-based Localization theses by Prof. Huan Yin',
        tags: ['sense', 'robotics'],
        url: '/posts/2025/bim-localization'
    },
    {
        time: 'May. 2025',
        type: 'lecture',
        title: '🌟 ELEC 5650 - Networked Sensing, Estimation and Control',
        detail: 'Lecture Notes for ELEC 5650 in the 2024-25 Spring by Prof. Ling Shi at HKUST',
        tags: ['control', 'sense', 'hkust'],
        url: '/posts/2025/elec-5650'
    },
    {
        time: 'May. 2025',
        type: 'lecture',
        title: 'ELEC 5650 @ Kalman Filter',
        detail: 'Derivate Kalman Filter from three perspectives: geometry, probability, and optimization',
        tags: ['sense', 'hkust'],
        url: '/posts/2025/elec-5650/kalman-filter'
    },
    {
        time: 'Apr. 2025',
        type: 'lecture',
        title: 'ELEC 5650 @ Linear Quadratic Regulator',
        detail: 'Derivate LQR and LQG from Dynamic Programming and optimization',
        tags: ['control', 'hkust'],
        url: '/posts/2025/elec-5650/lqr'
    },
    {
        time: 'Mar. 2025',
        type: 'lecture',
        title: 'ELEC 5650 @ Mathematic Tools',
        detail: 'Cover the necessary Math tools for networked estimation and control',
        tags: ['math', 'hkust'],
        url: '/posts/2025/elec-5650/math-tools'
    },
    {
        time: 'Mar. 2025',
        type: 'lecture',
        title: 'ELEC 5650 @ Estimation Theory',
        detail: 'Include topics from MAP, MMSE, ML, LMMSE, Least Square Estimation, and so on',
        tags: ['math', 'hkust'],
        url: '/posts/2025/elec-5650/estimation'
    },
    {
        time: 'Mar. 2025',
        type: 'thesis',
        title: 'Sparsity Extended Information Filter SLAM',
        detail: 'Reading Notes of "Exactly Sparse Extended Information Filters for Feature-based SLAM"',
        tags: ['math', 'sense'],
        url: '/posts/2025/seif-slam'
    },
    {
        time: 'Feb. 2025',
        type: 'notes',
        title: 'Classic Visual Feature Descriptors',
        detail: 'Comprehensive analysis of classical visual feature descriptors: from SIFT to BRIEF',
        tags: ['sense'],
        url: '/posts/2025/visual-feature'
    },
    {
        time: 'Dec. 2024',
        type: 'lecture',
        title: 'COMP 2711 - Discrete Mathematical Tools for Computer Science',
        detail: 'Review notes for COMP 2711 in the 2024-25 Fall at HKUST',
        tags: ['math', 'hkust'],
        url: '/posts/2024/comp-2711'
    },
    {
        time: 'Dec. 2024',
        type: 'thesis',
        title: 'Handling Gauge Freedom in VINS',
        detail: 'Reading notes of "On the Comparison of Gauge Freedom Handling in Optimization-Based Visual-Inertial State Estimation"',
        tags: ['sense'],
        url: '/posts/2024/gauge-handling'
    },
    {
        time: 'Dec. 2024',
        type: 'thesis',
        title: 'A Continuous-time Representation for VINS',
        detail: 'Reading notes of "Spline Fusion: A continuous-time representation for visual-inertial fusion with application to rolling shutter cameras"',
        tags: ['sense'],
        url: '/posts/2024/spline-fusion'
    },
    {
        time: 'Dec. 2024',
        type: 'thesis',
        title: 'Robust Initialization of Visual-Inertial System',
        detail: 'Reading notes of "Robust initialization of monocular visual-inertial estimation on aerial robots"',
        tags: ['sense'],
        url: '/posts/2024/vins-init'
    },
    {
        time: 'Nov. 2024',
        type: 'lecture',
        title: 'ELEC 3200 - System Modeling, Analysis and Control',
        detail: 'Cheat Sheets for ELEC 3200 in the 2024-25 Fall at HKUST',
        tags: ['control', 'hkust'],
        url: '/posts/2024/elec-3200'
    },
    {
        time: 'Nov. 2024',
        type: 'project',
        title: 'CoTiMo Planner Implementation Report',
        detail: 'TOPP-based motion planning for omnidirectional mobile robots',
        tags: ['control', 'robotics'],
        url: '/posts/2024/cotimo-planner'
    },
    {
        time: 'Sep. 2024',
        type: 'notes',
        title: 'Rotation Representations in Robotics',
        detail: 'Introduce four types of rotation representation: Euler angles, axis angle, quaternions, and rotation matrix',
        tags: ['math','robotics'],
        url: '/posts/2024/rotation-representation'
    }
]
</script>

<BetterTable4Post :data="posts" />
