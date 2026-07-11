import BasicInfo from "@/components/CreateTest/BasicInfo";
import BottomNavigator from "@/components/CreateTest/BottomNavigator";
import TestSummerySidebar from "@/components/CreateTest/TestSummerySidebar";
import CreateTestLayout from "@/layouts/CreateTestLayout";
import MainLayout from "@/layouts/MainLayout";
import { Outlet } from "react-router-dom";



export default function CreateTest() {

  return (
    <>
      <CreateTestLayout>
        <Outlet/>
      </CreateTestLayout>
    </>
  );
}


