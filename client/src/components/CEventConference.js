import React from 'react'
import {Container, Row, Col} from 'shards-react'

import CEventList from './CEventList'

export default function CEventConference() {

    return (
        <Container>
            <Row><Col><h2>MSU Engineering Conference 2021</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <div style = {{paddingBottom:'20px'}}>
                        <Container>
                        <Row><div>Engineering Building</div></Row>
                        <Row><div>428 S Shaw Ln</div></Row>
                        <Row><div>East Lansing/MI/48824</div></Row> 
                        </Container>
                        </div>
                    </Row>
                    <Row>
                    <div style = {{paddingBottom:'20px'}}>
                    <Container>
                        <Row><div>Robert Shaw</div></Row>
                        <Row><div>rshaw@msu.edu</div></Row>
                        <Row><div>(248)877-3626</div></Row> 
                        </Container>
                    </div>
                    </Row>
                    <Row>
                        <div style = {{paddingBottom:'20px', height:'80px', width:'200px', outline:'2px black solid', textAlign:'left'}}>Conference for MSU Engineers.</div>
                    </Row>
                    <Row></Row>
                </Col>
                <Col>
                    <Row><div style = {{paddingBottom:'20px',width:'100%'}} align='right'>Date: 2/19/2021</div></Row>
                    <Row >

                    <div style = {{paddingBottom:'20px', width:'100%'}}>
                    <Container>
                        <Row><div style = {{width:'100%'}} align='right'>Start time: 10:00 AM</div></Row>
                        <Row><div style = {{width:'100%'}} align='right'>End time: 4:00 PM</div></Row>
                        </Container>
                        </div>
                    </Row>
                    <Row><div style = {{width:'100%'}} align='right'> <CEventList type={'talk'} event_data={['Coding in React', 'The Internet and You']}/> </div></Row>
                </Col>

            </Row>
        </Container>
    )
}
