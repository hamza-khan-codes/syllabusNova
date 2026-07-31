import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useSelector } from "react-redux";
import Loading from "@/components/common/Loading";

export default function ProtectedRoute() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-background flex justify-center items-center">
        <Loading className={" w-10 h-10"}/>
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
