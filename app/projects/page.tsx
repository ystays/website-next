import Card from "@/components/home/card"
import Image from "next/image"

export default async function Projects() {
    return(
      <>
      {/* <div className="z-10 w-full max-w-xl px-5 xl:px-0"> */}
        <h1
          className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs text-balance md:text-7xl md:leading-20"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Projects
        </h1>
        <section>
        <div className="my-10 grid w-full max-w-(--breakpoint-lg) animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
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
      {/* </div> */}
      </>
    )
}

const features = [{
  title: "ArcGIS StoryMap",
  description: "",
  // demo: <iframe src="" width="95%" height="90%" style={{border: 5}} allowFullScreen allow="geolocation"></iframe>,
  demo: (
    <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
      <a href="https://storymaps.arcgis.com/stories/f552e19611a549d1b0a145a5a5120a4a">
      <Image className="rounded-lg" src="/Immigration_Nationalities_Inequality_Cover.jpg" alt="image of Immigration, Nationalities & Inequality StoryMap cover" height={250} width={250} />
      </a>
    </figure>
  ),
  large: true,
  tall: true,
  fullWidth: undefined,
},
{
  title: "Weather App",
  description: "Written in Node.js",
  demo: <iframe src="https://ystays-weather-website.herokuapp.com/" width="95%" height="100%" allowFullScreen allow="geolocation"></iframe>,
  large: undefined,
  tall: true,
  fullWidth: undefined,
},
{
  title: "LLM Slackbot",
  description: "Python, BeautifulSoup, Flask, LangChain, Pinecone, GPT-3.5",
  demo: <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"><a href="https://www.github.com/ystays/llm-slackbot"><Image src="/projects/llm-slackbot.jpg" alt="image of sample conversation with the LLM Slackbot" className="rounded-lg" height={800} width={600}/></a></figure>,
  large: true,
  tall: true,
  fullWidth: undefined,
},
{
  title: "React Chat App",
  description: "Built with React.js",
  demo: (
    <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
      <a href="https://github.com/ystays/rita-chat-react">
      <Image className="rounded-lg" src="/projects/rita-chat-login.png" alt="image of login page in React Chat App" height={250} width={290} />
      <Image className="rounded-lg" src="/projects/rita-chat-chats.png" alt="image of chats page in React Chat App" height={250} width={290} />
      </a>
    </figure>
  ),
  large: undefined,
  tall: true,
  fullWidth: undefined,
},
{
  title: "this.website",
  description: "Built with Next.js",
  demo: <iframe src="https://ystays.com/" width="95%" height="100%" allowFullScreen></iframe>,
  large: undefined,
  tall: true,
  fullWidth: true,
},
]