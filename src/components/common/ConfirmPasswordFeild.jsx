import useTogglePassword from "@/hooks/useTogglePassword";
import InputInlineError from "./InlineError";
import { Eye, EyeClosed } from "lucide-react";

export default function ConfirmPasswordFeild({ register, errors,getValues }) {
    const { isPasswordVisible, togglePassword } = useTogglePassword();
  return (
    <>
      <div className="relative mt-8">
        <input
          id="confirmPassword"
          type={isPasswordVisible.confirmPassword ? "text" : "password"}
          placeholder=" "
          className="peer w-full border h-14 rounded bg-surface-container-low px-4 outline-none transition-all focus:ring-2 focus:ring-primary/20"
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Must contain an uppercase letter",

              hasNumber: (value) =>
                /[0-9]/.test(value) || "Must contain a number",

              hasSpecialChar: (value) =>
                /[!@#$%^&*]/.test(value) || "Must contain a special character",
              isSame: (value) =>
                value === getValues("password") ||
                "Confirm password not match.",
            },
          })}
        />
        <label
          htmlFor="confirmPassword"
          className="
                absolute
                left-5
                top-4
                text-muted-foreground
                transition-all
                duration-200
                pointer-events-none
          
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-base
          
                peer-focus:top-1
                peer-focus:left-0
                peer-focus:text-xs
                peer-focus:text-primary
          
                peer-not-placeholder-shown:top-0
                peer-not-placeholder-shown:left-0
                peer-not-placeholder-shown:text-base
              "
        >
          Confirm Password
        </label>
        <button
          className="absolute cursor-pointer right-4 top-[56%] -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
          onClick={() => {
            togglePassword("confirmPassword");
          }}
          type="button"
        >
          <span className="material-symbols-outlined visibleIcon">
            {isPasswordVisible.confirmPassword ? <Eye /> : <EyeClosed />}
          </span>
        </button>
      </div>
      <div className="error   h-1 flex items-center">
        {errors.confirmPassword && (
          <InputInlineError ErrorMsg={errors.confirmPassword.message} />
        )}
      </div>
    </>
  );
}
