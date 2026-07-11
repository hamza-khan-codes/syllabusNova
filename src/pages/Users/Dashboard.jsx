import {
  Card,
  CardFooter,
  CardHeader,
  CardMain,
} from "../../components/common/ui/Card";
import MainLayout from "../../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <Card className={"bg-amber-800"}>
        <CardHeader>
          <div className="">name</div>
          <div className="">icon</div>
        </CardHeader>
        <CardMain>Main</CardMain>
        <CardFooter>Footer</CardFooter>
      </Card>
      
    </MainLayout>
  );
}
