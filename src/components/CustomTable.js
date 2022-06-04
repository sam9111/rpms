import React from "react";
import {
  ButtonGroup,
  Tag,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { DeleteIconButton, UpdateIconButton } from "./EditForm";

export function CustomTable(props) {
  const publications = props.publications;
  const header = [
    "ISSN",
    "title",
    "author",
    "domains",
    "published date",
    "pages",
    "description",
    "actions",
  ];

  return (
    <Box w="full" rounded={"lg"} boxShadow={"xl"} p={8} my={8}>
      <Table
        w="full"
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {publications.map((pub, id) => {
            return (
              <Tr
                key={id}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
                fontSize="md"
              >
                <Td>{pub.issn}</Td>
                <Td>{pub.title}</Td>
                <Td>{pub.author}</Td>
                <Td>
                  {pub.domains == null ? (
                    <div></div>
                  ) : (
                    pub.domains.map((dom) => <Tag>{dom}</Tag>)
                  )}
                </Td>
                <Td>{pub.date}</Td>
                <Td>{pub.pages}</Td>
                <Td>{pub.content}</Td>

                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <a href={pub.url} target="_blank" rel="noreferrer">
                      <IconButton
                        colorScheme="blue"
                        icon={<BsBoxArrowUpRight />}
                      />
                    </a>
                    <UpdateIconButton publication={pub} />
                    <DeleteIconButton publication={pub} />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
