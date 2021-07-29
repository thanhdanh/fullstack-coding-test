import firebaseAdmin from "firebase-admin";

const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const databaseName = process.env.FIREBASE_DATABASE_NAME;

if (!privateKey || !clientEmail || !projectId) {
    console.log(
      `Failed to load Firebase credentials.`
    );
}

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey,
            clientEmail,
            projectId,
        }),
        databaseURL: `https://${databaseName}.firebaseio.com`
    })
}

const db = firebaseAdmin.firestore();

export { firebaseAdmin, db };
