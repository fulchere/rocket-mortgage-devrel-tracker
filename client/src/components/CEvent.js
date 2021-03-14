import React from 'react'

import CEventConference from './CEventConference'
import CEventTalk from './CEventTalk'
import CEventMedia from './CEventMedia'

export default function CEvent({ type, event_id }) {

    if (type === 'Conference') {
        return (
            <div style={ { margin: '20px' } }>
                <CEventConference event_id={ event_id } />
            </div>
        )
    }
    else if (type === 'Talk') {
        return (
            <div style={ { margin: '20px' } }>
                <CEventTalk event_id={ event_id } />
            </div>
        )
    }
    else if (type === 'Media') {
        return <div style={ { margin: '20px' } }>
            <CEventMedia event_id={ event_id } />
        </div>
    }

    return (
        <div></div>
    )
}
