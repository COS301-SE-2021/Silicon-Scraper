import admin from 'firebase-admin';

/**
 * Initialize firebase app to use firebase services
 */
export const initialise = () => {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}