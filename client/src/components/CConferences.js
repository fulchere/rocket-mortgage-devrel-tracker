import React, {useState} from 'react'

import CEventBrowser from './CEventBrowser'

export default function CConferences() {

    const [event_data, setEvent_data] = useState(['DigiMarCon', 'DefCon 2021', 'ICCESATH', 'MSU Engineering Conference 2021', 'ICEECST'])

    return (
        <div>
            <CEventBrowser type='Conference' event_data={event_data} />
        </div>
    )
}
