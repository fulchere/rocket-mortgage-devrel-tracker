import React, {useState, useEffect} from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAPIService from './CAPIService'
import CAddEventTalk from './CAddEventTalk'

export default function CConferenceTalkList({talk_ids, event_id}) {
    const [talks, setTalks] = useState([])
    const [loading, setLoading] = useState(true)

    const [open,setOpen] = useState(false)

    useEffect(() => {
        let mounted = true
        CAPIService.getTalk()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            
            console.log(response)
            console.log(talk_ids)

            if (talk_ids) {
            for (var i = 0; i < talk_ids.length; i++){
              for (var j = 0; j < response.documents.length; j++){
                  if (talk_ids[i] === response.documents[j].talk_id){
                    temp_array.push({
                        talk_id : response.documents[j].talk_id,
                        title : response.documents[j].title,
                        speaker_ids : response.documents[j].speaker_ids
                      })
                  }
              }

            }
        }
            setTalks(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [talk_ids])

      const addTalk = () => {
        setOpen(!open)

    }

    return (
        <div>
        {loading ? <div></div>  :
        <Container style = {{width:'250px', float:'right', marginTop:'20px'}} >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Talks</h5>
                <div style={ { margin: "auto" } }>
                    <Button outline size='sm' theme="light" onClick={ addTalk } href="">+</Button>
                </div>
            </Row>

            {(talks.length === 0) ? <div>no talks</div> :
            <ListGroup flush={false}>
                {talks.map(talk => {
                    

                    return(
                        <ListGroupItem squared theme='light' key = {talk.talk_id}>
                            <div style = {{width:'100%'}}>{talk.title}</div>

                        </ListGroupItem>
                    )
                })}
            </ListGroup>}

            <Modal open={ open } toggle={ ()=>setOpen(!open)} >
                {
                    < CAddEventTalk event_talks={talks} setOpen={setOpen} event_id={event_id}/>
                }
                
            </Modal>
        </Container>
        }
        </div>

    )
}