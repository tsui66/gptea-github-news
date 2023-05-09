export type Crawl = {
  loadedUrl: string;
  loadedTime: string;
  referrerUrl: string;
  depth: number;
}
  
export type Metadata = {
  canonicalUrl: string;
  title: string;
  description: string;
  author: string | null;
  keywords: string[] | null;
  languageCode: string;
}

export type News = {
  url: string;
  crawl: Crawl;
  metadata: Metadata;
  screenshotUrl: string | null;
  text: string;
  html: string | null;
  markdown: string | null;
}