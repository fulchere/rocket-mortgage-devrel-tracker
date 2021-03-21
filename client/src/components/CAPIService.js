import axios from 'axios'

const baseUrl = 'https://us-central1-rocket-mortgage-devrel-tracker.cloudfunctions.net/'

const cors_hack = 'https://cors-anywhere.herokuapp.com/'

const getAllEvents = () => {
  const request = axios.get(cors_hack + baseUrl + 'getAllEventIDsAndNames')
  return request.then(response => response.data)
}

const getAllUserEvents = (email) => {
  console.log(cors_hack + baseUrl + 'getSpeakerEvents?email=' + email)
  const request = axios.get(cors_hack + baseUrl + 'getSpeakerEvents?email=' + email)
  return request.then(response => response.data)
}

const getEvent = (event_id) => {
  const request = axios.get(cors_hack + baseUrl + 'getEventByID?ID=' + event_id)
  return (
    request.then(response => response.data)
    .catch(res => {}))
}

const getTalk = () => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'getAllTalks')
  return request.then(response => response.data)
}
const addRating = (data) => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'addRating',{params:data})
  return request.then(response => response.data)
}
const getRatingByID = (id) => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'getRatingByID?ID='+id)
  return request.then(response => response.data)
}
const addTalk = (data) => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'addTalk',{params:data})
  return request.then(response => response.data)
}


const getSpecifiedURL = (url) => {
    const request = axios.get(url)
    return (
      request.then(response => response.data)
      .catch(res => {}))
  }

export default { getAllEvents, , getAllUserEvents, getEvent, getTalk, getSpecifiedURL,addRating,getRatingByID,addTalk}
