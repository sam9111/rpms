import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { Input, Box, Button, Heading , useDisclosure, } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Indexing from "../components/Indexing";
import Search from "../components/Search";

export default function ExplorePage(props) {
  const [publications, setPublications] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    getPubs();
  }, []);

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Explore Research Publications
      </Heading>
      <Button onClick={onOpen} m={4}>
       Advanced Search
      </Button>
      <Indexing
        isOpen={isOpen}
        onClose={onClose}
        setPublications={setPublications}
        publications={publications}
      />
      {publications.map((pub) => {
        return <Card publication={pub} key={pub.issn} />;
      })}
    </Box>
  );
}
