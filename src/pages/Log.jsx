
import Github from "@/assets/Github";
import Google from "@/assets/Google";
import EmailFeild from "@/components/common/EmailFeild";
import PasswordField from "@/components/common/PasswordFeild";
import SubmitBtn from "@/components/common/SubmitBtn";
import Toaster from "@/components/ui/sonner";

import { appName } from "@/constant/brand";
import { ROUTES } from "@/constant/routes";
import { loginUserController } from "@/controllers/authControllers";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";

import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Log() {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login Data:", data);

      const { email, password } = data;

      await loginUserController(email, password);

      toast.success("Login successful!");

      reset();
    } catch (error) {
      console.error("Login Component:", error);

      toast.error(
        getFirebaseAuthError(
          error?.message || "Login failed."
        )
      );
    }
  };

  return (
    <>
      <Toaster />

      <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl flex-col justify-center">

          {/* ==========================================
              BRAND
          ========================================== */}

          <div className="mb-7 text-center">

            <Link
              to={ROUTES.LOGIN}
              className="group inline-flex items-center gap-3"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
                <GraduationCap
                  className="size-6"
                  strokeWidth={2.2}
                />
              </div>

              <div className="text-left">

                <span className="block text-lg font-bold tracking-tight text-foreground">
                  {appName}
                </span>

                <span className="block text-xs text-muted-foreground">
                  Learn. Practice. Succeed.
                </span>

              </div>
            </Link>

          </div>


          {/* ==========================================
              LOGIN CARD
          ========================================== */}

          <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

            {/* ========================================
                CARD HEADER
            ======================================== */}

            <div className="border-b border-border bg-muted/20 px-5 py-6 sm:px-8">

              <div className="flex items-start gap-3">

                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </div>

                <div>

                  <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Welcome back
                  </h1>

                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    Sign in to continue your learning journey.
                  </p>

                </div>

              </div>

            </div>


            {/* ========================================
                FORM
            ======================================== */}

            <div className="p-5 sm:p-8">

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                {/* ==================================
                    EMAIL
                ================================== */}

                <EmailFeild
                  register={register}
                  errors={errors}
                />


                {/* ==================================
                    PASSWORD
                ================================== */}

                <PasswordField
                  register={register}
                  errors={errors}
                />


                {/* ==================================
                    REMEMBER / FORGOT
                ================================== */}

                <div className="flex items-center justify-between gap-4">

                  <label
                    htmlFor="remember"
                    className="flex cursor-pointer items-center gap-2"
                  >

                    <input
                      id="remember"
                      type="checkbox"
                      className="size-4 cursor-pointer rounded border-input bg-background accent-primary focus:ring-2 focus:ring-ring"
                      {...register("rememberMe")}
                    />

                    <span className="text-sm text-muted-foreground">
                      Remember me
                    </span>

                  </label>


                  <Link
                    to={ROUTES.FORGOTPASSWORD}
                    className="text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>

                </div>


                {/* ==================================
                    LOGIN BUTTON
                ================================== */}

                <SubmitBtn
                  isSubmitting={isSubmitting}
                  type="Logining"
                />


                {/* ==================================
                    DIVIDER
                ================================== */}

                <div className="relative py-2">

                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-card px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                </div>


                {/* ==================================
                    SOCIAL LOGIN
                ================================== */}

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    className="group flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <Google />

                    <span>
                      Google
                    </span>
                  </button>


                  <button
                    type="button"
                    className="group flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <Github />

                    <span>
                      GitHub
                    </span>
                  </button>

                </div>


                {/* ==================================
                    SECURITY NOTICE
                ================================== */}

                <div className="flex items-center justify-center gap-2 rounded-xl bg-muted/30 px-4 py-3">

                  <ShieldCheck
                    className="size-4 shrink-0 text-success"
                  />

                  <span className="text-xs text-muted-foreground">
                    Your information is securely protected
                  </span>

                </div>


                {/* ==================================
                    REGISTER
                ================================== */}

                <div className="border-t border-border pt-6 text-center">

                  <p className="text-sm text-muted-foreground">

                    Don't have an account?{" "}

                    <Link
                      to={ROUTES.REGISTER}
                      className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:underline"
                    >
                      Create an account

                      <ArrowRight className="size-3.5" />

                    </Link>

                  </p>

                </div>

              </form>

            </div>

          </section>


          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <CheckCircle2 className="size-3.5 text-primary" />

            <p className="text-xs text-muted-foreground">
              Secure learning platform · {appName}
            </p>

          </div>

        </div>

      </main>
    </>
  );
}

