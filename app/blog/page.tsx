

import getPostMetadata from "../../components/posts/getPostMetadata";
import PostPreview from "../../components/posts/PostPreview";
import FilterPopover from "@/components/blog/filter-popover";

export default function Blog() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs text-balance md:text-7xl md:leading-20"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Blog
      </h1>
      <br />
      <div className="flex justify-end"><FilterPopover currentTag={"Tags"}></FilterPopover></div>
      <div
        className="my-10 grid w-full max-w-(--breakpoint-lg) animate-fade-up grid-cols-1 gap-5 px-5 lg:grid-cols-2 xl:px-0 place-items-center"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        {postPreviews}
      </div>
    </div>
  )
}