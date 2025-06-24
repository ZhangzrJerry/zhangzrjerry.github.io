---
aside: false
---

<p align="center">
  <img class="home-cover" src="/icon-round.jpg" width="25%" style="margin-bottom:25px;">
</p>

<div class="bio">
<p>
Hi! I am Zirui Zhang from the Hong Kong University of Science and Technology (HKUST). I work at the Cheng Kar-Shun Robotics Institute and am also an alumnus of the FIRST Robotics Competition (FRC).
</p>
</div>

<script setup>
import { About } from "../global/about.ts"
</script>

<h2>Experience</h2>
<BetterExperiences :experiences="About.experiences" />

<!-- <BetterPublications :publications="publications" /> -->

<h2>Projects</h2>
<BetterPublications :publications="About.projects" />

<style scoped>
.bio p {
  line-height: 1.35;
  margin-bottom: 1.2rem;
}
</style>
