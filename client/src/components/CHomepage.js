import React, { useState, useEffect } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CAPIService from './CAPIService'

import { useAuth } from '../contexts/AuthContext'

import "react-big-calendar/lib/css/react-big-calendar.css";


export default function CHomepage() {

    const localizer = momentLocalizer(moment);

    const [event_data, setEvent_data] = useState([
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "days")
            .toDate(),
          title: "Some title"
        }
      ])


    const [loading, setLoading] = useState(false)

    const { currentUser } = useAuth()

    useEffect(() => {
        let mounted = true
        CAPIService.getAllUserEvents(currentUser.email)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            for (var i = 0; i < response.event_pairs.length; i++){
              temp_array.push({
                name : response.event_pairs[i].event_name,
                id : response.event_pairs[i].id      
              })
            }
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])




    return (
        <div> {loading ? <p>loading...</p> :
            <div>       
                <Calendar localizer={localizer} defaultDate={new Date()} defaultView="month" events={event_data} style={{ height: "100vh" }} />
            </div>
            }
            </div>
    )
}
