import React from "react";
import { Badge } from "@/components/ui/badge";
// using placeholder images for now

const Overview = () => (
  <article className="prose prose-invert max-w-none space-y-8">
    <header>
      <h1 className="paint-drip-green">Overview</h1>
    </header>
    <section>
      <p>
        The Yard Heist is a high-energy crypto gaming universe built for skill,
        nerve, and verifiable fairness. Our mission is to blend adrenaline-pumping
        mini-games with transparent, on-chain mechanics and community-driven lore.
      </p>
      <p>
        This document gives a living overview of the vision, core game loop,
        inspiration lineage, cultural pillars, and token economics that power the ecosystem.
      </p>
      <div className="not-prose">
        <Badge variant="secondary">v1 Draft</Badge>
      </div>
    </section>

    <section className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="paint-drip-purple">World Glimpse</h2>
        <img src="https://placehold.co/960x360/png?text=Yard+Heist+World" alt="Yard Heist" className="w-full h-64 object-cover rounded-md" />
        <p className="mt-3 text-muted-foreground">A snapshot into the gritty, fast-paced universe of The Yard Heist.</p>
      </div>
      <div>
        <h2 className="paint-drip-yellow">Identity</h2>
        <img src="https://placehold.co/960x360/png?text=Yard+Heist+Logo" alt="Logo" className="w-full h-64 object-cover rounded-md" />
        <p className="mt-3 text-muted-foreground">A bold brand that signals skill, courage, and fair competition.</p>
      </div>
    </section>

    <section>
      <h2 className="paint-drip-orange">Highlights</h2>
      <ul>
        <li>Provably Fair — transparent seeding and verifiable results across modes.</li>
        <li>Instant Outcomes — fast loops tuned for repeatable micro-sessions.</li>
        <li>Community Lore — seasonal arcs and shared narratives bind the experience.</li>
      </ul>
    </section>
  </article>
);

export default Overview;