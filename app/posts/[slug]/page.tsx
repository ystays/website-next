import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../components/posts/getPostMetadata";
import path from "path";

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

const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const post = await getPostContent(slug);
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1 className="text-4xl">{post.data.title}</h1>
      <p>{post.data.subtitle}</p>
      <p className="mt-2 text-xs">By: {post.data.author}</p>
      <p className="mt-2 text-right">{post.data.date}</p>
      <Markdown className="prose">{post.content}</Markdown>
    </div>
  );
};

export default PostPage;