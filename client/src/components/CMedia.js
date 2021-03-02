import React, {useState} from 'react'

import CEventBrowser from './CEventBrowser'

export default function CMedia() {

    const [event_data, setEvent_data] = useState(['Podcast', 'Video', 'Blog Post', 'Another Podcast'])

    return (
        <div>
            <CEventBrowser type='Media' event_data={event_data}/>
        </div>
    )
}
