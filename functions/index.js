
// The Cloud Functions for Firebase SDK to create Cloud Functions an
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
admin.initializeApp();

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

exports.addCallForPapers = functions.https.onRequest(async (req, res) => {

    // Grab the required parameters
    const accepted = req.query.accepted;
    const deadline = req.query.deadline;
    const event_id = req.query.event_id;
    const speaker_id = req.query.speaker_id;
    const submitted = req.query.submitted;

    const new_callForPapers = {accepted: accepted,
        deadline: deadline
        event_id: parseInt(event_id),
        speaker_id: parseInt(speaker_id),
        submitted: submitted}

    // Push the new rating into the hosts collection within Firestore
    const writeResult = await admin.firestore().collection('callForPapers').add(new_callForPapers);

    // Send back a message that we've successfully written the message
    res.json({result: `New rating added to callForPapers collection with ID: ${writeResult.id} added.`});
});