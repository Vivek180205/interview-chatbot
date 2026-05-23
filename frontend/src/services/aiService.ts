export async function evaluateAnswer(
  category: string,
  question: string,
  answer: string
) {

  const response = await fetch(
    `http://localhost:8080/ai/test?category=${encodeURIComponent(category)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question,
        answer,
      }),
    }
  );

  return response.text();
}

export function parseAIResponse(text: string) {

    const scoreMatch = text.match(/Score:\s*(\d+)(?:\/10)?/i);
    const feedbackMatch = text.match(/Feedback:\s*([\s\S]*)/i);

    return {
        score: scoreMatch ? Number(scoreMatch[1]) : null,
        feedback: feedbackMatch
            ? feedbackMatch[1].trim()
            : text
    };
}