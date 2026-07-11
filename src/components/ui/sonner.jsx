import { Toaster as Sonner } from "sonner";
import {
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  Info,
  Loader2,
} from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { useEffect } from "react";

export default function Toaster(props) {
  const { theme } = useTheme();
  useEffect(() => {
    console.log("Theme : ", theme)
    
  },[theme])
  return (
    <Sonner
      theme={theme}
      position="top-right"
      expand
      richColors={false}
      closeButton
      visibleToasts={2}
      duration={4000}
      offset={20}
      gap={12}
      icons={{
        success: (
          <CircleCheck
            size={18}
            className="text-green-500"
            strokeWidth={2.5}
          />
        ),
        error: (
          <CircleAlert
            size={18}
            className="text-red-500"
            strokeWidth={2.5}
          />
        ),
        warning: (
          <TriangleAlert
            size={18}
            className="text-yellow-500"
            strokeWidth={2.5}
          />
        ),
        info: (
          <Info
            size={18}
            className="text-blue-500"
            strokeWidth={2.5}
          />
        ),
        loading: (
          <Loader2
            size={18}
            className="animate-spin text-primary"
            strokeWidth={2.5}
          />
        ),
      }}
      toastOptions={{
        style: {
          background: theme == "dark" ?  "#ffffff":"black",
          color: theme == "dark" ?  "black":"#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.15)",
        },

        classNames: {
          title: "font-semibold text-base",
          description: "text-sm text-slate-500",
          action:
            "!bg-primary !text-primary-foreground hover:opacity-90",
          cancel:
            "!bg-slate-200 hover:!bg-slate-300",
          closeButton:
            "!bg-transparent hover:!bg-slate-100",
          
        },
      }}
      {...props}
    />
  );
}