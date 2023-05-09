import { OpenAI } from 'langchain/llms/openai';
import { LLMChain } from 'langchain/chains';
import { summarizationPromptTemplate } from 'src/lib/makeprompt';

export const makeChain = async (text: string) => {
  const model = new OpenAI({
    temperature: 1, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    openAIApiKey: process.env.OPENAI_API_KEY
  }, {
    basePath: `${process.env.OPENAI_API_HOST}/v1`
  });
  console.log(summarizationPromptTemplate)
  const chain = new LLMChain({ llm: model, prompt: summarizationPromptTemplate });
  const res = await chain.call({ text })
  
  return res;
};