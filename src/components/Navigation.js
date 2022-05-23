import { Navbar, Nav, Container, Row, Col } from "react-bootstrap"
import { FaHome, FaSearch,FaUser } from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";

export const Navigation = () => {
    return (
        <Container fluid>
            <div style={{ padding: '10px' }}>
                <Navbar collapseOnSelect expand='sm' bg='light' variant='light' >
                    <Navbar.Brand><h1>RPMS</h1></Navbar.Brand>
                    <Container fluid className="justify-content-center">   
                            <Nav>
                                <LinkContainer to ='/'>
                                    <Nav.Link>
                                    <Row>
                                        <Col xs={12}>
                                            <FaHome className="logo" />
                                        </Col>
                                        <Col xs={12}>
                                            Home
                                        </Col>
                                    </Row>
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to = '/explore'>
                                <Nav.Link>
                                    <Row>
                                        <Col xs={12}>
                                            <FaSearch className="logo" />
                                        </Col>
                                        <Col xs={12}>
                                            Explore
                                        </Col>
                                    </Row>
                                </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to = '/account'>
                                <Nav.Link>
                                    <Row>
                                        <Col xs={12}>
                                            <FaUser className="logo" />
                                        </Col>
                                        <Col xs={12}>
                                            Account
                                        </Col>
                                    </Row>
                                </Nav.Link>
                                </LinkContainer>
                            </Nav>
                    </Container>
                </Navbar>
            </div>
        </Container>
    );
}