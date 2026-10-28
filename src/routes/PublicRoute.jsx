import { ROUTES } from "@/constant/routes";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import LoadingPage from "@/pages/LoadingPage";
import { useEffect } from "react";
import { authFailure, authLogout, authStart, authStateAndSuccess } from "@/features/Auth/authSlices";
import { getCurrentUser } from "@/services/firestoreService";

import { toast } from "sonner";

export default function PublicRoute() {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch()
  console.log("USER", user)
  useEffect(() => {
    dispatch(authStart())

    const fetchUser = async () => {
      try {
        console.log("Error")
        const user = await getCurrentUser();
        console.log("Error",user)
        if (user) {
          dispatch(authStateAndSuccess(user));
          toast.success("Login successful!");
        } else {
          dispatch(authLogout());
          toast.info("You have been logged out.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        dispatch(authFailure(error?.message || "Failed to fetch user"));
      }
    };

    fetchUser()
  }, [])


  if (loading) {
    return (
      <LoadingPage />
    );
  }

  // User is logged in but hasn't verified their email
  if (user && !user.emailVerified) {
    // Allow access to the verification page itself to avoid redirect loops
    if (location.pathname === ROUTES.VERIFICATION) {
      return <Outlet />;
    }
    return <Navigate to={ROUTES.VERIFICATION} replace />;
  }

  // User is logged in and verified
  if (user && user.emailVerified) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  // User is not logged in
  return <Outlet />;
}
