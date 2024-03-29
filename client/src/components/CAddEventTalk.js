import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'

import CAddEventTalkList from './CAddEventTalkList'

import { useAuth } from '../contexts/AuthContext'

import { Form, FormInput, FormTextarea, FormGroup, Container, Row, Col, Button } from "shards-react";

export default function CAddEventTalk({event_talks, event_id, setOpen}) {

    const [selectedEvent, setSelectedEvent] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(true)

    const [userID, setUserID] = useState('')

    const { currentUser } = useAuth()

    useEffect(() => {
        let mounted = true
        CAPIService.getAllUserTalks(currentUser.email)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            var matching = false

            for (var i = 0; i < response.talk_pairs.length; i++){
              matching = false
              for (var j = 0; j < event_talks.length; j++){
                  if (event_talks[j].id === response.talk_pairs[i].id){
                    matching = true
                  }
              }
              if (matching === false){
              temp_array.push({
                name : response.talk_pairs[i].talk_name,
                id : response.talk_pairs[i].id      
              })
            }
            }

            setEvent_data(temp_array)
            CAPIService.getSpeaker(currentUser.email).then(response => {
              setUserID(response.speaker_id)
            })

          })
    
          return function cleanup() {
            mounted = false
          }
      }, [currentUser.email, event_talks])

      const select_Event = (event) => {
        setSelectedEvent(event.id)
        setIsSelected(true)
        
    }

        const handleSubmit = async (e) => {
            //call api to add selectedEvent to speaker's connections
            e.preventDefault()

            await CAPIService.addTalkToEventByEventId({talk_id: selectedEvent,event_id: event_id}).then(response => {
              CAPIService.addEventToTalkByTalkId({talk_id: selectedEvent,event_id: event_id}).then(response2 => { 
                console.log(selectedEvent)
                console.log(event_id)
                setOpen(false)
              })
            })
        }


    return (
        <div> {loading ? <p>loading...</p> :
                <Container>


                    <CAddEventTalkList event_data={event_data} select_Event={select_Event}/>

                    <Form onSubmit={handleSubmit}style={{paddingTop:'20px', paddingBottom: '20px'}} >
                    <Button squared style={{width:'130px', height:'50px', float:'right'}}>Add talk to conference</Button>
                    </Form>
                </Container>
        }</div>
    )
}
