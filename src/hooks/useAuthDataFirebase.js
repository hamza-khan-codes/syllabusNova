import { authStateController } from "@/controllers/authControllers";
import { authStart, authStateAndSuccess } from "@/features/Auth/authSlices";
import { getCurrentUser } from "@/services/firestoreService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuthDatafromFirebase() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authStart());
    const unsubscribe = authStateController(async (user) => {
      const currentUser = await getCurrentUser()
      const safeUser = user
        ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          User: currentUser
            ? {
              ...currentUser,
              createdAt: currentUser.createdAt?.toMillis(),
              updatedAt: currentUser.updatedAt?.toMillis(),
            }
            : null,
        }
        : null;
      dispatch(authStateAndSuccess(safeUser));

    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth)

  return { user }
}
