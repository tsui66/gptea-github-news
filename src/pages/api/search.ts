// import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { similaritySearch } from 'src/lib/makevector'
import { makeChain } from 'src/lib/makechain'
import { defaultPromptId } from 'src/lib/makeprompt'
import { prisma } from "src/lib/prisma";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { text } = req.query
    console.log(text, text)
    const hits = [];
    for (const content of text as string[]) {
      hits.push(...await similaritySearch(content))
    }
    // TODO: Setting the actual publication tim e of an article
    const date = new Date();
    for(const hit of hits) {
      // console.log(hit, 'hithithit')
      // @ts-ignore
      const summarizationRes = await makeChain(hit.pageContent)
      console.log(summarizationRes)

      // TODO ChatGPT is currently not stable enough, and the returned results may not be in JSON format.
      let summarization;
      try {
        summarization = JSON.parse(summarizationRes.text)
        if (Array.isArray(summarization)) {
          summarization = summarization[0]
        }
      } catch (error) {
        if (summarizationRes.text) {
          summarization = {
            summarization: summarizationRes.text,
            score: 5
          }
        }
      }
      await prisma.newsletter.upsert({
        where: {
          promptId_documentId: {
            promptId: defaultPromptId,
            documentId: hit.metadata.id,
          }
        },
        create: {
          promptId: defaultPromptId,
          documentId: hit.metadata.id,
          summary: summarization.summarization,
          score: Math.ceil(summarization.score),
          publishedAt: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        },
        update: {
          summary: summarization.summarization,
          score: Math.ceil(summarization.score),
        }
      })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default search
