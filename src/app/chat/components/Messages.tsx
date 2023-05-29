"use client";

import { FC, useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "../../common/components";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => elementRef.current?.scrollIntoView?.());
  return <div ref={elementRef} />;
};

type Props = {
  messages: { from: string; text: string }[];
};
export const Messages: FC<Props> = ({ messages }) => {
  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAst5SI5hxUDViKkQ3d0noEP9hlcy2yYlmBA&usqp=CAU"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};
