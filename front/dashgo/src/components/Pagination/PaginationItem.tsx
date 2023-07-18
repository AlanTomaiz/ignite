import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number | string;
  isCurent?: boolean;
}

export function PaginationItem({ number, isCurent }: PaginationItemProps) {
  return isCurent
    ? (
      <Button
        w="4"
        size="sm"
        fontSize="xs"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    ) : (
      <Button
        w="4"
        size="sm"
        fontSize="xs"
        bg="gray.700"
        _hover={{ bg: 'gray.500' }}
      >
        {number}
      </Button>
    )
}