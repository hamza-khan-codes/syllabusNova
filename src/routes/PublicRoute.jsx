import { ROUTES } from "@/constant/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "@/components/common/Loading";

export default function PublicRoute() {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="absolute inset-0">
        <Loading />
      </div>
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
