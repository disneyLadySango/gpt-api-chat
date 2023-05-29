"use client";

import { useState } from "react";
import { Flex, Divider } from "./common/components";
import { Header, Footer, Messages } from "./chat/components";

const Chat = () => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
      { role: "assistant", content: "thinking..." },
    ]);
    const requestMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];
    // ここにデータfetch を追加
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...requestMessages],
      }),
    });
    const responseBody = await res.json();
    const answer = responseBody.choices[0].message.content;
    setMessages((prev) => [
      ...prev.slice(0, prev.length - 1),
      { role: "assistant", content: answer },
    ]);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w="40%" h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
