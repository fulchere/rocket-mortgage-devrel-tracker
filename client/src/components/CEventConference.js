import React, {useState, useEffect} from 'react'
import {Container, Row, Col,Button, Badge} from 'shards-react'

import moment from 'moment'

import CAPIService from './CAPIService'
import CContactList from './CContactList'
import CConferenceTalkList from './CConferenceTalkList'

import { useAuth } from '../contexts/AuthContext'

export default function CEventConference({event_id}) {
    const [formData, setFormData] = useState({
        name : "",
        id : "",
        start: "",
        end: "",
        address: "",
        facility: "",
        description: "",
        dei_affiliation: false,
        attendees: "",
        recruiting_partner: false,
        contact_ids: []
    })
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(-1)

    const [speaker_id, setSpeaker_id] = useState('')

    const { currentUser } = useAuth()

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
                description: response.description,
                dei_affiliation: response.dei_affiliation,
                attendees: response.attendees,
                recruiting_partner: response.recruiting_partner,
                contact_ids: response.host_ids,
                talk_ids: response.talk_ids

            }
            setFormData(temp_data)
          })
        CAPIService.getSpeaker(currentUser.email)
        .then(response => {
            setSpeaker_id(response.speaker_id)
        })

        CAPIService.getUserRatingOfEvent(event_id, currentUser.email).then(response => {
            changeRating(response.user_rating)
        })
    
          return function cleanup() {
            mounted = false
          }
      }, [currentUser.email, event_id])

      const addRating = ()=>{
        CAPIService.addRating({event_id:event_id,rating,speaker_id:speaker_id,timestamp:moment()})       
        .then(res=>{
            
        })
    }
    // const getAllRatings = ()=>{
    //     CAPIService.getRatingByEventByID(event_id)       
    //     .then(res=>{
    //         console.log(res);
    //     })
        
    //   }
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
                        </Container>
                        </div>
                    </Row>
                    <Row>
                    <div style = {{paddingBottom:'20px', height:'120px', width:'200px', outline:'2px black solid', textAlign:'left'}}>{formData.description}</div>
                    
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
                            {/* <button onClick={()=>getAllRatings()}>getall</button> */}
                        </div>
                        <Button onClick={addRating} theme="success" size="sm">confirm</Button>
                    </div>
                    </Row>
                    <Row style= {{padding:0}}>
                    <Col sm={{ size: 8, order: 2, offset: 0 }} style = {{marginTop:20, width:'200px', padding:0}}>
                        <CContactList contact_ids={formData.contact_ids} event_id={event_id} />
                    </Col>
                    </Row>
                </Col>
                <Col>
                    <Row >

                    <div style = {{paddingBottom:'20px', width:'100%'}}>
                    <Container>
                    <Row><div style = {{width:'100%'}} align='right'>Start: {moment(formData.start).format('LL')}</div></Row>
                        <Row><div style = {{width:'100%'}} align='right'>End: {moment(formData.end).format('LL')}</div></Row>
                        </Container>
                        </div>
                    </Row>
                    <Row>
                    <div style = {{width:'100%'}} align='right'>
                        <Container>
                            {formData.dei_affiliation ? <Row><div style = {{width:'100%'}} align='right'>DEI affiliated</div></Row> : <div style = {{width:'100%'}} align='right'></div>}
                            {formData.recruiting_partner ? <Row><div style = {{width:'100%'}} align='right'>Recruiting Partner</div></Row> : <div style = {{width:'100%'}} align='right'></div>}
                            <Row><div style = {{width:'100%'}} align='right'>Attendees: {formData.attendees}</div></Row>
                            <Row><Col sm={{ size: 8, order: 2, offset: 5 }}><CConferenceTalkList talk_ids={formData.talk_ids} event_id={event_id}/></Col></Row>
                        </Container>
                    </div>
                    </Row>
                </Col>

            </Row>
        </Container>
        }</div>
    )
}
