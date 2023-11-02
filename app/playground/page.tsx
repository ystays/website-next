import Card from "@/components/home/card"
// import ComponentGrid from "@/components/home/component-grid"

export default async function Projects() {
    return(
      <>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Playground
        </h1>
        <section>
        <div className="my-10 grid w-full max-w-screen-lg animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large, tall, fullWidth }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={large}
            tall={tall}
            fullWidth={fullWidth}
          />
        ))}
        </div>
        </section>
      </>
    )
}

const features = [{
    title: "ONE  —  EIGHTY-ONE",
    description:
      "A great tailor cuts little.",
    demo: (
        <a href="" className="transition duration-300 hover:text-blue-500">
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4">
        <p>
          Ever desireless, one can see the mystery.
        </p>
      </div>
        </a>
    ),
  },
  {
    title: "The Unexpected Virtue of Ignorance",
    description:
      "or (Birdman)",
    demo: (
        <a href="" className="transition duration-300 hover:text-blue-500">
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4">
        <p>
        You mistake all those little noises in your head for true knowledge!<br/>
        -Riggan Thomson
        </p>
      </div>
        </a>
    ),
    large: undefined,
    tall: undefined,
    fullWidth: undefined,
  },
  {
    title: "1",
    description:
      "Do one thing at a time",
    demo: (
        <a href="" className="transition duration-300 hover:text-blue-500">
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4">
        <p>
          What we want is to catch one bird with one stone.
        </p>
      </div>
        </a>
    ),
  },
  {
    title: "Home",
    description:
      "If you're afraid of what you need ...",
    demo: (
      <a href="/" className="transition duration-300 hover:text-blue-500">
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4 text-xs">
        <p>
          We shall not cease from exploration<br/>
          And the end of all our exploring<br/>
          Will be to arrive where we started<br/>
          And know the place for the first time.<br/>
          -T.S. Eliot
        </p>
      </div>
      </a>
    ),
  },
  {
    title: "Football/Soccer",
    description:
      "",
    demo: (
      <a href="/posts/simplify-your-game" className="transition duration-300 hover:text-blue-500">
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4 text-s">
        <p>
        The machinery of spectacle grinds up everything in its path, nothing lasts very long, and the manager is as disposable as any other product of consumer society. Today the crowd screams 'Never die!' and next Sunday they invite him to kill himself.<br/>
        {/* The manager believes football is a science and the field a laboratory, but the genius of Einstein and the subtlety of Freud isn't enough for the owners and the fans. They want a miracle-worker like the Virgin of Lourdes, with the stamina of Gandhi.<br/> */}
        -Galeano
        </p>
      </div>
      </a>
    ),
    large: true,
  },


]