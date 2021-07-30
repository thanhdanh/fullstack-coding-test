import firebaseClient  from 'firebase/app';
import 'firebase/auth';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
}

if (!firebaseClient .apps.length) {
    firebaseClient.initializeApp(firebaseCredentials);
}

export { firebaseClient  };
