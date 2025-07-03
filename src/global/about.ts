import { Experience, Publication } from "../../.vitepress/type";

export namespace About {
    export const experiences: Experience[] = [
        {
            key: '2025-cksri',
            icon: '/icon/cksri.png',
            title: 'Research Assistant',
            company: 'HKUST Cheng Kar-Shun Robotics Institute',
            start: 'Feb. 2025',
            links: [
                { label: 'Home Page', url: 'https://ri.hkust.edu.hk/' },
            ],
            details: ''
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
            end: 'May. 2025',
            links: [
                { label: 'Project Page', url: '/projects/frc.html' }
            ],
            details: 'Participated from rookie to program mentor over six years.'
        }
    ];


    export const projects: Publication[] = [
        {
            key: '2024-cotimo',
            image: '/projects/projects/2024-cotimo.gif',
            title: 'CoTiMo Planner',
            venue: '',
            authors: [],
            links: [
                { label: 'GitHub', url: 'https://github.com/zhangzrjerry/cotimo' }
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
}