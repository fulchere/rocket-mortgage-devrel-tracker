import React, {useState, useEffect} from 'react'

import {Container, Row, Col,Button, Badge} from 'shards-react'

import CAPIService from './CAPIService'

export default function CContact({contact_id}) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        CAPIService.getHost(contact_id)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            setEmail(response.email)
            setName(response.name)
            setPhone(response.phone)

          })
    
          return function cleanup() {
            mounted = false
          }
      })
        


    return (
        <div>
        {loading ? <div>loading</div> : 
        
        <Container>
            <Row>
                <div style = {{width:'100%'}}>{email}</div>
                <div style = {{width:'100%'}}>{name}</div>
                <div style = {{width:'100%'}}>{phone}</div>
            </Row>
        </Container>
        }
        </div>
    )
}
