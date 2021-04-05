import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'

import CAddConferenceExistingList from './CAddConferenceExistingList'

import { useAuth } from '../contexts/AuthContext'

import { Form, FormInput, FormTextarea, FormGroup, Container, Row, Col, Button } from "shards-react";

export default function CAddConferenceExisting({user_event_data, setOpen}) {

    const [selectedEvent, setSelectedEvent] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(true)

    const [userID, setUserID] = useState('')

    const { currentUser } = useAuth()

    useEffect(() => {
        let mounted = true
        CAPIService.getAllEvents()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            var matching = false

            for (var i = 0; i < response.documents.length; i++){
              matching = false
              for (var j = 0; j < user_event_data.length; j++){
                  if (user_event_data[j].id === response.documents[i].event_id){
                    matching = true
                  }
              }
              if (matching === false){
              temp_array.push({
                name : response.documents[i].name,
                id : response.documents[i].event_id      
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
      }, [])

      const select_Event = (event) => {
        setSelectedEvent(event.id)
        setIsSelected(true)
        
    }

        const handleSubmit = async (e) => {
          e.preventDefault()
            //call api to add selectedEvent to speaker's connections
            await CAPIService.addExistingEventToSpeaker(userID, selectedEvent)
          .then(response => {
            console.log(response)
            setOpen(false)
          })
        }


    return (
        <div> {loading ? <p>loading...</p> :
                <Container>


                    <CAddConferenceExistingList event_data={event_data} select_Event={select_Event}/>

                    <Form onSubmit={handleSubmit}style={{paddingTop:'20px'}} >
                    <Button squared style={{width:'130px', height:'50px', float:'right'}}>Add to My Conferences</Button>
                    </Form>
                </Container>
        }</div>
    )
}
