import type { DefaultTheme } from 'vitepress/theme'

export interface Link {
    label: string
    url: string
}

export interface Publication {
    image: string
    title: string
    venue: string
    authors: string[]
    links: Link[]
    details: string
}

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