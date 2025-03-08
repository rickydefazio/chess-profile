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
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

const db = admin.firestore();

/**
 * Creates a new player document in Firestore using Admin SDK
 * @param player - Player object with username, data, and timestamp
 */
export async function createPlayer(player: PlayerDocument): Promise<void> {
  await db.collection('players').doc(player.username).set(player);
}

/**
 * Updates an existing player document in Firestore using Admin SDK
 * @param username - The player's username
 * @param updateData - The data to update (contains data and timestamp)
 */
export async function updatePlayer(
  username: string,
  updateData: Partial<PlayerDocument>
) {
  await db.collection('players').doc(username).update(updateData);
}

/**
 * Retrieves a player document from Firestore using Admin SDK
 * @param username - The player's username
 * @returns The player document or null if not found
 */
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
