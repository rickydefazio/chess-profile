import admin from 'firebase-admin';
import { PlayerDocument } from './types';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      })
    });

    console.log('Firebase Admin initialized successfully');

    admin.firestore().settings({
      ignoreUndefinedProperties: true
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

const db = admin.firestore();

export async function createPlayer(player: PlayerDocument): Promise<void> {
  await db.collection('players').doc(player.username).set(player);
}

export async function updatePlayer(
  username: string,
  updateData: Partial<PlayerDocument>
) {
  await db.collection('players').doc(username).update(updateData);
}

export async function getPlayer(username: string) {
  const snapshot = await db.collection('players').doc(username).get();

  if (!snapshot.exists) {
    console.warn('No such player exists in the database.');
    return null;
  }

  const data = snapshot.data();

  if (!data) {
    console.warn('No data found for player:', username);
    return null;
  }

  return data;
}

export default admin;
