import Card from "@/components/home/card";
import { LINKEDIN_URL, GITHUB_URL } from "@/lib/constants";
import { Github, Twitter, Linkedin } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

import { Flex, Button } from "@radix-ui/themes";

export default async function Home() {
  // const { stargazers_count: stars } = await fetch(
  //   "https://api.github.com/repos/steven-tey/precedent",
  //   {
  //     ...(process.env.GITHUB_OAUTH_TOKEN && {
  //       headers: {
  //         Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     }),
  //     // data will revalidate every 24 hours
  //     next: { revalidate: 86400 },
  //   },
  // )
  //   .then((res) => res.json())
  //   .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        {/* <a
          href="https://github.com/ystays"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Github className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            My Github
          </p>
        </a> */}
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          hi.
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          personal website, portfolio and blog
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
          {/* <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/ystays"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </a> */}
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
    </>
  );
}

const features = [
  {
    title: "Beautiful, reusable words",
    description:
      "Words, words, words",
    fullWidth: true,
  },
  {
    title: "Projects",
    description:
      "Stellar performance.",
    demo: <WebVitals />,
    large: true,
  },
  {
    title: "Resume",
    description:
      "One page. That's it.",
    demo: (
      <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
      <a href="YiShengTay_Resume.pdf">
        {/* <Image
          src="https://vercel.com/button"
          alt="hi"
          width={120}
          height={30}
          unoptimized
        /> */}

      <img className="rounded-lg" src="YiShengTay_Resume.jpg" alt="image of resume" height={240} width={160} />
      </a>
      {/* <figcaption className="absolute px-4 text-lg text-black bottom-6 bg-white min-w-full">
        <p>Resume</p>
      </figcaption> */}
        {/* <Flex align="center" gap="3">
          <Button variant="solid" className="border-black border-2 rounded-2xl py-2 px-4 ">Click here</Button>
        </Flex>
      </a> */}
    </figure>

    ),
  },
  {
    title: "Authentication works",
    description:
      "Don't believe me? Try it.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="ystays.com logo" src="/logo.png" width={150} height={150} />
      </div>
    ),
  },
  {
    title: "Less, even less, and more",
    description:
      "A collection of lists",
    demo: (
      <div className="grid grid-flow-col grid-rows-2 gap-20 p-10">
        <span className="font-mono font-semibold">the</span>
        <span className="font-mono font-semibold">is</span>
        <span className="font-mono font-semibold">medium</span>
        <span className="font-mono font-semibold">the</span>
        <span className="font-mono font-semibold">truly</span>
        <span className="font-mono font-semibold">message</span>
      </div>
    ),
    large: true,
  },
];
