import React, {useState} from 'react'

import CEventBrowser from './CEventBrowser'

export default function CMedia() {

    const [event_data, setEvent_data] = useState([{name: 'Podcast', event_id:"0"}, {name: 'Video', event_id:"1"}, {name: 'Livestream', event_id:"2"}])

    return (
        <div>
            <CEventBrowser type='Media' event_data={event_data}/>
        </div>
    )
}
