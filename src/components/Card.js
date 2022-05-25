import { Flex, Box, Heading, Text, Tag, Badge, Stack } from "@chakra-ui/react";

export default function Card(props) {
  const { publication } = props;

  return (
    <Flex
      rounded={"lg"}
      boxShadow={"xl"}
      p={8}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={4}>
        <div>
          {" "}
          <Badge>ISSN: {publication.issn}</Badge>
        </div>
        <Heading size="md">{publication.title}</Heading>
        <Box color="gray">
              <Text>{publication.author}</Text>
        </Box>
        <Text size="xs">{publication.content}</Text>

        <Text color="gray">Published on {publication.date}</Text>
        <Box>
          {publication.domains == null
            ? <div></div>
            : publication.domains.map((domain) => (
              <Tag size="md" variantColor="blue">
                {domain}
              </Tag>
            ))}
        </Box>
      </Stack>
      <Box mx="auto">
        <iframe
          title="pdf"
          src={publication.url}
          width="400px"
          height="400px"
        />
      </Box>
    </Flex>
  );
}
