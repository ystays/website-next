import Card from "@/components/home/card"
import ComponentGrid from "@/components/home/component-grid"
import WebVitals from "@/components/home/web-vitals"

export default async function About() {
    return(
        <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <section>
        <p>Hi.
          I'm a 2023 Computer Science graduate from UCLA.</p>
        <small>
          (This is my personal website. Check out {' '}
          <a href="https://linkedin.com/in/yi-sheng-tay">my LinkedIn page</a>.)
        </small>
        <br/>
        <br/>
        <small>
          Recent Computer Science graduate from UCLA, with an interest in backend development, AI and digital humanities. Previously interned at Intel and Keysight, and has lately been exploring building web apps with the MERN stack. 
          <br/>
          <br/>
          Searching for a new grad SWE role. Looking for stimulating, collaborative work with a supportive team.
        </small>
      </section>
      <br/>
      <section>
        <h2>In progress...</h2>
      </section>

      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large, fullWidth }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
            fullWidth={fullWidth}
          />
        ))}
      </div>

      </div>
    )
}

const features = [{
    title: "...",
    description:
      "Words, words, words",
    demo: <img alt="profile photo" src="/profile.jpg" width={100} height={100}></img>,
    large: false,
    fullWidth: true,
},]