# Presentation Delivery Guide

## 📋 Overview
- **Total Slides:** 18
- **Recommended Duration:** 15-20 minutes + 5 min Q&A
- **Navigation:** Arrow keys (← →), Space, or click buttons

---

## 🎯 Slide-by-Slide Talking Points

### Slide 1: Title (30 sec)
- Introduce project name confidently
- Mention it's a **RISC-V based embedded system**
- State course: CS-221 Computer Organization & Assembly Language

### Slide 2: Team (45 sec)
- Briefly introduce each member and their role
- Highlight collaborative effort
- **Tip:** Each member can wave/acknowledge

### Slide 3: Problem Statement (1 min)
- Emphasize **real-world relevance** of indoor air quality
- Mention health risks: hypercapnia, respiratory issues, fire
- **Key phrase:** "Conventional systems are reactive, not proactive"

### Slide 4: Objectives (1 min)
- Walk through each objective box
- Stress **real-time response** (milliseconds, not seconds)
- Mention **autonomous control** - no human intervention needed

### Slide 5: System Architecture (1 min)
- Explain the **three-layer approach**
- Ripes = processor-level, Wokwi = IoT hardware, Simulation = visualization
- **Key phrase:** "Each layer serves a distinct educational purpose"

### Slide 6: Architecture Block Diagram (1.5 min)
- Point to RISC-V Core at top
- Explain **System Bus** connecting everything
- Show **memory addresses** (0xF0000000, etc.)
- Highlight sensors → processing → actuators flow

### Slide 7: Ripes Introduction (1 min)
- Explain **what Ripes is** - visual processor simulator
- Mention **why RISC-V** - open source, educational transparency
- **Key phrase:** "We can actually SEE the registers change in real-time"

### Slide 8: Memory-Mapped I/O (1.5 min)
- Go through each address in the table
- Explain **bit layout** - how data is packed
- Show LED color meanings: Green=Safe, Red=Danger, Blue=Fan
- **Demo opportunity:** Mention you'll show this working later

### Slide 9: RISC-V Assembly Code (2 min)
- Walk through the code line by line
- Highlight:
  - `li` (load immediate) for addresses
  - `lw` (load word) to read sensors
  - `and` for bitwise masking
  - `bnez` for immediate branch on smoke detection
- **Key phrase:** "This is O(1) constant time - critical for safety"

### Slide 10: Wokwi Introduction (1 min)
- Explain ESP32 as real-world microcontroller
- List hardware components
- Mention **MQTT** as the communication protocol
- **Key phrase:** "This simulates what would run on actual hardware"

### Slide 11: Wokwi Decision Logic (1.5 min)
- Show **priority-based logic** mirrors RISC-V design
- Smoke is Priority 1 - most dangerous
- Explain threshold values and what they mean
- **Key phrase:** "Same logic, different abstraction level"

### Slide 12: 3D Simulation Introduction (1 min)
- Explain technology stack briefly
- Mention **Digital Twin** concept
- Highlight interactive features
- **Key phrase:** "This is the user-facing layer"

### Slide 13: Simulation Capabilities (1 min)
- Go through each feature quickly
- Emphasize visual feedback for each sensor condition
- Mention fans actually spin, lights actually change color

### Slide 14: MQTT Communication (1.5 min)
- Explain the **pub/sub** model
- Show data flow: Simulation → Broker → Wokwi → Broker → Simulation
- Mention **bidirectional** communication
- **Key phrase:** "This ties all three layers together"

### Slide 15: Implementation Flow (1 min)
- Describe your development process
- Emphasize **bottom-up approach**
- Show logical progression from requirements to testing

### Slide 16: Testing Strategy (1 min)
- Explain unit vs integration testing
- Give specific examples of test cases
- **Key phrase:** "We tested boundary conditions to ensure reliability"

### Slide 17: Live Demo (3-5 min)
- **CRITICAL:** This is your scoring opportunity!
- Demo in this order:
  1. **Ripes:** Toggle switches, show LED matrix color change, point to register values
  2. **Wokwi:** Adjust potentiometers, show MQTT messages in serial monitor
  3. **3D Sim:** Walk around, trigger smoke, watch ventilation activate

### Slide 18: Conclusion (1 min)
- Summarize key achievements
- Mention future work briefly
- Thank the audience
- **Open for questions**

---

## ⚡ Demo Preparation Checklist

Before your presentation, ensure:

1. [ ] Ripes is open with `ripes.s` loaded
2. [ ] IO tab is configured with correct addresses
3. [ ] Wokwi project is open and simulation ready
4. [ ] 3D Simulation is running (`npm run dev`)
5. [ ] All three windows are arranged for quick switching
6. [ ] Internet connection is stable (for MQTT)

---

## 🎤 Presentation Tips

1. **Eye Contact:** Look at the audience, not the screen
2. **Pacing:** Don't rush the code slides - pause and point
3. **Demo Confidence:** Practice the demo 3+ times before
4. **Backup Plan:** Have screenshots ready if demo fails
5. **Questions:** If unsure, say "Great question, let me check our documentation"

---

## ❓ Anticipated Q&A

| Question | Answer |
|----------|--------|
| Why RISC-V instead of ARM? | Open-source ISA, no licensing, educational transparency, deterministic timing |
| How fast is the response? | Less than 100ms from detection to actuation |
| Can this work on real hardware? | Yes, the ESP32 code is real firmware; RISC-V would need FPGA |
| How do the three layers communicate? | MQTT protocol via HiveMQ public broker |
| What happens if MQTT fails? | Wokwi has local sensor fallback; system continues in degraded mode |

---

## 📁 Files to Have Open

1. `presentation.html` - Main slides (open in browser)
2. Ripes application with `ripes.s` loaded
3. Wokwi.com with your project
4. Terminal with 3D simulation running

**Good luck! 🍀**
