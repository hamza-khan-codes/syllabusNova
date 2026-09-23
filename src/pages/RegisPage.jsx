import Github from "@/assets/Github";
import Google from "@/assets/Google";

import ConfirmPasswordFeild from "@/components/common/ConfirmPasswordFeild";
import DropDownFeild from "@/components/common/DropDownFeild";
import EmailFeild from "@/components/common/EmailFeild";
import NameFeild from "@/components/common/NameFeild";
import PasswordFeild from "@/components/common/PasswordFeild";
import SubmitBtn from "@/components/common/SubmitBtn";
import TextFeild from "@/components/common/TextFeild";
import Toaster from "@/components/ui/sonner";

import { appName } from "@/constant/brand";
import { ROUTES } from "@/constant/routes";
import { RegisterAndVarifyController } from "@/controllers/authControllers";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";

import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisPage() {
  const {
    register,
    setError,
    handleSubmit,
    formState,
    getValues,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const { errors, isSubmitting } = formState;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Registration Data:", data);

      await RegisterAndVarifyController(
        data.email,
        data.password,
        data.name
      );

      navigate(ROUTES.VERIFICATION, {
        replace: true,
      });

      reset();
    } catch (error) {
      console.log(
        "Registration Component:",
        error
      );

      const errorMsg = getFirebaseAuthError(
        error.message
      );

      toast.error(errorMsg);

      setError("email", {
        type: "manual",
        message: errorMsg,
      });
    }
  };

  const Qulifications = [
    {
      value: "matric",
    },
    {
      value: "intermediate",
    },
    {
      value: "diploma",
    },
    {
      value: "bachelors",
    },
    {
      value: "phd",
    },
    {
      value: "other",
    },
    {
      value: "none",
    },
  ];

  return (
    <>
      <Toaster />

      <main className="min-h-screen bg-background">

        <div className="flex min-h-screen">

          {/* =====================================================
              LEFT SIDE — REGISTRATION
          ====================================================== */}
          <section className="flex w-full flex-col px-6 py-6 sm:px-10 md:px-14 lg:w-[58%] lg:px-20">

            {/* ================= HEADER ================= */}
            <header className="flex items-center justify-between">

              {/* Logo */}
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


              {/* Desktop Login */}
              <div className="hidden items-center gap-2 sm:flex">

                <span className="text-sm text-muted-foreground">
                  Already have an account?
                </span>

                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Log in
                </Link>

              </div>

            </header>


            {/* ================= FORM AREA ================= */}
            <div className="mx-auto w-full max-w-xl flex-1 py-10 lg:py-14">

              {/* Intro */}
              <div className="mb-8">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">

                  <Sparkles
                    size={14}
                    className="text-primary"
                  />

                  Create your account

                </div>


                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Join {appName}
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Create your account and start managing,
                  practicing, and attempting professional
                  examinations.
                </p>

              </div>


              {/* ================= FORM CARD ================= */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">

                {/* Social Registration */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    className="group flex h-12 cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <Google />

                    <span>
                      Continue with Google
                    </span>
                  </button>


                  <button
                    type="button"
                    className="group flex h-12 cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <Github />

                    <span>
                      Continue with GitHub
                    </span>
                  </button>

                </div>


                {/* Divider */}
                <div className="relative my-7">

                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-card px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Or register with email
                    </span>
                  </div>

                </div>


                {/* ================= FORM ================= */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >

                  {/* Account Information */}
                  <div>

                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users size={16} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-foreground">
                          Account information
                        </h2>

                        <p className="text-xs text-muted-foreground">
                          Your basic account details
                        </p>
                      </div>

                    </div>


                    <div className="space-y-4">

                      {/* Name */}
                      <NameFeild
                        register={register}
                        errors={errors}
                      />

                      {/* Email */}
                      <EmailFeild
                        register={register}
                        errors={errors}
                      />

                    </div>

                  </div>


                  {/* Security */}
                  <div className="border-t border-border pt-5">

                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ShieldCheck size={16} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-foreground">
                          Account security
                        </h2>

                        <p className="text-xs text-muted-foreground">
                          Keep your account protected
                        </p>
                      </div>

                    </div>


                    <div className="space-y-4">

                      {/* Password */}
                      <PasswordFeild
                        register={register}
                        errors={errors}
                      />

                      {/* Confirm Password */}
                      <ConfirmPasswordFeild
                        register={register}
                        errors={errors}
                        getValues={getValues}
                      />

                    </div>

                  </div>


                  {/* Education */}
                  <div className="border-t border-border pt-5">

                    <div className="mb-4">

                      <h2 className="text-sm font-semibold text-foreground">
                        Education details
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Tell us a little about your educational background.
                      </p>

                    </div>


                    <div className="space-y-4">

                      {/* Institute */}
                      <TextFeild
                        purpose="Institute Name"
                        register={register}
                        errors={errors}
                      />

                      {/* Qualification */}
                      <DropDownFeild
                        purpose="Last Qualification"
                        watch={watch}
                        register={register}
                        errors={errors}
                        OPTIONS={Qulifications}
                      />

                    </div>

                  </div>


                  {/* Submit */}
                  <div className="pt-2">

                    <SubmitBtn
                      isSubmitting={isSubmitting}
                      disabled={false}
                    />

                  </div>


                  {/* Terms */}
                  <p className="text-center text-xs leading-5 text-muted-foreground">

                    By creating an account, you agree to our{" "}

                    <span className="font-medium text-foreground">
                      Terms of Service
                    </span>{" "}

                    and{" "}

                    <span className="font-medium text-foreground">
                      Privacy Policy
                    </span>
                    .

                  </p>

                </form>

              </div>


              {/* Mobile login */}
              <div className="mt-7 flex items-center justify-center gap-2 sm:hidden">

                <span className="text-sm text-muted-foreground">
                  Already have an account?
                </span>

                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Log in
                </Link>

              </div>


              {/* Security message */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">

                <CheckCircle2
                  size={14}
                  className="text-success"
                />

                Your information is securely protected

              </div>

            </div>


            {/* Footer */}
            <footer className="hidden items-center gap-6 pb-2 text-xs text-muted-foreground sm:flex">

              <span>
                © 2026 {appName}
              </span>

              <span className="cursor-pointer hover:text-primary">
                Support
              </span>

              <span className="cursor-pointer hover:text-primary">
                Status
              </span>

            </footer>

          </section>


          {/* =====================================================
              RIGHT SIDE — VISUAL
          ====================================================== */}
          <section className="relative hidden overflow-hidden bg-primary lg:flex lg:w-[42%]">

            {/* Gradient */}
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


            {/* Glow */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />


            {/* Content */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 py-16 xl:px-16">

              {/* Badge */}
              <div className="mb-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">

                <Sparkles size={14} />

                Built for modern learners

              </div>


              {/* Main visual */}
              <div className="relative w-full max-w-lg">

                {/* Main card */}
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

                  {/* Header */}
                  <div className="mb-7 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">

                        <GraduationCap
                          size={22}
                          className="text-white"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-white">
                          {appName}
                        </p>

                        <p className="text-xs text-white/50">
                          Education dashboard
                        </p>

                      </div>

                    </div>


                    <div className="rounded-lg bg-white/10 px-3 py-1.5 text-[10px] text-white/60">
                      LIVE
                    </div>

                  </div>


                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

                      <p className="text-xs text-white/50">
                        Tests
                      </p>

                      <p className="mt-1 text-2xl font-bold text-white">
                        128
                      </p>

                      <div className="mt-3 h-1.5 rounded-full bg-white/10">
                        <div className="h-full w-[75%] rounded-full bg-white/70" />
                      </div>

                    </div>


                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

                      <p className="text-xs text-white/50">
                        Progress
                      </p>

                      <p className="mt-1 text-2xl font-bold text-white">
                        84%
                      </p>

                      <div className="mt-3 h-1.5 rounded-full bg-white/10">
                        <div className="h-full w-[84%] rounded-full bg-white/70" />
                      </div>

                    </div>

                  </div>


                  {/* Activity */}
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">

                    <div className="mb-4 flex items-center justify-between">

                      <span className="text-xs font-medium text-white">
                        Recent activity
                      </span>

                      <span className="text-[10px] text-white/40">
                        This week
                      </span>

                    </div>


                    <div className="space-y-3">

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                          <CheckCircle2
                            size={15}
                            className="text-white"
                          />
                        </div>

                        <div className="flex-1">

                          <div className="mb-1 h-2 w-28 rounded-full bg-white/30" />

                          <div className="h-1.5 w-20 rounded-full bg-white/10" />

                        </div>

                        <span className="text-[10px] text-white/40">
                          Done
                        </span>

                      </div>


                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                          <Sparkles
                            size={15}
                            className="text-white"
                          />
                        </div>

                        <div className="flex-1">

                          <div className="mb-1 h-2 w-36 rounded-full bg-white/30" />

                          <div className="h-1.5 w-24 rounded-full bg-white/10" />

                        </div>

                        <span className="text-[10px] text-white/40">
                          New
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Floating secure card */}
                <div className="absolute -bottom-6 -right-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">

                    <ShieldCheck
                      size={19}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                      Secure
                    </p>

                    <p className="text-sm font-bold text-white">
                      Protected

                    </p>

                  </div>

                </div>

              </div>


              {/* Heading */}
              <div className="mt-14 max-w-xl text-center text-white">

                <h2 className="text-3xl font-bold tracking-tight xl:text-4xl">
                  Empower your learning
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/70 xl:text-base">
                  Practice smarter, track your progress, and
                  prepare for your next examination with a
                  complete educational ecosystem.
                </p>

              </div>


              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={13} />
                  Practice
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={13} />
                  Analyze
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  <CheckCircle2 size={13} />
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