import React from 'react'

import CEventConference from './CEventConference'
import CEventTalk from './CEventTalk'
import CEventMedia from './CEventMedia'

export default function CEvent({type}) {

    if (type === 'Conference'){
        return (
            <div style={{margin:'20px'}}>
            <CEventConference />
            </div>
        )
    }
    else if (type === 'Talk'){
        return (
            <div style={{margin:'20px'}}>
            <CEventTalk />
            </div>
        )
    }
    else if (type === 'Media'){
        <div style={{margin:'20px'}}>
        <CEventMedia />
        </div>
    }
    
    return(
        <div></div>
    )
}
