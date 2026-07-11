import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const root = document.documentElement;

  mode === "dark" ? root.classList.add(mode) : root.classList.remove("dark");

  return <>{children}</>;
}
