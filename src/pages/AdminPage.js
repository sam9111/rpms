import {
  Input,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Flex,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { CustomTable } from "../components/CustomTable";
import { Report } from "../components/Report";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Filter from "../components/Filter";
import Search from "../components/Search";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Sort from "../components/Sort";

import Indexing from "../components/Indexing";

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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Admin Dashboard
      </Heading>

      <Box>
        <Button onClick={onOpen}>
          Advanced Search
        </Button>
        <Indexing
          isOpen={isOpen}
          onClose={onClose}
          setPublications={setPublications}
          publications={publications}
        />
        <Button onClick={handlePrint} m={4}>
          Generate Report
        </Button>
      </Box>
      <Text fontWeight="bold" fontSize="xl">
        Metrics
      </Text>
      <div ref={componentRef}>
        <Box my={8}>
          <HStack>
            <BarChart publications={publications} />
            <PieChart publications={publications} />
          </HStack>
          <CustomTable publications={publications} />
        </Box>
      </div>
    </Box>
  );
}
