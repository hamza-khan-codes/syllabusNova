import { authStateController } from "@/controllers/authControllers";
import { authStart, authStateAndSuccess } from "@/features/Auth/authSlices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuthDatafromFirebase() {
    const dispatch = useDispatch()
  useEffect( () => {
    dispatch(authStart());
   const unsubscribe =  authStateController((user) => {
      const safeUser = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
          }
       : null;
     dispatch(authStateAndSuccess(safeUser));
     
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth)

  return {user}
}
