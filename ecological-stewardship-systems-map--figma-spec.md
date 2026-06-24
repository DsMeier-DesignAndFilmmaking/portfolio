# Ecological Stewardship Systems Map
## Figma Specification — Portfolio Grade

---

## 1. Canvas & Grid

| Property | Value |
|---|---|
| Frame dimensions | 1220 × 900 px |
| Background fill | #F1F5F9 |
| Grid | 10px base unit |
| Corner radius (zones) | 10px |
| Corner radius (nodes) | 5px |
| Node left accent bar | 3px wide, full node height |

---

## 2. Color Tokens

### Zone accent colors (used for node left bar and zone stroke)
| Zone | Token name | Hex |
|---|---|---|
| Atmospheric | `color/zone/atmospheric` | `#3B82F6` |
| Soil System | `color/zone/soil` | `#16A34A` |
| Ecological Outcomes | `color/zone/ecological` | `#059669` |
| Visitor Outcomes | `color/zone/visitor` | `#D97706` |
| Adaptive Management | `color/zone/management` | `#7C3AED` |

### Zone background fills
| Zone | Hex |
|---|---|
| Atmospheric | `#EFF6FF` |
| Soil System | `#F0FDF4` |
| Ecological Outcomes | `#ECFDF5` |
| Visitor Outcomes | `#FFFBEB` |
| Adaptive Management | `#FAF5FF` |

### Zone dashed stroke colors
| Zone | Hex |
|---|---|
| Atmospheric | `#BFDBFE` |
| Soil System | `#BBF7D0` |
| Ecological Outcomes | `#A7F3D0` |
| Visitor Outcomes | `#FDE68A` |
| Adaptive Management | `#DDD6FE` |

### Feedback loop colors
| Loop | Classification | Hex |
|---|---|---|
| Small Water Cycle | Reinforcing | `#3B82F6` |
| Soil Carbon Cycle | Reinforcing | `#7C5C2E` |
| Visitor Stewardship | Reinforcing | `#D97706` |
| Adaptive Management | Adaptive | `#7C3AED` |

### Non-loop connection color
| Use | Hex |
|---|---|
| Atmospheric primary (SE→EV→CF) | `#94A3B8` |
| Ecological primary (VH→HQ→BD/WA) | `#059669` |

### Node colors
| Property | Hex |
|---|---|
| Node fill | `#FFFFFF` |
| Node stroke | `#E2E8F0` |
| Node stroke width | `1px` |
| Node label text | `#1E293B` |

---

## 3. Typography

### Node labels
| Property | Value |
|---|---|
| Font | Inter (fallback: -apple-system, SF Pro Text) |
| Size | 10.5px / 11px |
| Weight | Medium (500) |
| Color | `#1E293B` |
| Letter spacing | 0.3% |
| Alignment | Center |

### Zone labels
| Property | Value |
|---|---|
| Font | Inter |
| Size | 8.5px |
| Weight | Bold (700) |
| Color | `#94A3B8` |
| Letter spacing | 7% |
| Case | ALL CAPS |
| Position | 10px from zone left, 13px from zone top |

### Loop badge — primary line
| Property | Value |
|---|---|
| Font | Inter |
| Size | 9.5px |
| Weight | Bold (700) |
| Color | Loop accent color |

### Loop badge — sub line (classification)
| Property | Value |
|---|---|
| Font | Inter |
| Size | 8.5px |
| Weight | Regular (400) |
| Color | Loop accent color at 75% opacity |

---

## 4. Zone Specifications

All zones are Figma frames with auto-layout disabled. Stroke style: dashed (4px dash, 3px gap).

| Zone | X | Y | W | H |
|---|---|---|---|---|
| Atmospheric | 42 | 44 | 536 | 196 |
| Soil System | 42 | 258 | 630 | 432 |
| Ecological Outcomes | 670 | 252 | 304 | 318 |
| Visitor Outcomes | 836 | 136 | 368 | 504 |
| Adaptive Management | 260 | 676 | 668 | 212 |

---

## 5. Node Specifications

All nodes: white fill, `#E2E8F0` 1px stroke, 5px corner radius, 3px zone-colored left accent bar.

Format: Node ID — Label — Center X — Center Y — Width — Height — Zone

### Atmospheric Zone
| ID | Label | Center X | Center Y | W | H |
|---|---|---|---|---|---|
| SE | Solar Energy | 105 | 82 | 128 | 34 |
| EV | Evaporation | 282 | 82 | 122 | 34 |
| CF | Cloud Formation | 460 | 82 | 138 | 34 |
| TR | Transpiration | 282 | 192 | 126 | 34 |
| PR | Precipitation | 460 | 192 | 126 | 34 |

### Soil System Zone
| ID | Label | Center X | Center Y | W | H |
|---|---|---|---|---|---|
| SI | Soil Infiltration | 460 | 318 | 138 | 34 |
| SM | Soil Moisture | 268 | 412 | 126 | 34 |
| VH | Vegetation Health ★ | 448 | 472 | 142 | 34 |
| SOC | Soil Organic Carbon | 230 | 560 | 148 | 46 |
| SMM | Soil Microbial Mass | 428 | 645 | 150 | 34 |
| SS | Soil Structure | 618 | 548 | 126 | 34 |

★ VH is a primary hub node — connects to 4 feedback loops. Consider using a slightly bolder stroke weight (1.5px) to signal this.

### Ecological Outcomes Zone
| ID | Label | Center X | Center Y | W | H |
|---|---|---|---|---|---|
| HQ | Habitat Quality ★ | 732 | 412 | 132 | 34 |
| BD | Biodiversity | 888 | 290 | 116 | 34 |
| WA | Wildlife Abundance | 888 | 515 | 148 | 34 |

★ HQ is the loop closure node for the Visitor Stewardship and Adaptive Management loops.

### Visitor Outcomes Zone
| ID | Label | Center X | Center Y | W | H |
|---|---|---|---|---|---|
| CS | Cultural Significance | 885 | 175 | 155 | 34 |
| EC | Emotional Connection (Sense of Place) | 1085 | 268 | 158 | 48 |
| VE | Visitor Experience | 1085 | 378 | 145 | 34 |
| STH | Stewardship Ethic | 1085 | 484 | 142 | 34 |
| PPS | Public / Political Support | 875 | 586 | 145 | 46 |

### Adaptive Management Zone
| ID | Label | Center X | Center Y | W | H |
|---|---|---|---|---|---|
| FN | Funding | 705 | 712 | 98 | 34 |
| MS | Monitoring Signals | 522 | 780 | 146 | 34 |
| DT | Decision Triggers | 314 | 780 | 150 | 34 |
| AMI | Adaptive Mgmt Interventions | 448 | 858 | 162 | 48 |

---

## 6. Connection / Arrow Specifications

### Primary solid connections (non-loop)
| Property | Value |
|---|---|
| Stroke weight | 1.6px |
| Stroke style | Solid |
| Arrowhead | Filled triangle, 7×5px, at endpoint |
| Color | Source zone accent color |

### Feedback loop connections (loop-colored dashes)
| Property | Value |
|---|---|
| Stroke weight | 1.8px |
| Stroke style | Dashed: 5.5px dash / 3.5px gap |
| Arrowhead | Filled triangle, 7×5px, at endpoint |
| Color | Loop color (see Section 2) |
| Opacity | 90% |

### Special routed connection: AMI → HQ
This connection closes the Adaptive Management loop from the bottom of the diagram back to the Ecological zone. Route as a **quadratic bezier curve** passing through control point (870, 680) to avoid crossing the soil and ecological nodes.

---

## 7. Edge List (All Connections)

Format: From → To — Color — Style — Notes

### Atmospheric (non-loop, solid)
- SE → EV — `#94A3B8` — Solid
- EV → CF — `#94A3B8` — Solid

### Small Water Cycle (blue dashed)
- VH → TR — `#3B82F6` — Dashed
- TR → CF — `#3B82F6` — Dashed
- CF → PR — `#3B82F6` — Dashed
- PR → SI — `#3B82F6` — Dashed
- SI → SM — `#3B82F6` — Dashed
- SM → VH — `#3B82F6` — Dashed

### Soil Carbon Cycle (earth dashed)
- VH → SOC — `#7C5C2E` — Dashed
- SOC → SMM — `#7C5C2E` — Dashed
- SMM → SS — `#7C5C2E` — Dashed
- SS → SI — `#7C5C2E` — Dashed

### Ecological primary (solid, non-loop)
- VH → HQ — `#059669` — Solid
- HQ → BD — `#059669` — Solid
- HQ → WA — `#059669` — Solid

### Visitor Stewardship Loop (amber dashed)
- VH → CS — `#D97706` — Dashed
- CS → EC — `#D97706` — Dashed
- EC → VE — `#D97706` — Dashed
- VE → STH — `#D97706` — Dashed
- STH → PPS — `#D97706` — Dashed
- PPS → FN — `#D97706` — Dashed

### Adaptive Management Loop (purple dashed)
- FN → MS — `#7C3AED` — Dashed
- MS → DT — `#7C3AED` — Dashed
- DT → AMI — `#7C3AED` — Dashed
- AMI → HQ — `#7C3AED` — Dashed, **curved** (control point 870, 680)

---

## 8. Feedback Loop Badge Specifications

Four floating badge labels identify and classify each loop. Each badge: rounded rectangle (5px radius), loop-colored stroke (1px), loop-tinted fill, two text lines.

| Badge | Primary Text | Sub Text | Anchor X | Anchor Y | Fill |
|---|---|---|---|---|---|
| ① | Small Water Cycle | Reinforcing ⟲ | 58 | 306 | `#EFF6FF` |
| ② | Soil Carbon Cycle | Reinforcing ⟲ | 58 | 630 | `#FEF9F0` |
| ③ | Visitor Stewardship | Reinforcing ⟲ | 848 | 148 | `#FFFBEB` |
| ④ | Adaptive Mgmt Loop | Adaptive ⇌ | 270 | 858 | `#FAF5FF` |

Badge width: approximately `(label character count × 6) + 16px`
Badge height: 32px

---

## 9. Layer Structure (Figma)

Build in this layer order (bottom to top):

```
Frame: Ecological Stewardship Systems Map [1220×900]
  └── Zone Backgrounds [group]
       ├── Atmospheric Zone
       ├── Soil System Zone
       ├── Ecological Outcomes Zone
       ├── Visitor Outcomes Zone
       └── Adaptive Management Zone
  └── Connections — Primary [group]
       ├── SE → EV
       ├── EV → CF
       ├── VH → HQ
       ├── HQ → BD
       └── HQ → WA
  └── Connections — Water Cycle [group]
       └── [6 dashed blue arrows]
  └── Connections — Soil Carbon [group]
       └── [4 dashed earth arrows]
  └── Connections — Visitor Stewardship [group]
       └── [6 dashed amber arrows]
  └── Connections — Adaptive Management [group]
       └── [4 dashed purple arrows, including curved AMI→HQ]
  └── Nodes [group]
       ├── Atmospheric [group] — SE, EV, CF, TR, PR
       ├── Soil [group] — SI, SM, VH, SOC, SMM, SS
       ├── Ecological [group] — HQ, BD, WA
       ├── Visitor [group] — CS, EC, VE, STH, PPS
       └── Management [group] — FN, MS, DT, AMI
  └── Loop Badges [group]
       ├── ① Small Water Cycle
       ├── ② Soil Carbon Cycle
       ├── ③ Visitor Stewardship
       └── ④ Adaptive Mgmt Loop
```

---

## 10. Figma Build Notes

**Component structure recommended:**
- Create a `Node/Single-line` component and `Node/Double-line` component with zone color as a variable
- Create `Arrow/Primary` and `Arrow/Loop` components with color and dash pattern as variants
- Zone backgrounds can be frames with auto-layout disabled

**Variables to set up:**
- Zone colors as color variables (Section 2)
- Loop colors as color variables
- Node dimensions as number variables

**Key hub nodes to call out visually:**
- `VH` (Vegetation Health) — connects 4 loops, exit node to stewardship chain. Consider a slightly heavier border.
- `HQ` (Habitat Quality) — loop closure for two major loops. Similar treatment.
- `EC` (Emotional Connection / Sense of Place) — the primary effect node in the causal chain. This is the conceptual center of the visitor pathway.

**Annotation layer (optional, for presentation):**
Add a separate top-level layer for callout annotations describing each causal chain step. Toggle visibility for presentation vs. clean diagram modes.

---

## 11. Causal Chain Summary (for diagram annotation reference)

**Primary causal chain:**
Native Biodiversity → Cultural Significance → Emotional "Sense of Place" → Lifelong Stewardship Ethic

**Virtuous cycle:**
Ecological health → Cultural connection → Public/political support → Funding → Management → Ecological health

**Degradation pathway (inverse):**
Sterile signals → Disconnected visitors → Visitor transgressions → Ecological degradation → Reduced cultural meaning

---

*Specification version: June 2026*
