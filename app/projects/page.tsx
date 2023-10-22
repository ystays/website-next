import Card from "@/components/home/card"
// import ComponentGrid from "@/components/home/component-grid"
// import Image from "next/image"
import Image from "@/components/home/image-card"

export default async function Projects() {
    return(
      <>
      {/* <div className="z-10 w-full max-w-xl px-5 xl:px-0"> */}
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Projects
        </h1>
        <section>
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
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
      <img className="rounded-lg" src="/Immigration_Nationalities_Inequality_Cover.jpg" alt="image of Immigration, Nationalities & Inequality StoryMap cover" height={250} width={250} />
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
]