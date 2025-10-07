import React from "react";

const Precursors = () => (
  <article className="prose prose-invert max-w-none space-y-8">
    <header>
      <h1 className="paint-drip-orange">Precursors</h1>
    </header>
    <section>
      <p>
        Our design draws from the evolution of internet-native capital markets and crypto gaming.
        From the ICO era through fair launches and meme-to-product pipelines, the space matured into
        robust infrastructure for verifiable, liquid, and community-led experiences.
      </p>
      <p>
        We adopt the best lessons: transparent odds, fair access, and a culture of building in public.
      </p>
    </section>

    <section>
      <h2 className="paint-drip-purple">Timeline</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "2017", text: "ICO era; speculative coordination at scale." },
          { title: "2020", text: "DeFi composability; fair launches." },
          { title: "2023", text: "Meme-to-product flywheels; on-chain games." },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-muted/30 rounded-md">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.text}</p>
          </div>
        ))}
      </div>
      <img src="https://placehold.co/1200x300/png?text=Ecosystem+Diagram" alt="Diagram" className="not-prose w-full mt-4 rounded-md" />
    </section>
  </article>
);

export default Precursors;