## 1. Why this approach over the obvious alternative?

I chose to redesign Habitica because it already has a unique and proven product concept, but I felt its landing page could do a better job of communicating that value. Instead of creating a fictional product, redesigning an existing one let me focus on solving a real UX and visual communication problem.

My goal was to make users understand Habitica within a few seconds. Rather than relying on long marketing copy or feature lists, I built the homepage around an interactive product preview that demonstrates the core experience—completing tasks, earning XP, maintaining streaks, and progressing like an RPG.

For the implementation, I chose **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** because they provide a modern, maintainable foundation while enabling responsive layouts and smooth, performant animations.

---

## 2. One trade-off I made under the time limit, and what I'd do with another week

Given the time available, I focused on creating a polished frontend experience instead of integrating the live Habitica API.

The dashboard currently showcases the intended experience using representative data rather than live user information. If I had another week, I would:

- Integrate the official Habitica API to display real tasks and progress.
- Expand dashboard interactions with editable tasks and real-time updates.
- Add automated testing for key components and interactions.
- Perform deeper accessibility audits and keyboard navigation improvements.
- Further optimize animations and performance based on Lighthouse metrics.

I intentionally prioritized design quality, usability, responsiveness, and clean architecture because they best matched the goals of this assessment.

---

## 3. Where did I use AI tools, and what did I personally verify or change afterward?

AI was used as a collaborative assistant throughout the project—not as a replacement for engineering or design decisions.

I used AI to:
- Explore alternative layouts and visual directions.
- Brainstorm interaction ideas.
- Review component structure and suggest improvements.
- Refine animation concepts.

I personally:
- Designed the final visual hierarchy and user flow.
- Refined spacing, typography, colors, and overall consistency.
- Implemented and tuned animations using Framer Motion.
- Built reusable React components and organized the project structure.
- Verified responsiveness across mobile and desktop breakpoints.
- Reviewed, modified, and tested all generated code before including it in the final project.
- Implemented the optional Konami Code Easter egg as a small detail for users who enjoy exploring interfaces.

Every design and technical decision in the final submission was reviewed, refined, and intentionally chosen by me. I am comfortable explaining the reasoning behind every implementation choice during the follow-up discussion.
