import BasicInfo from "@/components/CreateTest/BasicInfo";
import BottomNavigator from "@/components/CreateTest/BottomNavigator";
import TestSummerySidebar from "@/components/CreateTest/TestSummerySidebar";
import { ROUTES } from "@/constant/routes";
import CreateTestLayout from "@/layouts/CreateTestLayout";
import MainLayout from "@/layouts/MainLayout";
import { Outlet, useLocation } from "react-router-dom";

export default function CreateTest() {
  const location = useLocation();
  const { pathname } = location;
  console.log(location);
  if (pathname === ROUTES.CREATETEST) {
    return (
      <>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </>
    );
  }
  return (
    <>
      <CreateTestLayout>
        <Outlet />
      </CreateTestLayout>
    </>
  );
}
