<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const frcmembers = [
  {
    avatar: 'https://github.com/laytcai.png',
    name: 'Layton Cai',
    // title: 'Co-founder',
    org: 'FRC8011',
    links: [
      { icon: 'github', link: 'https://github.com/laytcai' }
    ]
  },
  {
    avatar: 'https://github.com/edward-yue-peng.png',
    name: 'Yue Peng',
    title: 'Co-founder',
    org: 'FRC8811',
    orgLink: 'https://github.com/frc8811',
    desc: 'co-op in Rhino-Bird',
    links: [
      { icon: 'github', link: 'https://github.com/edward-yue-peng' }
    ]
  },
  {
    avatar: 'https://github.com/flowerst-0416.png',
    name: 'Fujun Ruan',
    title: 'Mentor',
    org: 'FRC8214',
    orgLink: 'https://github.com/frcnextinnovation',
    desc: '',
    links: [
      {icon:'github', link:'https://github.com/flowerst-0416.png'},
      {icon:'link', link:'https://fujunruan.com/'},
      {icon: 'orcid', link:'https://orcid.org/0009-0007-7552-3913'}
    ]
  },
  {
    avatar: 'https://github.com/rockyxrq.png',
    name: 'Rocky Xu',
    title: 'Program Mentor',
    org: 'FRC8214',
    orgLink: 'https://github.com/frcnextinnovation',
    desc: '',
    links: [
      {icon:'github', link:'https://github.com/rockyxrq'},
      {icon:'link', link:'https://www.rocky-xrq.com/'}
    ]
  },
  {
    avatar: 'https://github.com/mirrorcy.png',
    name: 'MirrorCY',
    title: 'Program Mentor',
    org: 'FRC8214',
    orgLink: 'https://github.com/frcnextinnovation',
    desc: '',
    links: [
      {icon:'github', link:'https://github.com/mirrorcy'}
    ]
  }
]

const hkustmembers = [
  {}
]
</script>

# Friendly Links

## FIRST Robotics Competition

<VPTeamMembers size="small" :members="frcmembers" />

<!-- ## HKUST

<VPTeamMembers size="small" :members="hkustmembers" /> -->