import { useEffect, useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import axios from "axios";
import { Ellipsis, Send } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Messages {
  message: string;
  type: "question" | "answer";
}

function App() {
  const [number, setNumber] = useState(1);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Messages[]>(() => {
    // Carregar mensagens do localStorage ao iniciar
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendQuestion(e?: React.FormEvent) {
    if (e) e.preventDefault(); // Evita o reload do formulário
    if (question.trim().length === 0) return; // Não envia mensagens vazias
    setIsLoading(true);
    const response = await axios.post(
      `https://chat-gpt-api-bot.onrender.com/chat`,
      {
        message: question,
      }
    );
    setMessages([
      ...messages,
      { message: question, type: "question" },
      { message: response.data.response, type: "answer" },
    ]);
    setQuestion("");
    setIsLoading(false);
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    setNumber(random());
    scrollToBottom();
  }, [messages]);
  const tiger = `/tiger-${number}.png`;

  function clearConversation() {
    setMessages([]); // Limpa as mensagens no estado
    localStorage.removeItem("chatMessages"); // Remove as mensagens salvas no localStorage
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto p-4 w-full max-w-[550px] h-screen">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="mr-8 -mb-8 p-1 aspect-square self-end"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={clearConversation}>
            Limpar conversa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <img src={tiger} alt="Tigre Gênio" className="max-w-40" />
      <h1 className="font-hanalei text-4xl text-center">
        Aprenda sobre a vida na selva!
      </h1>
      <div className="flex flex-col gap-2 p-2 border rounded-xl w-full max-w-[450px] h-[55%] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 p-2 font-semibold ${
              message.type === "question"
                ? "border-secondary bg-stone-800 ml-8"
                : "border-primary bg-primary text-white mr-8"
            } border rounded-2xl`}
          >
            <p>{message.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendQuestion} className="flex gap-2 w-full max-w-[450px]">
        <Textarea
          placeholder="Digite aqui sua pergunta"
          className="flex-1 border-primary rounded-xl resize-none"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Evita quebra de linha
              sendQuestion();
            }
          }}
        />
        <Button
          type="submit"
          disabled={question.length < 1 || isLoading}
          className="rounded-xl h-full aspect-square"
          title="Enviar"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <Send size={48} />
          )}
        </Button>
      </form>
    </div>
  );
}

export default App;

function random() {
  return Math.floor(Math.random() * 6) + 1;
}
