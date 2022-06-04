import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import Search from "../components/Search";

export default function ExplorePage(props) {
  const [publications, setPublications] = useState([]);

  async function getPubs() {
    var response = await supabase.from("publications").select("*");

    response.body.map((pub) => {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(pub.issn);
      pub.url = publicURL;
    });
    setPublications(response.body);
  }

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
      .textSearch("title", query);

    finalData = finalData.concat(titles.data);

    for (var i = 0; i < finalData.length; i += 1) {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(finalData[i].issn);
      finalData[i].url = publicURL;
    }
    setPublications(finalData);
  }

  useEffect(() => {
    getPubs();
  }, []);

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Explore Research Publications
      </Heading>
      <Search attribute="title" setPublications={setPublications} />
      {publications.map((pub) => {
        return <Card publication={pub} key={pub.issn} />;
      })}
    </Box>
  );
}
