---
aside: false
---

# TacLoc

## Slides

<Revealjs src="https://zzhangje.github.io/TacLoc" />

## Authors

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import  { People } from '/global/people.ts'

const authors = [
  People.zhangzrjerry.updateOrg("HKUST").updateTitle("BEng in ELEC").get(),
  People.fuminzhang.updateOrg("HKUST").updateTitle("Chair Professor").get(),
  People.huanyin.updateOrg("HKUST").updateTitle("Research Assistant Professor").get(),
]
</script>

<VPTeamMembers  size="small" :members="authors" />
