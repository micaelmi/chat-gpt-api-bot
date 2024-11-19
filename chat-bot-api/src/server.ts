import fastify from "fastify";
import axios from "axios";
import { z } from "zod";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

const app = fastify();

app.register(cors, {
  origin: "*",
});

// Validação do corpo da requisição usando Zod
const chatSchema = z.object({
  message: z.string().nonempty("A mensagem é obrigatória."),
});

// Interface para o corpo da requisição
interface ChatRequest {
  message: string;
}

// Função para se comunicar com a API da OpenAI
async function chatWithGPT(
  messages: { role: string; content: string }[]
): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error(
      "Erro ao se comunicar com a API:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao obter resposta do chatbot.");
  }
}

// Rota para o chatbot
app.post<{ Body: ChatRequest }>("/chat", async (request, reply) => {
  // Validação do corpo da requisição
  const parseResult = chatSchema.safeParse(request.body);

  if (!parseResult.success) {
    return reply
      .status(400)
      .send({ error: parseResult.error.errors[0].message });
  }

  const { message } = parseResult.data;

  const messages = [
    {
      role: "system",
      content:
        "Você é um tigre muito divertido que sabe tudo sobre a vida na selva.",
    },
    { role: "user", content: message },
  ];

  try {
    const gptResponse = await chatWithGPT(messages);
    return { response: gptResponse };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro capturado:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
  }
});

// Inicie o servidor
app.listen({ port: 5000 }).then(() => {
  console.log("Server flying! 🚀");
});
