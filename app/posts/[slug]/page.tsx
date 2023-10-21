import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../components/posts/getPostMetadata";

const getPostContent = (slug: string) => {
  const folder = "posts/";
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

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div>
        <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <section>
        <h1 className="text-2xl">{post.data.title}</h1>
        <p className="mt-2">{post.data.date}</p>
        <Markdown>{post.content}</Markdown>
      </section>
      </div>
    </div>
  );
};

export default PostPage;