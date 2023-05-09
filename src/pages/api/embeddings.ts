// import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { addModels } from 'src/lib/makevector'

const embedding = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {dataset} = req.body
    // console.log(dataset)
    const models = await addModels(dataset)
    console.log(models, 'models........')

  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default embedding

