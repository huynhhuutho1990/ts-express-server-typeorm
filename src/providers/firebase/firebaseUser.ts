import * as admin from 'firebase-admin';

export default interface FirebaseUser {
  firebaseUID: string;
  email?: string;
  phoneNumber?: string;
  tokenClaims: admin.auth.DecodedIdToken;
}
