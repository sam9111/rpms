import { Col, Container, Row, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";

export function UploadForm(props) {
  const [file, setFile] = useState(null);
  const [domains, setDomains] = useState([]);

  async function fileUpload(uploadedFile) {
    setFile(uploadedFile);
    console.log(file);
  }

  function func(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      var a = document.getElementById("form");
      setDomains(domains.concat(a.area.value));
      console.log(domains);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0, 10);
    const { dberror } = await supabase.from("publications").insert([
      {
        Title: event.target.title.value,
        ISSN: event.target.issn.value,
        Date: res,
        Pages: parseInt(event.target.no_of_pages.value),
        user_id: props.user.id,
        Content: event.target.content.value,
      },
    ]);
    if (dberror) {
      alert(dberror.message);
    }

    const { fileerror } = await supabase.storage
      .from("publications")
      .upload(event.target.issn.value, file);
    if (fileerror) {
      alert(fileerror.message);
    }

    if (!fileerror && !dberror) {
      alert("Success!!");
    }

    for (var i = 0; i < event.target.length; i += 1) {
      event.target[i].value = "";
    }
  }

  return (
    <Box rounded={"lg"} boxShadow={"2xl"} p={8}>
      <Container
        style={{
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        <Form onSubmit={handleSubmit} id="form">
          <Row>
            <Col>
              <h1
                style={{
                  paddingBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                New Publication
              </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Row>
                <Col sm={6}>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control type="text" id="title" />
                </Col>
                <Col sm={6}>
                  <Form.Label htmlFor="area">Area of Interest</Form.Label>
                  {/* <Form.Select aria-label="Default select example" id="area">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> */}
                  <Form.Control id="area" type="text" onKeyUp={func} />
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col sm={6}>
                  <Form.Label htmlFor="issn">ISSN</Form.Label>
                  <Form.Control type="text" id="issn" />
                </Col>
                <Col sm={6}>
                  <Form.Label htmlFor="no_of_pages">Number of Pages</Form.Label>
                  <Form.Control id="no_of_pages" type="number" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Control
                    id="content"
                    as="textarea"
                    rows={4}
                    placeholder="Tell something about the work here"
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Label htmlFor="pdf">File Upload</Form.Label>
              <FileUploader handleChange={fileUpload} name="file" />
            </Col>
          </Row>
          <br />

          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Upload Work
          </Button>
        </Form>
      </Container>
    </Box>
  );
}
