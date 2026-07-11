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
import { GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Log() {
  const { register, handleSubmit, formState, setError, reset } = useForm({
    mode: "onChange",
  });
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Data :", data);
      const { email, password } = data;
        await loginUserController(email, password)
        reset();
    } catch (error) {
      console.log("loginComponent ", error);
      toast.error(getFirebaseAuthError(error.message));
    }
  };


  return (
      <>
          <Toaster/>
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Login Form */}
        <section className="w-full md:w-[60%] flex flex-col p-8 md:p-12 lg:p-16 bg-background z-10">
          {/* Logo Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap/>
              </div>
              <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
                {appName}
              </span>
            </div>
          </div>
          {/* Login Container */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-background-forground mb-2">
                Welcome back
              </h1>
              <p className="  text-muted-foreground">
                Enter your credentials to access your {appName} account.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <EmailFeild register={register} errors={errors} />
              {/* Password Field */}
              <PasswordField register={register} errors={errors} />
              {/* Remember & Forgot */}
              <div className="flex  flex-col">
                <Link
                  className="self-end  text-primary hover:underline transition-all"
                  to={ROUTES.FORGOTPASSWORD}
                >
                  Forgot password?
                </Link>
              </div>
              {/* Submit Button */}
              <SubmitBtn isSubmitting={isSubmitting} type="Logining" />
              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant" />
                </div>
                <div className="relative flex justify-center text-label-sm">
                  <span className="px-4 bg-background text-muted-foreground uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>
              {/* Social Buttons */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <button
                  className="flex items-center text-muted-foreground justify-center gap-3 py-3 border  rounded-full  cursor-pointer text-xl transition-all   text-background-forground"
                  type="button"
                >
                  <Google />
                  Google
                </button>
                <button
                  className="flex items-center text-muted-foreground justify-center gap-3 py-3 border  rounded-full  cursor-pointer text-xl transition-all   text-background-forground"
                  type="button"
                >
                  <Github />
                  GitHub
                </button>
              </div>
            </form>
            {/* Footer */}
            <div className="mt-12 text-center">
              <p className=" text-muted-foreground">
                Don't have an account? {" "}
                <Link className="text-primary font-bold hover:underline" to={ROUTES.REGISTER}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </section>
        {/* Right Side: Branded Illustration */}
        <section className="hidden md:flex md:w-[40%] bg-linear-to-br from-primary via-primary to-[#8E3D00] relative items-center justify-center overflow-hidden p-16">
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient( circle at 2px 2px,white 1px,transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-tertiary/20 rounded-full blur-3xl" />
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
            {/* Glassmorphism Card */}
            <div className="glass-card rounded-4xl p-8 md:p-12 w-full mb-12 transform hover:scale-[1.02] transition-transform duration-500">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-white/20 rounded-2xl">
                  <span className="material-symbols-outlined text-white text-4xl fill-icon">
                    verified_user
                  </span>
                </div>
                <div className="text-right">
                  <div className="h-2 w-24 bg-white/20 rounded-full mb-2 ml-auto" />
                  <div className="h-2 w-16 bg-white/10 rounded-full ml-auto" />
                </div>
              </div>
              {/* Dashboard Preview Snippet */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-1/3 bg-white/40 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                  </div>
                  <div className="h-6 w-12 bg-primary-container rounded-full opacity-60" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-white/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-1/4 bg-white/40 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 p-4 glass-card rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <span className="material-symbols-outlined text-green-400 text-sm fill-icon">
                    trending_up
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest">
                    Efficiency
                  </p>
                  <p className="text-lg font-bold text-white">+42%</p>
                </div>
              </div>
            </div>
            {/* Text Content */}
            <div className="text-center text-primary-foreground space-y-4 px-8">
              <h2 className="text-3xl font-bold tracking-tight">
                The Future of Education
              </h2>
              <p className="font-medium text-muted  leading-relaxed max-w-lg mx-auto">
                Manage exams, analyze performance, and empower learning with our
                comprehensive educational ecosystem.
              </p>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
