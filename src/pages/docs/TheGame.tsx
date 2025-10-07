import React from "react";

const TheGame = () => (
  <article className="prose prose-invert max-w-none space-y-8">
    <header>
      <h1 className="paint-drip-purple">The Game</h1>
    </header>
    <section>
      <p>
        The Yard Heist features multiple modes like Coin Toss, Fence Break Roulette,
        Getaway Crash, and Shadow Dice Raid. Each mode balances chance and strategy,
        with instant outcomes and clear odds.
      </p>
      <ul>
        <li>Provably fair RNG with transparent seeding and verifiable results.</li>
        <li>Instant feedback loops and optional auto-cashout strategies.</li>
        <li>Progression through themed challenges and streak bonuses.</li>
        <li>Leaderboards and social features to amplify competition.</li>
      </ul>
      <p>
        The core experience is fast, intuitive, and tuned for repeatable micro-sessions
        that scale into high-stakes moments.
      </p>
    </section>

    <section className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="paint-drip-green">Coin Toss</h3>
        <img src="https://placehold.co/640x240/png?text=Coin+Toss" alt="Coin Toss" className="w-full h-40 object-cover rounded-md" />
        <p className="mt-2 text-muted-foreground text-sm">Predict heads or tails; instant resolution with verifiable randomness.</p>
      </div>
      <div>
        <h3 className="paint-drip-yellow">Speed Runs</h3>
        <img src="https://placehold.co/640x240/png?text=Speed+Run" alt="Speed Runs" className="w-full h-40 object-cover rounded-md" />
        <p className="mt-2 text-muted-foreground text-sm">Time-bound skill tests with leaderboards and rewards.</p>
      </div>
      <div>
        <h3 className="paint-drip-orange">Streaks</h3>
        <img src="https://placehold.co/640x240/png?text=Streaks" alt="Streaks" className="w-full h-40 object-cover rounded-md" />
        <p className="mt-2 text-muted-foreground text-sm">Chain wins without tilt; smart bankroll tools encourage discipline.</p>
      </div>
    </section>

    <section>
      <h2 className="paint-drip-purple">Feature Gallery</h2>
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-video bg-muted/30 rounded-md" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm">Placeholder thumbnails for gameplay moments, UIs, and animations.</p>
    </section>
  </article>
);

export default TheGame;