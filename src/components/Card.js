import { Flex, Box, Heading } from "@chakra-ui/react";

export default function Card(props) {
  const { publication } = props;

  return (
    <Flex rounded={"lg"} boxShadow={"xl"} p={8} mb={8}>
      <Box spacing={4}>
        <Heading>{publication.title}</Heading>
      </Box>
    </Flex>
  );
}
