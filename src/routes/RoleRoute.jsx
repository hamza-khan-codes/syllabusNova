import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute() {
    const admin = true;
    if (admin) return <Outlet/>
    return <Navigate to={"/dashboard"}/>
}
