import fs from "fs";
import path from "path";
import matter from "gray-matter";

const logDir = path.join(process.cwd(), "src/content/log");
const worksDir = path.join(process.cwd(), "src/content/works");

export type LogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

export type WorkPost = {
  slug: string;
  title: string;
  date: string;
  client: string;
  category: string;
  description: string;
  content: string;
};

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getAllLogs(): Omit<LogPost, "content">[] {
  return readDir(logDir)
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(logDir, fileName), "utf8"));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags as string[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLog(slug: string): LogPost {
  const fullPath = path.join(logDir, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getAllWorks(): Omit<WorkPost, "content">[] {
  return readDir(worksDir)
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(worksDir, fileName), "utf8"));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        client: data.client as string,
        category: data.category as string,
        description: data.description as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWork(slug: string): WorkPost {
  const fullPath = path.join(worksDir, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    client: data.client as string,
    category: data.category as string,
    description: data.description as string,
    content,
  };
}
