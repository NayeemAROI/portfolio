---
name: ponytail-coding-mode
description: Use when the user says "ponytail mode", "lock in", or wants distraction-free build sessions - hair up, headphones on, ship. Enforces pre-made decisions, one task at a time, parked tangents, and a shipped commit every session.
---

# Ponytail Coding Mode

Hair up. Headphones on. Ship.

Execution mode for sessions where the thinking is already done and the only
job is to build. Pairs with a written plan; without one, first write the plan,
then enter ponytail mode.

## Iron rules

1. **Decisions are pre-made.** PRODUCT.md, DESIGN.md, and the active plan are
   law. If a decision is missing, make the smallest reasonable call, write it
   down, keep moving. Never redesign mid-session.
2. **One task at a time.** Exactly one checkbox in progress. Finish it or park
   it before touching anything else.
3. **Tangents get parked, not chased.** New idea? One line in PARKED.md, then
   back to the task. Off-plan budget: 10 minutes per session, total.
4. **No shopping.** No font browsing, no palette tweaking, no library
   comparisons, no "while I'm here" refactors.
5. **Every session ends shipped.** Working commit pushed, even a small one.
   Mid-task? Commit what works with a "NEXT:" line in the commit body.

## Session ritual

- **Start:** read the current task from the plan, say it out loud in one
  sentence, start a 25-45 minute timer.
- **During:** everything that is not the task goes to PARKED.md.
- **End:** commit + push, write the one-line NEXT note, stop at the boundary.

## Red flags

| Signal | Response |
|--------|----------|
| "While I'm here..." | Park it |
| Comparing two good-enough options for > 2 min | Take the first, note it |
| Editing files unrelated to the task | Park the idea, revert focus |
| Reading docs beyond the current step | Bookmark in PARKED.md |
| Timer done but "just one more thing" | Stop. That energy is tomorrow's on-ramp |

## Works with

- superpowers executing-plans or subagent-driven-development for the task loop
- i-have-adhd for session sizing, progress counters, and re-entry notes
- impeccable for design authority: never bikeshed what DESIGN.md already decided
