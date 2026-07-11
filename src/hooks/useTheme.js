
import { toggleTheme } from "@/features/Theme/themeSlices";
import { useDispatch, useSelector } from "react-redux";


export default function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode);



  const toggle = () => {
    dispatch(toggleTheme())
  };  
  localStorage.setItem("theme",theme)

  return { theme, toggle };
}