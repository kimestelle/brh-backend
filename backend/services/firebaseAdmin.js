const admin = require('firebase-admin');
const serviceAccount = require('./brh-server-firebase-adminsdk-a5b5u-9b70e03647.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;