import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Prisma, Document } from "@prisma/client";
import { prisma } from "./prisma";
// @ts-ignore
import { News } from 'src/types/news.type';
import { get_encoding } from "@dqbd/tiktoken";

export const vectorStore = PrismaVectorStore.withModel<Document>(prisma).create(
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  }, {
    basePath: `${process.env.OPENAI_API_HOST}/v1`
  }),
  {
    prisma: Prisma,
    // @ts-ignore
    tableName: "document",
    vectorColumnName: "embedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  }
);

export const addModels = async (docs: News[]) => {
  const encoding = get_encoding("cl100k_base");
  await vectorStore.addModels(
    await prisma.$transaction(
      docs.map((content) => {
        let text = content.text
        const tokens = encoding.encode(text)
        // check tokens length
        // embedding maximum context length 8191 tokens, but gpt-3.5 is 4097 tokens
        // TODO: switch to gpt-4
        if (tokens.length > 8191) {
          // {
          //   error: {
          //     message: "This model's maximum context length is 4097 tokens. However, your messages resulted in 8480 tokens. Please reduce the length of the messages.",
          //     type: 'invalid_request_error',
          //     param: 'messages',
          //     code: 'context_length_exceeded'
          //   }
          // }
          text = new TextDecoder().decode(encoding.decode(tokens.slice(0, 3000)))
        }
        return prisma.document.upsert({
          where: { path: content.url },
          update: {
            tokenCount: tokens.length,
            content: text,
          },
          create: { 
            path: content.url,
            meta: content.metadata || {},
            content: text,
            tokenCount: tokens.length,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      })  
    )
  );
  encoding.free();
}

export const similaritySearch = async (text: string, limit = 10) => {
  return await vectorStore.similaritySearch(text, limit);
}