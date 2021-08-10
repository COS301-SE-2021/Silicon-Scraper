import admin from 'firebase-admin';

export const initialise = () => {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}