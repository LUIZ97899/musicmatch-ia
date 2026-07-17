import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  try {
    const { artistas } = req.body;

    const resposta = await client.responses.create({
      model: "gpt-5.5",
      input: `Recomende 15 artistas parecidos com ${artistas}. Explique cada recomendação em uma frase.`
    });

    res.status(200).json({
      resposta: resposta.output_text
    });
  } catch (e) {
    res.status(500).json({
      erro: e.message
    });
  }
}
