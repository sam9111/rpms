import { Container, ListGroup, Card, Button, Badge, ButtonGroup } from 'react-bootstrap';

function CustomCard(props) {
    console.log(props.pub);
    if (props.pub.domains == null) {
        var badges = <div></div>;
    }
    else {
        badges = props.pub.domains.map((field) =>
            <Badge style={{ margin: '5px' }}>#{field}</Badge>
        );
    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (props.pub.date == null) {
        var date = "";
    }
    else {
        var parsedDate = new Date(props.pub.date);
        date = "Published on " + parsedDate.getDate() + " " + month[parsedDate.getMonth()] + " " + parsedDate.getFullYear();
    }

    return (
        <Card style={{ marginBottom: '15px' }}>
            <Card.Header>
                {badges}
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.pub.title}</Card.Title>
                <Card.Text>
                    {props.pub.content}
                </Card.Text>
                <ButtonGroup aria-label="Basic example" style={{ float: 'right' }}>
                    <a href={props.pub.url} target="_blank" rel="noopener noreferrer"><Button variant="secondary" style={{ marginRight: '2px' }}>View</Button></a>
                    <Button variant="secondary">Options</Button>
                </ButtonGroup>
            </Card.Body>
            <Card.Footer className="text-muted">{date}</Card.Footer>
        </Card>
    );
}

export function CustomCardList(props) {
    console.log(props.publications);
    var cards = props.publications.map((publication) =>
        <ListGroup.Item key={publication.issn}>
            <CustomCard pub={publication} />
        </ListGroup.Item>
    );
    return (
        <Container style={{ marginTop: '30px', marginBottom: '30px', border: '2px solid 	#F5F5F5', borderRadius: '10px', padding: '10px' }}>
            <h3 className='text-center' style={{ marginBottom: '10px' }}>Your Publications</h3>
            <ListGroup>
                {cards}
            </ListGroup>
        </Container>
    );
}