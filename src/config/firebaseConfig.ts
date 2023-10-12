import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tu-proyecto-id.firebaseio.com",
});

export const db = admin.firestore();
