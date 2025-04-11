/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(); // Initialize Firebase Admin SDK

const db = admin.firestore(); // Get Firestore database instance

// ... (Firebase Admin SDK initialization from step 4) ...

exports.redeemQrCode = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check: Ensure user is logged in
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }
  const userId = context.auth.uid;
  const qrCodeValue = data.qrCodeValue;
  if (!qrCodeValue) {
    throw new functions.https.HttpsError(
    "invalid-argument",
    "QR Code value is required.");}

  // --- Option 1: Validate against Hardcoded QR Codes (Simplest MVP) ---
  // const validQrCodes = ["QRCODE1", "QRCODE2", "QRCODE3"];
  // if (!validQrCodes.includes(qrCodeValue)) {
  //   throw new functions.https.HttpsError("not-found", "Invalid QR Code.");
  // }
  // const pointsToAward = 50; // Example points for any valid QR code

  // --- Option 2: Validate against Firestore "qrcodes" Collection (More Robust MVP) ---
  const qrCodeDoc = await db.collection("qrcodes").where("keyCode", "==", qrCodeValue).limit(1).get();

  if (qrCodeDoc.empty) {throw new functions.https.HttpsError("not-found", "Invalid QR Code.");}

  const qrCodeData = qrCodeDoc.docs[0].data();
  if (qrCodeData.redeemed) {
    throw new functions.https.HttpsError("already-exists","QR Code already redeemed.");}
  const pointsToAward = qrCodeData.pointsValue || 30; // Get points (default 30)
  const qrCodeDocRef = qrCodeDoc.docs[0].ref; // Reference to QR code document

  // 2. Award Points to User
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new functions.https.HttpsError("not-found", "User not found."); // unexpected
  }

  const currentPoints = userDoc.data().points || 0;
  const newPoints = currentPoints + pointsToAward;

  await userRef.update({points: newPoints});

  // 3. Mark QR Code as Redeemed (if using 'qrcodes' collection)
  await qrCodeDocRef.update({redeemed: true});

  return {
    message: `Successfully redeemed QR Code. Awarded ${pointsToAward} points. ` +
             `New total points: ${newPoints}`,
  };
});
// ... (Previous Cloud Function: redeemQrCode) ...

exports.submitFeedback = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Authentication required to submit feedback."
    );
  }
  const userId = context.auth.uid;
  const {serviceType, sentiment, feedbackText} = data;
  if (!serviceType || !sentiment) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Service type and sentiment are required."
    );
  }

  // 2. Store Feedback in Firestore
  const feedbackData = {
      userId: userId,
      serviceType: serviceType,
      sentiment: sentiment,
      feedbackText: feedbackText || null, // Optional feedback text
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Server timestamp
  };

  await db.collection("feedback").add(feedbackData);

  // 3. Award Points for Feedback Submission (Optional - but good for engagement)
  const pointsForFeedback = 20; // Example points for submitting feedback
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new functions.https.HttpsError("not-found", "User not found."); // Should not happen
  }

  const currentPoints = userDoc.data().points || 0;
  const newPoints = currentPoints + pointsForFeedback;
  await userRef.update({points: newPoints});
  return {
    message: `Feedback submitted successfully. Awarded ${pointsForFeedback} points. ` +
             `New total points: ${newPoints}`,
  };
});
// Your Cloud Functions will be defined below this...

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
