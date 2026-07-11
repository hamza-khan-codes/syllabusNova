import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useSelector } from "react-redux";
import Loading from "@/components/common/Loading";

export default function ProtectedRoute() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="absolute inset-0">
        <Loading />
      </div>
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
