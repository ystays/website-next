import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../components/posts/getPostMetadata";
import path from "path";
// import { remark } from "remark";
// import html from "remark-html";

const getPostContent = async (slug: string) => {
  const folder = path.join(process.cwd(), 'posts/')
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = async (props: any) => {
  const slug = props.params.slug;
  const post = await getPostContent(slug);
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1 className="text-2xl">{post.data.title}</h1>
      <p className="mt-2">{post.data.date}</p>
      <Markdown className="prose">{post.content}</Markdown>
    </div>
  );
};

export default PostPage;