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
  TrendingUp,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Log() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      console.log("Data:", data);

      const { email, password } = data;

      await loginUserController(email, password);

      reset();
    } catch (error) {
      console.log("loginComponent:", error);

      toast.error(getFirebaseAuthError(error.message));
    }
  };

  return (
    <>
      <Toaster />

      <main className="min-h-screen bg-background">

        <div className="flex min-h-screen">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <section className="flex w-full flex-col px-6 py-6 sm:px-10 md:w-[58%] md:px-14 lg:px-20">

            {/* ================= LOGO ================= */}
            <header>
              <Link
                to={ROUTES.LOGIN}
                className="group inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <GraduationCap
                    size={22}
                    strokeWidth={2.2}
                  />
                </div>

                <div>
                  <span className="block text-lg font-bold tracking-tight text-foreground">
                    {appName}
                  </span>

                  <span className="block text-xs text-muted-foreground">
                    Learn. Practice. Succeed.
                  </span>
                </div>
              </Link>
            </header>


            {/* ================= LOGIN AREA ================= */}
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">

              {/* Badge */}
              <div className="mb-5 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <Sparkles
                    size={14}
                    className="text-primary"
                  />

                  Welcome back
                </div>
              </div>


              {/* Heading */}
              <div className="mb-8 text-center md:text-left">

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Sign in to your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  Continue your learning journey with{" "}
                  <span className="font-medium text-foreground">
                    {appName}
                  </span>
                  .
                </p>

              </div>


              {/* ================= FORM CARD ================= */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >

                  {/* Email */}
                  <EmailFeild
                    register={register}
                    errors={errors}
                  />

                  {/* Password */}
                  <PasswordField
                    register={register}
                    errors={errors}
                  />


                  {/* Remember / Forgot */}
                  <div className="flex items-center justify-between gap-4">

                    <label
                      htmlFor="remember"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer rounded border-input bg-background accent-primary focus:ring-2 focus:ring-ring"
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


                  {/* Login */}
                  <SubmitBtn
                    isSubmitting={isSubmitting}
                    type="Logining"
                  />


                  {/* ================= DIVIDER ================= */}
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


                  {/* ================= SOCIAL LOGIN ================= */}
                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                    >
                      <Google />

                      <span>Google</span>
                    </button>


                    <button
                      type="button"
                      className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                    >
                      <Github />

                      <span>GitHub</span>
                    </button>

                  </div>

                </form>

              </div>


              {/* ================= REGISTER ================= */}
              <p className="mt-7 text-center text-sm text-muted-foreground">

                Don't have an account?{" "}

                <Link
                  to={ROUTES.REGISTER}
                  className="font-semibold text-primary hover:underline"
                >
                  Create an account
                </Link>

              </p>


              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">

                <ShieldCheck
                  size={14}
                  className="text-success"
                />

                Your information is securely protected

              </div>

            </div>

          </section>


          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <section className="relative hidden w-[42%] overflow-hidden bg-primary md:flex">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-secondary" />


            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "36px 36px",
              }}
            />


            {/* Glow circles */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />


            {/* ================= CONTENT ================= */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 py-16 lg:px-16">

              {/* Small badge */}
              <div className="mb-7 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">

                <Sparkles size={15} />

                Smarter learning starts here

              </div>


              {/* ================= DASHBOARD MOCKUP ================= */}
              <div className="relative w-full max-w-lg">

                {/* Main glass card */}
                <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

                  {/* Card header */}
                  <div className="mb-7 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <ShieldCheck
                          size={23}
                          className="text-white"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Learning Dashboard
                        </p>

                        <p className="text-xs text-white/60">
                          Your progress overview
                        </p>
                      </div>

                    </div>

                    <div className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70">
                      Today
                    </div>

                  </div>


                  {/* Progress */}
                  <div className="mb-5 rounded-2xl border border-white/10 bg-white/10 p-4">

                    <div className="mb-3 flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                          <TrendingUp
                            size={18}
                            className="text-white"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            Overall Progress
                          </p>

                          <p className="text-xs text-white/50">
                            Keep going!
                          </p>
                        </div>

                      </div>

                      <span className="text-lg font-bold text-white">
                        78%
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-white" />
                    </div>

                  </div>


                  {/* Subjects */}
                  <div className="space-y-3">

                    {/* Mathematics */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                        M
                      </div>

                      <div className="flex-1">

                        <div className="mb-1.5 flex justify-between">
                          <span className="text-xs font-medium text-white">
                            Mathematics
                          </span>

                          <span className="text-[11px] text-white/50">
                            85%
                          </span>
                        </div>

                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full w-[85%] rounded-full bg-white/70" />
                        </div>

                      </div>

                    </div>


                    {/* Physics */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                        P
                      </div>

                      <div className="flex-1">

                        <div className="mb-1.5 flex justify-between">
                          <span className="text-xs font-medium text-white">
                            Physics
                          </span>

                          <span className="text-[11px] text-white/50">
                            72%
                          </span>
                        </div>

                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full w-[72%] rounded-full bg-white/50" />
                        </div>

                      </div>

                    </div>


                    {/* Computer */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                        C
                      </div>

                      <div className="flex-1">

                        <div className="mb-1.5 flex justify-between">
                          <span className="text-xs font-medium text-white">
                            Computer Science
                          </span>

                          <span className="text-[11px] text-white/50">
                            91%
                          </span>
                        </div>

                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full w-[91%] rounded-full bg-white/80" />
                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* ================= FLOATING BADGE ================= */}
                <div className="absolute -bottom-7 -right-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20">
                    <TrendingUp
                      size={19}
                      className="text-success"
                    />
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                      Efficiency
                    </p>

                    <p className="text-lg font-bold text-white">
                      +42%
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= TEXT ================= */}
              <div className="mt-14 max-w-xl text-center text-primary-foreground">

                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  The future of education
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/70 lg:text-base">
                  Manage exams, practice smarter, analyze your
                  performance, and build confidence with your
                  complete educational ecosystem.
                </p>

              </div>


              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-3">

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={14} />
                  Practice
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={14} />
                  Analyze
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={14} />
                  Improve
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}