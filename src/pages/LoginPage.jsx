import { useForm } from "react-hook-form";
import InputInlineError from "@/components/common/InlineError";
import PasswordFeild from "@/components/common/PasswordFeild";
import SubmitBtn from "@/components/common/SubmitBtn";
import AuthLayout from "@/layouts/AuthLayout";
import { GraduationCap } from "lucide-react";
import { loginUserController } from "@/controllers/authControllers";
import Toaster from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { toast } from "sonner";
import { getAuth } from "firebase/auth/web-extension";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";
import Google from "@/assets/Google";


export default function LoginPage() {
  const { register, handleSubmit, formState, setError,reset } = useForm({
    mode: "onBlur",
  });
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      console.log("Data :", data);
      const { email, password } = data
      await loginUserController(email, password)
      reset();
    } catch (error) {
      console.log("loginComponent ", error);
      toast.error(getFirebaseAuthError(error.message))
    }
  };

  const forgotHandle = () => {
    console.log("forgot")
  }
  return (
    <AuthLayout>
      <Toaster/>
      <div className="flex flex-col @max-3xl:h-screen items-center justify-center px-6 py-8 md:px-0 mx-auto  lg:py-0">
        <div
          className="w-full bg-card text-card-foreground my-10 rounded-2xl shadow dark:border  
      sm:max-w-lg xl:p-0 "
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <div className="text-center flex flex-col items-center justify-center gap-">
              <span className="p-2.5 mb-4 bg-primary flex justify-center items-center rounded-lg">
                <GraduationCap size={"30"}  className=" text-primary-foreground"/>
              </span>
              <h1 className="text-xl font-extrabold leading-tight tracking-tight text-card-foreground md:text-3xl ">
                Login to Syllabus
              </h1>
              <p className="text-lg">Access your premium education partner</p>
            </div>
            <form
              className="space-y-4 md:space-y-6 "
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-6.5 -translate-y-1/2 text-outline text-[20px]">
                    mail
                  </span>
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-1 font-body-md text-body-md text-on-surface"
                    id="email"
                    placeholder="example.@example.com"
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <div className="error h-6 flex items-center">
                    {errors.email && (
                      <InputInlineError ErrorMsg={errors.email.message} />
                    )}
                    {errors.email?.type === "available" && (
                      <span
                        className="text-sm font-bold cursor-pointer text-blue-900 underline ml-1"
                        // onClick={() => /*navigate("/registration")*/}
                      >
                        Go to register
                      </span>
                    )}
                  </div>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]"></span>
                  </button>
                </div>
              </div>
              {/* Password */}
              <PasswordFeild errors={errors} register={register} />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      name="rememberMeBtn"
                      {...register("rememberMe")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-card-foreground font-medium cursor-pointer text-sm"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  onClick={forgotHandle}
                  className="text-sm  font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </button>
              </div>
              <SubmitBtn isSubmitting={isSubmitting} type="Logining" />

              <div className="relative flex items-center py-4">
                <div className="grow border-t"></div>
                <span className="shrink-0 mx-4 font-label-sm text-md uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="grow border-t"></div>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-3 outline-1"
              >
                <Google/>
                <span>Sign in with Google</span>
              </button>
              <p className="text-md text-center  text-on-background ">
                Don’t have an account yet?{" "}
                <a
                  href="/registration"
                  className="font-bold  text-primary active:underline "
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
