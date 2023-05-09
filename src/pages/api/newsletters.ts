import { prisma } from 'src/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let newsletters = await prisma.newsletter.findMany({
      include: {
        document: true,
      },
      take: 30,
      orderBy: {
        createdAt: "desc",
        score: 'desc'
      }
    })
    res.json(newsletters)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default getArticles
