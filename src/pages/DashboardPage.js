import "bootstrap/dist/css/bootstrap.min.css";
import { UploadForm } from "../components/UploadForm";
import { CustomTable } from "../components/CustomTable";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input, Flex, Box, Button, Heading } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
var publications = [
  {
    fields: ["ece", "iot"],
    title: "Intro to IOT",
    subtitle: "Genral instructions to build an IOT system",
    date: new Date("2022-03-25"),
  },
  {
    fields: ["cse", "ai"],
    title: "Intro to IOT",
    subtitle: "Genral instructions to build an IOT system",
    date: new Date("2013-11-15"),
  },
  {
    fields: ["eee", "embedded systems"],
    title: "Intro to IOT",
    subtitle: "Genral instructions to build an IOT system",
    date: new Date("2018-02-1"),
  },
  {
    fields: ["mech", "heat transfer"],
    title: "Intro to IOT",
    subtitle: "Genral instructions to build an IOT system",
    date: new Date("2019-04-2"),
  },
];

export function DashboardPage(props) {
  const [loaded, setLoaded] = useState(false);

  const getPubs = async () => {
    publications = await supabase
      .from("publications")
      .select()
      .eq("user_id", props.user.id);

    for (var i = 0; i < publications.data.length; i += 1) {
      var pub = publications.data[i];
      const { publicURL } = supabase.storage
        .from("publications")
        .getPublicUrl(pub.ISSN);
      publications.data[i].url = publicURL;
    }
    setLoaded(true);
  };

  function TablePlaceHolder() {
    if (!loaded) {
      getPubs();
      return (
        <Container fluid>
          <Row>
            <Col xs={12} style={{ justifyContent: "center" }}>
              <Spinner
                animation="grow"
                style={{ marginLeft: "50%", marginBottom: "50px" }}
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <CustomTable publications={publications.data} />;
    }
  }

  return (
    <Box m={8}>
      <Heading size="lg" my={4}>
        Your Dashboard
      </Heading>
      <UploadForm user={props.user} />
      <TablePlaceHolder />
    </Box>
  );
}
