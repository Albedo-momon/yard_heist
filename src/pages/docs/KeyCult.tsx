import React from "react";

const KeyCult = () => (
  <article className="prose prose-invert max-w-none space-y-8">
    <header>
      <h1 className="paint-drip-red">Key Cult</h1>
    </header>
    <section>
      <p>
        The Yard Heist community is anchored on skill, courage, and fair competition.
        Cultural pillars include:
      </p>
      <ul>
        <li>Skill over luck: strategy and timing shape outcomes.</li>
        <li>Transparency first: odds, seeds, and results are verifiable.</li>
        <li>Play to learn: short sessions that teach risk management.</li>
        <li>Shared lore: narrative arcs and seasonal events.</li>
      </ul>
    </section>

    <section>
      <h2 className="paint-drip-purple">Icons</h2>
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-6 bg-muted/30 rounded-md text-center">
            <img src={`https://placehold.co/96x96/png?text=Icon+${i+1}`} alt={`Icon ${i+1}`} className="mx-auto mb-2 rounded" />
            <p className="text-xs text-muted-foreground">Symbol {i + 1}</p>
          </div>
        ))}
      </div>
      <img src="https://placehold.co/1200x280/png?text=Community+Banner" alt="Community" className="not-prose w-full mt-4 rounded-md" />
    </section>
  </article>
);

export default KeyCult;