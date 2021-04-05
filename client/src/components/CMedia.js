import React, {useState,useEffect} from 'react'

import CEventBrowser from './CEventBrowser'
import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'

export default function CMedia() {
  const { currentUser } = useAuth()
    useEffect(() => {
        // CAPIService.getAllUserMedia(currentUser.email)
        CAPIService.getAllMedia()
          .then(response => {
           
    
            var temp_array = []
            for (var i = 0; i < response.documents.length; i++) {
              temp_array.push({
                name: response.documents[i].name,
                id: response.documents[i].media_id
              })
            }
            setEvent_data(temp_array)
          })
    
       
      }, [])

    const [event_data, setEvent_data] = useState([])

    return (
        <div>
            <CEventBrowser type='Media' event_data={event_data}/>
        </div>
    )
}
