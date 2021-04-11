import React, {useState, useEffect} from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAPIService from './CAPIService'
import CAddContact from './CAddContact'

export default function CContactList({contact_ids, event_id}) {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const [open,setOpen] = useState(false)

    useEffect(() => {
        let mounted = true
        CAPIService.getAllHosts()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []

            for (var i = 0; i < contact_ids.length; i++){
              for (var j = 0; j < response.documents.length; j++){
                  if (contact_ids[i] === response.documents[j].host_id){
                    temp_array.push({
                        host_id : response.documents[i].host_id,
                        name : response.documents[i].name,
                        email : response.documents[i].email,
                        phone : response.documents[i].phone_number
                      })
                    break
                  }
              }

            }
            setContacts(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [contact_ids])

      const addContact = () => {
        setOpen(!open)

    }

    return (
        <div style = {{width:'250px', padding:0}} >
        {loading ? <div></div>  :
        <Container style = {{width:'100%'}} >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Contacts</h5>
                <div style={ { margin: "auto" } }>
                    <Button outline size='sm' theme="light" onClick={ addContact } href="">+</Button>
                </div>
            </Row>

            {(contacts.length === 0) ? <div>no contacts</div> : 
            <ListGroup flush={false}>
                
                {contacts.map(contact => {
                    

                    return(
                        <ListGroupItem squared theme='light' key = {contact.host_id}>
                            <div style = {{width:'100%'}}>{contact.name}</div>
                            <div style = {{width:'100%'}}>{contact.email}</div>
                            <div style = {{width:'100%'}}>{contact.phone}</div>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
            }

            <Modal open={ open } toggle={ ()=>setOpen(!open)} >
                {
                    < CAddContact event_id={event_id} setOpen={setOpen}/>
                }
                
            </Modal>
        </Container>
        }
        </div>

    )
}