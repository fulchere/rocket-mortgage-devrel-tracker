import React, {useState, useEffect} from 'react'
import CAPIService from './CAPIService'
import CEventBrowser from './CEventBrowser'

export default function CConferences() {
    const [event_data, setEvent_data] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true
        CAPIService.getAllEvents()
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            for (var i = 0; i < response.documents.length; i++){
              temp_array.push({
                name : response.documents[i].name,
                id : response.documents[i].event_id
              })
            }
            setEvent_data(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])

    return (
        <div> {loading ? <p>loading...</p> :
        <div>
            <CEventBrowser type='Conference' event_data={event_data} />
        </div>}
        </div>
    )
}
