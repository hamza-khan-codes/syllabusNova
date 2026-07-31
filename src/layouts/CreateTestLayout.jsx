import StepTreaker from "@/components/CreateTest/StepTreaker";
import MainLayout from "./MainLayout";
import TestSummerySidebar from "@/components/CreateTest/TestSummerySidebar";
import BottomNavigator from "@/components/CreateTest/BottomNavigator";
import Toaster from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CreateTestLayout({ children }) {
  const createTest = useSelector((state) => state.createTest)
  useEffect(() => {
    if (!createTest.error) return;
    toast.error(createTest.error)
  },[createTest.error])
  return (
    <>
      <Toaster/>
      <MainLayout>
        <StepTreaker />
        {/* Main Content Area */}
        <main className=" p-lg flex flex-col md:flex-row gap-8 ">
          <div className="flex-1 space-y-12">{children}</div>
          <TestSummerySidebar />
        </main>
        <BottomNavigator />
      </MainLayout>
    </>
  );
}
