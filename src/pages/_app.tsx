import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
// import { MDXProvider } from '@mdx-js/react'
import { Toaster } from '@/components/ui/Toaster';

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GPTea News</title>
        <meta
          name="description"
          content="Get AI newsletter recommendations tailored to developers and startups using ChatGPT prompt."
        />
      </Head>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {/* <MDXProvider components={mdxComponents}> */}
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        {/* </MDXProvider> */}
      </ThemeProvider>
      <Analytics />
    </>
  )
}
