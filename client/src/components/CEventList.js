import React, {useState} from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col } from "shards-react";
export default function CEventList({type, event_data}) {
    console.log(event_data)
    console.log(type)
    

    const [selectedEvent, setSelectedEvent] = useState('')

    const selectEvent = (event) => {
        setSelectedEvent(event)

        //more logic will be added here
    }

    const isSelected = (event) => {
        if (event === selectedEvent){return(true)}
        else{return(false)}
    }

    const addEvent = () => {
        console.log('hi')

    }


    return (
        <Container >
            <Row noGutters={true} style= {{height: '70px', borderBottom:'2px solid black'}}>
                        <h5 style={{margin: "auto"}}>Your {type}s</h5>
                    <div style={{margin:"auto"}}>
                        <Button theme="primary" onClick={addEvent} href="">+</Button>
                        </div>
            </Row>

            
            <ListGroup flush={false} >
                {event_data.map(event => {
                    return(
                        isSelected(event) ? <Button squared theme='light' key = {event}> {event}</Button> : <Button squared outline theme='light' key = {event} onClick={() => {selectEvent(event)}}> {event}</Button>
                    )
                })}

                
            </ListGroup>
            </Container>
        
    )
}
