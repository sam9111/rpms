import { Col, Row, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";

export function UploadForm(props) {
  const [file, setFile] = useState(null);

  async function fileUpload(uploadedFile) {
    setFile(uploadedFile);
    console.log(file);
  }

  async function handleSubmit(event) {
    console.log(event.target.issn.value);
    event.preventDefault();
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0, 10);
    const { data, dberror } = await supabase.from("publications").insert([
      {
        title: event.target.title.value,
        issn: parseInt(event.target.issn.value),
        date: res,
        pages: parseInt(event.target.no_of_pages.value),
        user_id: props.user.id,
        content: event.target.content.value,
      },
    ]);
    console.log(data);
    console.log(dberror);
    if (dberror) {
      alert(dberror.message);
    }

    if (file != null) {
      const { fileerror } = await supabase.storage
        .from("publications")
        .upload(event.target.issn.value, file);
      if (fileerror) {
        alert(fileerror.message);
      }
    }

    if (dberror) {
      alert("Success!!");
    }

    for (var i = 0; i < event.target.length; i += 1) {
      event.target[i].value = "";
    }
  }

  return (
    <Box rounded={"lg"} boxShadow={"xl"} p={8} mb={8}>
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
                <Form.Control id="area" type="text" />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col sm={6}>
                <Form.Label htmlFor="issn">ISSN</Form.Label>
                <Form.Control type="text" id="issn" />
              </Col>
              <Col sm={6}>
                <Form.Label htmlFor="no_of_pages">Number of Pages</Form.Label>
                <Form.Control id="no_of_pages" type="text" />
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
          type="submit"
        >
          Upload Work
        </Button>
      </Form>
    </Box>
  );
}
