import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "@/pages/LoadingPage";
import { useEffect } from "react";
import { authFailure, authLogout, authStart, authStateAndSuccess } from "@/features/Auth/authSlices";
import { getCurrentUser } from "@/services/firestoreService";
import { toast } from "sonner";

export default function ProtectedRoute() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authStart())
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          dispatch(authStateAndSuccess(user))
          toast.success("Login successful!");
        } else {
          dispatch(authLogout());
          toast.info("You have been logged out.");
        }

      } catch (error) {
        dispatch(authFailure(error))
        toast.error(error)
      }
    }
    fetchUser()
  }, [])


  if (loading) {
    return (
      <LoadingPage />
    );
  }
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (!user.emailVerified) {

    return <Navigate to={ROUTES.VERIFICATION} replace />;
  }

  return <Outlet />;
}
