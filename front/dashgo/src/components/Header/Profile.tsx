import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Alanderson Tomaiz</Text>
        <Text color="gray.300">alan_tomaiz@hotmail.com</Text>
      </Box>

      <Avatar
        size="md"
        name="Alanderson Tomaiz"
        src="https://avatars.githubusercontent.com/u/26505634?v=4"
      />
    </Flex>
  )
}