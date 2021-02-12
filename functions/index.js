
// The Cloud Functions for Firebase SDK to create Cloud Functions an
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
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