// import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true,
})

const getPrompt = (pageData: object, userRequest?: string) => {
  let prompt = 'You are an expert in child psychology, development, learning, and pedagogy. \
  You are working as a curriculum designer for a high school science class.\n';

  prompt += 'I will tell you the information about a unit, including the standards that must \
  be met and you will respond with ideas for projects they could do to demonstrate their \
  learning at the end of the unit.\n';

  prompt += 'Your project must always cover the content of the project\'s standards or I will \
  be very sad. The project should be significant enough that it takes a high school student \
  at least 12 hours of work to complete.\n';

  prompt += 'When possible, the project ideas should include unique depth like finding & working \
  with a community partner, creating or doing something for the community, working with the local\
  museum, or other meaningful aspects like those.\n';

  prompt += 'It is imperative that your project ideas always push students toward learning \
  established, well-supported scientific ideas and never promote misinformation or pseudo-science.\n';

  prompt += 'Here is the information I have about the project:\n';
  prompt += JSON.stringify(pageData) + '\n\n';

  if (userRequest) {
    prompt += 'As much as possible without sacrificing academic rigor or the project\'s relation \
    to the standards, you should relate the project to this topic:\n';

    prompt += userRequest + '\n';
  }

  prompt += 'Respond exclusively in a JSON list with 3-5 items formatted like: ["idea", "idea 2", "idea 3"]\n';
  prompt += 'Each idea is a single, short sentence communicating what the end product would be.\n';
  prompt += 'Do not include backticks (`) around your response. And ensure you do NOT include a comma after the\
  last item in the array.';

  return prompt;
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    throw new Error("Must post to /api/ai/generate-ideas");
  }

  try {
    const input = await req.json();

    const prompt = getPrompt(input.project_data, input.user_request);
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    const responseMessage = response.choices[0].message.content;
    return NextResponse.json({ output: responseMessage }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
