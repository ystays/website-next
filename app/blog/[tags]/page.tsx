import Card from "@/components/home/card"
import ComponentGrid from "@/components/home/component-grid"
import WebVitals from "@/components/home/web-vitals"
// import Image from "next/image"
import Image from "@/components/home/image-card"

import getPostMetadata from "../../../components/posts/getPostMetadata";
import PostPreview from "../../../components/posts/PostPreview";
import FilterPopover from "@/components/blog/filter-popover";

export default async function Blog({ params }: { params: { tags: string } }) {
    const postMetadata = getPostMetadata();
    const postPreviews = postMetadata.filter((post) => {return post.tags === params.tags}).map((post) => (
      <PostPreview key={post.slug} {...post} />
    ));

    return(
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Blog
        </h1>
        <br/>
        <div className="flex justify-end"><FilterPopover currentTag={ params.tags }></FilterPopover></div>
        <div>
        {/* <div className="z-10 w-full max-w-xl px-5 xl:px-0 sm:max-w-fit"> */}
          {/* <div
              className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} 
              >*/}
      <div className="my-10 grid w-full max-w-screen-lg animate-fade-up grid-cols-1 gap-5 px-5 lg:grid-cols-2 xl:px-0 place-items-center">
            {postPreviews}
          </div>
        </div>
      </div>
    )
}