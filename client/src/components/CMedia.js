import React, {useState,useEffect} from 'react'

import CEventBrowser from './CEventBrowser'
import CAPIService from './CAPIService'

export default function CMedia() {
    useEffect(() => {
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

    const [event_data, setEvent_data] = useState([{name: 'Podcast', event_id:"0"}, {name: 'Video', event_id:"1"}, {name: 'Livestream', event_id:"2"}])

    return (
        <div>
            <CEventBrowser type='Media' event_data={event_data}/>
        </div>
    )
}
