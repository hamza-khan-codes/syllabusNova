import { domainError } from "@/constant/Error";
import {
  authState,
  deleteUserAccount,
  forgotPassword,
  loginUser,
  logOut,
  registerUserAndVerify,
  resentVerificationEmail,
  updateUserProfile,
} from "@/services/authService";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";
import getUsersMailBoxUrl from "@/utils/getUsersMailBoxUrl";

import { toast } from "sonner";

// REGISTER - Controller
export async function RegisterAndVarifyController(email, password, name) {
  if (!email || !password) {
    toast.error("Please - Enter email and password.");
    throw new Error("Please");
  } else if (!getUsersMailBoxUrl(email)) {
    toast.error("Please use correct domain.");
    throw new Error(domainError);
  } else {
    const mailBoxUrl = getUsersMailBoxUrl(email);

    await registerUserAndVerify(email, password, name);
    toast.success(`A verification email has been sent to your inbox.`, {
      action: {
        label: "Open",
        onClick: () => window.open(mailBoxUrl, "_blank"),
      },
      duration: 30000,
    });
  }
}

// USER-STATE - Controller
export function authStateController(callback) {
  try {
    return authState(callback);
  } catch (error) {
    console.log("Error authStateController ::", error);
  }
}

// USER-PROFILE-UPDATE - Controller
export async function updateUserProfileController(userName, userPhotoURL) {
  try {
    if(!userName && !userPhotoURL) throw new Error("Please Enter User Photo or Name")
    updateUserProfile(userName, userPhotoURL);
  } catch (error) {
    console.log("Error update UserProfileController ::", error);
  }
}

// RESENT VERIFICATION MAIL - Controller
export async function resentVerificationMailController() {
  try {
    resentVerificationEmail();
    authStateController( (user) => {
      const { email } = user
      console.log("Email :", email)
      const mailBoxUrl = getUsersMailBoxUrl(email)
      toast.success(`Verification Mail has been sent to your Mail box.`, {
        action: {
          label: "Open",
          onClick: () => window.open(mailBoxUrl, "_blank"),
        },
        duration: 30000,
      });
    })
  } catch (error) {
    console.log("Error update resentVerificationMailController ::", error);
  }
}

//LogOut - Controller 
export async function logoutController() {
  try {
    await logOut()
  } catch (error) {
    console.log("Error update logoutController ::", error);
  }
}

//Login - Controller
export async function loginUserController(email, password) {
    if (!email || !password) throw new Error("Please Enter Email and Password.")
    await loginUser(email,password)
}

//Delete user - Controller
export async function deleteUserAccountController(user) {
  try {
    if (!user) throw new Error("Please Enter User")
    await deleteUserAccount(user)
    } catch (error) {
    console.log(
      "Error update deleteUserAccountController ::",
      error,
    );
  }
}

//Forgot password - Controller
export async function forgotPasswordController(email) {
  try {
    if(!email) throw new Error("Please Enter an Email.")
    return await forgotPassword(email)
  } catch (error) {
    console.log("Error : forgotPasswordController ::", error)
    toast.error(getFirebaseAuthError(error.message))
  }
}

