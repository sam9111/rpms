import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

export default function ExplorePage(props) {

  const samplePublications = [
    {
      title: "The Complete Guide to React Hooks",
      issn: "12345",
      author: "Adam",
      domains: ["AI"],
      date: "2013-15-23",
      pages: "14",
      content:
        "The Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React Hooks",
      url: "https://research.google.com/pubs/archive/44678.pdf",
    },
    {
      title: "Second page",
      issn: "22122",
      author: "Levie",
      domains: ["ML","CV"],
      date: "2013-15-23",
      pages: "14",
      content:
        "The Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React HooksThe Complete Guide to React Hooks",
      url: "https://research.google.com/pubs/archive/44678.pdf"
    }
  ];

  const [publications,setPublications] = useState(samplePublications);

  async function handleSearch() {
    var query = document.getElementById("search").value;
    var finalData = [];

    const contents = await supabase
      .from('publications')
      .select()
      .textSearch('content', query)

    finalData = finalData.concat(contents.data);

    const titles = await supabase
      .from('publications')
      .select()
      .textSearch('title', query)

    finalData = finalData.concat(titles.data);

    for (var i = 0; i < finalData.length; i += 1) {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(finalData[i].issn);
      finalData[i].url = publicURL;
    }
    setPublications(finalData)
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
