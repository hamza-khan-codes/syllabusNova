import { ROUTES } from "@/constant/routes";
import useAuthDatafromFirebase from "@/hooks/useAuthDataFirebase";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }) {
  const { user } = useAuthDatafromFirebase();
  console.log("AuthProvider :", user)

  return <>{children}</>;
}
