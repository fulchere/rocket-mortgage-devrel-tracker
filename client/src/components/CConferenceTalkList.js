import React, {useState, useEffect} from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAPIService from './CAPIService'
import CAddEventTalk from './CAddEventTalk'

export default function CConferenceTalkList({talk_ids}) {
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
            
            if (talk_ids) {
            for (var i = 0; i < talk_ids.length; i++){
              for (var j = 0; j < response.documents.length; j++){
                  if (talk_ids[i] === response.documents[j].talk_id){
                    temp_array.push({
                        talk_id : response.documents[i].talk_id,
                        title : response.documents[i].title,
                        speaker_ids : response.documents[i].speaker_ids

                      })
                    break
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
        <Container style = {{width:'100%', float:'right'}} >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Talks</h5>
                <div style={ { margin: "auto" } }>
                    <Button outline size='sm' theme="light" onClick={ addTalk } href="">+</Button>
                </div>
            </Row>


            <ListGroup flush={false}>
                {talks.map(talk => {
                    

                    return(
                        <ListGroupItem squared theme='light' key = {talk.talk_id}>
                            <div style = {{width:'100%'}}>{talk.title}</div>

                        </ListGroupItem>
                    )
                })}
            </ListGroup>

            <Modal open={ open } toggle={ ()=>setOpen(!open)} >
                {
                    < CAddEventTalk event_talks={talks} setOpen={setOpen}/>
                }
                
            </Modal>
        </Container>
        }
        </div>

    )
}