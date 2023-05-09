import { PrismaClient } from '@prisma/client'

import { plainPromptTemplate, defaultPromptId } from 'src/lib/makeprompt';

const prisma = new PrismaClient()

async function seed() {
  await prisma.prompt.upsert({
    where: {
      id: defaultPromptId
    },
    update: {
      template: plainPromptTemplate
    },
    create: {
      id: defaultPromptId,
      name: 'default',
      template: plainPromptTemplate
    }
  });
}

seed()
  .catch((err: unknown) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })