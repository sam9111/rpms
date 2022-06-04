import { supabase } from "../supabaseClient";
import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Search(props) {
  const { attribute, setPublications } = props;

  const [query, setQuery] = useState("");
  async function handleSearch() {
    var finalData = [];

    const results = await supabase
      .from("publications")
      .select()
      .textSearch(attribute, query);

    finalData = results.data;

    for (var i = 0; i < finalData.length; i += 1) {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(finalData[i].issn);
      finalData[i].url = publicURL;
    }
    setPublications(finalData);
  }

  return (
    <Box>
      <Input width="25%" my={4} onChange={(e) => setQuery(e.target.value)} />
      <Button mx={2} onClick={handleSearch}>
        <Search2Icon />
      </Button>
    </Box>
  );
}
