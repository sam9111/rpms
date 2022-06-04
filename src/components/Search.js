import { supabase } from "../supabaseClient";
import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Search(props) {
  const { attribute, setPublications } = props;
  async function handleSearch() {
    var query = document.getElementById("search").value;
    var finalData = [];

    const contents = await supabase
      .from("publications")
      .select()
      .textSearch("content", query);

    finalData = finalData.concat(contents.data);

    const titles = await supabase
      .from("publications")
      .select()
      .textSearch(attribute, query);

    finalData = finalData.concat(titles.data);

    for (var i = 0; i < finalData.length; i += 1) {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(finalData[i].issn);
      finalData[i].url = publicURL;
    }
    setPublications(finalData);
  }

  return (
    <>
      <Input
        placeholder="Search for any publication"
        width="25%"
        my={4}
        id="search"
      />
      <Button mx={2} onClick={handleSearch}>
        <Search2Icon />
      </Button>
    </>
  );
}
