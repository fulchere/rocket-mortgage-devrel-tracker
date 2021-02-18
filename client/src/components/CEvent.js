import React from 'react'

import CEventConference from './CEventConference'
import CEventTalk from './CEventTalk'
import CEventMedia from './CEventMedia'

export default function CEvent({type}) {

    if (type === 'Conference'){
        return (
            <CEventConference />
        )
    }
    else if (type === 'Talk'){
        return (
            <CEventTalk />
        )
    }
    else if (type === 'Media'){
        return (
            <CEventMedia />
        )
    }
    
    return(
        <div></div>
    )
}
