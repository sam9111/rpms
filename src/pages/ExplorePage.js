import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Flex, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function ExplorePage(props) {

  async function handleSearch() {
    var query = document.getElementById("search").value;
    var finalData = [];

    const contents = await supabase
      .from('books')
      .select()
      .textSearch('content', query)

    finalData = finalData.concat(contents.data);
    
    const titles  = await supabase
    .from('books')
    .select()
    .textSearch('title', query)

    finalData = finalData.concat(titles.data);

    console.log(finalData);
  }

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Explore Research Publications
      </Heading>
      <Input placeholder="Search for any publication" width="25%" my={4} id="search" />
      <Button mx={2} onClick={handleSearch} >
        <Search2Icon />
      </Button>
      <Card />
    </Box>
  );
}
