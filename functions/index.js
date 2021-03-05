
// The Cloud Functions for Firebase SDK to create Cloud Functions an
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
const { json } = require('express');
admin.initializeApp();

// Booths Collection
exports.addBooth = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const event_id = req.query.event_id;
    const name = req.query.name;
    const speaker_ids = req.query.speaker_ids.split(',');
    const booth_id = req.query.booth_id;

    const new_booth = {event_id: parseInt(event_id),
        name: name,
        speaker_ids: speaker_ids,
        booth_id: booth_id}

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
    const callforpapers_id = req.query.callforpapers_id;

    const new_callforpapers = {accepted: accepted,
        deadline: deadline,
        event_id: parseInt(event_id),
        speaker_id: parseInt(speaker_id),
        submitted: submitted,
        callforpapers_id: callforpapers_id}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('callforpapers').add(new_callforpapers);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to callforpapers collection with ID: ${writeResult.id} added.`});
});

// Events Collection
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
    const event_id = req.query.event_id;
    const speaker_ids = req.query.speaker_ids.split(',');

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
        start: start,
        event_id: event_id,
        speaker_ids: speaker_ids}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('events').add(new_event);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to events collection with ID: ${writeResult.id} added.`});
});

// Hosts Collection
exports.addHost = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const email = req.query.email;
    const event_ids = req.query.event_ids.split(',');
    const name = req.query.name;
    const phone_number = req.query.phone_number;
    const host_id = req.query.host_id;

    const new_host = {email: email,
        event_ids: event_ids,
        name: name,
        phone_number: phone_number,
        host_id: host_id}

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
    const media_id = req.query.media_id;

    const new_media = {name: name,
        speaker_ids: speaker_ids,
        type: type,
        media_id: media_id}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('media').add(new_media);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to media collection with ID: ${writeResult.id} added.`});
});

// Ratings Collection
exports.addRating = functions.https.onRequest(async (req, res) => {

  // Grab the required parameters
    const event_id = req.query.event_id;
    const rating = req.query.rating;
    const speaker_id = req.query.speaker_id;
    const timestamp = req.query.timestamp;
    const rating_id = req.query.rating_id;

    const new_rating = {event_id: parseInt(event_id),
        rating: parseInt(rating),
        speaker_id: parseInt(speaker_id),
        timestamp: timestamp,
        rating_id: rating_id}

  // Push the new rating into the ratings collection within Firestore
  const writeResult = await admin.firestore().collection('ratings').add(new_rating);

  // Send back a message that we've successfully written the message
  res.json({result: `New rating added to ratings collection with ID: ${writeResult.id} added.`});
});

// Speakers Collection
exports.addSpeaker = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const booth_ids = req.query.booth_ids.split(',');
    const email = req.query.email;
    const media_ids = req.query.media_ids.split(',');
    const name = req.query.name;
    const role = req.query.role;
    const talk_ids = req.query.talk_ids.split(',');
    const speaker_id = req.query.speaker_id;
    const event_ids = req.query.event_ids.split(',');

    const new_speaker = {booth_ids: booth_ids,
        email: email,
        media_ids: media_ids,
        name: name,
        role: role,
        talk_ids: talk_ids,
        speaker_id: speaker_id,
        event_ids: event_ids}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('speakers').add(new_speaker);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to speakers collection with ID: ${writeResult.id} added.`});
});

// Talks Collection
exports.addTalk = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const accepted_status = req.query.accepted_status;
    const attendees = req.query.attendees;
    const description = req.query.description;
    const given_status = req.query.given_status;
    const speaker_ids = req.query.speaker_ids.split(',');
    const submitted_status = req.query.submitted_status;
    const title = req.query.title;
    const talk_id = req.query.talk_id;

    const new_talk = {accepted_status: accepted_status,
        attendees: parseInt(attendees),
        description: description,
        given_status: given_status,
        speaker_ids: speaker_ids,
        submitted_status: submitted_status,
        title: title,
        talk_id: talk_id}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('talks').add(new_talk);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to talks collection with ID: ${writeResult.id} added.`});
});

// Get all documents in the booth collection
exports.getBoothByEventId = functions.https.onRequest(async (req, res) => {

    const event_id = req.query.event_id;

    const boothRef = await admin.firestore().collection('booths');
    const snapshot = await boothRef.where('event_id', '==', event_id).get();

    const boothResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the booths collection
    res.json({documents: boothResult});
});

// Get all documents in the booth collection
exports.getEventByEventId = functions.https.onRequest(async (req, res) => {

    const event_id = req.query.event_id;

    const boothRef = await admin.firestore().collection('events');
    const snapshot = await boothRef.where('event_id', '==', event_id).get();

    const boothResult = snapshot.docs.map(doc => doc.data());

    // Send back all the matching events by event_id from the events collection
    res.json({documents: boothResult});
});

// Get all documents in the callforpapers collection
exports.getCallforpapers = functions.https.onRequest(async (req, res) => {

    const callforpapersRef = await admin.firestore().collection('callforpapers');
    const snapshot = await callforpapersRef.get();

    const callforpapersResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the callforpapers collection
    res.json({documents: callforpapersResult});
});

// Get all documents in the events collection
exports.getEventNames = functions.https.onRequest(async (req, res) => {

    const eventRef = await admin.firestore().collection('events');
    const snapshot = await eventRef.get();

    const eventResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the events collection
    res.json({documents: eventResult});
});

// Get all documents in the hosts collection
exports.getHost = functions.https.onRequest(async (req, res) => {

    const hostRef = await admin.firestore().collection('hosts');
    const snapshot = await hostRef.get();

    const hostResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the hosts collection
    res.json({documents: hostResult});
});

// Get all documents in the media collection
exports.getMedia = functions.https.onRequest(async (req, res) => {

    const mediaRef = await admin.firestore().collection('media');
    const snapshot = await mediaRef.get();

    const mediaResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the media collection
    res.json({documents: mediaResult});
});

// Get all documents in the ratings collection
exports.getRating = functions.https.onRequest(async (req, res) => {

    const ratingRef = await admin.firestore().collection('ratings');
    const snapshot = await ratingRef.get();

    const ratingResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the ratings collection
    res.json({documents: ratingResult});
});

// Get all documents in the speakers collection
exports.getSpeaker = functions.https.onRequest(async (req, res) => {

    const speakerRef = await admin.firestore().collection('speakers');
    const snapshot = await speakerRef.get();

    const speakerResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the speakers collection
    res.json({documents: speakerResult});
});

// Get all documents in the speakers collection
exports.getSpeakerByEmail = functions.https.onRequest(async (req, res) => {

    const email = req.query.email;

    const speakerRef = await admin.firestore().collection('speakers');
    const snapshot = await speakerRef.where('email', '==', email).get();

    const speakerResult = snapshot.docs.map(doc => doc.data());

    // Send back the specific user from the speakers collection
    res.json({documents: speakerResult});
});

// Get event ids in the speakers collection
exports.getSpeakerEvents = functions.https.onRequest(async (req, res) => {

    const email = req.query.email;


    const speakerRef = await admin.firestore().collection('speakers').doc('event_ids');

    const snapshot = await speakerRef.where('email', '==', email).get();



    const speakerResult = snapshot.docs.map(doc => doc.data());

    // Send back the specific user from the speakers collection
    res.json({documents: speakerResult});
});

// Get all documents in the talks collection
exports.getTalk = functions.https.onRequest(async (req, res) => {

    const talkRef = await admin.firestore().collection('talks');
    const snapshot = await talkRef.get();

    const talkResult = snapshot.docs.map(doc => doc.data());

    // Send back all the documents from the talks collection
    res.json({documents: talkResult});
});

// TODO
//
// ETHAN
// - rename getEvent function to getEventNames
// - change the getEvent function to that it only returns the name field, description field, and event_id field of each event document
// 
// TYLER
// - create new function named: getSpeakerEvents,
// a function that returns the array of event_ids
// within the specific speaker document. the query param for
// this function would be speaker_id (the email)
// - this would be similar to the getSpeakerByEmail function, but
// you will extend the functionality so that it returns only the event_ids:
// something like speakerResult.event_ids
//
//
// - IN ADDITION: any collection that has documents with arrays, we need to create functions to add elements to that array, so that we don't have to delete and create an entirely new document
// - - we will have to figure out how to do this later
// 
// - find way to set default (null?) parameters so if they dont pass all the query params it doesnt throw an error