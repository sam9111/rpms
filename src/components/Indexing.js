
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

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

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure
} from "@chakra-ui/react";

import Filter from "../components/Filter";
import Search from "../components/Search";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Sort from "../components/Sort";
import { useEffect, useState } from "react";

export default function Indexing(props) {

  const { isOpen,onClose, setPublications,publications} =props;
  const [yearFrom, setyearFrom] = useState(0);
  const [yearTo, setyearTo] = useState(0);
    const [impact,setImpact] = useState([0,0]);
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            <Text fontWeight="bold" fontSize="xl">
              Indexing
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text fontWeight="bold">Title Search</Text>
              <Search attribute="title" setPublications={setPublications} />
              <Text fontWeight="bold">Author Search</Text>
              <Search attribute="author" setPublications={setPublications} />
              <Text fontWeight="bold">Keywords Search</Text>
              <Search attribute="content" setPublications={setPublications} />
              <Text fontWeight="bold">Filter by domains</Text>
              <Filter
                setPublications={setPublications}
                publications={publications}
              />
              <Text fontWeight="bold">Filter by Year Range</Text>
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

              <Text fontWeight="bold">Filter by Impact Factor</Text>
              <Box width="50%">
                <RangeSlider
                  step={1}
                  min={0}
                  max={100}
                  defaultValue={[0, 0]}
                  onChangeEnd={(val) => setImpact(val)}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Flex width="35%" gap={4} my={4} align="center">
                  <Text color="gray">
                    Selected IF: {impact[0]} to {impact[1]}
                  </Text>
                  <Button p={4} onClick={(_) => setPublications(
                      publications.filter((pub) => {
                        return pub.impact_factor >= impact[0] && pub.impact_factor <= impact[1];
                      }))}>
                    Filter
                  </Button>
                </Flex>
              </Box>
              <Text fontWeight="bold">Sorting by Date</Text>
              <Sort
                setPublications={setPublications}
                publications={publications}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
}
