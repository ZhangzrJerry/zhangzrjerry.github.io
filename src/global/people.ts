
import { Person } from "../../.vitepress/type";

export namespace People {
    export const liangyucai: Person = new Person({
        avatar: 'https://github.com/laytcai.png',
        name: 'Layton Cai',
        links: [
            { icon: 'github', link: 'https://github.com/laytcai' }
        ]
    });

    export const yuepeng: Person = new Person({
        avatar: 'https://github.com/edward-yue-peng.png',
        name: 'Yue Peng',
        links: [
            { icon: 'github', link: 'https://github.com/edward-yue-peng' }
        ]
    });

    export const fujunruan: Person = new Person({
        avatar: 'https://github.com/flowerst-0416.png',
        name: 'Fujun Ruan',
        links: [
            { icon: 'github', link: 'https://github.com/flowerst-0416' },
            { icon: 'orcid', link: 'https://orcid.org/0009-0007-7552-3913' },
            { icon: 'googlescholar', link: 'https://scholar.google.com/citations?user=0C7Zg4QAAAAJ&hl' },
            { icon: 'homepage', link: 'https://fujunruan.com' }
        ]
    });

    export const ruoqixu: Person = new Person({
        avatar: 'https://github.com/rockyxrq.png',
        name: 'Rocky Xu',
        links: [
            { icon: 'github', link: 'https://github.com/rockyxrq' },
            { icon: 'homepage', link: 'https://www.rocky-xrq.com/' }
        ]
    });

    export const yanchen: Person = new Person({
        avatar: 'https://github.com/mirrorcy.png',
        name: 'MirrorCY',
        links: [
            { icon: 'github', link: 'https://github.com/mirrorcy' }
        ]
    });

    export const weibofu: Person = new Person({
        avatar: 'https://github.com/Waipok-Fu.png',
        name: 'Waipok Fu',
        links: [
            { icon: 'github', link: 'https://github.com/waipok-fu' },
            { icon: 'homepage', link: 'https://waipok-fu.github.io' }
        ]
    });

    export const borongxu: Person = new Person({
        avatar: 'https://github.com/boring180.png',
        name: 'Borong Xu',
        links: [
            { icon: 'github', link: 'https://github.com/boring180' },
            { icon: 'homepage', link: 'https://boring180.github.io/' }
        ]
    });
}
