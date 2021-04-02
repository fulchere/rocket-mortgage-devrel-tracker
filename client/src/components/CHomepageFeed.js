import React from 'react'
import { ListGroup, ListGroupItem, Container, Row} from "shards-react";
import moment from 'moment'

export default function CHomepageFeed({event_data}) {

    let event_data_sorted = event_data.sort((a, b) => a.start.valueOf() - b.start.valueOf())
    
    return (
        <Container>
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Upcoming Events</h5>
                <div style={ { margin: "auto" } }>
                </div>
            </Row>


            <ListGroup flush={false} >
                {event_data_sorted.map(event => {  if (moment(event.start).isAfter(moment())){
                    return(

                        <ListGroupItem squared theme='light' key = {event.id}>
                        <div>{event.title}</div>
                        <div>{moment(event.start).fromNow()}</div>
                        </ListGroupItem> 
                        
                    )
                    }
                    else{
                        return(<div></div>)
                    }
                })}
            </ListGroup>
        </Container>

    )
}
