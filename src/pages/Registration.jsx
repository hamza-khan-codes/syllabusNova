import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputInlineError from "../components/common/InlineError";
import PasswordFeild from "../components/common/PasswordFeild";
import SubmitBtn from "../components/common/SubmitBtn";
import { GraduationCapIcon, Mail, User } from "lucide-react";
import { toast } from "sonner";
import Toaster from "@/components/ui/sonner";
import { RegisterAndVarifyController } from "@/controllers/authControllers";
import { domainError } from "@/constant/Error";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";
import { DevTool } from "@hookform/devtools";
import { ROUTES } from "@/constant/routes";



export default function Registration() {
  const { register, setError, handleSubmit, formState, getValues,control ,reset} = useForm();
  const { errors, isSubmitting,isValid } = formState;
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

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (passwordType) => {
    if (passwordType === "password") {
      if (!isPasswordVisible.password) {
        setIsPasswordVisible((prev) => ({ ...prev, password: true }));
      } else {
        setIsPasswordVisible((prev) => ({ ...prev, password: false }));
      }
    }

    if (passwordType === "confirmPassword") {
      if (!isPasswordVisible.confirmPassword) {
        setIsPasswordVisible((prev) => ({ ...prev, confirmPassword: true }));
      } else {
        setIsPasswordVisible((prev) => ({ ...prev, confirmPassword: false }));
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
    <AuthLayout>
      <Toaster />
      <button
        onClick={() => {
          const id = toast.loading("Uploading...");
          setTimeout(() => {
            toast.success(`Upload Complete `, {
              id,
            });
          }, 3000);
         
        }}
      >
        Show Toast
      </button>

      <div className="flex flex-col h-auto items-center justify-center  mx-auto  lg:py-0 @max-3xl:h-screen ">
        <div
          className="w-full  bg-card text-muted-foreground   shadow  md:mt-0 
       xl:p-0  "
        >
          <div className="w-full px-6 py-4 space-y-4 md:space-y-6 ">
            <div className="text-center flex flex-col items-center justify-center ">
              <span className="p-2.5 mb-4 bg-primary flex justify-center items-center rounded-lg">
                <GraduationCapIcon
                  size={"30"}
                  className=" text-primary-foreground"
                />
              </span>
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-2xl ">
                Create an Account
              </h1>
              <p>Start your journey toward academic excellence.</p>
            </div>
            <form
              className="space-y- md:space-y- "
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-muted-foreground "
                >
                  Your Full Name
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-6.5 -translate-y-2/3 text-muted-foreground text-[20px]"
                  />

                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-lg   transition-all outline-1 font-body-md text-body-md text-muted-foreground bg-muted"
                    id="name"
                    placeholder="Enter Your Name"
                    type="name"
                    name="name"
                    {...register("name", {
                      required: "Name is required.",
                    })}
                  />
                  <div className="error  h-6 flex items-center">
                    {errors.name && (
                      <InputInlineError ErrorMsg={errors.name.message} />
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-muted-foreground "
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-6.5 -translate-y-2/3 text-muted-foreground text-[20px]"
                  />
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-muted border border-outline-variant rounded-lg   transition-all outline-1 font-body-md text-body-md text-muted-foreground"
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
                      validate: {
                        available: (value) => {
                          const availableEmail = "hamza@gmail.com";
                          return (
                            value !== availableEmail ||
                            `Email is already exist.Please login.`
                          );
                        },
                      },
                    })}
                  />
                  <div className="error h-6 flex items-center">
                    {errors.email && (
                      <InputInlineError ErrorMsg={errors.email.message} />
                    )}
                    {errors.email?.type === "available" && (
                      <span
                        className="text-sm font-bold cursor-pointer text-blue-800 ml-1"
                        onClick={() => navigate("/login")}
                      >
                        Go to login
                      </span>
                    )}
                  </div>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]"></span>
                  </button>
                </div>
              </div>

              {/* Password feilds */}

              <div className="">
                <div className="">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-muted-foreground "
                  >
                    Password
                  </label>
                  {/* password */}
                  <PasswordFeild register={register} errors={errors} />
                </div>
                {/* conformPassword */}
                <div className="">
                  <label
                    htmlFor="conformPassword"
                    className="block mb-2 text-sm font-medium text-muted-foreground "
                  >
                    Conform Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-6.5 -translate-y-1/2 text-muted-foreground text-[20px]">
                      lock
                    </span>
                    <input
                      className="w-full pl-10 pr-12 py-3 bg-muted border border-outline-variant rounded-lg   transition-all outline-1 font-body-md text-body-md text-muted-foreground"
                      id="conformPassword"
                      placeholder={
                        isPasswordVisible.confirmPassword
                          ? "Password"
                          : "********"
                      }
                      type={
                        isPasswordVisible.confirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: "Confirm password is required.",
                        validate: {
                          hasUppercase: (value) =>
                            /[A-Z]/.test(value) ||
                            "Must contain an uppercase letter",

                          hasNumber: (value) =>
                            /[0-9]/.test(value) || "Must contain a number",

                          hasSpecialChar: (value) =>
                            /[!@#$%^&*]/.test(value) ||
                            "Must contain a special character",
                          isSame: (value) =>
                            value === getValues("password") ||
                            "Confirm password not match.",
                        },
                      })}
                    />
                    
                    <button
                      className="absolute right-3 top-6.5 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      onClick={() => {
                        togglePassword("confirmPassword");
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined visibleIcon">
                        {isPasswordVisible.confirmPassword
                          ? "visibility"
                          : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* last qulificlation */}
              <div>
                <label
                  htmlFor="lastQulification"
                  className="block mb-2 text-sm font-medium capitalize text-muted-foreground "
                >
                  last qulification
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-6.5 -translate-y-1/2 text-muted-foreground text-[20px]">
                    school
                  </span>
                  <select
                    name="lastQulification"
                    id="lastQulification"
                    className="w-full pl-10 pr-12 py-3 ml-1 bg-muted border border-outline-variant rounded-lg   transition-all outline-1  text-muted-foreground font-semibold capitalize"
                    {...register("lastQulification", {
                      required: "Last Qulification is required.",
                    })}
                    defaultValue=""
                  >
                    <option
                      value=""
                      className="text-background capitalize font-semibold"
                    >
                      Select Qualification
                    </option>
                    {Qulifications.map((q,i) => {
                      return (
                        <option
                          value={q.value}
                          key={i}
                          className="text-muted-foreground capitalize font-semibold"
                        >
                          {q.value}
                        </option>
                      );
                    })}
                  </select>
                  <div className="error ab  h-6 flex items-center">
                    <div className="error ab  h-6 flex items-center">
                      {errors.lastQulification && (
                        <InputInlineError
                          ErrorMsg={errors.lastQulification.message}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]"></span>
                  </button>
                </div>
              </div>
              {/* Institude name */}
              <div>
                <label
                  htmlFor="InstidudeName"
                  className="block mb-2 text-sm font-medium capitalize text-muted-foreground "
                >
                  your Institude name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-6.5 -translate-y-1/2 text-muted-foreground text-[20px]">
                    school
                  </span>
                  <input
                    className="w-full pl-10 pr-12 py-3 ml-1 bg-muted border border-outline-variant rounded-lg   transition-all outline-1 font-body-md text-body-md text-muted-foreground"
                    id="InstidudeName"
                    placeholder="Enter Your Institude Name"
                    type="text"
                    name="institudeName"
                    {...register("institudeName", {
                      required: "Institude name is required.",
                    })}
                  />
                  <div className="error ab  h-6 flex items-center">
                    <div className="error ab  h-6  flex items-center">
                      {errors.institudeName && (
                        <InputInlineError
                          ErrorMsg={errors.institudeName.message}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]"></span>
                  </button>
                </div>
              </div>

              <SubmitBtn isSubmitting={isSubmitting} disabled={!isValid} />

              <div className="relative flex items-center py-2">
                <div className="grow border-t bg-accent-foreground"></div>
                <span className="shrink-0 mx-4 font-label-sm text-md uppercase tracking-wider">
                  Or
                </span>
                <div className="grow border-t bg-accent-foreground"></div>
              </div>

              <p className="text-md text-center  text-on-background ">
                Already have an acount?{" "}
                <a
                  href="/login"
                  className="font-bold  text-primary active:underline "
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <DevTool control={control}/>
    </AuthLayout>
  );
}
