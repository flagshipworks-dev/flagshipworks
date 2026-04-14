import { MetadataRoute } from "next";
import { getAllLogs, getAllWorks } from "@/lib/content";

const BASE_URL = "https://flagshipworks.co.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const logs = getAllLogs();
  const works = getAllWorks();

  const logEntries: MetadataRoute.Sitemap = logs.map((log) => ({
    url: `${BASE_URL}/log/${log.slug}`,
    lastModified: new Date(log.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const worksEntries: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${BASE_URL}/works/${work.slug}`,
    lastModified: new Date(work.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/service/medical-web`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/log`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...logEntries,
    {
      url: `${BASE_URL}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...worksEntries,
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
