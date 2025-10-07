import React from "react";
import { Separator } from "@/components/ui/separator";

const Tokenomics = () => (
  <article className="prose prose-invert max-w-none space-y-8">
    <header>
      <h1 className="paint-drip-yellow">Tokenomics</h1>
    </header>
    <section>
      <p>Token utility centers on access, rewards, and governance signals. A simplified outline:</p>
      <ul>
        <li>Access: gated modes, tournaments, and premium cosmetics.</li>
        <li>Rewards: streak bonuses, on-chain achievements, and seasonal drops.</li>
        <li>Sink: entries, upgrades, and vanity unlocks designed for sustainability.</li>
        <li>Signals: community voting on event themes and loot tables.</li>
      </ul>
      <Separator className="my-4" />
      <p>
        Detailed emissions, liquidity, and fee routing will be published alongside launch schedules.
        We prioritize clarity and long-term balance over short-term extractive mechanics.
      </p>
    </section>

    <section>
      <h2 className="paint-drip-purple">Diagrams</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src="https://placehold.co/800x400/png?text=Token+Flow" alt="Token Flow" className="w-full rounded-md" />
        <img src="https://placehold.co/800x400/png?text=Emission+Schedule" alt="Emission Schedule" className="w-full rounded-md" />
      </div>
      <p className="text-muted-foreground text-sm">High-level placeholders for flow and schedules. Final specs TBD.</p>
    </section>
  </article>
);

export default Tokenomics;