import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const region = 'europe-west3';

admin.initializeApp();

const isAdmin = async (id: string) => {
  const user = await admin.firestore().doc(`users/${id}`).get();
  return user.data()?.role === 'admin';
};

export const onUserCreated = functions
  .region(region)
  .auth.user()
  .onCreate(async user => {
    await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({role: 'user', name: user.displayName, email: user.email});
  });

export const addToSongs = functions
  .region(region)
  .https.onCall(async ({songId}: {songId: string}, context) => {
    if (!songId) {
      return {status: 'error', code: 401, message: 'No song ID provided'};
    }
    if (!context.auth) {
      return {status: 'error', code: 401, message: 'Not signed in'};
    }
    if (!(await isAdmin(context.auth.uid))) {
      return {status: 'error', code: 401, message: 'No privileges'};
    }
    await admin.firestore().runTransaction(async transaction => {
      const lastSong = await transaction.get(
        admin
          .firestore()
          .collection('songs')
          .orderBy('number', 'desc')
          .limit(1),
      );
      transaction.update(admin.firestore().doc(`songs/${songId}`), {
        checkRequired: false,
        number: lastSong.docs[0].data().number + 1,
      });
    });
    return {status: 'success', code: 200, message: 'Successfully added song'};
  });
