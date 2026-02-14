# Risk-Adjusted 8-Week Execution Plan

**Project:** Real-Time Travel Tracker
**Execution Model:** Risk-first delivery — prioritize the unknowns that can invalidate the product before scaling feature work.

---

# Execution Philosophy

Most mobile infrastructure failures come from three areas:

1. Battery consumption
2. Location reliability
3. Backend write scaling

This plan deliberately front-loads those risks.

**Rule:** Do not build downstream features until upstream risk is retired.

---

# Risk Heatmap (Before Scheduling)

| Risk                       | Probability | Impact   | Strategy                  |
| -------------------------- | ----------- | -------- | ------------------------- |
| Battery drain              | High        | Critical | Validate by Week 3        |
| Location jitter / accuracy | Medium      | Critical | Field test early          |
| Firestore cost explosion   | Medium      | High     | Model writes Week 2       |
| Permission denial UX       | Medium      | High     | Build early               |
| Privacy misuse             | Low         | Critical | Enforce in backend design |

---

# Phase Overview

| Phase                  | Weeks | Goal                             |
| ---------------------- | ----- | -------------------------------- |
| Foundations            | 1–2   | Architectural safety             |
| Device Risk Retirement | 3–4   | Validate physical-world behavior |
| Backend + Sync         | 5–6   | Reliable real-time system        |
| Hardening + Beta       | 7–8   | Production readiness             |

---

# Week-by-Week Plan

---

## Week 1 — Architecture That Prevents Future Rewrites

### Objectives

* Establish a structure that avoids vendor lock-in and scaling traps.

### Deliverables

* Repo + CI pipeline
* Environment configuration
* Feature-based architecture
* Service abstraction layer (critical)

**Non-negotiable design rule:**

```
App → Service Interface → Provider (Firebase today, replaceable tomorrow)
```

### Key Decisions

* State manager finalized
* Error handling strategy
* API boundary defined

### Risks Addressed

✔ Vendor lock-in
✔ Architectural churn

**Exit Criteria:**
No direct Firebase calls inside UI layers.

---

## Week 2 — Data Model + Cost Simulation

### Objectives

Prevent invisible infrastructure failure.

### Tasks

* Design collections:

  * users
  * parties
  * memberLocations

* Estimate write load:

Example model:

```
5 sec updates
12 users
→ 144 writes/min
→ ~207k writes/day per 10k parties
```

* Implement throttling strategy now.

### Add Observability Early

* Structured logging
* Write counters
* Latency measurement hooks

### Risks Addressed

✔ Cost scaling
✔ Write amplification

**Exit Criteria:**
You can predict monthly cost within ±30%.

---

## Week 3 — Device Reality Validation (Most Important Week)

### Objectives

Validate whether continuous tracking is viable.

### Build

* Location wrapper
* Permission flow
* GPS watcher
* Movement threshold

### Mandatory Field Test

Run a **2-hour outdoor test**.

Measure:

| Metric         | Target       |
| -------------- | ------------ |
| Battery        | ≤ 8–10% / hr |
| Accuracy       | < 20m        |
| Update success | ≥ 98%        |

If you fail here — pause feature work.

### Risks Addressed

✔ Battery backlash
✔ Sensor unreliability

**Exit Criteria:**
Tracking is operationally acceptable.

---

## Week 4 — Maps + Rendering Performance

### Objectives

Prevent UI-layer collapse when members scale.

### Tasks

* Integrate maps
* Render markers
* Memoize aggressively
* Test with simulated members (10–15)

### Performance Target

Maintain **≥45 FPS** on a mid-tier Android device.

### Hidden Risk

Map re-renders often destroy battery.

Throttle redraw triggers.

**Exit Criteria:**
No perceptible UI lag with 10 members.

---

## Week 5 — Secure Party System

### Objectives

Close abuse vectors before real users arrive.

### Build

* Party creation
* Join codes
* Leave logic
* Sharing toggle

### Security Requirements

* Membership validation in rules
* Deny reads outside party
* Party TTL

### Strong Recommendation

Use **short-lived join codes (15–30 min)**.

### Risks Addressed

✔ Stalking scenarios
✔ Unauthorized access

**Exit Criteria:**
Security rules pass adversarial testing.

---

## Week 6 — Real-Time Sync + Failure Handling

### Objectives

Ensure reliability under degraded conditions.

### Tasks

* Backend subscriptions
* Retry logic
* Stale location detection
* Network drop handling

### Chaos Testing

Simulate:

* Airplane mode
* OS kill
* Background restriction

Observe recovery behavior.

### Reliability Target

System recovers within **10 seconds** after reconnect.

**Exit Criteria:**
No silent failures.

---

## Week 7 — Privacy Controls + System Hardening

### Objectives

Protect user trust before launch.

### Must-Have Controls

* Persistent sharing indicator
* One-tap pause
* Immediate write stop
* Auto-expire parties
* Data minimization

### Add Analytics Now

Track:

* Session duration
* Update latency
* Crash rate

### Risks Addressed

✔ Privacy backlash
✔ Invisible failures

**Exit Criteria:**
No location writes after pause (verify via logs).

---

## Week 8 — Field Beta (Do Not Skip)

### Objectives

Expose real-world friction.

### Requirements

Recruit **10–15 real travelers**.

Avoid friends who tolerate bugs — use realistic testers.

### Observe:

* Battery complaints
* Join friction
* Map clarity
* Trust perception

### Ship Gate

Launch only if:

* Crash-free ≥ 99%
* Latency target met
* No severe privacy concerns

---

# Parallel Track (Run Throughout)

## Decision Log

Record:

* Why Firebase
* Why update interval
* Why schema

Prevents future indecision loops.

---

## Cost Monitoring

Set alerts immediately.

Do not wait for the invoice.

---

## Technical Debt Policy

Allow debt only when it:

* Speeds MVP
  **AND**
* Is isolated behind an interface.

---

# Schedule Risk Controls

| Trigger                   | Response                     |
| ------------------------- | ---------------------------- |
| Phase slips >5 days       | Reduce scope immediately     |
| Battery exceeds threshold | Increase update interval     |
| Costs trend upward        | Add batching                 |
| Architecture friction     | Freeze features for refactor |

---

# Highest-Leverage Engineering Decisions

Make these early:

1. Update frequency strategy
2. Foreground-only enforcement
3. Backend abstraction
4. Party TTL duration
5. Security rule strictness

Wrong calls here cause rewrites.

---

# Expected Outcome After 8 Weeks

If executed with discipline:

* Stable MVP
* Controlled infra cost
* Privacy-safe foundation
* Architecture capable of scale

If shortcuts are taken:

Most likely failure mode → battery complaints followed by abandonment.
