
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
import { ROLES, STATUS } from "@/constant/createTest/roleStatus";
import { ROUTES } from "@/constant/routes";
import { createNewUserController, RegisterAndVarifyController } from "@/controllers/authControllers";
import imgController from "@/controllers/imgController";
import getFirebaseAuthError from "@/utils/getFirebaseAuthError";

import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  LockKeyhole,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  GraduationCap,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisPage = () => {
  const QUALIFICATIONS = [
  { value: "Matric" },
  { value: "Intermediate" },
  { value: "Diploma" },
  { value: "Bachelor's Degree" },
  { value: "Master's Degree" },
  { value: "MPhil" },
  { value: "PhD" },
];
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
    getValues
  } = useForm({
    mode: "onBlur",
  });

  // =========================
  // Profile Image
  // =========================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================
  // Submit
  // =========================

  const onSubmit = async (data) => {
    try {
      let profileImageUrl = null;

      // Upload profile image
      if (selectedImage) {
        setIsUploading(true);

        const toastId = toast.loading(
          "Uploading profile image..."
        );

        profileImageUrl = await imgController(selectedImage);

        toast.success("Profile image uploaded successfully.", {
          id: toastId,
        });

        setIsUploading(false);
      }

      const payload = {
        name: data.name,
        InstituteName: data.InstituteName,
        LastQualification: data.LastQualification,
        email: data.email,
        profileImageUrl,
        role: ROLES.student,
        status: STATUS.ACTIVE
      }

      console.log("Registration Data:", payload);
      // Register user
      const User = await RegisterAndVarifyController(
        data.email,
        data.password,
        data.name,
      );

      toast.success("Account created successfully!");
      console.log("USER LJ",User)
      await createNewUserController(payload,User.user.uid)
      reset();
      removeImage();

      navigate(ROUTES.VERIFICATION, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Registration Component:",
        error
      );

      setIsUploading(false);

      const errorMsg = getFirebaseAuthError(
        error?.message || "Registration failed."
      );

      toast.error(errorMsg);

      setError("email", {
        type: "manual",
        message: errorMsg,
      });
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">

        {/* =================================
            BRAND
        ================================= */}

        <div className="mb-7 text-center">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="text-lg font-bold">
                S
              </span>
            </div>

            <span className="text-xl font-bold tracking-tight text-foreground">
              {appName}
            </span>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your account and start your learning journey.
          </p>
        </div>

        {/* =================================
            SINGLE REGISTRATION CARD
        ================================= */}

        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

          {/* Card Header */}

          <div className="border-b border-border bg-muted/20 px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">

              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-foreground">
                  Personal information
                </h2>

                <p className="text-xs text-muted-foreground">
                  Complete your information to create an account
                </p>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 p-5 sm:p-8"
          >

            {/* =================================
                PROFILE IMAGE
            ================================= */}

            <div className="flex flex-col items-center">

              <div className="relative">

                <div className="size-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md ring-1 ring-border sm:size-32">

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="grid size-full place-items-center">
                      <UserRound className="size-10 text-muted-foreground/50" />
                    </div>
                  )}

                </div>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove profile image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}

              </div>

              <div className="mt-4 text-center">

                <h3 className="text-sm font-semibold text-foreground">
                  Profile picture
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG or WebP · Maximum 5MB
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-xs font-medium text-foreground transition hover:bg-muted"
                >
                  {imagePreview ? (
                    <>
                      <ImagePlus className="size-4" />
                      Change image
                    </>
                  ) : (
                    <>
                      <Upload className="size-4" />
                      Upload image
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* =================================
                ACCOUNT INFORMATION
            ================================= */}

            <div className="space-y-5">

              <SectionHeading
                icon={<UserRound className="size-4" />}
                title="Account information"
                description="Basic information for your profile"
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <NameFeild
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                </div>

                <div className="sm:col-span-2">
                  <EmailFeild
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                </div>

              </div>

            </div>

            {/* =================================
                SECURITY
            ================================= */}

            <div className="space-y-5">

              <SectionHeading
                icon={<LockKeyhole className="size-4" />}
                title="Account security"
                description="Create a secure password for your account"
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <PasswordFeild
                  register={register}
                  errors={errors}
                />

                <ConfirmPasswordFeild
                  register={register}
                  errors={errors}
                  watch={watch}
                  getValues={getValues}
                />

              </div>

              {/* Security Info */}

              <div className="flex gap-3 rounded-xl border border-border bg-muted/30 p-4">

                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Keep your account secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Use a strong password that you don't use on
                    other websites.
                  </p>
                </div>

              </div>

            </div>

            {/* =================================
                EDUCATION DETAILS
            ================================= */}

            <div className="space-y-5">

              <SectionHeading
                icon={<GraduationCap className="size-4" />}
                title="Education details"
                description="Tell us about your educational background"
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <TextFeild
                    purpose="Institute Name"
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                </div>

                <div>
                  <DropDownFeild
                    purpose="Last Qualification"
                    register={register}
                    errors={errors}
                    watch={watch}
                    OPTIONS={QUALIFICATIONS}
                  />
                </div>

              </div>

            </div>

            {/* =================================
                ACCOUNT NOTICE
            ================================= */}

            <div className="flex items-start gap-3 rounded-xl bg-muted/30 p-4">

              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-muted-foreground">
                Please make sure the information you provide is
                accurate. You can update your profile information
                later from your account settings.
              </p>

            </div>

            {/* =================================
                REGISTER
            ================================= */}

            <SubmitBtn
              isSubmitting={
                isSubmitting || isUploading
              }
              disabled={isUploading}
            />

            {/* =================================
                DIVIDER
            ================================= */}

            <div className="relative py-1">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>

            </div>

            {/* =================================
                SOCIAL LOGIN
            ================================= */}

            <div className="grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition hover:bg-muted active:scale-[0.99]"
              >
                <Google className="size-5" />
                Continue with Google
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition hover:bg-muted active:scale-[0.99]"
              >
                <Github className="size-5" />
                Continue with GitHub
              </button>

            </div>

            {/* =================================
                LOGIN
            ================================= */}

            <div className="border-t border-border pt-6 text-center">

              <p className="text-sm text-muted-foreground">

                Already have an account?{" "}

                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Sign in
                  <ArrowRight className="size-3.5" />
                </Link>

              </p>

            </div>

          </form>
        </section>

        {/* =================================
            FOOTER
        ================================= */}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {appName}. All rights reserved.
        </p>

      </div>

      <Toaster />
    </main>
  );
};

// ========================================
// SECTION HEADING
// ========================================

const SectionHeading = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {description}
        </p>
      </div>

    </div>
  );
};

export default RegisPage;

