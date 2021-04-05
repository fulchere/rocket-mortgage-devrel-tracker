import React, { useState, useEffect } from 'react'
import CAPIService from './CAPIService'
import CEventBrowser from './CEventBrowser'
import { useAuth } from '../contexts/AuthContext'

export default function CTalks() {
  const [event_data, setEvent_data] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    let mounted = true
    CAPIService.getAllUserTalks(currentUser.email)
      .then(response => {
        if (mounted) {
          setLoading(false)
        }

        var temp_array = []
        for (var i = 0; i < response.talk_pairs.length; i++) {
          temp_array.push({
            name: response.talk_pairs[i].talk_name,
            id: response.talk_pairs[i].id
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
        <CEventBrowser type='Talk' event_data={ event_data } />
      </div> }
    </div>
  )
}
