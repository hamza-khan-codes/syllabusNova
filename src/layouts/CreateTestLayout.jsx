import StepTreaker from "@/components/CreateTest/StepTreaker";
import MainLayout from "./MainLayout";
import TestSummerySidebar from "@/components/CreateTest/TestSummerySidebar";
import BottomNavigator from "@/components/CreateTest/BottomNavigator";

export default function CreateTestLayout({ children }) {

  return (
    <>
      <MainLayout>
        <StepTreaker />
        {/* Main Content Area */}
        <main className=" p-lg flex flex-col md:flex-row gap-8 pb-32">
          <div className="flex-1 space-y-12">{children}</div>
          <TestSummerySidebar />
        </main>
        <BottomNavigator />
      </MainLayout>
    </>
  );
}
