import { useState } from "react";
import {
  Plus,
  Search,
  Sun,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Upload,
  ImagePlus,
  FileText,
  ListChecks,
  Settings,
  Eye,
  CheckCircle2,
  Lightbulb,
  Save,
  Lock,
  X,
  CircleHelp,
  Clock3,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createTestSchema from "@/schema/createTestSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import imgController from "@/controllers/imgController";
import { useDispatch, useSelector } from "react-redux";
import {
  completeStep,
  setCurrentStep,
  updateInfo,
} from "@/features/CreateTest/createTestSlices";
import InputInlineError from "../common/InlineError";
import Toaster from "../ui/sonner";
import { DevTool } from "@hookform/devtools";
import StepTreaker from "./StepTreaker";
import { ROUTES } from "@/constant/routes";
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";

const categories = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Urdu",
  "Islamic Studies",
  "Pakistan Studies",
  "General Knowledge",
  "Programming",
  "Web Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Engineering",
  "Business",
  "Accounting",
  "Economics",
  "Entrance Exam",
  "ECAT",
  "MDCAT",
  "NTS",
  "Other",
];

const subjects = [
  "Algebra",
  "Calculus",
  "Geometry",
  "Mechanics",
  "Thermodynamics",
  "Electromagnetism",
  "Organic Chemistry",
  "Programming",
  "Data Structures",
  "Web Development",
  "Database",
  "English Grammar",
  "Vocabulary",
  "Reading Comprehension",
  "For Computer Science"
];

const steps = [
  {
    number: 1,
    title: "Info",
    description: "Basic information",
    icon: FileText,
  },
  {
    number: 2,
    title: "Structure",
    description: "Test structure",
    icon: ListChecks,
  },
  {
    number: 3,
    title: "Settings",
    description: "Test settings",
    icon: Settings,
  },
  {
    number: 4,
    title: "Questions",
    description: "Add questions",
    icon: BookOpen,
  },
  {
    number: 5,
    title: "Publish",
    description: "Review & publish",
    icon: Eye,
  },
];

const difficulties = ["Easy", "Medium", "Hard"];


export default function CreateTestInfo() {
  const dispatch = useDispatch();
  const createTest = useSelector((state) => state.createTest);

  const { register, handleSubmit, formState, control } = useForm({
    resolver: zodResolver(createTestSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      category: "",
      difficulty: difficulties[0],
      cover: null,
    },
  });

  const { errors } = formState;
  const navigate = useNavigate();

  // Submit Function

  const onSubmit = async (data) => {
    try {
      const file = data.cover?.[0];
      console.log(data);
      let coverUrl = null;

      if (file) {
        const toastId = toast.loading("Uploading image...");
        coverUrl = await imgController(file);
        toast.success("Image uploaded successfully!", {
          id: toastId,
        });
      }

      const payload = {
        ...data,
        cover: coverUrl,
      };
      dispatch(updateInfo(payload));
      const updatedCreateTest = {
        ...createTest,
        info: {
          ...createTest.info,
          ...payload,
        },
      };
      console.log("DAtA:", updatedCreateTest);

      localStorage.setItem("createTest", JSON.stringify(updatedCreateTest)); 
      dispatch(setCurrentStep(WORKFLOW_CREATETEST_STEPS.steps[1].step));
      dispatch(completeStep(WORKFLOW_CREATETEST_STEPS.steps[0].step));
      navigate(ROUTES.TESTSTRUCTURE);
    } catch (error) {
      console.error(error);
    }
  };

  // ===========

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    subject: "",
    difficulty: "Medium",
    type: "Practice",
    instructions: "",
    coverImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [categorySearch, setCategorySearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField("coverImage", file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const removeImage = () => {
    setImagePreview(null);
    updateField("coverImage", null);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(subjectSearch.toLowerCase()),
  );

  const coverRegister = register("cover");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <DevTool control={control} />
      {/* ================= HEADER ================= */}

      <div className="flex">
        {/* ================= SIDEBAR ================= */}

        {/* ================= MAIN ================= */}
        <main className="w-full ">
          <div className="mx-auto max-w-375 px-5 py-7 lg:px-8">
            {/* Page title */}
            <div className="mb-7 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary">
                    <Plus size={22} />
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight">
                    Create Test
                  </h1>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create high-quality tests in just a few simple steps.
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Design, add questions, configure settings and publish.
                </p>
              </div>
            </div>


            {/* ================= STEPS ================= */}
            {/* <div className="mb-5 rounded-2xl border border-border bg-card p-5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = step.number === 1;

                  return (
                    <div
                      key={step.number}
                      className="relative flex items-start gap-3"
                    >
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border-border bg-secondary text-muted-foreground",
                        ].join(" ")}
                      >
                        <Icon size={21} />
                      </div>

                      <div>
                        <p
                          className={[
                            "text-sm font-semibold",
                            active
                              ? "text-foreground"
                              : "text-muted-foreground",
                          ].join(" ")}
                        >
                          {step.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {step.description}
                        </p>

                        <span
                          className={[
                            "mt-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                            active
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground",
                          ].join(" ")}
                        >
                          {step.number}
                        </span>
                      </div>

                      {index !== steps.length - 1 && (
                        <div className="absolute left-14.5 -right-5 top-6 hidden border-t border-dashed border-border lg:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div> */}

          <StepTreaker/> 
            

            {/* ================= CONTENT ================= */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
              {/* LEFT FORM */}
              <form id="ADDINFO" onSubmit={handleSubmit(onSubmit)}>
                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold">Test Information</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Provide basic information about your test.
                    </p>
                  </div>

                  {/* Top grid */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_310px]">
                    {/* Form fields */}
                    <div className="space-y-5">
                      {/* Title */}
                      <FormField
                        label="Test Title"
                        required
                        count={`${form.title.length}/100`}
                      >
                        <input
                          maxLength={100}
                          placeholder="Enter test title..."
                          className="input"
                          {...register("title", {
                            required: "Title is required.",
                          })}
                        />
                        {errors.title && (
                          <InputInlineError ErrorMsg={errors.title.message} />
                        )}
                      </FormField>

                      {/* Description */}
                      <FormField
                        label="Short Description"
                        count={`${form.description.length}/300`}
                      >
                        <textarea
                          maxLength={300}
                          placeholder="Enter short description about this test..."
                          rows={4}
                          className="input resize-none"
                          {...register("description")}
                        />
                        {errors.description && (
                          <InputInlineError
                            ErrorMsg={errors.description.message}
                          />
                        )}
                      </FormField>
                    </div>

                    {/* ================= IMAGE ================= */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Test Cover Image
                      </label>

                      <p className="mb-3 text-xs text-muted-foreground">
                        Upload an image that represents your test.
                      </p>

                      {imagePreview ? (
                        <div className="relative overflow-hidden rounded-xl border border-primary/60">
                          <img
                            src={imagePreview}
                            alt="Test cover preview"
                            className="h-65 w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 text-foreground backdrop-blur transition hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X size={16} />
                          </button>

                          <label className="absolute bottom-3 left-3 cursor-pointer rounded-lg bg-background/90 px-3 py-2 text-xs font-medium backdrop-blur">
                            Change image
                            <input
                              type="file"
                              {...coverRegister}
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(e) => {
                                coverRegister.onChange(e);
                                handleImageChange(e);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="group flex h-65 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/60 bg-background/40 px-5 text-center transition hover:bg-primary/5">
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary transition group-hover:scale-105">
                            <Upload size={25} />
                          </div>

                          <p className="text-sm font-medium">
                            Drag & drop an image here
                          </p>

                          <p className="my-1 text-xs text-muted-foreground">
                            or
                          </p>

                          <span className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                            Choose Image
                          </span>

                          <p className="mt-4 text-xs text-muted-foreground">
                            PNG, JPG or WEBP (Max 5MB)
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Recommended: 1200 × 630px
                          </p>

                          <input
                            type="file"
                            {...coverRegister}
                            onChange={(e) => {
                              coverRegister.onChange(e);
                              handleImageChange(e);
                            }}
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Category + Subject */}
                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          label="Category"
                          required
                          value={field.value}
                          placeholder="Select category"
                          open={categoryOpen}
                          setOpen={setCategoryOpen}
                          search={categorySearch}
                          setSearch={setCategorySearch}
                          options={filteredCategories}
                          Error={
                            errors.category && (
                              <InputInlineError
                                ErrorMsg={errors.category.message}
                              />
                            )
                          }
                          onSelect={(value) => {
                            field.onChange(value);
                            setCategoryOpen(false);
                            setCategorySearch("");
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="subject"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          label="Subject"
                          required
                          value={field.value}
                          placeholder="Select subject"
                          open={subjectOpen}
                          setOpen={setSubjectOpen}
                          search={subjectSearch}
                          setSearch={setSubjectSearch}
                          options={filteredSubjects}
                          Error={
                            errors.subject && (
                              <InputInlineError
                                ErrorMsg={errors.subject.message}
                              />
                            )
                          }
                          onSelect={(value) => {
                            field.onChange(value);
                            setSubjectOpen(false);
                            setSubjectSearch("");
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Difficulty + Type */}
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-sm font-medium">
                        Difficulty Level
                      </label>

                      <div className="flex flex-wrap gap-2">
                        <Controller
                          name="difficulty"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label className="mb-3 block text-sm font-medium">
                                Difficulty Level
                              </label>

                              <div className="flex flex-wrap gap-2">
                                {difficulties.map((difficulty) => (
                                  <button
                                    type="button"
                                    key={difficulty}
                                    onClick={() => field.onChange(difficulty)}
                                    className={[
                                      "rounded-lg border px-4 py-2 text-sm transition",
                                      field.value === difficulty
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                                    ].join(" ")}
                                  >
                                    <span
                                      className={[
                                        "mr-2 inline-block h-2 w-2 rounded-full",
                                        difficulty === "Easy" && "bg-success",
                                        difficulty === "Medium" && "bg-primary",
                                        difficulty === "Hard" &&
                                          "bg-destructive",
                                      ].join(" ")}
                                    />

                                    {difficulty}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-6">
                    <FormField
                      label="Instructions for Students"
                      count={`${form.instructions.length}/1000`}
                    >
                      <textarea
                        maxLength={1000}
                        rows={5}
                        {...register("instructions")}
                        placeholder="Enter instructions that students should read before starting the test..."
                        className="input resize-none"
                      />
                    </FormField>
                  </div>
                </section>
              </form>

              {/* ================= RIGHT SIDEBAR ================= */}
              <aside className="space-y-5">
                {/* Preview */}
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Test Preview</h3>

                    <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground">
                      <Eye size={14} />
                      Preview
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-border bg-background">
                    <div className="relative h-40 overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-primary/10">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                            <ImagePlus size={30} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="font-semibold">
                          {form.title || "Test Title"}
                        </h4>

                        <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-[10px] font-medium text-primary">
                          {form.difficulty}
                        </span>
                      </div>

                      <p className="mb-4 text-xs leading-5 text-muted-foreground">
                        {form.description ||
                          "Short description of the test will appear here..."}
                      </p>

                      <PreviewRow
                        icon={BookOpen}
                        label="Category"
                        value={form.category || "Not selected"}
                      />

                      <PreviewRow
                        icon={GraduationCap}
                        label="Subject"
                        value={form.subject || "Not selected"}
                      />

                      <PreviewRow
                        icon={ListChecks}
                        label="Questions"
                        value="0"
                      />

                      <PreviewRow
                        icon={Clock3}
                        label="Duration"
                        value="Not set"
                      />
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Lightbulb size={17} />
                    </div>

                    <h3 className="font-semibold">Tips</h3>
                  </div>

                  <div className="space-y-4">
                    <Tip>Choose a clear and descriptive title.</Tip>

                    <Tip>Select the most relevant category and subject.</Tip>

                    <Tip>
                      Add instructions to help students understand the test.
                    </Tip>

                    <Tip>You can edit all details later.</Tip>
                  </div>
                </div>
              </aside>
            </div>

            {/* ================= FOOTER ACTIONS ================= */}
            <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-primary/50"
              >
                <Save size={17} />
                Save as Draft
              </button>

              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                  <Lock size={14} />
                  Your test will be saved automatically as you proceed.
                </div>

                <button
                  type="submit"
                  form="ADDINFO"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SidebarItem({ icon: Icon, label, active = false, badge }) {
  return (
    <button
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "text-sidebar-foreground hover:bg-sidebar-accent",
      ].join(" ")}
    >
      <Icon size={19} />

      <span>{label}</span>

      {badge && (
        <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}

function FormField({ label, required = false, count, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">
          {label}

          {required && <span className="ml-1 text-destructive">*</span>}
        </label>

        {count && (
          <span className="text-xs text-muted-foreground">{count}</span>
        )}
      </div>

      {children}
    </div>
  );
}

function SearchableSelect({
  label,
  required,
  value,
  placeholder,
  open,
  setOpen,
  search,
  setSearch,
  options,
  onSelect,
  Error,
}) {
  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium">
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-3 text-sm transition hover:border-primary/50"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>

        <ChevronDown size={17} className="text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-19 z-50 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
          {/* Search */}
          <div className="border-b border-border p-2">
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
              <Search size={16} className="text-muted-foreground" />

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {options.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No {label.toLowerCase()} found.
              </div>
            ) : (
              options.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => onSelect(option)}
                  className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-accent hover:text-accent-foreground"
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
      {Error}
    </div>
  );
}

function PreviewRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-t border-border py-2.5 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={14} />
        <span>{label}</span>
      </div>

      <span className="max-w-32.5 truncate text-right font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />

      <p className="text-xs leading-5 text-muted-foreground">{children}</p>
    </div>
  );
}
