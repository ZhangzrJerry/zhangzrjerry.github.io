---
aside: false
---

# Soul Pivot

The architecture ensures that each subsystem interacts exclusively with **interfaces**, remaining completely unaware of whether the underlying implementation is a simulation or the real hardware. Each subsystem governs its own **state machine**, exposing a minimal, consistent API. From these interfaces, **atomic commands** are designed to encapsulate discrete actions, enabling composition into sequences, parallel executions, or conditional workflows.

<CenteredImg src="/projects/soul-pivot/main.jpg" width="55%" />

This modular command structure allows for fluid orchestration of complex robot behaviors, constructing the entire system as a hierarchy of **reusable, testable, and interchangeable components**.

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <PlayerBilibili videoId="BV1SPXnYLEEY" borderRadius=10px />
    <PlayerBilibili videoId="BV1CzZaYSE1W" borderRadius=10px />
    <PlayerBilibili videoId="BV1mMXnYkEuR" borderRadius=10px />
    <PlayerBilibili videoId="BV1Pb3RzGEvL" borderRadius=10px />
</div>
