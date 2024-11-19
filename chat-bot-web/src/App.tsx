import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import axios from "axios";
import { Send } from "lucide-react";

interface Messages {
  message: string;
  type: "question" | "answer";
}

function App() {
  const [number, setNumber] = useState(1);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

  async function sendQuestion() {
    const response = await axios.post(`http://localhost:5000/chat`, {
      message: question,
    });
    setMessages([
      ...messages,
      { message: question, type: "question" },
      { message: response.data.response, type: "answer" },
    ]);
    setQuestion("");
  }

  useEffect(() => {
    setNumber(random());
  }, [messages]);
  const tiger = `/tiger-${number}.png`;

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 w-full h-screen">
      <img src={tiger} alt="Tigre Gênio" className="max-w-40" />
      <h1 className="text-4xl text-center">Aprenda sobre a vida na selva</h1>
      <div className="flex flex-col gap-2 p-2 border rounded-lg w-full max-w-[450px] h-[50%] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 p-2 font-semibold ${
              message.type === "question"
                ? "border-secondary bg-stone-800"
                : "border-primary bg-primary text-white"
            }/20 border rounded-xl`}
          >
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full max-w-[450px]">
        <Textarea
          placeholder="Digite aqui sua pergunta"
          className="flex-1 border-primary resize-none"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <Button
          onClick={sendQuestion}
          disabled={question.length < 1}
          className="h-full aspect-square"
          title="Enviar"
        >
          <Send size={48} />
        </Button>
      </div>
      {/* <div className="flex flex-col justify-center gap-4 h-screen">
        <h2 className="text-3xl">Resposta</h2>
        <div className="border-primary bg-stone-900/20 border rounded-xl w-[450px] h-1/2 overflow-y-auto">
          {answer}
        </div>
      </div> */}
    </div>
  );
}

export default App;

function random() {
  return Math.floor(Math.random() * 6) + 1;
}
