import admin from 'firebase-admin';

/**
 * Initialize firebase app to use firebase services
 */
export const initialise = () => {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}