import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'
import CEventBrowser from './CEventBrowser'

import { useAuth } from '../contexts/AuthContext'

export default function CConferences() {
    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(true)

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
            setEvent_data(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [currentUser.email])

    return (
        <div> {loading ? <p>loading...</p> :
        <div>
            <CEventBrowser type='Conference' event_data={event_data} />
        </div>}
        </div>
    )
}