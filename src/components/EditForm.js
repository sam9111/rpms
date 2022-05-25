import { Col, Row, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { AiFillEdit } from "react-icons/ai";
import { supabase } from "../supabaseClient";
import { BsFillTrashFill } from "react-icons/bs";

export function UpdateIconButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);

  async function fileUpload(uploadedFile) {
    setFile(uploadedFile);
    console.log(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var form = event.target;
    console.log(form.title.value);
    const { data, dberror } = await supabase.from('publications').update(
      {
        title: event.target.title.value,
        pages: parseInt(event.target.no_of_pages.value),
        content: event.target.content.value,
      })
      .match(
        {
          issn: form.issn.value
        }
      );
    console.log(data);
    console.log(dberror);
    if (dberror) {
      alert(dberror.message);
    }

    if (file != null) {
      console.log(props.publication);
      const { data,fileerror } = await supabase.storage
        .from("publications")
        .update(props.publication.issn, file);
      console.log(data);
      if (fileerror) {
        console.log(fileerror.message);
      }
    }

    onClose();
  }

  var pub = props.publication;

  return (
    <>
      <IconButton colorScheme="green" icon={<AiFillEdit />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form onSubmit={handleSubmit} id="form">
              <Row>
                <Col sm={12}>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control type="text" id="title" defaultValue={pub.title} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Label htmlFor="area">Area of Interest</Form.Label>
                  <Form.Control id="area" type="text" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Label htmlFor="issn">ISSN</Form.Label>
                  <Form.Control type="text" id="issn" value={pub.issn} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Label htmlFor="no_of_pages">Number of Pages</Form.Label>
                  <Form.Control id="no_of_pages" type="text" defaultValue={pub.pages} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Control
                    id="content"
                    as="textarea"
                    rows={4}
                    defaultValue={pub.content}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Form.Label htmlFor="pdf">File Upload</Form.Label>
                  <FileUploader handleChange={fileUpload} name="file" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12}>
                  <Button colorScheme='blue' mr={3} type="submit">
                    Close
                  </Button>
                </Col>
              </Row>
            </Form >
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export function DeleteIconButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDelete(event) {
    event.preventDefault();
    console.log(props.publication);
    await supabase
      .from('publications')
      .delete()
      .match({ issn: props.publication.issn })
    await supabase
      .storage
      .from('publications')
      .remove(props.publication.issn);
    onClose();
  }

  return (
    <>
      <IconButton colorScheme="red" icon={<BsFillTrashFill />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this post?
            <br />
            <Button onClick={handleDelete} >Yes</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}