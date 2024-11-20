# **Chat-Bot App**

Este é um aplicativo de chatbot interativo desenvolvido com **React** no frontend e **Fastify** no backend. O projeto utiliza a API de chat da OpenAI para fornecer respostas automatizadas às perguntas dos usuários.

![image](https://github.com/user-attachments/assets/c552f4f5-5aeb-4c1b-9f2f-2c72034a4e26)


---

## **Índice**

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instruções](#instruções)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## **Recursos**

- Chat interativo com bot.
- Persistência das mensagens utilizando `localStorage`.
- Suporte para integração com a API da OpenAI.
- Interface moderna e responsiva.
- Animações suaves.
- Histórico de mensagens salvo e carregado automaticamente.
- Função para limpar a conversa.

---

## **Tecnologias Utilizadas**

- **Frontend**:
  - React com Vite
  - TypeScript
  - shadcn/ui
  - TailwindCSS
- **Backend**:
  - Fastify
  - TypeScript
  - Axios
- **Outras ferramentas**:
  - OpenAI API
  - LocalStorage

---

## **Como Rodar o Projeto**

### **Pré-requisitos**

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma chave de API da OpenAI.

### **Instruções**

#### **1. Clone o repositório**

```bash
git clone https://github.com/micaelmi/chat-gpt-api-bot.git
```

#### **2. Instale as dependências na pasta web e na api**

```bash
cd chat-bot-api
npm install
cd ..
cd chat-bot-web
npm install
```

#### **3. Configure as variáveis de ambiente do backend**

Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API da OpenAI:

```
OPENAI_API_KEY=your_openai_api_key
```

#### **4. Inicie o backend**

Entre no diretório do backend e rode o servidor:

```bash
cd chat-bot-api
npm run dev
```

#### **5. Inicie o frontend**

Entre no diretório do frontend e rode a aplicação:

```bash
cd chat-bot-web
npm run build
npm start
```

#### **6. Acesse o projeto**

Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## **Funcionalidades**

1. **Enviar perguntas**: Usuários podem digitar uma pergunta e receber respostas do bot.
2. **Persistência de mensagens**: O histórico de mensagens é salvo automaticamente no navegador.
3. **Limpar conversa**: Botão para limpar todo o histórico.

---

## **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch com sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit das alterações:
   ```bash
   git commit -m "Adicionei uma nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## **Licença**

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

Pronto! 🚀 Caso precise de mais detalhes ou ajustes, é só avisar.
