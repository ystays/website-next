import Card from "@/components/home/card";
import { LINKEDIN_URL, GITHUB_URL } from "@/lib/constants";
import { Github, Linkedin } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="z-10 mx-auto w-full max-w-xl px-5 xl:px-0 h-[calc(100vh-170px)] flex flex-col items-center justify-center">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Hello.
        </h1>
        <h2 className="text-3xl text-center">A closer look offers a kinder view.</h2>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Tay&apos;s personal website, portfolio and blog
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
            <p>LinkedIn</p>
          </a>
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>Github</p>
          </a>
        </div>
      </div>
      <section>
      <div className="my-10 grid w-full max-w-screen-lg animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, fullWidth }) => (
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
            fullWidth={fullWidth}
          />
        ))}
      </div>
      </section>
    </>
  );
}

const features = [
  {
    title: "Beautiful, reusable words",
    description:
      "Blog",
    demo: (
      <div className="flex items-center justify-center text-center font-mono font-semibold m-4">
        <Link href="/blog" className="transition duration-300 hover:text-blue-500">
        <p>
          When my talk is over, your listening is over. <br/>There is no need to remember what I say; there is no need to understand what I say. <br/>You understand; you have full understanding within yourself. <br/>There is no problem. <br/> - Shunryū Suzuki
        </p>
        </Link>
      </div>
    ),
    fullWidth: true,
  },
  // {
  //   title: "Less, even less, and more",
  //   description:
  //     "A collection of lists",
  //   demo: (
  //     <a href="/gallery" className="transition duration-300 hover:text-blue-500">
  //       <div className="grid grid-flow-col grid-rows-2 gap-20 p-10">
  //         <span className="font-mono font-semibold">the</span>
  //         <span className="font-mono font-semibold">is</span>
  //         <span className="font-mono font-semibold">medium</span>
  //         <span className="font-mono font-semibold">the</span>
  //         <span className="font-mono font-semibold">really</span>
  //         <span className="font-mono font-semibold">message</span>
  //       </div>
  //     </a>
  //   ),
  //   large: true,
  // },
  {
    title: "Lies!",
    description:
      "Playground",
    demo: (
      <Link href="/playground" className="transition duration-300 hover:text-blue-500">
        <div className="flex items-center justify-center text-center font-mono font-semibold m-4">
          <p>
            &quot;Don&apos;t be a fool! Close this page at once! It is nothing but <i>foma*</i>!&quot;
            <br/>
            <br/>
            <br/>
            <small>*harmless untruths</small>
          </p>
        </div>
      </Link>
    ),
    fullWidth: true,
  },
];
