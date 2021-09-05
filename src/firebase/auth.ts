import { FirebaseError } from "@firebase/util";
import { firebaseAuth, auth as iAuth } from "./client";
import isAdmin from "./helper";
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  permission: string;
}

class Auth {
  async login(cb: (user: User) => void, onFailed: (error: string) => void) {
    const provider = new firebaseAuth.GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    const credential = await firebaseAuth.signInWithPopup(iAuth, provider);
    const result = await isAdmin(credential.user.email!);
    const user = {
      id: credential.user.uid,
      name: credential.user.displayName,
      email: credential.user.email,
      imageUrl: credential.user.photoURL,
      permission: result === true ? "editor" : "user",
    };
    if (user.permission !== "user") {
      cb(user);
    } else {
      onFailed('you don\'t have admin permission')
    }
    // try {
    // } catch (firebaseError) {
    //   onFailed((firebaseError as FirebaseError).message)
    //   console.log('error')
    // }
  }
  async logout(cb: () => void) {
    await firebaseAuth.signOut(iAuth);
    cb();
  }
}

const auth = new Auth();
export default auth;
