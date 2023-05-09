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
        <title>Commit - Open-source Git client for macOS minimalists</title>
        <meta
          name="description"
          content="Commit is a lightweight Git client you can open from anywhere any time you’re ready to commit your work with a single keyboard shortcut. It’s fast, beautiful, and completely unnecessary."
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
