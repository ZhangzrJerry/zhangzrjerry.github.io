---
# https://vitepress.dev/reference/default-theme-home-page
layout: custom-home

hero:
  name: "ZhangzrJerry's"
  text: "Personal Website"
  tagline: 星辰轮转 & L'éternel tour des constellations
  # image: https://github.com/ZhangzrJerry/ZhangzrJerry/raw/main/metrics.left.svg
  actions:
    - theme: brand
      text: About Me
      link: /about
    - theme: alt
      text: Github
      link: https://github.com/zhangzrjerry

features:
  - title: Command Bot
    icon:
      🤖
      # light: /icon/first-light.png
      # dark: /icon/first-dark.png
    img: /features/command-bot.png
    details: A command-based robot framework with standardized hardware interfaces and factory-patterned subsystems.
    link: https://github.com/zhangzrJerry/commandbot

  - title: Sideway
    icon:
      src: /icon/reefscape.gif
    img: /about/frc/2025-square.png
    details: For FRC 2025 game rules, the mission of the robot is to collect the Coral (PVC pipe) or the Algae (rubber ball) and place.
    link: /about/projects/frc.html#_2025-trouble-sideway

  - title: Cyber Planner
    icon:
      light: /icon/cyber-unicorn.png
      dark: /icon/cyber-unicorn-gray.png
    img: /features/cyber-planner.png
    details: A time optimal arm motion planner with collision avoidance and electrical limits applied on motors.
    link: https://github.com/frcnextinnovation/cyber-planner-2025

  - title: CoTiMo Planner
    icon: 🥏
    img: /features/cotimo.png
    details: A collision-free smooth path generation and time-optimal path parameterization palnner with model predictive control.
    link: https://github.com/zhangzrjerry/cotimo

  - title: Defiant
    icon:
      light: /icon/crescendo-light.png
      dark: /icon/crescendo-dark.png
    img: /about/frc/2024-square.png
    details: For FRC 2024 game rules, the mission of the robot is to collect the Note (squishy ring) and shoot to the speaker or to the amplifier.
    link: /about/projects/frc.html#_2024-defiant

  - title: Yuan Library
    icon:
      src: /icon/rhino-bird.png
    img: /about/projects/2023-rb-square.png
    details: An intelligent book recommendation and user interest analysis system based on factorization machine.
    link: https://github.com/zhangzrjerry/rhinobird

  - title: Yuan Scout
    icon:
      src: /icon/frc-yuan.png
    img: /features/frc-scout.png
    details: A wechat miniprogram for every team to collect, upload, browse, contrast, analyze, and export data during the FRC match.
    link: https://github.com/frc8811/frc_scouting

  - title: Yuan Bot
    icon:
      light: /icon/rapid-react-light.png
      dark: /icon/rapid-react-dark.png
    img: /about/frc/2023-square.png
    details: For FRC 2022 game rules, the mission of the robot is to collect and shoot the CARGO (oversized tennis ball) to the hub.
    link: /about/projects/frc.html#_2022-yuan-bot

  - title: Yingcai Program
    icon:
      src: /icon/guangzhou-yingcai.png
    img: /features/knowledge-graph.png
    details: Focused on the construction of knowledge graph in Guangzhou Yingcai Middle School Science Research Training Program.

  - title: Balance Swerve
    icon:
      light: /icon/kylin-light.png
      dark: /icon/kylin-dark.png
    img: /about/projects/2022-bs.gif
    details: It is a single-wheeled omni-directional mobile platform with a balancing mechanism.
    link: /about/projects/projects.html#balance-swerve-a-single-wheeled-omni-directional-mobile-platform

  - title: Kylin 2022
    icon:
      light: /icon/rapid-react-light.png
      dark: /icon/rapid-react-dark.png
    img: /about/frc/2022-square.png
    details: For FRC 2022 game rules, the mission of the robot is to collect and shoot the CARGO (oversized tennis ball) to the hub.
    link: /about/projects/frc.html#_2022-kylin

  - title: Kylin 2021
    icon:
      light: /icon/infinite-recharge-light.png
      dark: /icon/infinite-recharge-dark.png
    img: /about/frc/2021-square.png
    details: For FRC 2021 game rules, the mission of the robot is to collect the Power Cell (foam ball) and shoot to the power port.
    link: /about/projects/frc.html#_2021-kylin

  - title: Kylin 2020
    icon:
      light: /icon/infinite-recharge-light.png
      dark: /icon/infinite-recharge-dark.png
    img: /about/frc/2020-square.png
    details: For FRC 2020 game rules, the mission of the robot is to collect the Power Cell (foam ball) and shoot to the power port.
    link: /about/projects/frc.html#_2020-kylin
---

<script setup>
import { h } from 'vue'

const MapComponent = () => {
  return h('div', { style: { display: 'none' } }, [
    h('img', { src: '//www.clustrmaps.com/map_v2.png?d=N1xcGfMiyGqEOR9TZz2PRIL6pBhRmMh98RoCJonFmW4&cl=ffffff' })
  ])
}
</script>

<MapComponent />
