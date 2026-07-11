import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector((state)=>state.auth)
  console.log("App - user ",user)
  return (
    <>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
