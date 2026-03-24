#!/usr/bin/env node
// Generates minimal HTML files from markdown posts so pagefind can index them.
// Output mirrors the Next.js URL structure: /posts/[slug]/index.html
// Run via postbuild: node scripts/index-posts.js && pagefind --site .pagefind-tmp ...

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(process.cwd(), "posts");
const OUT_DIR = path.join(process.cwd(), ".pagefind-tmp");

// Clean output dir
if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true });
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

for (const file of files) {
    const slug = file.replace(".md", "");
    const { data, content } = matter(
        fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
    );

    const title = data.title || slug;
    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${title}</title></head>
<body>
  <article data-pagefind-body>
    <h1 data-pagefind-meta="title">${title}</h1>
    ${data.subtitle ? `<p>${data.subtitle}</p>` : ""}
    ${data.date ? `<p data-pagefind-meta="date">${data.date}</p>` : ""}
    <div>${content}</div>
  </article>
</body>
</html>`;

    const dir = path.join(OUT_DIR, "posts", slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
}

console.log(`pagefind: indexed ${files.length} posts`);
