import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { updateUserProfileController } from "@/controllers/authControllers";


// LOGIN User
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Delete User account
export async function deleteUserAccount(user) {
  return await deleteUser(user);
}

// LOGOUT user
export async function logOut() {
  return await signOut(auth);
}

// REGISTERATION - UserAndVerification
export async function registerUserAndVerify(
  email,
  password,

) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await sendEmailVerification(userCredential.user);
  console.log("Verification email has been sent!");

  return userCredential;
}

// USER STATE
export function authState(callback) {
  return onAuthStateChanged(auth, callback);
}

// UPDATE Profile
export async function updateUserProfile(UserName = null, PhotoUrl = null) {
  onAuthStateChanged(auth, async (user) => {
    await updateProfile(user, {
      displayName: UserName,
      photoURL: PhotoUrl,
    });
  });
}

// RESENT verification email
export async function resentVerificationEmail() {
  onAuthStateChanged(auth, async (user) => {
    await sendEmailVerification(user);
  });
}



// RESET password
export async function forgotPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}


