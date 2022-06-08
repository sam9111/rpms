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
import { Search2Icon } from "@chakra-ui/icons";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { CustomTable } from "../components/CustomTable";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Filter from "../components/Filter";
import Search from "../components/Search";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Sort from "../components/Sort";
export default function AdminPage(props) {
  const [publications, setPublications] = useState([]);
  const [yearFrom, setyearFrom] = useState(0);
  const [yearTo, setyearTo] = useState(0);

  async function getPubs() {
    var response = await supabase.from("publications").select("*");

    response.body.map((pub) => {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(pub.issn);
      pub.url = publicURL;
    });

    console.log("pubs", response.body);
    setPublications(response.body);
  }

  useEffect(() => {
    getPubs();
  }, []);

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Admin Dashboard
      </Heading>
      <Box my={8}>
        <Text fontWeight="bold" fontSize="xl">
          Metrics
        </Text>
        <HStack p={4}>
          <BarChart publications={publications} />
          <PieChart publications={publications} />
        </HStack>
      </Box>
      <Stack spacing={4} py={4}>
        <Text fontWeight="bold" fontSize="xl">
          Indexing
        </Text>
        <Text fontWeight="bold">Title Search</Text>
        <Search attribute="title" setPublications={setPublications} />
        <Text fontWeight="bold">Author Search</Text>
        <Search attribute="author" setPublications={setPublications} />
        <Text fontWeight="bold">Keywords Search</Text>
        <Search attribute="content" setPublications={setPublications} />
        <Text fontWeight="bold">Filter by domains</Text>
        <Filter setPublications={setPublications} publications={publications} />
        <Text fontWeight="bold">Year Range</Text>
        <Flex width="35%" gap={4}>
          From
          <NumberInput
            keepWithinRange
            onChange={(value) => setyearFrom([value])}
            min={2010}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          To
          <NumberInput
            onChange={(value) => {
              setyearTo(value);
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            p={4}
            onClick={(_) =>
              setPublications(
                publications.filter((pub) => {
                  var date = new Date(pub.date);
                  var year = date.getFullYear();
                  return year >= yearFrom && year <= yearTo;
                })
              )
            }
          >
            Filter
          </Button>
        </Flex>
        <Text fontWeight="bold">Sorting by Date</Text>
        <Sort setPublications={setPublications} publications={publications} />
      </Stack>
      <CustomTable publications={publications} />
    </Box>
  );
}
