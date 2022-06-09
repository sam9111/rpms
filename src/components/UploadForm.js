import { Col, Row, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import moment from "moment";

import { read } from "xlsx";
import { utils } from "xlsx";

export function UploadForm(props) {
  const [file, setFile] = useState(null);

  async function fileUpload(uploadedFile) {
    setFile(uploadedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.date.value);
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0, 10);
    const { data, dberror } = await supabase.from("publications").insert([
      {
        title: event.target.title.value,
        domains: event.target.area.value.split(","),
        author: event.target.author.value,
        date: event.target.date.value,
        issn: parseInt(event.target.issn.value),
        pages: parseInt(event.target.no_of_pages.value),
        user_id: props.user.id,
        content: event.target.content.value,
      },
    ]);

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

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet, { raw: false });
        console.log("json", json);
        uploadMutliple(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const uploadMutliple = async (json) => {
    const pubs = json.map((pub) => {
      console.log("pub", pub);
      var res = new Date(pub.date).toISOString().slice(0, 10);
      return {
        title: pub.title,
        issn: parseInt(pub.issn),
        date: res,
        pages: parseInt(pub.pages),
        user_id: props.user.id,
        content: pub.content,
        author: pub.author,
        domains: pub.domains && pub.domains.split(","),
      };
    });
    console.log("pubs", pubs);
    const { data, dberror } = await supabase.from("publications").insert(pubs);
    if (dberror) {
      alert(dberror.message);
    }
  };

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
              <Col sm={6}>
                <Form.Label htmlFor="author">Author</Form.Label>
                <Form.Control id="author" type="text" />
              </Col>
              <Col sm={6}>
                <Form.Label htmlFor="date">Date</Form.Label>
                <Form.Control id="date" type="date" />
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

        <Button type="submit">Upload Work</Button>
      </Form>
      <Box my={4} py={4}>
        <h1
          style={{
            paddingBottom: "20px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Upload Excel File
        </h1>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </Box>
    </Box>
  );
}
