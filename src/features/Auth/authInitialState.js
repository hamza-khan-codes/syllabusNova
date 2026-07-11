import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const authInitialState = {
  user: null,
  loading: true,
  error: null,
};



export default authInitialState;
