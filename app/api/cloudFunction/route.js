import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'Prompt is required in the body' }),
        { status: 400 }
      );
    }

    const response = await axios.post(
      'https://us-central1-customerserviceapp-432018.cloudfunctions.net/function-1',
      { prompt }
    );
    const data = JSON.stringify(response.data)
    return new Response(data, { status: 200 });
  } catch (error) {
    console.error('Error calling cloud function:', error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        message: 'Error calling cloud function',
        error: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}
