import Countdown from "@/components/common/Countdown";
import EmailFeild from "@/components/common/EmailFeild";
import SubmitBtn from "@/components/common/SubmitBtn";
import Toaster from "@/components/ui/sonner";
import { ROUTES } from "@/constant/routes";
import { resentForgotEmailInMin } from "@/constant/Timer";
import {
  authStateController,
  forgotPasswordController,
} from "@/controllers/authControllers";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";
import getUsersMailBoxUrl from "@/utils/getUsersMailBoxUrl";
import {
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  CheckCircle,
  FolderUp,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPasswoard() {
  const { register, formState, handleSubmit } = useForm();
  const { errors, isSubmitting } = formState;
  const [isConundownStop, setIsConundownStop] = useState(false);
  const [forgot, setforgot] = useState(true);

  async function coundownStopHandle() {
    setIsConundownStop(!isConundownStop);
  }

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      setforgot(false);
      coundownStopHandle();
      forgotPasswordController(email);
      toast.success(`A password reset email has been sent to your inbox.`, {
        action: {
          label: "Open",
          onClick: () => window.open(getUsersMailBoxUrl(), "_blank"),
        },
        duration: 30000,
      });
    } catch (error) {
      console.log("Error :", error);
      toast.error(getFirebaseAuthError(error.message))
    }
  };

  return (
    <>
      <Toaster />
      <main
        className="flex flex-col md:flex-row min-h-screen "
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Left Side: Form Section (40% width on Desktop) */}
        <section
          className="w-full md:w-3/5 flex flex-col px-4 md:px-8 py-8 md:py-12 relative z-10 min-h-screen"
          style={{ backgroundColor: "var(--card)" }}
        >
          {/* Branding */}
          <div className="mb-auto">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              SyllabusNova
            </span>
          </div>
          {/* Form Content */}
          <div className="max-w-md w-full mx-auto my-auto py-8">
            {/* Back Link */}
            <Link
              className="inline-flex items-center gap-1 transition-colors group mb-6 text-sm"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
              to={ROUTES.LOGIN}
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Login
            </Link>
            <div className="space-y-2 mb-8">
              <h1
                className="text-3xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Forgot your password?
              </h1>
              <p
                className="text-base"
                style={{ color: "var(--muted-foreground)" }}
              >
                No worries, we'll send you reset instructions.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <EmailFeild register={register} errors={errors} />
              </div>
              <SubmitBtn
                isSubmitting={isSubmitting}
                type="Forgoting"
                disabled={!isConundownStop && !forgot}
              />
            </form>
            <div className="mt-8 text-center">
              <p
                className="text-sm flex justify-between"
                style={{ color: "var(--muted-foreground)" }}
              >
                Didn't receive the email?{" "}
                {!isConundownStop && !forgot ? (
                  <>
                    <Countdown
                      className={"font-mono font-semibold text-primary"}
                      min={resentForgotEmailInMin}
                      onStopFunc={() => coundownStopHandle()}
                    />
                  </>
                ) : null}
              </p>
            </div>
          </div>
          {/* Minimal Footer */}
          <footer className="mt-auto pt-4">
            <p
              className="text-xs opacity-60"
              style={{ color: "var(--muted-foreground)" }}
            >
              © 2024 SyllabusNova. All rights reserved.
            </p>
          </footer>
        </section>
        {/* Right Side: Visual Section (60% width on Desktop) */}
        <section
          className="hidden md:flex md:w-2/5 relative overflow-hidden items-center justify-center p-8"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--primary), var(--accent))",
          }}
        >
          {/* Background Decorative Elements */}
          <div
            className="absolute top-[-10%] right-[-10%] w-125 h-125 rounded-full blur-[100px]"
            style={{ backgroundColor: "rgba(var(--foreground), 0.1)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-100 h-100 rounded-full blur-[80px]"
            style={{ backgroundColor: "rgba(var(--foreground), 0.05)" }}
          />
          {/* Animated Shader / WebGL Simulation */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            {/* Gradient Mesh Simulation */}
          </div>
          <div className="relative z-20 flex flex-col items-center text-center max-w-2xl">
            {/* Glassmorphism Illustration Container */}
            <div className="relative w-80 h-80 mb-8 animate-float">
              {/* Main Glass Shield */}
              <div
                className="absolute inset-0 backdrop-blur-md border rounded-3xl flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.1)",
                  borderColor: "rgba(var(--foreground), 0.2)",
                }}
              >
                <div className="relative">
                  <Shield size={120} />
                  <div className="absolute inset-0 flex items-center justify-center mt-4"></div>
                </div>
              </div>
              {/* Floating Data Points */}
              <div
                className="absolute -top-6 -right-6 backdrop-blur-md border p-3 rounded-xl flex items-center gap-2 animate-float"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.1)",
                  borderColor: "rgba(var(--foreground), 0.2)",
                  animationDelay: "1s",
                }}
              >
                <CheckCircle size={20} style={{ color: "var(--foreground)" }} />
                <span
                  className="text-xs"
                  style={{ color: "var(--foreground)" }}
                >
                  Encrypted
                </span>
              </div>
              <div
                className="absolute bottom-10 -left-12 backdrop-blur-md border p-3 rounded-xl flex items-center gap-2 animate-float"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.1)",
                  borderColor: "rgba(var(--foreground), 0.2)",
                  animationDelay: "2s",
                }}
              >
                <Lock size={20} style={{ color: "var(--foreground)" }} />
                <span
                  className="text-xs"
                  style={{ color: "var(--foreground)" }}
                >
                  Multi-tier Auth
                </span>
              </div>
              {/* Subtle Particles */}
              <div
                className="absolute top-20 -left-20 w-3 h-3 rounded-full blur-sm animate-pulse"
                style={{ backgroundColor: "rgba(var(--foreground), 0.4)" }}
              />
              <div
                className="absolute bottom-40 -right-10 w-2 h-2 rounded-full blur-none animate-bounce"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.6)",
                  animationDuration: "4s",
                }}
              />
              <div
                className="absolute top-0 left-40 w-4 h-4 rounded-full blur-md animate-pulse"
                style={{ backgroundColor: "rgba(var(--foreground), 0.2)" }}
              />
            </div>
            <div className="space-y-3">
              <h2
                className="text-4xl font-bold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                Secure your future.
              </h2>
              <p
                className="text-lg max-w-lg mx-auto"
                style={{ color: "rgba(var(--foreground), 0.8)" }}
              >
                Multi-layered protection for your educational data. We use
                enterprise-grade encryption to ensure your institutional assets
                remain private and safe.
              </p>
            </div>
            {/* Secondary Decorative Image/Screenshot Simulation */}
            <div className="mt-12 w-full max-w-md mx-auto transform translate-y-20 -rotate-2 opacity-60 hover:translate-y-16 transition-transform duration-700">
              <div
                className="rounded-xl p-3 border shadow-2xl overflow-hidden aspect-video relative"
                style={{
                  backgroundColor: "rgba(var(--foreground), 0.1)",
                  borderColor: "rgba(var(--foreground), 0.2)",
                }}
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  data-alt="A clean and professional dashboard interface showing data security metrics and educational administration tools. The design features soft purple accents, glassmorphic card elements, and a high-contrast light mode aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaCb3ia-9Y-f_bvRJph14M5_6FIXsTtGoVoNwwkcIvzl9AIKPlRCokAt_Lin69qGYdm0T8hYMMSH4xMDm7y2LggPIDADOMv4B-PEtREfO5XnUlFIbyPkQ4UG4fbcFMEPkGpR_dW45kLsrHimGBaAKwGTegvEjE3IwRK9xdZIfjbwZBQpbPzAjw_1WDNcXBWwj7_uTjPRvjO_qY415sJk757X4GaDtuop_oQsaUew38HIC81TlB9CZXn0q9YbxDNu67GKnN4x2LCyyw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(var(--primary), 0.4), rgba(0, 0, 0, 0))",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
