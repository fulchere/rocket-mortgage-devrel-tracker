import axios from 'axios'
const baseUrl = 'https://us-central1-rocket-mortgage-devrel-tracker.cloudfunctions.net/'
const cors_hack = 'http://localhost:8080/'
const getAllEvents = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllEventIDsAndNames')
  return request.then(response => response.data)
}

const getAllUserEvents = (email) => {
  const request = axios.get(cors_hack + baseUrl + 'getSpeakerEvents?email=' + email)
  return request.then(response => response.data)
}

const getAllUserTalks = (email) => {
  const request = axios.get(cors_hack + baseUrl + 'getSpeakerTalks?email=' + email)
  return request.then(response => response.data)
}
const getAllUserMedia = (email) => {
  const request = axios.get(cors_hack + baseUrl + 'getAllUserMedias?email=' + email)
  return request.then(response => response.data)
}

const getEvent = (event_id) => {
  const request = axios.get(cors_hack + baseUrl + 'getEventByID?ID=' + event_id)
  return (
    request.then(response => response.data)
    .catch(res => {}))
}


const getTalk = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllTalks')
  return request.then(response => response.data)
}
const addRating = (data) => {
  const request = axios.get(cors_hack + baseUrl + 'addRating' , {params:data})
  return request.then(response => response.data)
}
const addTalkToEventByEventId = (data) => {
  const request = axios.get(cors_hack + baseUrl + 'addTalkToEventByEventId' , {params:data})
  return request.then(response => response.data)
}
const addEventToTalkByTalkId = (data) => {
  const request = axios.get(cors_hack + baseUrl + 'addEventToTalkByTalkId' , {params:data})
  return request.then(response => response.data)
}
const getRatingByID = (id) => {
  const request = axios.get(cors_hack + baseUrl + 'getRatingByID?ID='+id)
  return request.then(response => response.data)
}
const getAllMedia = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllMedia')
  return request.then(response => response.data)
}
const getTalkByID = (id) => {
  const request = axios.get(cors_hack + baseUrl + 'getTalkByID?ID='+id)
  return request.then(response => response.data)
}
const getMediaByID = (id) => {
  const request = axios.get(cors_hack + baseUrl + 'getMediaByID?ID='+id)
  return request.then(response => response.data)
}
const addMedia = (data) => {
  const request = axios.get(cors_hack + baseUrl + 'addMedia',{params:data})
  return request.then(response => response.data)
}
const getRatingByEventByID = (id) => {
  const request = axios.get(cors_hack + baseUrl + 'getRatingByEventByID?ID='+id)
  return request.then(response => response.data)
}
const getAllRatings = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllRatings')
  return request.then(response => response.data)
}
const getUserRatingOfEvent = (event_id, email) => {
  const request = axios.get(cors_hack + baseUrl + 'getUserRatingAndAverageRatingOfEvent?event_id=' + event_id + '&email=' + email)
  return request.then(response => response.data)
}
const addTalk = (data) => {
  const request = axios.get(cors_hack + baseUrl + 'addTalk',{params:data})
  return request.then(response => response.data)
}



const addExistingEventToSpeaker = (speaker_id, event_id) => {
  const request = axios.get(cors_hack + baseUrl + 'addEventToSpeakerBySpeakerId?speaker_id=' + speaker_id + '&event_id=' + event_id)
  return request.then(response => response.data)
}

const addNewEventToSpeaker = (speaker_id, name, address, facility, attendees, dei_affiliation, description, start, end, host, recruiting_partner, seasonality, talk_ids) => {
  const request = axios.get(cors_hack + baseUrl + 'addEvent?address=' + address + "&attendees=" + attendees + "&facility=" + facility + "&dei_affiliation=" + dei_affiliation + "&description=" + description + "&name=" + name + "&start=" + start + "&end=" + end + "&host_ids=" + host + "&recruiting_partner=" + recruiting_partner + "&seasonality=" + seasonality + "&speaker_ids=" + speaker_id + "&talk_ids=" + talk_ids)
  return request.then(response => response.data)
}

const getSpeaker = (speaker_email) => {
  const request = axios.get(cors_hack + baseUrl + 'getSpeakerByEmail?email=' + speaker_email)
  return request.then(response => response.data)
}

const getAllHosts = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllHosts')
  return request.then(response => response.data)
}

const getHost = (host_id) => {
  const request = axios.get(cors_hack + baseUrl + 'getHostByID?ID=' + host_id)
  return request.then(response => response.data)
}

const addNewContact = (name, email, phone, event_id) => {
  const request = axios.get(cors_hack + baseUrl + 'addHost?event_ids=' + event_id + "&email=" + email + "&name=" + name + "&phone_number=" + phone)
  return request.then(response => response.data)
}

const addContactToEvent = (contact_id,event_id) => {
  const request = axios.get(cors_hack + baseUrl + 'addHostToEventByEventId?event_id=' + event_id + "&host_id=" + contact_id)
  return request.then(response => response.data)
}

const getSpecifiedURL = (url) => {
    const request = axios.get(url)
    return (
      request.then(response => response.data)
      .catch(res => {}))
  }

export default {addTalkToEventByEventId,getAllUserEvents,getAllUserTalks,getRatingByID, addEventToTalkByTalkId, getUserRatingOfEvent, getTalkByID,addMedia,getMediaByID, getAllMedia,getAllEvents, getEvent, getTalk, getSpecifiedURL,addRating,getRatingByEventByID,addTalk,getAllRatings, addNewEventToSpeaker, addExistingEventToSpeaker, getSpeaker, getHost, addNewContact, addContactToEvent, getAllHosts}
