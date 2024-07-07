// import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
  project: process.env.NEXT_PUBLIC_OPENAI_PROJECT,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true,
})

const getPrompt = (pageData: object, userRequest?: string) => {
  let prompt = 'You are an expert in child psychology, development, learning, and pedagogy. \
  You are working as a curriculum designer for a high school science class.\n';

  prompt += 'I will tell you the information about a unit, including the standards that must \
  be met and you will respond with student-facing instructions for a project they could do \
  to demonstrate their learning at the end of the unit.\n';

  prompt += 'Your project must always cover the content of the project\'s standards or I will \
  be very sad. You must also never refence videos, articles, or other materials unless they are \
  included in the information I tell you about the project.\n';

  prompt += 'Here is the information I have about the project:\n';
  prompt += JSON.stringify(pageData) + '\n\n';

  if (userRequest) {
    prompt += 'As much as possible without sacrificing academic rigor or the project\'s relation \
    to the standards, you should try to meet this student\'s request:\n'
    
    prompt += userRequest + '\n'
  }

  prompt += 'Respond in markdown formatting, optionally using headings (starting at heading 3, `### `) to \
  create sections in the instructions, and lay out student-friendly instructions, using to-do items (lines starting with \
  `- [ ] `) to give a simple step-by-step guide a high school student can follow to complete \
  the project. Respond with only headers and to-do items. Do not include any project titles or overviews. \
  If you choose to include headers, only use them for sections of the to-do items, not as a title for the \
  project or introduction to the instructions.'

  return prompt
}

export default async function POST(req:Request) {
  if (req.method !== 'POST') {
    throw new Error("Must post to /api/ai/generate-project")
  }

  const input = await req.json();

  const prompt = getPrompt(input.project_data, input.user_request);
  const response = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
  });

  const responseMessage = response.choices[0].message.content
  return NextResponse.json({ output: responseMessage }, { status: 200 });

}
