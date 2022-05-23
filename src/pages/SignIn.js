import { Container, Row, Col } from "react-bootstrap";
import { createClient } from '@supabase/supabase-js'
import { useState } from "react";
import { Navigate } from "react-router-dom";

const supabaseUrl = 'https://dxvauanbgjmaiblhmety.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dmF1YW5iZ2ptYWlibGhtZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3MTU5ODksImV4cCI6MTk2ODI5MTk4OX0.HfUGkFHs5UCU8bqFZUUpocb1bAXcxJaUk3PYoAfN_SI'
const supabase = createClient(supabaseUrl, SUPABASE_KEY)


export function SignIn(props) {
    const [signedIn, setSignedIn] = useState(false);

    const handleClick = async (ev) => {
        ev.preventDefault();
        var user = ev.target.user.value;
        var pass = ev.target.pass.value;
        const { error } = await supabase.auth.signIn({
            email: user,
            password: pass,
        });
        if (error) {
            console.log(error);
        }
        else {
            setSignedIn(true);
        }
    }

    if (signedIn) {
        const a = supabase.auth.user();
        props.userHandler(a);
        return (
            <Navigate to="/" />
        )
    }
    return (
        <Container>
            <form onSubmit={handleClick}>
                <Row>
                    <Col xs={12}>
                        <label htmlFor="username">UserName</label>
                    </Col>
                    <Col xs={12}>
                        <input type="text" id="usename" name="user" />
                    </Col>
                    <Col xs={12}>
                        <label htmlFor="pwd">Password</label>
                    </Col>
                    <Col xs={12} style={{ marginBottom: "10px" }}>
                        <input id="pwd" type="text" name="pass" />
                    </Col>
                    <Col xs={12}>
                        <input id="submit" type="submit" />
                    </Col>
                </Row>
            </form>
            <br />
        </Container >
    );
}