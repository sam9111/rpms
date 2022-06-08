import {
  Input,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
export default function Sort(props) {
  const { publications, setPublications } = props;
  return (
    <Flex width="35%" gap={4}>
      <Button
        p={4}
        onClick={(_) => {
          setPublications(
            publications.sort((a, b) =>
              new Date(a.date) > new Date(b.date) ? 1 : -1
            )
          );
        }}
      >
        Sort
      </Button>
    </Flex>
  );
}
