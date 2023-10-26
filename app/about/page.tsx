import Card from "@/components/home/card"
import ComponentGrid from "@/components/home/component-grid"
import WebVitals from "@/components/home/web-vitals"
// import Image from "next/image"
import Image from "@/components/home/image-card"

export default async function About() {
    return(
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          About
        </h1>
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-0 xl:px-0">
          <Image alt="profile photo" src="/profile.jpg"></Image>
        </div>
      <section>
        <p>Hi. <br/>My name is Yi Sheng Tay.<br/><br/>
          I&apos;m a 2023 Computer Science graduate from UCLA ...</p>
        <small>
          with an interest in backend development, AI and digital humanities. Previously interned at Intel and Keysight, and has lately been exploring building web apps with the MERN stack. 
          <br/>
          <br/>
          Searching for a new grad SWE role. Looking for stimulating, collaborative work with a supportive team.
        </small>
        <br/>
        <br/>
        <small>
          (This is my personal website. Check out {' '}
            <a href="https://linkedin.com/in/yi-sheng-tay">my LinkedIn page</a>.)
        </small>
      </section>
      </div>
    )
}