import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'

import CAddConferenceExistingList from './CAddConferenceExistingList'

import { Form, FormInput, FormTextarea, FormGroup, Container, Row, Col, Button } from "shards-react";

export default function CAddConferenceExisting() {

    const [selectedEvent, setSelectedEvent] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        CAPIService.getAllEvents()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            for (var i = 0; i < response.documents.length; i++){
              temp_array.push({
                name : response.documents[i].name,
                id : response.documents[i].event_id      
              })
            }
            setEvent_data(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])

      const select_Event = (event) => {
        setSelectedEvent(event.id)
        setIsSelected(true)
        
    }

        const handleSubmit = (e) => {
            //call api to add selectedEvent to speaker's connections
            
        }


    return (
        <div> {loading ? <p>loading...</p> :
                <Container>


                    <CAddConferenceExistingList event_data={event_data} select_Event={select_Event}/>

                    <Form OnSubmit={handleSubmit}>
                    <Button squared style={{width:'130px', height:'50px', align:'right'}}>Add to My Conferences</Button>
                    </Form>
                </Container>
        }</div>
    )
}
