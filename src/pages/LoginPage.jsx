import { useForm } from "react-hook-form";
import InputInlineError from "@/components/common/InlineError";
import PasswordFeild from "@/components/common/PasswordFeild";
import SubmitBtn from "@/components/common/SubmitBtn";
import AuthLayout from "@/layouts/AuthLayout";

import { GraduationCap } from "lucide-react";
import { loginUserController } from "@/controllers/authControllers";
import Toaster from "@/components/ui/sonner";
import { toast } from "sonner";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";
import Google from "@/assets/Google";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      console.log("Data :", data);

      const { email, password } = data;

      await loginUserController(email, password);

      reset();
    } catch (error) {
      console.log("loginComponent:", error);

      toast.error(getFirebaseAuthError(error.message));
    }
  };

  const forgotHandle = () => {
    console.log("forgot");
  };

  return (
    <AuthLayout>
      <Toaster />

      <div className="flex min-h-screen items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg">

          {/* Login Card */}
          <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">

            <div className="space-y-7 p-6 sm:p-8">

              {/* ================= HEADER ================= */}
              <div className="flex flex-col items-center text-center">

                {/* Logo */}
                <span className="mb-4 flex items-center justify-center rounded-xl bg-primary p-3">
                  <GraduationCap
                    size={30}
                    strokeWidth={2}
                    className="text-primary-foreground"
                  />
                </span>

                {/* Title */}
                <h1 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
                  Welcome backh
                </h1>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  Enter your credentials to access your Syllabus account.
                </p>
              </div>

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                {/* ================= EMAIL ================= */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>

                  <div className="relative">

                    {/* Email Icon */}
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[20px] text-muted-foreground">
                      mail
                    </span>

                    <input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      autoComplete="email"
                      className="input pl-10"
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>

                  {/* Email Error */}
                  <div className="flex min-h-6 items-center pt-1">
                    {errors.email && (
                      <InputInlineError
                        ErrorMsg={errors.email.message}
                      />
                    )}

                    {errors.email?.type === "available" && (
                      <span className="ml-1 cursor-pointer text-sm font-bold text-primary underline">
                        Go to register
                      </span>
                    )}
                  </div>
                </div>

                {/* ================= PASSWORD ================= */}
                <PasswordFeild
                  errors={errors}
                  register={register}
                />

                {/* ================= REMEMBER / FORGOT ================= */}
                <div className="flex items-center justify-between gap-4">

                  {/* Remember */}
                  <label
                    htmlFor="remember"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border border-input bg-background accent-primary focus:ring-2 focus:ring-ring"
                      {...register("rememberMe")}
                    />

                    <span className="text-sm font-medium text-foreground">
                      Remember me
                    </span>
                  </label>

                  {/* Forgot */}
                  <button
                    type="button"
                    onClick={forgotHandle}
                    className="text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* ================= LOGIN BUTTON ================= */}
                <SubmitBtn
                  isSubmitting={isSubmitting}
                  type="Logining"
                />

                {/* ================= DIVIDER ================= */}
                <div className="relative flex items-center py-2">

                  <div className="grow border-t border-border" />

                  <span className="mx-4 shrink-0 bg-card px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Or continue with
                  </span>

                  <div className="grow border-t border-border" />

                </div>

                {/* ================= GOOGLE ================= */}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-5 py-3 text-base font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <Google />

                  <span>
                    Sign in with Google
                  </span>
                </button>

                {/* ================= REGISTER ================= */}
                <p className="text-center text-sm text-muted-foreground">
                  Don’t have an account yet?{" "}

                  <a
                    href="/registration"
                    className="font-bold text-primary transition-colors hover:underline"
                  >
                    Register
                  </a>
                </p>

              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}