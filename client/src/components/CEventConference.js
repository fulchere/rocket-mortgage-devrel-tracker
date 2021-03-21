import React, {useState, useEffect} from 'react'
import {Container, Row, Col,Button} from 'shards-react'

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
    const [rating, setRating] = useState(-1)

    useEffect(() => {
        let mounted = true
        CAPIService.getEvent(event_id)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_data = {
                name : response.name,
                id : response.event_id,
                start: response.start,
                end: response.end,
                address: response.address,
                facility: response.facility,
                description: response.description

            }
            setFormData(temp_data)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [event_id])
      const addRating = ()=>{
        CAPIService.addRating({event_id,rating,speaker_id:0,timestamp:Date.now()})       
        .then(res=>{
            console.log(res);
        })
      }
      const changeRating = (idx)=>{
        setRating(idx);
      }
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
                    <Row>
                    <div style = {{padding:'5px',marginTop:20, height:'100px', width:'200px', outline:'2px black solid', textAlign:'left'}}>
                        <div>User Rating</div>
                        <div>
                            {
                                [0,1,2,3,4,5,6,7,8,9].map((item,idx)=>{
                                    return <span 
                                        style={{
                                            color:idx<=rating?'#eeee53':'#ccc',
                                            fontSize:20
                                        }}
                                        onClick={()=>changeRating(idx)}
                                    >★</span>
                                })
                            }
                        </div>
                        <Button onClick={addRating} theme="success" size="sm">confirm</Button>
                    </div>
                    </Row>
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
                </Col>

            </Row>
        </Container>
        }</div>
    )
}
