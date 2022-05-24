// import { Container, ListGroup, Card, Button, Badge, ButtonGroup } from 'react-bootstrap';

// function CustomCard(props) {
//     console.log(props.pub);
//     if (props.pub.domains == null) {
//         var badges = <div></div>;
//     }
//     else {
//         badges = props.pub.domains.map((field) =>
//             <Badge style={{ margin: '5px' }}>#{field}</Badge>
//         );
//     }

//     const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     if (props.pub.date == null) {
//         var date = "";
//     }
//     else {
//         var parsedDate = new Date(props.pub.date);
//         date = "Published on " + parsedDate.getDate() + " " + month[parsedDate.getMonth()] + " " + parsedDate.getFullYear();
//     }

//     return (
//         <Card style={{ marginBottom: '15px' }}>
//             <Card.Header>
//                 {badges}
//             </Card.Header>
//             <Card.Body>
//                 <Card.Title>{props.pub.title}</Card.Title>
//                 <Card.Text>
//                     {props.pub.content}
//                 </Card.Text>
//                 <ButtonGroup aria-label="Basic example" style={{ float: 'right' }}>
//                     <a href={props.pub.url} target="_blank" rel="noopener noreferrer"><Button variant="secondary" style={{ marginRight: '2px' }}>View</Button></a>
//                     <Button variant="secondary">Options</Button>
//                 </ButtonGroup>
//             </Card.Body>
//             <Card.Footer className="text-muted">{date}</Card.Footer>
//         </Card>
//     );
// }

// export function CustomCardList(props) {
//     console.log(props.publications);
//     var cards = props.publications.map((publication) =>
//         <ListGroup.Item key={publication.issn}>
//             <CustomCard pub={publication} />
//         </ListGroup.Item>
//     );
//     return (
//         <Container style={{ marginTop: '30px', marginBottom: '30px', border: '2px solid 	#F5F5F5', borderRadius: '10px', padding: '10px' }}>
//             <h3 className='text-center' style={{ marginBottom: '10px' }}>Your Publications</h3>
//             <ListGroup>
//                 {cards}
//             </ListGroup>
//         </Container>
//     );
// }

import React from "react";
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  Tag,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Heading,
  Tbody,
  Box,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

export function CustomCardList(props) {
  const { publications } = props;
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
  const data = [
    { name: "Daggy", created: "7 days ago" },
    { name: "Anubra", created: "23 hours ago" },
    { name: "Josef", created: "A few seconds ago" },
    { name: "Sage", created: "A few hours ago" },
  ];

  return (
    <Box w="full" rounded={"lg"} boxShadow={"xl"} p={8} my={8}>
      <h1
        style={{
          paddingBottom: "20px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Your Publications
      </h1>
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
                  {pub.domains.map((dom) => (
                    <Tag>{dom}</Tag>
                  ))}
                </Td>
                <Td>{pub.date}</Td>
                <Td>{pub.pages}</Td>
                <Td>{pub.content}</Td>

                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                    />
                    <IconButton colorScheme="green" icon={<AiFillEdit />} />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
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
