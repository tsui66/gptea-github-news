import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
// @ts-ignore

export const defaultPromptId = 'clh8h50va002wtvbjmjt5bxyz';

export const plainPromptTemplate = `To better recommend newsletters to developers or startups, please use natural language processing technology to provide a precise summary of the article and give it a score. The maximum score is 100 points.`

export const plainPromptTemplateComplete = `To better recommend newsletters to developers or startups, please use natural language processing technology to provide a precise summary of the context: {text} and give it a score. The maximum score is 100 points.
Your response should be in JSON format string with two parameters 'summarization' and 'score', Not required to return any explanation about the analysis process. Only JSON string`

// TODO
export const summarizationPromptTemplate =  ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate(`To better recommend newsletters to developers or startups, please use natural language processing technology to provide a precise summary of the context: {text} and give it a score. The score is an integer and ranges from 0 to 100 points.
  Your response should be in JSON format string with two parameters 'summarization' and 'score', Not required to return any explanation about the analysis process. Only JSON format string`),
]);
