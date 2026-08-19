
# Habitica 2.0

> Turn your goals into an adventure.


## Preview

The page is structured as a product landing experience with a live dashboard embedded directly into the journey:

- A cinematic hero with interactive daily tasks and clear calls to action
- A playable productivity dashboard with tasks, inventory, party, and achievements views
- XP, gold, streak, level-up, and boss-damage feedback loops
- Habit, daily, and to-do task types with different rewards
- Character class selection across Warrior, Mage, Rogue, and Healer
- Gear inspection and equip interactions
- A progress timeline showing how a productive day unfolds
- A comparison section positioning Habitica against traditional productivity tools
- A keyboard-triggered secret quest with confetti, sound, and temporary golden mode

All interactions are intentionally local and demo-oriented. There is no authentication, database, or external API in this assessment build.

## Tech Stack

- **Next.js 16** with the App Router
- **React 19** and TypeScript
- **Tailwind CSS 4** for responsive styling
- **Framer Motion** for entrances, transitions, and reward animations
- **Lucide React** for interface icons
- **Canvas Confetti** for the hidden quest reward
- **Web Audio API** for lightweight synthesized feedback sounds

## Getting Started

### Requirements

- Node.js 20 or newer
- npm 10 or newer

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Production build

```bash
npm run build
npm run start
```

### Quality checks

```bash
npm run lint
```

## Interaction Notes

1. Use **Start Your Quest** or **Explore Live Demo** to move through the experience.
2. Complete tasks in the hero or dashboard to see XP, gold, streak, and boss health update.
3. Open the dashboard tabs to inspect inventory, party, and achievement states.
4. Select gear to view its details, then equip available items.
5. Sound effects are enabled by default and can be toggled from the interface. The preference is stored in `localStorage`.
6. For the hidden quest, enter the Konami Code: `Up Up Down Down Left Right Left Right B A`.

The audio system initializes after the first pointer or keyboard interaction to comply with browser autoplay policies.

## Project Structure

```text
src/
├── app/
│   ├── globals.css       # Global theme, effects, and responsive styles
│   ├── layout.tsx        # Metadata, fonts, and root document layout
│   └── page.tsx          # Page composition and cross-section navigation
├── components/
│   ├── HeroSection.tsx
│   ├── ProductShowcase.tsx
│   ├── WhyItWorks.tsx
│   ├── DayTimeline.tsx
│   ├── ProductComparison.tsx
│   ├── FinalCTA.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── EasterEggModal.tsx
├── hooks/
│   └── useKonamiCode.ts  # Keyboard sequence and secret-mode state
└── utils/
    └── audio.ts          # Web Audio API sound synthesizer
```

## Design And Implementation Decisions

### Feedback makes productivity feel tangible

The central interaction is deliberately immediate: completing a task produces visible rewards, updates the character state, damages the boss, and plays a short audio cue. This creates a clear cause-and-effect loop without requiring a backend.

### A focused visual system

The interface combines a dark cosmic environment with amber reward accents, purple progression states, and restrained glass surfaces. Plus Jakarta Sans handles interface content, while Cinzel and JetBrains Mono provide RPG and telemetry accents.

### Responsive by default

The layout is built around stacked mobile flows and expands into denser dashboard compositions at larger breakpoints. Primary controls remain reachable, and interactive elements include visible focus states for keyboard users.

### Progressive enhancement for delight

Confetti and synthesized sound enhance successful actions but do not carry essential information. The core product narrative and task state remain understandable through the visual UI alone.

## Scope And Next Steps

This assessment focuses on the experience layer and intentionally uses seeded client-side state. A production version would add authenticated persistence, server-backed task data, real party collaboration, error/loading states, analytics, and automated component or end-to-end tests.

## License

This is an assessment project and is not affiliated with or endorsed by Habitica.
