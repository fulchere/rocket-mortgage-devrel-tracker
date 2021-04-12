import React, { useState, useEffect } from 'react'

import CEventBrowser from './CEventBrowser'
import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'


export default function CMedia() {
  const { currentUser } = useAuth()
  useEffect(() => {
    // CAPIService.getAllMedia()
    CAPIService.getAllUserMedia(currentUser.email)
      .then(response => {

        console.log(response);
        var temp_array = []
        for (var i = 0; i < response.media_pairs.length; i++) {
          temp_array.push({
            name: response.media_pairs[i].media_name,
            id: response.media_pairs[i].id
          })
        }
        setEvent_data(temp_array)
      })


  }, [])

  const [event_data, setEvent_data] = useState([])

  return (
    <div>
      
      <CEventBrowser type='Media' event_data={ event_data } />
    </div>
  )
}
