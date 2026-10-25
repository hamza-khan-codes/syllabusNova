import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Layers3,
  FolderKanban,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Info,
  Lock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { completeStep, setCurrentStep, updateCreateTest, updateStructure } from "@/features/CreateTest/createTestSlices";
import { ROUTES } from "@/constant/routes";
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import { useNavigate, useParams } from "react-router-dom";
import StepTreaker from "./StepTreaker";
import { updateTestController } from "@/controllers/Create Test/createTestControllers";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import getInsertNewItemInArray from "@/utils/getInsertNewItemInArray";

/* =========================================================
   ZOD SCHEMA
========================================================= */

const sectionSchema = z.object({
  title: z.string().trim().min(1, "Section title is required"),

  questions: z.coerce
    .number()
    .int("Questions must be a whole number")
    .min(1, "At least 1 question is required"),

  marks: z.coerce
    .number()
    .int("Marks must be a whole number")
    .min(1, "Marks must be at least 1"),
  negativeMarks: z.coerce
    .number()
    .int("Marks must be a whole number")
    .min(0, "Marks cannot be negative")
    .max(5, "Marks maximum is 5"),

  passingMarks: z.coerce
    .number()
    .int("Passing marks must be a whole number")
    .min(0, "Passing marks cannot be negative"),
  sectionId: z.string()
});

const structureSchema = z
  .object({
    structureType: z.enum(["single", "multiple"]),

    totalQuestions: z.coerce
      .number()
      .int("Questions must be a whole number")
      .min(1, "At least 1 question is required"),

    totalMarks: z.coerce
      .number()
      .int("Marks must be a whole number")
      .min(1, "Total marks must be at least 1"),
    duration: z.coerce
      .number()
      .int("Duration must be a whole number")
      .min(1, "Duration must be at least 1 minute"),

    negativeMarks: z.coerce
      .number()
      .int("Marks must be a whole number")
      .min(0, "Marks cannot be negative")
      .max(5, "Marks maximum is 5"),

    passingMarks: z.coerce
      .number()
      .int("Passing marks must be a whole number")
      .min(0, "Passing marks cannot be negative"),

    sectionTitle: z.string().optional(),
    passingPercentage: z.number().min(0).max(100),

    sections: z.array(sectionSchema),
  })
  .superRefine((data, ctx) => {
    /* -------------------------
       SINGLE SECTION
    ------------------------- */

    if (data.structureType === "single") {
      if (data.passingMarks > data.totalMarks) {
        ctx.addIssue({
          code: "custom",
          path: ["passingMarks"],
          message: "Passing marks cannot exceed total marks",
        });
      }
    }

    /* -------------------------
       MULTIPLE SECTIONS
    ------------------------- */

    if (data.structureType === "multiple") {
      if (data.sections.length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["sections"],
          message: "Add at least two section",
        });
      }

      data.sections.forEach((s, index) => {
        const totalMarks = s.marks * s.questions;
        if (totalMarks < s.passingMarks) {
          ctx.addIssue({
            code: "custom",
            path: [`sections[${index}].passingMarks`, index],
            message: `Passing marks cannot exceed totalMarks ${totalMarks}`,
          });
        }
      });
    }
  });

/* =========================================================
   COMPONENT
========================================================= */

export default function CreateTestStructure({
  defaultValues,
  onBack,
  onContinue,
}) {
  const dispatch = useDispatch()
  const { testId } = useParams()
  const createTest = useSelector((state) => state.createTest);
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(structureSchema),

    defaultValues: defaultValues || {
      structureType: "single",

      totalQuestions: 50,
      totalMarks: 50,
      passingMarks: 25,
      negativeMarks: 0,
      duration: 10,
      sectionTitle: "",
      passingPercentage: 0,

      sections: [
        {
          title: "Section 1",
          questions: 25,
          marks: 2,
          passingMarks: 32,
          negativeMarks: 0,
          sectionId: crypto.randomUUID()
        },
        {
          title: "Section 2",
          questions: 25,
          marks: 2,
          passingMarks: 32,
          negativeMarks: 0,
          sectionId: crypto.randomUUID()
        },
      ],
    },
  });

  /* =========================================================
     FIELD ARRAY
  ========================================================= */

  const {
    fields: sectionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "sections",
  });

  /* =========================================================
     WATCH VALUES
  ========================================================= */

  const structureType = useWatch({
    control,
    name: "structureType",
  });

  const totalQuestions = useWatch({
    control,
    name: "totalQuestions",
  });

  const totalMarks = useWatch({
    control,
    name: "totalMarks",
  });

  const passingMarks = useWatch({
    control,
    name: "passingMarks",
  });

  const sections = useWatch({
    control,
    name: "sections",
  });
  const passingPercentage = useWatch({
    control,
    name: "passingPercentage",
  });

  const duration = useWatch({
    control,
    name: "duration",
  });

  /* =========================================================
     AUTO CALCULATE MULTIPLE SECTION TOTALS
  ========================================================= */

  useEffect(() => {
    if (structureType !== "multiple") return;

    const questionTotal =
      sections?.reduce(
        (total, section) => total + (Number(section?.questions) || 0),
        0,
      ) || 0;

    const marksTotal =
      sections?.reduce(
        (total, section) =>
          total + (Number(section?.marks * section?.questions) || 0),
        0,
      ) || 0;

    const PassingMarks =
      sections?.reduce(
        (total, section) => total + (Number(section?.passingMarks) || 0),
        0,
      ) || 0;

    console.log("TotalMarks", marksTotal);
    setValue("passingMarks", PassingMarks);
    setValue("totalQuestions", questionTotal);
    setValue("totalMarks", marksTotal);
  }, [sections, structureType, setValue]);

  useEffect(() => {
    let percentage = (passingMarks / totalMarks) * 100;
    setValue("passingPercentage", percentage);
  }, [setValue, passingMarks]);

  /* =========================================================
     SUBMIT
  ========================================================= */
  console.log("Redex CreateTest Structure :", createTest)

  const onSubmit = async (data) => {
    let toastId
    try {

      console.log("STRUCTURE DATA:", data, structureType);

      // For Multi Section
      let Questions =
        !(structureType === "single") &&
        data.sections.reduce((a, b) => {
          return a.questions + b.questions;
        });

      let marks =
        !(structureType === "single") &&
        data.sections.reduce((a, b) => {
          return a.marks + b.marks;
        }) * Questions;

      console.log("marks", marks);

      const payload = {
        ...data,
        isSectionWise: !(structureType === "single"),
        sections: !(structureType === "single") ? data.sections : [],
      };

      dispatch(updateStructure(payload));

      const updatedCreateTest = {
        structure: {
          ...createTest.structure,
          ...payload,
        },
        workflow: {
          ...createTest.workflow,
          completed: getInsertNewItemInArray(createTest.workflow.completed,
            WORKFLOW_CREATETEST_STEPS.steps[1].step)
          ,
          previousStep: WORKFLOW_CREATETEST_STEPS.steps[1].step,
          visited: getInsertNewItemInArray(createTest.workflow.visited,
            WORKFLOW_CREATETEST_STEPS.steps[2].step)
          ,
          currentStep: WORKFLOW_CREATETEST_STEPS.steps[2].step,
          nextStep: WORKFLOW_CREATETEST_STEPS.steps[3].step,
        }
      };
      console.log("UPDATE Structure :",updatedCreateTest)

      toastId = toast.loading("Updating test...");
      await updateTestController(testId, updatedCreateTest)
      toast.success("Updated successfully!", {
        id: toastId,
      });
      dispatch(setCurrentStep(WORKFLOW_CREATETEST_STEPS.steps[2].step));
      dispatch(completeStep(WORKFLOW_CREATETEST_STEPS.steps[1].step));
      navigate(ROUTES.CREATETEST + "/" + testId + "/" + ROUTES.TESTSETTING);
    } catch (error) {
      console.error(error);
      toast.error("Error ! "+ error, {
        id: toastId,
      });
    }
  };

  /* =========================================================
     ADD SECTION
  ========================================================= */

  const handleAddSection = () => {
    append({
      title: `Section ${sectionFields.length + 1}`,
      questions: 10,
      marks: 10,
      passingMarks: 5,
      sectionId: crypto.randomUUID()
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-full bg-background text-foreground"
    >
      <Toaster />
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Test Structure</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose how your test will be organized.
        </p>
      </div>

      {/* ===============================================
           STEPS
          ================================================ */}
      <StepTreaker />


      {/* =====================================================
          STRUCTURE TYPE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* SINGLE SECTION */}

        <button
          type="button"
          onClick={() =>
            setValue("structureType", "single", {
              shouldValidate: true,
            })
          }
          className={`
            relative rounded-xl border p-6 text-left transition-all
            ${structureType === "single"
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "border-border bg-card hover:border-primary/50"
            }
          `}
        >
          {/* Radio */}

          <div className="absolute right-5 top-5">
            <div
              className={`
                flex h-6 w-6 items-center justify-center rounded-full border
                ${structureType === "single"
                  ? "border-primary bg-primary"
                  : "border-border"
                }
              `}
            >
              {structureType === "single" && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
              )}
            </div>
          </div>

          {/* Icon */}

          <div
            className={`
              mb-5 flex h-12 w-12 items-center justify-center rounded-xl
              ${structureType === "single"
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
              }
            `}
          >
            <Layers3 size={25} />
          </div>

          <h2 className="text-base font-semibold">Single Section</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            All questions are placed in one section.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-primary" />

            <span>Simple and quick setup</span>
          </div>
        </button>

        {/* MULTIPLE SECTIONS */}

        <button
          type="button"
          onClick={() =>
            setValue("structureType", "multiple", {
              shouldValidate: true,
            })
          }
          className={`
            relative rounded-xl border p-6 text-left transition-all
            ${structureType === "multiple"
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "border-border bg-card hover:border-primary/50"
            }
          `}
        >
          {/* Radio */}

          <div className="absolute right-5 top-5">
            <div
              className={`
                flex h-6 w-6 items-center justify-center rounded-full border
                ${structureType === "multiple"
                  ? "border-primary bg-primary"
                  : "border-border"
                }
              `}
            >
              {structureType === "multiple" && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
              )}
            </div>
          </div>

          {/* Icon */}

          <div
            className={`
              mb-5 flex h-12 w-12 items-center justify-center rounded-xl
              ${structureType === "multiple"
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
              }
            `}
          >
            <FolderKanban size={25} />
          </div>

          <h2 className="text-base font-semibold">Multiple Sections</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Organize questions into multiple sections.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-primary" />

            <span>Better for complex tests</span>
          </div>
        </button>
      </div>

      {/* =====================================================
          SINGLE SECTION
      ===================================================== */}

      {structureType === "single" && (
        <div className="mt-5 rounded-xl border border-border bg-card p-6">
          <div className="mb-6">
            <h2 className="font-semibold">Single Section Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Set the total questions and marks for your test.
            </p>
          </div>

          {/* Fields */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {/* QUESTIONS */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Total Questions
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                min="1"
                {...register("totalQuestions")}
                className="input"
              />

              {errors.totalQuestions && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.totalQuestions.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Total number of questions.
              </p>
            </div>

            {/* NEGATIVE MARKS */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Negative Marks
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                {...register("negativeMarks")}
                className="input"
              />

              {errors.negativeMarks && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.negativeMarks.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Marks deducted for each incorrect answer. Maximum 5.
              </p>
            </div>

            {/* MARKS */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Total Marks
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                min="1"
                {...register("totalMarks")}
                className="input"
              />

              {errors.totalMarks && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.totalMarks.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Total marks for this test.
              </p>
            </div>

            {/* DURATION */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Duration
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                min="1"
                {...register("duration")}
                className="input"
                placeholder="e.g. 60"
              />

              {errors.duration && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.duration.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Duration of the test in minutes.
              </p>
            </div>

            {/* PASSING */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Passing Marks
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                min="0"
                {...register("passingMarks")}
                className="input"
              />

              {errors.passingMarks && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.passingMarks.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Minimum marks required to pass.
              </p>
            </div>
          </div>

          {/* SECTION TITLE */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Section Title
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Optional
              </span>
            </label>

            <input
              type="text"
              placeholder="e.g. Full Test"
              {...register("sectionTitle")}
              className="input"
            />

            <p className="mt-1.5 text-xs text-muted-foreground">
              This title will be shown to students.
            </p>
          </div>

          {/* INFO */}

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Info size={18} className="mt-0.5 shrink-0 text-primary" />

            <p className="text-sm text-muted-foreground">
              You can add all questions in the Questions step.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          MULTIPLE SECTIONS
      ===================================================== */}

      {structureType === "multiple" && (
        <div className="mt-5 rounded-xl border border-border bg-card p-6">
          {/* HEADER */}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Test Sections</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Divide your test into different subjects or sections.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddSection}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={17} />
              Add Section
            </button>
          </div>

          {/* DURATION */}
          <div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Duration
                <span className="ml-1 text-destructive">*</span>
              </label>

              <input
                type="number"
                min="1"
                {...register("duration")}
                className="input"
                placeholder="e.g. 60"
              />

              {errors.duration && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.duration.message}
                </p>
              )}

              <p className="mt-1.5 text-xs text-muted-foreground">
                Duration of the test in minutes.
              </p>
            </div>
          </div>

          {/* SECTION LIST */}

          <div className="space-y-4">
            {sectionFields.map((field, index) => {
              const sectionError = errors.sections?.[index];

              return (
                <div
                  key={field.id}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  {/* Section header */}

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          Section {index + 1}
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Configure section details
                        </p>
                      </div>
                    </div>

                    {sectionFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                        title="Remove section"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>

                  {/* Section fields */}

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    {/* TITLE */}

                    <div className="md:col-span-1">
                      <label className="mb-2 block text-sm font-medium">
                        Section Title
                      </label>

                      <input
                        type="text"
                        {...register(`sections.${index}.title`)}
                        className="input"
                        placeholder="Mathematics"
                      />

                      {sectionError?.title && (
                        <p className="mt-1 text-xs text-destructive">
                          {sectionError.title.message}
                        </p>
                      )}
                    </div>

                    {/* QUESTIONS */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Questions
                      </label>

                      <input
                        type="number"
                        min="1"
                        {...register(`sections.${index}.questions`)}
                        className="input"
                      />

                      {sectionError?.questions && (
                        <p className="mt-1 text-xs text-destructive">
                          {sectionError.questions.message}
                        </p>
                      )}
                    </div>

                    {/* MARKS */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Marks
                      </label>

                      <input
                        type="number"
                        min="1"
                        {...register(`sections.${index}.marks`)}
                        className="input"
                      />

                      {sectionError?.marks && (
                        <p className="mt-1 text-xs text-destructive">
                          {sectionError.marks.message}
                        </p>
                      )}
                    </div>
                    {/* Nagetive Marks */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Nagetive Marks
                      </label>

                      <input
                        type="number"
                        {...register(`sections.${index}.negativeMarks`)}
                        className="input"
                      />

                      {sectionError?.negativeMarks && (
                        <p className="mt-1 text-xs text-destructive">
                          {sectionError.negativeMarks.message}
                        </p>
                      )}
                    </div>

                    {/* PASSING MARKS */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Passing Marks
                      </label>

                      <input
                        type="number"
                        min="0"
                        {...register(`sections.${index}.passingMarks`)}
                        className="input"
                      />

                      {sectionError?.passingMarks[index] && (
                        <p className="mt-1 text-xs text-destructive">
                          {sectionError.passingMarks[index].message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TOTAL SUMMARY */}

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
            <SummaryBox label="Total Questions" value={totalQuestions || 0} />

            <SummaryBox label="Total Marks" value={totalMarks || 0} />

            <SummaryBox label="Passing Marks" value={passingMarks || 0} />

            <SummaryBox label="Sections" value={sectionFields.length} />
          </div>

          {/* ERROR */}

          {console.log("Error", errors)}
          {errors.totalQuestions && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              <Info size={16} />
              {errors.totalQuestions.message}
            </div>
          )}

          {errors.totalMarks && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              <Info size={16} />
              {errors.totalMarks.message}
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          STRUCTURE SUMMARY
      ===================================================== */}

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers3 size={20} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">Structure Summary</h3>

            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-5">
              <div>
                <p className="text-xs text-muted-foreground">Type</p>

                <p className="mt-1 text-sm font-medium capitalize">
                  {structureType === "single"
                    ? "Single Section"
                    : "Multiple Sections"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Questions</p>

                <p className="mt-1 text-sm font-medium">
                  {totalQuestions || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="mt-1 text-sm font-medium">{duration || 0}min</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Total Marks</p>

                <p className="mt-1 text-sm font-medium">{totalMarks || 0}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Passing Marks</p>

                <p className="mt-1 text-sm font-medium">{passingMarks || 0}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Passing Percentage
                </p>

                <p className="mt-1 text-sm font-medium">
                  {passingPercentage || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACTIONS
      ===================================================== */}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <Lock size={15} />
          Your test will be saved automatically as you proceed.
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Continue
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   SUMMARY BOX
========================================================= */

function SummaryBox({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
