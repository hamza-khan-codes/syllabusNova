import useTogglePassword from "@/hooks/useTogglePassword";
import InputInlineError from "./InlineError";
import { Eye, EyeClosed } from "lucide-react";

export default function PasswordField({ register, errors }) {
  const { isPasswordVisible, togglePassword } = useTogglePassword();

  return (
    <>
      <div className="relative mt-8">
        <input
          id="Password"
          type={isPasswordVisible.password ? "text" : "password"}
          placeholder=" "
          className="
  peer
  w-full
  h-14
  rounded-lg
  foer
  text-foreground
  border-primary
  bg-background
  px-4
  outline-none
  transition-all
  focus:ring-2
  focus:ring-primary/20
  focus:border-primary
"
          {...register("password", {
            required: "Password is required.",
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Must contain an uppercase letter",

              hasNumber: (value) =>
                /[0-9]/.test(value) || "Must contain a number",

              hasSpecialChar: (value) =>
                /[!@#$%^&*]/.test(value) || "Must contain a special character",

              hasEightChar: (value) =>
                value.length >= 8 || "At least 8 characters",
            },
          })}
        />

        <label
          htmlFor="Password"
          className="
            absolute
            left-5
            top-4
            pointer-events-none
            text-muted-foreground
            transition-all
            duration-200

            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base

            peer-focus:top-1
            peer-focus:left-0
            peer-focus:text-xs
            peer-focus:text-primary

            peer-not-placeholder-shown:top-1
            peer-not-placeholder-shown:left-0
            peer-not-placeholder-shown:text-xs
          "
        >
          Password
        </label>

        <button
          type="button"
          onClick={() => togglePassword("password")}
          aria-label={
            isPasswordVisible.password ? "Hide password" : "Show password"
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-on-surface-variant transition-colors text-muted-foreground hover:text-primary"
        >
          <span className="material-symbols-outlined">
            {isPasswordVisible.password ? <Eye /> : <EyeClosed />}
          </span>
        </button>
      </div>

      <div className="error h-1 flex items-center">
        {errors.password && (
          <InputInlineError ErrorMsg={errors.password.message} />
        )}
      </div>
    </>
  );
}
