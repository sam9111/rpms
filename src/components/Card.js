import { Flex, Box, Heading, Text, Tag, Badge, Stack } from "@chakra-ui/react";

export default function Card(props) {
  // const { publication } = props;

  const publication = {
    title: "The Complete Guide to React Hooks",
    issn: "12345",
    authors: ["Adam"],
    domains: ["AI"],
    date: "2013-15-23",
    pages: "14",
    content:
      "The Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React Hooks",
    url: "https://www.google.com",
  };

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
          {publication.authors.map((author) => (
            <Text>{author}</Text>
          ))}
        </Box>
        <Text size="xs">{publication.content}</Text>

        <Text color="gray">Published on {publication.date}</Text>
        <Box>
          {publication.domains.map((domain) => (
            <Tag size="md" variantColor="blue">
              {domain}
            </Tag>
          ))}
        </Box>
      </Stack>
      <Box mx="auto">
        <iframe
          src="https://research.google.com/pubs/archive/44678.pdf"
          width="400px"
          height="400px"
        />
      </Box>
    </Flex>
  );
}
