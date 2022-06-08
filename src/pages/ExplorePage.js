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

    const response2 = await fetch(`http://localhost:5000/record/`);
    const jsonResponse = await response2.json();

    jsonResponse.map((pub) => {
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(pub.issn);
      pub.url = publicURL;
    });

    setPublications(jsonResponse);
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
