import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function ExplorePage(props) {

  const publications = [
    {
      title: "The Complete Guide to React Hooks",
      issn: "12345",
      authors: ["Adam"],
      domains: ["AI"],
      date: "2013-15-23",
      pages: "14",
      content:
        "The Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React Hooks",
      url: "https://www.google.com",
    },
    {
      title: "Second page",
      issn: "22122",
      authors: ["Levie"],
      domains: ["ML","CV"],
      date: "2013-15-23",
      pages: "14",
      content:
        "The Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React Hooks",
      url: "https://www.google.com",
    }
  ];

  async function handleSearch() {
    var query = document.getElementById("search").value;
    var finalData = [];

    const contents = await supabase
      .from('books')
      .select()
      .textSearch('content', query)

    finalData = finalData.concat(contents.data);

    const titles = await supabase
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
      {publications.map((pub) => {
        return <Card publication = {pub} />
      })}
    </Box>
  );
}
