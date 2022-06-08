import { useReactToPrint } from "react-to-print";
import {
  ButtonGroup,
  Tag,
  IconButton,
  Table,
  HStack,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
const header = [
  "ISSN",
  "title",
  "author",
  "domains",
  "published date",
  "pages",
  "description",
];

export const Report = React.forwardRef((props, ref) => {
  const { publications } = props;
  return (
    <div ref={ref}>
      <Box my={8}>
        <Text fontWeight="bold" fontSize="xl">
          Metrics
        </Text>
        <HStack p={4}>
          <BarChart publications={publications} />
          <PieChart publications={publications} />
        </HStack>
      </Box>
      <Box my={8}>
        <Text fontWeight="bold" fontSize="xl">
          Indexed Publications
        </Text>
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
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
});
