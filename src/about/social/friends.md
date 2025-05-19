<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const frcmembers = [
  {
    avatar: 'https://github.com/laytcai.png',
    name: 'Layton Cai',
    title: 'Captain',
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
      {icon:'github', link:'https://github.com/flowerst-0416'},
      {icon: 'orcid', link:'https://orcid.org/0009-0007-7552-3913'},
      {icon:'googlescholar', link:'https://scholar.google.com/citations?user=0C7Zg4QAAAAJ&hl'},
      {icon: 'homepage', link: 'https://fujunruan.com'}
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
      { icon: 'github', link: 'https://github.com/rockyxrq' },
      { icon: 'homepage', link: 'https://www.rocky-xrq.com/' }
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
  },
  {
    avatar: 'https://github.com/Waipok-Fu.png',
    name: 'Waipok Fu',
    title: 'Program Mentor',
    org: 'FRC8214',
    orgLink: 'https://github.com/frcnextinnovation',
    desc: '',
    links: [
      {icon:'github', link:'https://github.com/waipok-fu'},
      {icon:'homepage', link:'https://waipok-fu.github.io'}
    ]
  },
  {
    avatar: 'https://github.com/boring180.png',
    name: 'Borong Xu',
    title: 'Alumni',
    org: 'FRC5449',
    desc: '',
    links: [
      { icon: 'github', link: 'https://github.com/boring180' },
      { icon: 'homepage', link: 'https://boring180.github.io/' }
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
