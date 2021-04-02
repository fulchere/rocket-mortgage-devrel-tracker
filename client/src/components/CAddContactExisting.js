import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'

import CAddConferenceExistingList from './CAddConferenceExistingList'

import { useAuth } from '../contexts/AuthContext'

import { Form, FormInput, FormTextarea, FormGroup, Container, Row, Col, Button } from "shards-react";

export default function CAddContactExisting({event_id}) {

    const [selectedEvent, setSelectedEvent] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(true)

    const [userID, setUserID] = useState('')

    const { currentUser } = useAuth()

    useEffect(() => {
        let mounted = true
        CAPIService.getAllHosts()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }

            setEvent_data(response.hosts)
            CAPIService.getSpeaker(currentUser.email).then(response => {
              setUserID(response.speaker_id)
            })

          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])

      const select_Event = (event) => {
        setSelectedEvent(event.id)
        setIsSelected(true)
        
    }

        const handleSubmit = async (e) => {
            //call api to add selectedEvent to speaker's connections
            await CAPIService.addExistingEventToSpeaker(userID, selectedEvent)
          .then(response => {

          })
        }


    return (
        <div> {loading ? <p>loading...</p> :
                <Container>


                    <CAddConferenceExistingList event_data={event_data} select_Event={select_Event}/>

                    <Form onSubmit={handleSubmit}style={{paddingTop:'20px'}} >
                    <Button squared style={{width:'130px', height:'50px', float:'right'}}>Add Contact</Button>
                    </Form>
                </Container>
        }</div>
    )
}