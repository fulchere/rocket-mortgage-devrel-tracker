import React, {useState} from 'react'

import CEventBrowser from './CEventBrowser'

export default function CTalks() {
    const [event_data, setEvent_data] = useState(['Example Talk 1', 'Example Talk 2', 'Example Talk 3', 'Example Talk 4', 'Example Talk 5'])

    return (
        <div>
            <CEventBrowser type="Talk" event_data={event_data}/>
        </div>
    )
}
