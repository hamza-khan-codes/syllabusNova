import { useState } from "react";


export default function useTogglePassword() {

      const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
    return {isPasswordVisible,togglePassword}
}
