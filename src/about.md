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
import { About } from "/global/about.ts"
</script>

<h2>Experience</h2>
<BetterExperiences :experiences="About.experiences" />

<!-- <h2>Publications</h2>
<BetterPublications :publications="About.publications" /> -->

<h2>Projects</h2>
<BetterPublications :publications="About.projects" />

## Awards

- **Championship Division Finalist & Industrial Design Award** - <span class="frc">FRC</span> Championship Galileo Division (Team 8214, 2025)
- **Regional Finalists & Creativity Award** - <span class="frc">FRC</span> Bosphorus Regional (Team 9635, 2025)
- **Engineering Inspiration Award** - World Robot Contest Championships Beijing (<span class="frc">FRC</span> Offseason, Team 6399, 2024)
- **Excellent Award** - <span class="venue">Rhino-Bird</span> Middle School Science Research Training Program (Tencent UR, 2023)
- **3rd Prize** - Indiemicro Robotics Competition Exchange Event (<span class="frc">FRC</span> Offseason, Team 8811, 2023)
- **Excellence in Engineering Award** - <span class="frc">FRC</span> Hangzhou Regional (Team 8011, 2022)
- **2nd Prize** - 8th National Youth Science Popularization Innovation Competition (2022)
- **Excellent Award** - The 8th China International College Students' "Internet+" Innovation and Entrepreneurship Competition (Seed Track, Guangdong Division, 2022)
- **Rookie Game Changer Award** - <span class="frc">FRC</span> INFINITE RECHARGE At Home Challenge (Team 8011, 2021)
- **Event Winners** - WE RoboStar Robotics League (<span class="frc">FRC</span> Offseason, Team 8011, 2020)
- **Place 1** - US and Region II <span class="ardf">ARDF</span> Championships (2m Classic, M-14, 2019)
- **Place 2** - US and Region II <span class="ardf">ARDF</span> Championships (FoxOring Classic, M-14, 2019)
- **Place 4** - National Student <span class="ardf">ARDF</span> Championship (Guangzhou Educational Competition, Sprints, M-15, 2019)
- **1st Prize** - Guangdong <span class="ardf">ARDF</span> Open Tournament (144MHz, M-15, 2019)
- **Place 1** - 11th Suyuan Cup Guangdong Student <span class="ardf">ARDF</span> Elite Competition (3.5MHz & 144MHz Combined, M-15, 2019)
- **Place 2** - 5th Cross-Strait <span class="ardf">ARDF</span> Elite Competition (80m Relay, M-16, 2019)

<style scoped>
.bio p {
  line-height: 1.35;
  margin-bottom: 1.2rem;
}

.venue{
  color: var(--vp-c-green-2);
  font-style: italic;
  font-weight: bold;
}

.frc{
  color: var(--vp-c-red-2);
  font-style: italic;
  font-weight: bold;
}

.ardf{
  color: var(--vp-c-indigo-2);
  font-style: italic;
  font-weight: bold;
}
</style>
