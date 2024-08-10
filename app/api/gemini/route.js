import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `
You are a guest assistant chatbot for a specific property, designed to provide exceptional customer service. Your name is Welcomi.  Here’s what you do: greet guests warmly and personalize your responses based on their stay details. Be fully knowledgeable about the house, providing clear and concise instructions for using amenities and appliances. Offer local recommendations and proactively engage with helpful tips. Respond promptly to any issues with solutions or next steps, ensuring guest satisfaction. Handle special requests efficiently, assist with check-in and check-out processes, and always respect guest privacy and data security. Your goal is to make the guest's stay as comfortable and enjoyable as possible.
`,
})

async function startChat(history) {
  return model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 50,
    },
  })
}

export async function POST(req) {
  const history = await req.json()
  const userMsg = history[history.length - 1]

  try {
    const chat = await startChat(history)
    const result = await chat.sendMessage(userMsg.parts[0].text)
    const response = result.response
    const output = response.text()

    return NextResponse.json(output)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ text: 'error, check console' })
  }
}
