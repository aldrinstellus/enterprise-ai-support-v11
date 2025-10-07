# Dashboard UX Scenarios - A/B Testing Options

## Context
**Goal**: Bridge the gap between old dashboards (100 metrics, overwhelming) and new chat-first UX (on-demand but no eagle's eye view).

**Core Requirement**: Chat must be OMNIPRESENT while providing persona-driven, glanceable, trackable reference metrics.

---

## Implemented Options (Ready to Test)

### **Baseline**
- Route: `/demo/c-level`
- Original chat-first interface

---

### **Traditional Approaches (Batch 1)**

#### **Option A: Dashboard Mode Toggle**
- Route: `/demo-toggle/c-level`
- Toggle button switches between Chat ↔ Dashboard
- Keyboard: `Cmd+Shift+D`
- **Pros**: Clear separation, simple UX
- **Cons**: Chat disappears when viewing dashboard

#### **Option B: Dashboard Drawer**
- Route: `/demo-drawer/c-level`
- Drawer slides from right, can pin open
- Keyboard: `Cmd+Shift+D`
- **Pros**: Can pin for persistent access
- **Cons**: Overlays chat, reduces chat to 60% width

#### **Option C: Enhanced Command Palette**
- Route: `/demo-palette/c-level`
- Cmd+K opens palette, has "Dashboard View" tab
- Keyboard: `Cmd+K`, `Tab` to switch tabs
- **Pros**: Extends existing pattern
- **Cons**: Modal blocks chat view

---

### **Futuristic Solutions (Batch 2)**

#### **Option D: Split-View Workspace** ⭐
- Route: `/demo-split/c-level`
- Chat (60%) + Dashboard (40%) always visible
- Resizable divider, collapse panes
- Keyboard: `Cmd+[` (focus chat), `Cmd+]` (focus dashboard), `Cmd+\` (reset)
- **Pros**: Chat NEVER hidden, simultaneous access, resizable
- **Cons**: Screen space divided, less room for each

#### **Option E: Floating Widgets** 🚀
- Route: `/demo-float/c-level`
- Chat fullscreen + draggable floating widgets
- Multi-window experience, resize/minimize
- Widget dock on right edge
- **Pros**: macOS-style multi-tasking, chat fullscreen
- **Cons**: Floating widgets can clutter, overlaps chat

#### **Option F: Smart Dashboard Sidebar** 🧠
- Route: `/demo-smart/c-level`
- Slide-in sidebar (380px) with pinnable widgets
- Context-aware, AI-driven suggestions
- Keyboard: `Cmd+D` (toggle), `Cmd+P` (pin)
- **Pros**: Context-aware, smooth animations, pinning
- **Cons**: Sidebar still takes fixed width

---

## Ultra Mode: Minimal Smart Dashboard (Next Implementation)

### Concept: Ambient Metrics Layer
**Philosophy**: 3-6 metrics MAX (not 100), glanceable in 1 second, persona-specific

---

### **C-Level Executive Metrics (4 Max)**

1. **At-Risk Customers**
   - `3 customers` 🔴 `↑1 from yesterday`
   - Direct revenue impact
   - Click → Customer risk list

2. **SLA Compliance**
   - `87%` 🟡 `Target: 90%`
   - Operational excellence indicator
   - Click → SLA breakdown by category

3. **Revenue at Risk**
   - `$450K ARR` 🔴 `at risk`
   - Financial health, board-level metric
   - Click → Which customers/contracts

4. **Team Efficiency**
   - `4.2h avg resolution` 🟢 `↓0.5h`
   - Resource utilization, scaling readiness
   - Click → Team performance dashboard

**Alternatives**: Ticket Velocity, NPS/CSAT Score

---

### **CS Manager Metrics (4 Max)**

1. **Team Capacity**
   - `6/8 agents` 🟢 `67% capacity`
   - Workload balance indicator
   - Click → Team workload distribution

2. **SLA Risk**
   - `8 tickets` 🔴 `<2h to breach`
   - Immediate operational crisis
   - Click → At-risk ticket list

3. **Customer Satisfaction**
   - `4.2/5 CSAT` 🟢 `↑0.3 this week`
   - Quality indicator, team morale
   - Click → CSAT breakdown by agent

4. **Escalations Queue**
   - `3 escalations` 🟡 `awaiting review`
   - Manager-only action items
   - Click → Escalation details

**Alternatives**: Top/Bottom Performers (coaching), High-Priority Customers

---

### **Support Agent Metrics (4 Max)**

1. **My Queue Status**
   - `12 tickets` 🟡 `4 urgent`
   - Daily workload overview
   - Click → My ticket list

2. **Next SLA Deadline**
   - `45 mins` 🔴 `Ticket #891`
   - Time pressure, prioritization
   - Click → Ticket details

3. **My Performance**
   - `4.8/5 CSAT` 🟢 `95th percentile`
   - Personal feedback, motivation
   - Click → Performance stats

4. **Quick Access**
   - `KB Search` 🔍 `+ 12 templates`
   - Tools to work faster
   - Click → Search/templates

**Alternatives**: Avg First Response Time, Unread Messages

---

## Placement Options for Minimal Dashboard

### **Option G: Compact Top Bar**
- Route: `/demo-topbar/c-level`
- Thin bar across top (60px height)
- Slides down on hover for more detail
- Always visible, minimal footprint
- Like VS Code status bar

### **Option H: Side Strip**
- Route: `/demo-strip/c-level`
- Vertical strip on left (80px width)
- Shows metric icons, expands on hover
- Like macOS dock but for metrics

### **Option I: Floating Mini-Dashboard** ⭐ PREFERRED
- Route: `/demo-mini/c-level`
- Small floating card (400x150px)
- Draggable, collapsible
- Can minimize to corner icon
- 4-column layout showing key metrics

---

## Visual Design: 4-Column Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Metric 1]    [Metric 2]    [Metric 3]    [Metric 4]      │
│  🔴 Big Num    🟡 Big Num    🟢 Big Num    🔵 Big Num      │
│  Label         Label         Label         Label           │
│  ↑Trend        ↓Trend        →Trend        Sparkline       │
└─────────────────────────────────────────────────────────────┘
```

### Features:
- **Color coding**: 🔴 Critical, 🟡 Warning, 🟢 Good, 🔵 Info
- **Trend indicators**: ↑ Up, ↓ Down, → Flat
- **Sparklines**: Mini line charts (7-day trend)
- **Click anywhere** → Chat discusses that metric
- **Adaptive**: Hides if not relevant, shows alternative

---

## Next Steps

1. **Clear session** and start fresh
2. **Implement Option I** (Floating Mini-Dashboard) as separate A/B test
3. Build 3 versions:
   - `/demo-mini/c-level` (C-Level metrics)
   - `/demo-mini/cs-manager` (CS Manager metrics)
   - `/demo-mini/support-agent` (Support Agent metrics)
4. Each shows 4 persona-specific metrics
5. Draggable, collapsible, glanceable

---

## Files Already Created

### Shared Components:
- `/src/components/dashboard/DashboardGrid.tsx`

### Option A (Toggle):
- `/src/app/demo-toggle/layout.tsx`
- `/src/app/demo-toggle/c-level/page.tsx`
- `/src/components/chat/ChatWithDashboardToggle.tsx`

### Option B (Drawer):
- `/src/app/demo-drawer/layout.tsx`
- `/src/app/demo-drawer/c-level/page.tsx`
- `/src/components/dashboard/DashboardDrawer.tsx`
- `/src/components/chat/ChatWithDrawer.tsx`

### Option C (Palette):
- `/src/app/demo-palette/layout.tsx`
- `/src/app/demo-palette/c-level/page.tsx`
- `/src/components/concepts/EnhancedCommandPalette.tsx`
- `/src/components/chat/ChatWithPalette.tsx`

### Option D (Split-View):
- `/src/app/demo-split/layout.tsx`
- `/src/app/demo-split/c-level/page.tsx`
- `/src/components/workspace/SplitViewWorkspace.tsx`
- `/src/components/workspace/ResizableDivider.tsx`

### Option E (Floating):
- `/src/app/demo-float/layout.tsx`
- `/src/app/demo-float/c-level/page.tsx`
- `/src/components/floating/FloatingWorkspace.tsx`
- `/src/components/floating/DraggableWidget.tsx`

### Option F (Smart):
- `/src/app/demo-smart/layout.tsx`
- `/src/app/demo-smart/c-level/page.tsx`
- `/src/components/smart/SmartWorkspace.tsx`

---

## Testing URLs Summary

```
# Baseline
http://localhost:3004/demo/c-level

# Traditional (A, B, C)
http://localhost:3004/demo-toggle/c-level
http://localhost:3004/demo-drawer/c-level
http://localhost:3004/demo-palette/c-level

# Futuristic (D, E, F)
http://localhost:3004/demo-split/c-level
http://localhost:3004/demo-float/c-level
http://localhost:3004/demo-smart/c-level

# Next: Minimal Dashboard (G, H, I)
http://localhost:3004/demo-topbar/c-level
http://localhost:3004/demo-strip/c-level
http://localhost:3004/demo-mini/c-level  ⭐ PREFERRED
```

---

**Status**: 6 options implemented (A-F), ready to test. Option I (Floating Mini-Dashboard) identified as next implementation target.
