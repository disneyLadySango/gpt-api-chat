"use client";

import { ReactNode, FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};
export const Provider: FC<Props> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
