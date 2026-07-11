import Countdown from "@/components/common/Countdown";
import Toaster from "@/components/ui/sonner";
import { appName } from "@/constant/brand";
import { ROUTES } from "@/constant/routes";
import { resentVeriEmailInMin } from "@/constant/Timer";
import {
  authStateController,
  logoutController,
  resentVerificationMailController,
} from "@/controllers/authControllers";

import { authLogout, authStateAndSuccess } from "@/features/Auth/authSlices";
import getUsersMailBoxUrl from "@/utils/getUsersMailBoxUrl";
import { reload } from "firebase/auth";

import {
  CheckCircle,
  ChevronDown,
  Lock,
  Mail,
  Send,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Verification() {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || { email: null };

  const dispatch = useDispatch();
  const [isConundownStop, setIsConundownStop] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [user, navigate]);

  async function checkVerifedHandle() {
    if (user) {
      authStateController(async (User) => {
        await reload(User);
        console.log(User);
        const { emailVerified, displayName, email, uid } = User;
        if (emailVerified) {
          dispatch(
            authStateAndSuccess({ emailVerified, displayName, email, uid }),
          );
        } else {
          toast.error(
            "Your email isn't verified yet. Please check your inbox and try again.",
            {
              action: {
                label: "Open",
                onClick: () =>
                  window.open(getUsersMailBoxUrl(user.email), "_blank"),
              },
              duration: 18000,
            },
          );
        }
      });
    }
  }

  const changeEmailHandle = async () => {
    await logoutController();
    dispatch(authLogout());
  };

  async function coundownStopHandle() {
    await resentVerificationMailController();
    setIsConundownStop(!isConundownStop);
    toast.success(`Verification email sent! Please check your inbox.`, {
      action: {
        label: "Open",
        onClick: () => window.open(getUsersMailBoxUrl(user.email), "_blank"),
      },
      duration: 18000,
    });
  }

  useEffect(() => {
    const infoTimer = setInterval(() => {
      toast.info(`Still haven't received the verification email? Check your Inbox and Spam/Junk folder. If it's not there, you can request a new verification email every 5 minutes by clicking the "Resend Verification Email" button.`, {
        action: {
          label: "Open",
          onClick: () => window.open(getUsersMailBoxUrl(user.email), "_blank"),
        },
        duration: 18000,
        className: "custom-info-toast",
      });

    }, 50000);

    return () => {
      clearInterval(infoTimer)
    }
  });

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="w-full md:w-[60%] px-6 md:px-margin-desktop py-12 flex flex-col items-start bg-card relative">
          <div className="mb-12">
            <span className=" text-xl font-extrabold text-primary tracking-tighter">
              {appName}
            </span>
          </div>
          <div className="w-full  mx-auto md:mx-0 flex flex-col gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail size={24} strokeWidth={2} className="text-primary" />
                </div>
                <h1 className="font-semibold text-4xl  text-card-foreground">
                  Verify Your Email
                </h1>
              </div>
              <p className="text-muted-foreground font-medium text-md  max-w-md">
                We've sent a verification link to your inbox. Please follow the
                instructions in the email to activate your
                {appName} account.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="p-5 bg-accent border border-primery/30 rounded-xl ">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Registered Email
                </p>
                <p className="font-medium text-md text-card-foreground mb-2 ">
                  {email || "your email"}
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-1.5 h-1.5 bg-success rounded-full mr-1.5"></span>
                  Email Sent
                </span>
              </div>
              <div className="p-5 bg-accent border border-primery/30 rounded-xl flex flex-col justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="spinner"></div>
                  <span className="font-medium text-xs text-card-foreground">
                    Waiting...
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className=" text-card-foreground font-bold uppercase tracking-widest text-xs">
                Next Steps
              </h3>
              <div className="space-y-4">
                <div className="relative flex items-start gap-2">
                  <div className="step-line"></div>
                  <div className="z-10 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-md font-bold">
                    1
                  </div>
                  <p className="text-sm text-card-foreground pt-0.5">
                    Open your email inbox
                  </p>
                </div>
                <div className="relative flex items-start gap-2">
                  <div className="step-line"></div>
                  <div className="z-10 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-md font-bold">
                    2
                  </div>
                  <p className="text-sm text-card-foreground pt-0.5">
                    Find the email from{" "}
                    <span className="text-card-foreground font-semibold">
                      {appName}
                    </span>
                  </p>
                </div>
                <div className="relative flex items-start gap-2">
                  <div className="step-line"></div>
                  <div className="z-10 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-md font-bold">
                    3
                  </div>
                  <p className="text-sm text-card-foreground pt-0.5">
                    Click the{" "}
                    <span className="text-primary font-semibold">
                      "Verify Email"
                    </span>{" "}
                    button
                  </p>
                </div>
                <div className="relative flex items-start gap-2">
                  <div className="step-line"></div>
                  <div className="z-10 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-md font-bold">
                    4
                  </div>
                  <p className="text-sm text-card-foreground pt-0.5">
                    Return to this page
                  </p>
                </div>
                <div className="relative flex items-start gap-2">
                  <div className="z-10 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-md font-bold">
                    5
                  </div>
                  <p className="text-sm text-card-foreground pt-0.5">
                    Start using the platform
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <button
                onClick={checkVerifedHandle}
                className="w-full h-14 bg-primary hover:bg-primary/80 cursor-pointer text-primary-foreground rounded-xl  flex items-center justify-center gap-1 transition-all shadow-lg shadow-primary-container/20 active:scale-[0.98]"
              >
                I've Verified My Email
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-1 text-card-foreground">
                  {!isConundownStop ? (
                    <>
                      <span>Resend in </span>
                      <Countdown
                        className={"font-mono font-semibold text-primary"}
                        min={resentVeriEmailInMin}
                        onStopFunc={() => coundownStopHandle()}
                      />
                    </>
                  ) : (
                    <span
                      onClick={coundownStopHandle}
                      className="font-extrabold active:underline rounded-2xl px-1 cursor-pointer"
                    >
                     Resend Verification Email
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={changeEmailHandle}
                    className="text-primary font-semibold hover:underline transition-all cursor-pointer"
                  >
                    Change Email
                  </button>
                  <button className="text-card-foreground hover:text-card-foreground transition-all cursor-pointer">
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant/30">
              <h4 className=" text-card-foreground font-bold mb-3">
                Need help?
              </h4>
              <div className="space-y-2">
                <details className="group border border-card-foreground/20 rounded-lg overflow-hidden">
                  <summary className="list-none p-4 flex justify-between items-center cursor-pointer bg-muted hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-medium text-card-foreground">
                      Didn't receive the email?
                    </span>
                    <ChevronDown className="text-card-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3 bg-muted text-sm text-card-foreground">
                    Check your spam or promotions folder. If it's not there, try
                    resending the verification link or contacting our support
                    team.
                  </div>
                </details>
                <details className="group border border-card-foreground/20 rounded-lg overflow-hidden">
                  <summary className="list-none p-4 flex justify-between items-center cursor-pointer bg-muted hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-medium text-card-foreground">
                      Link expired?
                    </span>
                    <ChevronDown className="text-card-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3 bg-muted text-sm text-card-foreground">
                    Verification links are valid for 24 hours. If your link has
                    expired, please use the "Resend Verification Email" option
                    above.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden md:flex w-[40%] bg-linear-to-br from-primary via-primary to-[#8E3D00] relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-card-foreground/40 rounded-full animate-float"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-card-foreground/20 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-2/3 left-1/3 w-2 h-2 bg-card-foreground/30 rounded-full animate-float"
              style={{ animationDelay: " 1.2s" }}
            ></div>
          </div>
          <div className="relative z-10 w-full max-w-md p-10 animate-float">
            <div className="relative bg-card-foreground/10 backdrop-blur-3xl border border-card-foreground/20 rounded-4xl p-12 shadow-2xl flex flex-col items-center gap-2">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute w-full h-full border-2 border-card-foreground/20 rounded-full animate-pulse"></div>
                <div className="z-20 bg-card-foreground rounded-2xl p-6 shadow-xl transform -rotate-12 transition-transform hover:rotate-0 duration-500 cursor-pointer">
                  <Mail className="text-primary " size={65} strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -right-2 z-30 bg-green-500 text-primary-foreground p-3 rounded-2xl shadow-lg border-4 border-card-foreground/10 transform rotate-12">
                  <CheckCircle className="" size={32} />
                </div>
                <div className="absolute -bottom-8 -left-12 z-10 glass-card p-4 rounded-xl transform rotate-30 opacity-80">
                  <Send
                    className="text-primary-foreground rotate-40"
                    size={40}
                  />
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="glass-card p-4 rounded-xl flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-card-foreground/20 flex items-center justify-center">
                    <Lock className="text-primary-foreground text-md" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-card-foreground/30 rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-card-foreground/10 rounded-full"></div>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl flex items-center gap-2 translate-x-8">
                  <div className="w-10 h-10 rounded-full bg-card-foreground/20 flex items-center justify-center">
                    <Shield className="text-primary-foreground text-md" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-card-foreground/30 rounded-full mb-2"></div>
                    <div className="h-2 w-12 bg-card-foreground/10 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-xl">
                <h2 className=" text-primary-foreground text-lg font-medium">
                  Secure Education
                </h2>
                <p className="text-primary-foreground/60 text-sm font-medium mt-2">
                  Connecting global administrators through a trusted, verified
                  ecosystem.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
