import Card from "@/components/home/card"
import ComponentGrid from "@/components/home/component-grid"
import WebVitals from "@/components/home/web-vitals"
import Image from "next/image"
// import Image from "@/components/home/image-card"

export default async function Gallery() {
  return(
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">      
      <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Gallery of Words
      </h1>
      <br/>
      <section>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="grid-cols-1 grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/the_creative_act-artist.jpg" alt=""/>
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/no-mind.jpg" alt=""/>
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/quantum-model.jpg" alt=""/>
          </div>
        </div>

        <div className="grid-cols-1 grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/inevitability.jpg" alt=""/>
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/naturalness.jpg" alt=""/>
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/gallery/misuse.jpg" alt=""/>
          </div>
        </div>
      </div>

      </section>
    </div>
  )
}