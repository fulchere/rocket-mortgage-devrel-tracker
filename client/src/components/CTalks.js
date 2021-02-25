import React, {useState} from 'react'

import CEventBrowser from './CEventBrowser'

export default function CTalks() {

    const [event_data, setEvent_data] = useState(['1', '2', '3', '4', '5'])

    return (
        <div>
            <CEventBrowser type="Talk" event_data={event_data}/>
        </div>
    )
}
