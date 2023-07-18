import { Flex } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { Searchbox } from "./Seachbox";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      maxW="1480px"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />
      <Searchbox />
      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile />
      </Flex>
    </Flex>
  )
}