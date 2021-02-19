import React from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col } from "shards-react";

export default function CEventList({type}) {
    return (
        <Container>
            <Row noGutters={true}>
                    <Col sm='10'>
                        <h5>Your {type}s</h5>
                    </Col>
                    <Col>
                    <div align="right">
                        <Button theme="primary">+</Button>
                        </div>
                    </Col>
            </Row>

            <ListGroup>
                <ListGroupItem>Example {type} 1</ListGroupItem>
                <ListGroupItem>Example {type} 2</ListGroupItem>
                <ListGroupItem>Example {type} 3</ListGroupItem>
                <ListGroupItem>Example {type} 4</ListGroupItem>
                <ListGroupItem>Example {type} 5</ListGroupItem>
            </ListGroup>
            </Container>
        
    )
}