
import type { DefaultTheme } from 'vitepress/theme'

export namespace People {
    export class Person implements DefaultTheme.TeamMember {
        avatar: string
        name: string
        title?: string
        org?: string
        orgLink?: string
        desc?: string
        links?: DefaultTheme.SocialLink[]
        sponsor?: string
        actionText?: string

        constructor(public data: DefaultTheme.TeamMember) {
            this.avatar = data.avatar
            this.name = data.name
            this.title = data.title
            this.org = data.org
            this.orgLink = data.orgLink
            this.desc = data.desc
            this.links = data.links
            this.sponsor = data.sponsor
            this.actionText = data.actionText
        }

        get(): DefaultTheme.TeamMember {
            return { ...this.data };
        }

        updateDesc(desc: string): Person {
            return new Person({ ...this.data, desc: desc || this.data.desc });
        }

        updateOrg(org: string): Person {
            return new Person({ ...this.data, org: org || this.data.org });
        }

        updateTitle(title: string): Person {
            return new Person({ ...this.data, title: title || this.data.title });
        }
    }

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
