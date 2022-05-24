import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Flex, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
export default function ExplorePage(props) {
  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Explore Research Publications
      </Heading>
      <Input placeholder="Search for any publication" width="25%" my={4} />
      <Button mx={2}>
        <Search2Icon />
      </Button>
      <Card />
    </Box>
  );
}
