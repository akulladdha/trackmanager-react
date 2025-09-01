import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
export const doSignOut=()=>{
    return auth.signOut();
}
export const doPasswordReset=async(email)=>{
    return auth.sendPasswordResetEmail(email);
}
export const doPasswordUpdate=async(password)=>{
    const user = auth.currentUser;
    return user.updatePassword(password);
}