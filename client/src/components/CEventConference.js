import React from 'react'
import {Container, Row, Col} from 'shards-react'

export default function CEventConference() {

    return (
        <Container>
            <Row><Col><h2>Example Event</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <div style = {{paddingBottom:'20px'}}>
                        <Container>
                        <Row><div>Example Facility</div></Row>
                        <Row><div>Example Address</div></Row>
                        <Row><div>Example City/State/Zip</div></Row> 
                        </Container>
                        </div>
                    </Row>
                    <Row>
                    <div style = {{paddingBottom:'20px'}}>
                    <Container>
                        <Row><div>Example Contact</div></Row>
                        <Row><div>Example Email</div></Row>
                        <Row><div>Example Phone Number</div></Row> 
                        </Container>
                    </div>
                    </Row>
                    <Row>
                        <div style = {{paddingBottom:'20px'}}>Example Description</div>
                    </Row>
                    <Row><div>Rating system goes here</div></Row>
                </Col>
                <Col>
                    <Row><div style = {{paddingBottom:'20px',width:'100%'}} align='right'>date</div></Row>
                    <Row >

                    <div style = {{paddingBottom:'20px', width:'100%'}}>
                    <Container>
                        <Row><div style = {{width:'100%'}} align='right'>Example Start Time</div></Row>
                        <Row><div style = {{width:'100%'}} align='right'>Example End Time</div></Row>
                        </Container>
                        </div>
                    </Row>
                    <Row><div style = {{width:'100%'}} align='right'>miniature event list goes here</div></Row>
                </Col>

            </Row>
        </Container>
    )
}
