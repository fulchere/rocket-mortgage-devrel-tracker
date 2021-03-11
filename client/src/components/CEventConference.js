import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'shards-react'

import CAPIService from './CAPIService'
import CEventList from './CEventList'

export default function CEventConference({event_id}) {
    const [formData, setFormData] = useState({
        name : "",
        id : "",
        start: "",
        end: "",
        address: "",
        facility: "",
        description: "" 
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true
        CAPIService.getEvent(event_id)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_data = {
                name : response.documents[0].name,
                id : response.documents[0].event_id,
                start: response.documents[0].start,
                end: response.documents[0].end,
                address: response.documents[0].address,
                facility: response.documents[0].facility,
                description: response.documents[0].description

              }

            setFormData(temp_data)

            console.log(response.documents[0])



          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])

    return (
        <div> {loading ? <p>loading...</p> :
        <Container>
            <Row><Col><h2>{formData.name}</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <div style = {{paddingBottom:'20px'}}>
                        <Container>
                        <Row><div>{formData.facility}</div></Row>
                        <Row><div>{formData.address}</div></Row>
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
                        <div style = {{paddingBottom:'20px', height:'80px', width:'200px', outline:'2px black solid', textAlign:'left'}}>{formData.description}</div>
                    </Row>
                    <Row></Row>
                </Col>
                <Col>
                    <Row><div style = {{paddingBottom:'20px',width:'100%'}} align='right'>Date: 2/19/2021</div></Row>
                    <Row >

                    <div style = {{paddingBottom:'20px', width:'100%'}}>
                    <Container>
                        <Row><div style = {{width:'100%'}} align='right'>Start time: {formData.start}</div></Row>
                        <Row><div style = {{width:'100%'}} align='right'>End time: {formData.end}</div></Row>
                        </Container>
                        </div>
                    </Row>
                    <Row><div style = {{width:'100%'}} align='right'> <CEventList type={'Talk'} event_data={[{name: 'Coding in React', event_id:"0"}, {name: 'Intro to C', event_id:"1"}]}/> </div></Row>
                </Col>

            </Row>
        </Container>
        }</div>
    )
}
