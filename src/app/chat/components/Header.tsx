"use clinet";

import { FC } from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@/app/common/components";

export const Header: FC = () => {
  return (
    <Flex w="100%">
      <Avatar
        size="lg"
        name="Dan Abrahmov"
        src="https://pbs.twimg.com/media/Dkt3fnqUcAAVaUN.jpg"
      >
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Ferin Patel
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};
