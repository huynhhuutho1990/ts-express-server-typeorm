import * as admin from 'firebase-admin';
import { app } from './firebase.config';

export default class FirebaseAuthService {
  static async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decoded = await app.auth().verifyIdToken(idToken);
      return decoded;
    } catch (e) {
      return null;
    }
  }

  static async getUserFromUid(uid: string): Promise<admin.auth.UserRecord> {
    const user = await app.auth().getUser(uid);
    return user;
  }

  static async setUserCustomClaims(uid: string, claims: { [key: string]: any }): Promise<void> {
    return app.auth().setCustomUserClaims(uid, claims);
  }

  static async addUserCustomClaims(uid: string, claims: { [key: string]: any }): Promise<void> {
    const user = await this.getUserFromUid(uid);
    const allClaims = user.customClaims || {};

    return this.setUserCustomClaims(uid, Object.assign({}, allClaims, claims));
  }

  static async removeUserCustomClaims(uid: string, ...keys: Array<string>): Promise<void> {
    const user = await this.getUserFromUid(uid);
    const allClaims = user.customClaims || {};

    const result = Object.assign({}, allClaims);
    for (const key of keys) {
      delete result[key];
    }
    return this.setUserCustomClaims(uid, result);
  }

  static async addUserRole(uid: string, ...roleNames: Array<string>): Promise<void> {
    const user = await this.getUserFromUid(uid);
    const roles: Set<string> = new Set(user.customClaims?.roles || []);
    for (const roleName of roleNames) {
      roles.add(roleName);
    }

    return this.addUserCustomClaims(uid, { roles: Array.from(roles) });
  }

  static async removeUserRole(uid: string, ...roleNames: Array<string>): Promise<void> {
    const user = await this.getUserFromUid(uid);
    const roles: Set<string> = new Set(user.customClaims?.roles || []);
    for (const roleName of roleNames) {
      roles.delete(roleName);
    }

    return this.addUserCustomClaims(uid, { roles: Array.from(roles) });
  }
}
