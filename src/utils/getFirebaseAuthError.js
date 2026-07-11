import getMatchWords from "./getMatchWords";

const firebaseAuthErrors = {
  // Login
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-disabled": "This account has been disabled.",

  // Registration
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password must be at least 6 characters.",

  // Validation
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-email": "Email is required.",
  "auth/missing-password": "Password is required.",

  // Network
  "auth/network-request-failed": "Check your internet connection.",
  "auth/too-many-requests":
    "Too many requests. Please try again later.",

  // Configuration
  "auth/operation-not-allowed":
    "Email/password authentication is disabled.",
  "auth/admin-restricted-operation":
    "This operation is restricted.",

  // Generic
  "auth/internal-error": "Something went wrong.",
};



export default function getFirebaseAuthError(error) {
        try {
          return  getMatchWords(error,firebaseAuthErrors)
        } catch (error) {
            console.log(error)
        }
}
