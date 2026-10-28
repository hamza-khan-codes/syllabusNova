import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Toaster from "./components/ui/sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function App() {
  const auth = useSelector((state)=>state.auth)
  const  authError  = auth.error
  useEffect(() => {
    if (authError) {
      toast.error(authError || "Failed to fetch user")
    }
  },[authError])
  return (
    <>
      <Toaster/>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
