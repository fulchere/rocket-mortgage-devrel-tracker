import axios from 'axios'
const baseUrl = 'https://us-central1-rocket-mortgage-devrel-tracker.cloudfunctions.net/'

const getAllEvents = () => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'getEventNames')
  return request.then(response => response.data)
}

const getEvent = (event_id) => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'getEventByEventId?event_id=' + event_id)
  return (
    request.then(response => response.data)
    .catch(res => {}))
}

const getTalk = () => {
  const request = axios.get('https://cors-anywhere.herokuapp.com/' + baseUrl + 'getTalk')
  return request.then(response => response.data)
}


const getSpecifiedURL = (url) => {
    const request = axios.get(url)
    return (
      request.then(response => response.data)
      .catch(res => {}))
  }

export default { getAllEvents, getEvent, getTalk, getSpecifiedURL}
