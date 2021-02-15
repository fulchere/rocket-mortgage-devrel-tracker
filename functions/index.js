
// The Cloud Functions for Firebase SDK to create Cloud Functions an
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
admin.initializeApp();

// Booth Collection
exports.addBooth = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const event_id = req.query.event_id;
    const name = req.query.name;
    const speaker_ids = req.query.speaker_ids.split(',');

    const new_booth = {event_id: parseInt(event_id),
        name: name,
        speaker_ids: speaker_ids}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('booths').add(new_booth);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to booths collection with ID: ${writeResult.id} added.`});
});

// CallForPapers Collection
exports.addCallforpapers = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const accepted = req.query.accepted;
    const deadline = req.query.deadline;
    const event_id = req.query.event_id;
    const speaker_id = req.query.speaker_id;
    const submitted = req.query.submitted;

    const new_callforpapers = {accepted: accepted,
        deadline: deadline,
        event_id: parseInt(event_id),
        speaker_id: parseInt(speaker_id),
        submitted: submitted}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('callforpapers').add(new_callforpapers);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to callforpapers collection with ID: ${writeResult.id} added.`});
});

// Event Collection
exports.addEvent = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const address = req.query.address;
    const attendees = req.query.attendees;
    const dei_affiliation = req.query.dei_affiliation;
    const description = req.query.description;
    const end = req.query.end;
    const facility = req.query.facility;
    const host_ids = req.query.host_ids.split(',');
    const name = req.query.name;
    const recruiting_partner = req.query.recruiting_partner;
    const seasonality = req.query.seasonality;
    const start = req.query.start;

    const new_event = {address: address,
        attendees: parseInt(attendees),
        dei_affiliation: dei_affiliation,
        description: description,
        end: end,
        facility: facility,
        host_ids: host_ids,
        name: name,
        recruiting_partner: recruiting_partner,
        seasonality: seasonality,
        start: start}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('events').add(new_event);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to events collection with ID: ${writeResult.id} added.`});
});

// Host Collection
exports.addHost = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const email = req.query.email;
    const event_ids = req.query.event_ids.split(',');
    const name = req.query.name;
    const phone_number = req.query.phone_number;

    const new_host = {email: email,
        event_ids: event_ids,
        name: name,
        phone_number: phone_number}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('hosts').add(new_host);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to hosts collection with ID: ${writeResult.id} added.`});
});

// Media Collection
exports.addMedia = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const name = req.query.name;
    const speaker_ids = req.query.speaker_ids.split(',');
    const type = req.query.type;

    const new_media = {name: name,
        speaker_ids: speaker_ids,
        type: type}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('media').add(new_media);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to media collection with ID: ${writeResult.id} added.`});
});

// Rating Collection
exports.addRating = functions.https.onRequest(async (req, res) => {

  // Grab the required parameters
  const event_id = req.query.event_id;
  const rating = req.query.rating;
  const speaker_id = req.query.speaker_id;
  const timestamp = req.query.timestamp;
  
  const new_rating = {event_id: parseInt(event_id),
                      rating: parseInt(rating),
                      speaker_id: parseInt(speaker_id),
                      timestamp: timestamp}

  // Push the new rating into the ratings collection within Firestore
  const writeResult = await admin.firestore().collection('ratings').add(new_rating);

  // Send back a message that we've successfully written the message
  res.json({result: `New rating added to ratings collection with ID: ${writeResult.id} added.`});
});

// Speaker Collection
exports.addSpeaker = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const booth_ids = req.query.booth_ids.split(',');
    const email = req.query.email;
    const media_ids = req.query.media_ids.split(',');
    const name = req.query.name;
    const role = req.query.role;
    const talk_ids = req.query.talk_ids.split(',');

    const new_speaker = {booth_ids: booth_ids,
        email: email,
        media_ids: media_ids,
        name: name,
        role: role,
        talk_ids: talk_ids}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('speakers').add(new_speaker);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to speakers collection with ID: ${writeResult.id} added.`});
});

// Talk Collection
exports.addTalk = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const accepted_status = req.query.accepted_status;
    const attendees = req.query.attendees;
    const description = req.query.description;
    const given_status = req.query.given_status;
    const speaker_ids = req.query.speaker_ids.split(',');
    const submitted_status = req.query.submitted_status;
    const title = req.query.title;

    const new_talk = {accepted_status: accepted_status,
        attendees: parseInt(attendees),
        description: description,
        given_status: given_status,
        speaker_ids: speaker_ids,
        submitted_status: submitted_status,
        title: title}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('talks').add(new_talk);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to talks collection with ID: ${writeResult.id} added.`});
});