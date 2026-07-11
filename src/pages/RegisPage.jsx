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
import {  GraduationCap } from "lucide-react";

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
    watch
  } = useForm({
    mode:"onChange"
  });
  const { errors, isSubmitting, isValid } = formState;

  const navigate = useNavigate();



  const onSubmit = async (data) => {
    try {
      await RegisterAndVarifyController(data.email, data.password, data.name);
      navigate(ROUTES.VERIFICATION, { replace: true })
      reset()
    } catch (error) {
      const msg = error.message;
      console.log("Registration Compnent func Registration :: ",error)
      const errorMsg = getFirebaseAuthError(msg)
      toast.error(errorMsg)
       setError("email", {
          type: "manual",
          message: errorMsg
        }); 
      if (msg === domainError) {
        setError("email", {
          type: "manual",
          message: domainError,
        });
      }
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
      <Toaster/>
      <main className="flex min-h-screen w-full">
        {/* Left Side: Form (60%) */}
        <section className="w-full lg:w-[60%] bg-surface flex flex-col p-6 md:p-12 relative overflow-y-auto">
          {/* Header */}
          <nav className="flex justify-between items-center w-full mb-16 lg:mb-24">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap/>
              </div>
              <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
                {appName}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-body-sm text-body-sm text-muted-foreground">
                Already have an account?
              </span>
              <Link
                className=" text-md text-primary font-semibold hover:underline transition-all"
                to={ROUTES.LOGIN}
              >
                Log in
              </Link>
            </div>
          </nav>
          {/* Form Content */}
          <div className="max-w-120 w-full mx-auto flex flex-col justify-center grow">
            <header className="mb-10 text-center lg:text-left">
              <h1 className="font-bold text-3xl text-on-background mb-3">
                Create your account
              </h1>
              <p className="font-medium text-md text-muted-foreground">
                Join {appName} to start managing and attempting professional
                exams.
              </p>
            </header>
            {/* Social Registration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-outline-variant hover:bg-surface-container-low transition-all duration-200 group">
                <Google />
                <span className=" text-md text-muted-foreground group-hover:text-on-surface">
                  Sign up with Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-outline-variant hover:bg-surface-container-low transition-all duration-200 group">
                <Github />
                <span className=" text-md text-muted-foreground group-hover:text-on-surface">
                  Sign up with GitHub
                </span>
              </button>
            </div>
            {/* Divider */}
            <div className="relative flex items-center mb-8">
              <div className="grow border-t border-outline-variant" />
              <span className="shrink mx-4 text-[10px] font-bold tracking-widest text-outline uppercase">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="grow border-t border-outline-variant" />
            </div>
            {/* Fields */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* name */}
                <NameFeild register={register} errors={errors}/>
                {/* Email */}
                <EmailFeild register={register} errors={errors} />
                {/* password */}
                <PasswordFeild register={register} errors={errors} />

                {/* confirm password */}
                
                <ConfirmPasswordFeild register={register} errors={errors} getValues={getValues}/>
                {/* Institude name */}
                <TextFeild purpose={"Institude Name"} register={register} errors={errors}/>
                {/* lastQulification */}
                <DropDownFeild purpose={"Last Qulification"} watch={watch} register={register}errors={errors} OPTIONS={Qulifications}/>
              </div>

              {/* CTA */}
              <SubmitBtn isSubmitting={isSubmitting} disabled={false} />
            </form>
            {/* Mobile Login Link */}
            <div className="flex sm:hidden justify-center items-center gap-2 mt-8">
              <span className="font-body-sm text-body-sm text-muted-foreground">
                Already have an account?
              </span>
              <a className=" text-md text-primary font-semibold" href="#">
                Log in
              </a>
            </div>
          </div>
          {/* Footer Small */}
          <footer className="mt-auto pt-12 flex justify-center lg:justify-start gap-6 text-muted-foreground/60 font-label-sm text-label-sm">
            <span>© 2024 {appName}</span>
            <a className="hover:text-primary transition-colors" href="#">
              Support
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Status
            </a>
          </footer>
        </section>
        {/* Right Side: Illustration (40%) */}
        <section className="hidden lg:flex lg:w-[40%] bg-primary relative flex-col items-center justify-center p-12 overflow-hidden">
          {/* Abstract Background Circles */}
          <div className="absolute top-[-10%] right-[-10%] w-100 h-100 rounded-full bg-white/5 blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-75 h-75 rounded-full bg-primary-container/20 blur-[60px]" />
          {/* Main Illustration Space */}
          <div className="relative w-full max-w-120 aspect-square flex items-center justify-center">
            {/* Center Graphic */}
            <div
              className="w-64 h-64 bg-white/10 rounded-full glass-card flex items-center justify-center animate-float"
              style={{ animationDelay: "0s" }}
            >
              <img
                className="w-48 h-48 object-contain"
                data-alt="A futuristic, high-end 3D isometric illustration of a floating digital library with translucent purple glass books and glowing data crystals. The scene is set against a deep violet gradient background with soft ambient lighting and sparkling particle effects. The style is hyper-realistic minimalism, suggesting premium educational technology and sophisticated organization."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6XtaN3LpKIr8YuLKmCmcbclNlwyb7i6nxAgf8J3XwHjCKqPxqPWonUOYLUFfTHcqDFOodePjF0tD7H6qWnJo5PE_weEmR-cmNTcaK9CqQaIlmZ3aMPvj1R3f5nxRB9v_5ClQKD4jAW3c2kCvvNAk8u6n68uYPSJGS3qFbTszRIktoMS7w1nzacV6C582Bd4fLhpLTDhpcVDmIZ4LGPed4NKNmyOK_kHZWJ4uMTB7rlNBxayuGB1J_Ps1EfKNL5BY5SSk9sk5yPLbD"
              />
            </div>
            {/* Floating Glass Cards */}
            <div
              className="absolute top-0 right-4 glass-card p-6 rounded-2xl shadow-2xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-green-400"
                    data-icon="verified_user"
                  >
                    verified_user
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-md">
                    Secure Platform
                  </p>
                  <p className="text-white/60 text-[10px]">
                    ISO 27001 Certified
                  </p>
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-12 left-0 glass-card p-6 rounded-2xl shadow-2xl animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-primary-container bg-surface-container-high overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A professional close-up headshot of a friendly female educational administrator with a warm smile, wearing modern glasses and professional attire. The lighting is soft and high-key, with a clean minimalist background that matches a premium enterprise SaaS aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Q2PchM1AdCv9Frmko4JyoS2EtGrml-Rh7dg_jdEE2M2ygs37Y-Hh8rZWInfJiJ6qx-NEKL7YD-TxSeupiQ7UQLMboqXtxiaxkrnsqGNOqX18ZaBO-zDxTe0Y-Cp-Rcm5fncCz89x183pd1jq-abzjfOcT1OAvIAZmVG5y1PrzgGe_H-ZOtL6VMULaqROFiV1ijKWOauzcbAJprASTfFWN9GPGxQgimmuJ5Gk21PmgCosPmeGNMrAljwHsXqaYXbui6RRuBaXC0wb"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary-container bg-surface-container-high overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A professional headshot of a diverse male professor in a clean, modern studio setting. He is looking confidently at the camera, wearing a smart-casual blazer. The image has a bright, corporate tech aesthetic with soft shadows and sharp focus."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjc6uhvI9n90qBrKRL-a5rQGLLxLJvvVtl_gyxyNo2NaUrSMK-9GWq94pI4yuHoO6qaTrTkdApUNa7uZUdFos0DWw6azLznRZezT3YsfEjy44qJBIzmYvoWGjW7OrJToVUlDKXKsvvb0h_6QgH_hpOVu613YWzSXCUrmoG7jQatJlQGIM2Mk030jXFHaGdaSbVRIOiizM6CEWYqEksZ-Gm3dywM9OfC7AyuZSkn5AkPv9TP_0tO0s5b7jXFG0VSWWWjAge5rwulqS8"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary-container bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold">
                    +2k
                  </div>
                </div>
                <p className="text-white font-medium text-body-sm">
                  Trusted by 2,000+ Institutions
                </p>
              </div>
            </div>
            <div
              className="absolute top-1/4 -left-8 glass-card p-4 rounded-xl shadow-2xl animate-float"
              style={{ animationDelay: "3s" }}
            >
              <span
                className="material-symbols-outlined text-white/80 text-[32px]"
                data-icon="monitoring"
              >
                monitoring
              </span>
            </div>
          </div>
          {/* Text Content */}
          <div className="relative z-10 text-center mt-12 max-w-sm">
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">
              Empowering Education
            </h2>
            <p className="font-body-md text-body-md text-white/80 leading-relaxed">
              The most comprehensive platform for schools, universities, and
              professional organizations.
            </p>
          </div>
          {/* Dots Pattern */}
          <div className="absolute bottom-10 right-10 opacity-20 grid grid-cols-6 gap-2">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </section>
      </main>
    </>
  );
}
