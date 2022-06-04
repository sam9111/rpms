import { Input, Box, Button, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { CustomTable } from "../components/CustomTable";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import Search from "../components/Search";
export default function AdminPage(props) {
  const [publications, setPublications] = useState([]);
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

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Admin Dashboard
      </Heading>
      <Search attribute="title" setPublications={setPublications} />
      <CustomTable publications={publications} />
    </Box>
  );
}
