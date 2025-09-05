---
aside: false
---

# Goofia

## People

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import  { People } from '/global/people.ts'

const authors = [
  People.jiajingxie.updateOrg("Oxford").updateTitle("St. Catherine's College").get(),
  People.zhangzrjerry.updateOrg("HKUST").updateTitle("RA in CKSRI").get()
]
</script>

<VPTeamMembers  size="small" :members="authors" />
