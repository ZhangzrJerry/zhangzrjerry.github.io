import { Experience, Publication } from "../../.vitepress/type";

export namespace About {
    export const experiences: Experience[] = [
        {
            key: '2026-bdr',
            icon: '/icon/bdr.png',
            title: 'Intern',
            company: 'Bright Dream Robotics Co., Ltd.',
            start: 'Dec. 2025',
            end: 'Jan. 2026',
            links: [
                { label: 'Home Page', url: 'https://www.bzlrobot.com/' },
            ],
            details: ''
        },
        {
            key: '2025-cksri',
            icon: '/icon/cksri.png',
            title: 'Research Assistant',
            company: 'HKUST Cheng Kar-Shun Robotics Institute',
            start: 'Feb. 2025',
            end: 'Nov. 2025',
            links: [
                { label: 'Home Page', url: 'https://ri.hkust.edu.hk/' },
            ],
            details: 'Focused on tactile perception and point cloud registration under Prof. Fumin Zhang and Prof. Huan Yin. One paper is submitted to IEEE RA-L and under review.'
        },
        {
            key: '2023-rb',
            icon: '/icon/rhino-bird.png',
            title: 'Research Training',
            company: 'Rhino-Bird Middle School Science Research Training Program',
            start: 'Jun. 2023',
            end: 'Oct. 2023',
            links: [
                { label: 'Tencent UR', url: 'https://ur.tencent.com/' }
            ],
            details: 'Focused on recommendation system under Prof. Chuan Shi (BUPT).'
        },
        {
            key: '2020-frc',
            icon: '/icon/frc.png',
            title: 'FRC Aluminum',
            company: 'FIRST Robotics Competition',
            start: 'Sep. 2019',
            // end: 'May. 2025',
            links: [
                { label: 'Project Page', url: '/projects/frc.html' }
            ],
            details: 'Participated from rookie to program mentor over six years, with team 6399, 8011, 8811, 8214, and 9635. Created team 8811 in my senior high school.'
        }
    ];

    export const publications: Publication[] = [
        {
            key: '2025-tacloc',
            image: '',
            title: 'TacLoc',
            venue: '',
            authors: [],
            links: [{
                'label': 'Project Page',
                'url': '/projects/25-tacloc.html'
            }],
            details: ""
        }
    ]


    export const projects: Publication[] = [
        {
            key: '2025-cc',
            image: 'https://raw.githubusercontent.com/zzhangje/ChronosChain/master/public/milk.jpg',
            title: 'Chronos Chain',
            venue: [],
            authors: [],
            links: [
                { label: 'Project Page', url: '/projects/25-cc.html' },
                { label: 'GitHub', url: 'https://github.com/zzhangje/ChronosChain' },
                { label: 'Tutorial', url: 'https://zzhangje.github.io/ddocc/' }
            ],
            details: 'Interface-driven subsystems with state machines expose minimal APIs and atomic commands, enabling hardware-agnostic robotics through composable, orchestratable behaviors.'
        },
        {
            key: '2024-cotimo',
            image: '/projects/projects/2024-cotimo.gif',
            title: 'CoTiMo Planner',
            venue: '',
            authors: [],
            links: [
                { label: 'Project Page', url: '/projects/24-cotimo.html' },
                { label: 'GitHub', url: 'https://github.com/zzhangje/cotimo' },
                { label: 'Slide', url: 'https://zhangzrjerry.github.io/CoTiMo/' }
            ],
            details: 'CoTiMo stands for Collision-Free Smooth Path Generation + Time Optimal Path Parameterization + Model Predictive Control.'
        },
        {
            key: '2023-rb',
            image: '/projects/projects/2023-rb.png',
            title: 'Intelligent Book Recommendation System',
            venue: '==Excellent Award== of 2023 Rhino-Bird Middle School Science Research Training Program',
            authors: ['==Zirui Zhang==', 'Yue Peng'],
            links: [
                { label: 'GitHub', url: 'https://github.com/zhangzrjerry/rhinobird' },
                { label: 'Tencent UR', url: 'https://ur.tencent.com/' },
                { label: 'Rhino-Bird', url: 'https://cloud.tencent.com/developer/article/2308943' }
            ],
            details: 'This project aims to improve the accuracy and personalization of school library services under the guidance of Prof. Chuan Shi (BUPT).'
        },
        {
            key: '2022-bs',
            image: '/projects/projects/2022-bs-43.gif',
            title: 'Balance Swerve: A single wheel balance movement device',
            venue: '',
            authors: ['Liangyu Cai', 'Zihan Chen', '==Zirui Zhang==', 'et al.'],
            links: [
                { label: 'Patent', url: 'https://patents.google.com/patent/CN115107901A/en' },
            ],
            details: 'The invention is a single-wheel balance motion device with an omnidirectional wheel and gear-driven steering mechanism, enabling quick multi-angle steering and high maneuverability.'
        }
    ];

    export const lectures: Publication[] = [
        {
            key: 'lec:control',
            image: 'lecture/control.png',
            authors: [],
            links: [
                { label: 'TBA', url: '' }
            ],
            venue: '',
            title: '自动控制原理：系统建模、分析与控制',
            details: '本课程从数学模型基础出发，系统讲解控制系统的时域分析、根轨迹法和频率响应法三大核心分析方法，最终深入控制器设计。通过本课程，您将掌握分析、设计和优化控制系统的方法论，将系统思维应用于实际工程领域，真正理解如何让动态系统稳定、快速、精确地运行。'
        },
        {
            key: 'lec:ctrl',
            image: '/lecture/CtRL.png',
            authors: [],
            venue: '',
            links: [
                { label: 'Bilibili', url: 'https://www.bilibili.com/cheese/play/ss959816966' },
                { label: 'GitHub', url: 'https://github.com/zhangzrjerry/CtRL' }
            ],
            title: '机器人智能控制与规划：从最优控制到强化学习',
            details: '本课程融合世界顶尖高校课程精华，通过严谨的数学推导，系统构建从经典控制到现代强化学习的完整知识框架。课程首先夯实最优估计与控制的理论根基，深入卡尔曼滤波、LQR等核心算法；然后探讨模型预测控制、轨迹规划等工程利器；最终攀登深度强化学习高峰。'
        }
    ];
}