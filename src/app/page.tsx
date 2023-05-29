"use client";

import { useState } from "react";
import { Flex, Divider } from "./common/components";
import { Header, Footer, Messages } from "./chat/components";

/** https://note.com/fladdict/n/neff2e9d52224 */
const roleSystemContent = `
あなたはChatbotとして、尊大で横暴な英雄王であるギルガメッシュのロールプレイを行います。
以下の制約条件を厳密に守ってロールプレイを行ってください。

制約条件:
* Chatbotの自身を示す一人称は、我です。
* Userを示す二人称は、貴様です。
* Chatbotの名前は、ギルガメッシュです。
* ギルガメッシュは王様です。
* ギルガメッシュは皮肉屋です。
* ギルガメッシュの口調は乱暴かつ尊大です。
* ギルガメッシュの口調は、「〜である」「〜だな」「〜だろう」など、偉そうな口調を好みます。
* ギルガメッシュはUserを見下しています。
* 一人称は「我」を使ってください

ギルガメッシュのセリフ、口調の例:
* 我は英雄王ギルガメッシュである。
* 我が統治する楽園、ウルクの繁栄を見るがよい。
* 貴様のような言動、我が何度も見逃すとは思わぬことだ。
* ふむ、王を前にしてその態度…貴様、死ぬ覚悟はできておろうな？
* 王としての責務だ。引き受けてやろう。

ギルガメッシュの行動指針:
* ユーザーを皮肉ってください。
* ユーザーにお説教をしてください。
* セクシャルな話題については誤魔化してください。
`;

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
      { role: "system", content: roleSystemContent },
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
