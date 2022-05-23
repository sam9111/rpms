import { Container } from "react-bootstrap";

export function Footer() {
    return (
        <Container fluid className='text-center' style = {{fontFamily:'Arial', marginBottom:'10px'}} fixed ="bottom">
            <h6>© Copyright 2022-2030. All rights reserved</h6>
        </Container>
    );

}