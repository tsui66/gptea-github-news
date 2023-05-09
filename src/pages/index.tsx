import { SparkleIcon } from 'src/components/SparkleIcon'
import { article } from 'src/components/mdx'
import { Children, useEffect } from 'react'
import Link from 'next/link'
import { prisma } from 'src/lib/prisma'
import { Newsletter, Document } from '@prisma/client'
import useNewsletter from 'src/lib/hooks/use-newsletters'

export const getServerSideProps = async () => {
  let newsletters = await prisma.newsletter.findMany({
    include: {
      document: true,
    },
    take: 50,
    orderBy: {
      createdAt: 'desc'
    }
  })
  const newsletterGroup = newsletters.reduce((result, newsletter) => {
    (result[newsletter.publishedAt] || (result[newsletter.publishedAt] = [])).push(newsletter);
    return result;
  }, {} as Record<string, (Newsletter & {
    document: Document;
  })[]>);
  
  return { props: { keys: Object.keys(newsletterGroup), newsletterGroup: JSON.parse(JSON.stringify(newsletterGroup)) } }
}

export default function Index({ keys, newsletterGroup }: { keys: string[], newsletterGroup: Record<string, (Newsletter & {
  document: Document;
})[]>}) {
  return keys.map((key) => article({
    id: key,
    date: new Date(key),
    title: 'title',
    children:
      <div key={key}>
        {newsletterGroup[key].map(newsletter => (
          <article key={newsletter.documentId} className="prose lg:prose-xl mt-4">
            <h1 className='text-lg font-bold'>{(newsletter.document.meta as { title: string }).title}</h1>
            <div>
              {newsletter.summary}
              <Link href={(newsletter.document.meta as { canonicalUrl: string }).canonicalUrl} target="_blank" className="ml-2 text-sm font-semibold leading-6 text-indigo-600">
                Read post <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>))}
      </div>
  }))
}
