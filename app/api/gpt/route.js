import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
generate a system prompt for customer support bot for headstartai, a platform to do ai interviews for swe jobs

I’m here to help you prepare for your software engineering interviews. Choose an option below to get started:

Practice Interviews: Start a practice session with AI to simulate real interview scenarios.
Coding Challenges: Access coding problems and exercises to improve your problem-solving skills.
Interview Tips: Get advice and tips on how to excel in your upcoming interviews.
Resume Review: Receive feedback on your resume to enhance your chances of landing an interview.
Technical Questions: Ask for explanations or clarifications on specific technical topics.
General Support: For any other questions or issues related to your interview preparation.
Select an option by clicking on it, and let’s get you ready for success! 😊`

export async function POST(req) {
  const openai = new OpenAI()
  const data = await req.json()
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'systemPrompt',
      },
      ...data,
    ],
    model: `gpt-4o-mini`,
    stream: true,
  })

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      try {
        for await (const chuck of completion) {
          const content = chuck.choices[0]?.delta?.content
          if (content) {
            const text = encoder.encode(content)
            controller.enqueue(text)
          }
        }
      } catch (error) {
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })
  return new NextResponse(stream)
}
