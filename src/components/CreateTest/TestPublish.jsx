import {
  ArrowLeft,
  BadgeMinus,
  Calculator,
  CheckCircle2,
  CirclePercent,
  ClipboardCheck,
  Clock,
  Eye,
  FolderOpen,
  Info,
  LayoutPanelTop,
  Rocket,
  Shield,
  Shuffle,
  Sparkles,
  Users,
  CircleHelp,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "../common/ui/Badge";
import { Dialog, DialogContent } from "../ui/dialog";

import {
  resetCreateTest,
  updatePublish,
} from "@/features/CreateTest/createTestSlices";

import {
  addTestController,
  setQuestionsController,
  updateTestController,
} from "@/controllers/Create Test/createTestControllers";

import { PUBLIC_APPROVAL_STEPS } from "@/constant/createTest/progressLoadingMsgs";
import { ROUTES } from "@/constant/routes";

import PublishTestPopPop from "./PublishTestPopPop";
import { toast } from "sonner";

export default function TestPublish() {
  const { testId } = useParams();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState(
    PUBLIC_APPROVAL_STEPS?.[0] || "Preparing your test..."
  );

  const createTest = useSelector((state) => state.createTest);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      visibility: createTest?.publish?.visibility || "private",
    },
  });

  const visibility = watch("visibility");

  const {
    info = {},
    structure = {},
    settings = {},
    questions = [],
  } = createTest || {};

  const sections = structure?.sections || [];

  /* =========================================
     STATISTICS
  ========================================= */

  const questionCount = questions.length;
  const totalQuestions = structure?.totalQuestions || 0;

  const questionProgress =
    totalQuestions > 0
      ? Math.min((questionCount / totalQuestions) * 100, 100)
      : 0;

  const sectionCount = sections.length;

  /* =========================================
     VALIDATION CHECKLIST
  ========================================= */

  const validationChecklist = useMemo(
    () => [
      {
        id: "title",
        label: "Test title",
        description: info?.title || "Title not added",
        completed: Boolean(info?.title?.trim()),
      },
      {
        id: "description",
        label: "Description",
        description: info?.description
          ? "Description added"
          : "Description not added",
        completed: Boolean(info?.description?.trim()),
      },
      {
        id: "category",
        label: "Category",
        description: info?.category || "Category not selected",
        completed: Boolean(info?.category),
      },
      {
        id: "structure",
        label: "Structure configured",
        description: `${totalQuestions} questions · ${structure?.totalMarks || 0
          } marks`,
        completed: totalQuestions > 0,
      },
      {
        id: "questions",
        label: "Questions added",
        description: `${questionCount} of ${totalQuestions} questions`,
        completed:
          totalQuestions > 0 && questionCount >= totalQuestions,
      },
      {
        id: "settings",
        label: "Settings completed",
        description: "Test behavior configured",
        completed: true,
      },
    ],
    [info, structure, totalQuestions, questionCount]
  );

  const completedChecks = validationChecklist.filter(
    (item) => item.completed
  ).length;

  const allValid =
    completedChecks === validationChecklist.length;

  /* =========================================
     HELPERS
  ========================================= */

  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-success/10 text-success border-success/20";

      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";

      case "Hard":
        return "bg-destructive/10 text-destructive border-destructive/20";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);

    setDescription(
      PUBLIC_APPROVAL_STEPS?.[0] || "Preparing your test..."
    );

    setProgress(16.666666666666668);

    try {
      await delay(200);

      setDescription(
        PUBLIC_APPROVAL_STEPS?.[1] || "Validating test..."
      );

      setProgress(33.333333333333336);

      const updatedCreateTest = {
        ...createTest,

        publish: {
          ...createTest.publish,
          visibility: data.visibility,
        },

        creator: {
          uid: auth?.user?.uid,
          name: auth?.user?.displayName,
        },
      };``

      await delay(100);

      setDescription(
        PUBLIC_APPROVAL_STEPS?.[2] ||
        "Preparing questions..."
      );

      setProgress(50);

      dispatch(updatePublish(data));



      const {
        workflow,
        edit,
        error: reduxError,
        loading: reduxLoading,
        publish,
        
      } = updatedCreateTest;
      const saveInFireStoreTests = 

      // await updateTestController(testId, saveInFireStoreTests)

      setDescription(
        PUBLIC_APPROVAL_STEPS?.[3] ||
        "Saving your test..."
      );

      setProgress(66.66666666666667);

      await delay(200);

      setDescription(
        PUBLIC_APPROVAL_STEPS?.[4] ||
        "Finalizing publication..."
      );

      setProgress(83.33333333333334);

      await delay(100);

      setDescription(
        PUBLIC_APPROVAL_STEPS?.[5] ||
        "Test published successfully!"
      );

      setProgress(100);

      await delay(500);


      dispatch(resetCreateTest());

      setLoading(false);
      setProgress(0);

      navigate(ROUTES.CREATETEST);
    }
    catch (err) {
      console.error(err);

      setLoading(false);
      setProgress(0);

      setError(
        err?.message ||
        "Something went wrong while publishing the test."
      );
    }

  };

  return (
    <>
      {/* =========================================
          PAGE
      ========================================= */}

      <div className="box-border min-h-screen w-full min-w-0 max-w-full overflow-x-hidden bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto box-border w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        >
          {/* =====================================
              HEADER
          ====================================== */}

          <header className="mb-8 min-w-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span>Back</span>
            </button>

            <div className="flex min-w-0 max-w-full flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                  <Badge className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Final Step
                  </Badge>

                  <span className="min-w-0 break-words text-sm text-muted-foreground">
                    Publish Test
                  </span>
                </div>

                <h1 className="break-words text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Review & publish
                </h1>

                <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-muted-foreground sm:text-base">
                  Review your test details, questions, and settings
                  before publishing it.
                </p>
              </div>

              <div className="flex w-full min-w-0 shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm lg:w-auto">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ClipboardCheck className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Completion
                  </p>

                  <p className="break-words text-sm font-semibold text-foreground">
                    {completedChecks}/{validationChecklist.length}{" "}
                    checks passed
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* =====================================
              TEST HERO
          ====================================== */}

          <section className="mb-6 min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid min-w-0 lg:grid-cols-[280px_minmax(0,1fr)]">
              {/* Cover */}

              <div className="relative min-h-48 min-w-0 overflow-hidden bg-muted lg:min-h-full">
                {info?.cover ? (
                  <img
                    src={info.cover}
                    alt={info?.title || "Test cover"}
                    className="absolute inset-0 size-full max-w-full object-cover"
                  />
                ) : (
                  <div className="flex size-full min-h-48 items-center justify-center">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                      <FolderOpen className="size-7" />
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <Badge className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  {info?.category || "Uncategorized"}
                </Badge>
              </div>

              {/* Details */}

              <div className="min-w-0 p-5 sm:p-7 lg:p-8">
                <div className="flex min-w-0 flex-col gap-6">
                  <div className="min-w-0">
                    <div className="mb-3 flex min-w-0 flex-wrap gap-2">
                      {info?.subject && (
                        <Badge className="max-w-full break-words rounded-md border border-border bg-muted text-muted-foreground">
                          {info.subject}
                        </Badge>
                      )}

                      {info?.difficulty && (
                        <Badge
                          className={`max-w-full rounded-md border ${getDifficultyClass(
                            info.difficulty
                          )}`}
                        >
                          {info.difficulty}
                        </Badge>
                      )}
                    </div>

                    <h2 className="break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {info?.title || "Untitled Test"}
                    </h2>

                    <p className="mt-3 max-w-3xl break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                      {info?.description ||
                        "No test description has been provided."}
                    </p>
                  </div>

                  {/* Stats */}

                  <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard
                      icon={CircleHelp}
                      label="Questions"
                      value={questionCount}
                      subValue={`/ ${totalQuestions}`}
                    />

                    <StatCard
                      icon={CirclePercent}
                      label="Total marks"
                      value={structure?.totalMarks || 0}
                    />

                    <StatCard
                      icon={Clock}
                      label="Duration"
                      value={`${structure?.duration || 0} min`}
                    />

                    <StatCard
                      icon={LayoutPanelTop}
                      label="Sections"
                      value={sectionCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================
              MAIN GRID
          ====================================== */}

          <div className="grid min-w-0 max-w-full gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* =================================
                LEFT COLUMN
            ================================== */}

            <div className="min-w-0 space-y-6">
              {/* Question progress */}

              <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={ClipboardCheck}
                  title="Question progress"
                  description="Make sure your test has all required questions."
                />

                <div className="mt-6 min-w-0">
                  <div className="mb-2 flex min-w-0 items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 break-words font-medium text-foreground">
                      {questionCount} of {totalQuestions} questions
                    </span>

                    <span className="shrink-0 font-semibold text-primary">
                      {Math.round(questionProgress)}%
                    </span>
                  </div>

                  <div className="h-2 w-full max-w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${questionProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Sections */}

                {structure?.isSectionWise &&
                  sections.length > 0 && (
                    <div className="mt-6 min-w-0 space-y-3">
                      {sections.map((section, index) => {
                        const sectionQuestions =
                          questions.filter(
                            (question) =>
                              question.sectionId ===
                              section.sectionId
                          ).length;

                        const percentage =
                          section.questions > 0
                            ? Math.min(
                              (sectionQuestions /
                                section.questions) *
                              100,
                              100
                            )
                            : 0;

                        return (
                          <div
                            key={
                              section.sectionId || index
                            }
                            className="min-w-0 overflow-hidden rounded-xl border border-border bg-muted/40 p-4"
                          >
                            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <p className="break-words text-sm font-semibold text-foreground [overflow-wrap:anywhere]">
                                  {section.title ||
                                    `Section ${index + 1}`}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                  {sectionQuestions} of{" "}
                                  {section.questions} questions
                                </p>
                              </div>

                              <span className="shrink-0 text-xs font-semibold text-primary">
                                {Math.round(percentage)}%
                              </span>
                            </div>

                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </section>

              {/* Test settings */}

              <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={Sparkles}
                  title="Test settings"
                  description="These settings control how students experience the test."
                />

                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
                  <SettingItem
                    icon={Shuffle}
                    label="Shuffle questions"
                    enabled={settings?.shuffleQuestions}
                  />

                  <SettingItem
                    icon={Shuffle}
                    label="Shuffle options"
                    enabled={settings?.shuffleOptions}
                  />

                  <SettingItem
                    icon={Eye}
                    label="Allow question review"
                    enabled={settings?.allowReview}
                  />

                  <SettingItem
                    icon={Calculator}
                    label="Calculator allowed"
                    enabled={settings?.calculatorAllowed}
                  />

                  <SettingItem
                    icon={BadgeMinus}
                    label="Negative marking"
                    enabled={structure?.negativeMarking}
                  />

                  <SettingItem
                    icon={CirclePercent}
                    label="Passing percentage"
                    value={`${structure?.passingPercentage || 0}%`}
                  />
                </div>
              </section>

              {/* Instructions */}

              {info?.instructions && (
                <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={Info}
                    title="Instructions"
                    description="Instructions students will see before starting."
                  />

                  <div className="mt-5 min-w-0 break-words rounded-xl border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                    {info.instructions}
                  </div>
                </section>
              )}

              {/* Section breakdown */}

              {sections.length > 0 && (
                <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={LayoutPanelTop}
                    title="Section breakdown"
                    description="Marks and passing requirements for each section."
                  />

                  <div className="mt-5 min-w-0 max-w-full overflow-hidden rounded-xl border border-border">
                    <div className="hidden min-w-0 grid-cols-[minmax(0,1fr)_100px_100px_100px] gap-4 border-b bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
                      <span>Section</span>
                      <span>Questions</span>
                      <span>Marks</span>
                      <span>Passing</span>
                    </div>

                    <div className="divide-y divide-border">
                      {sections.map((section, index) => (
                        <div
                          key={
                            section.sectionId || index
                          }
                          className="min-w-0 grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_100px_100px_100px] sm:items-center sm:gap-4"
                        >
                          <div className="min-w-0">
                            <p className="break-words text-sm font-semibold text-foreground [overflow-wrap:anywhere]">
                              {section.title ||
                                `Section ${index + 1}`}
                            </p>

                            <p className="text-xs text-muted-foreground sm:hidden">
                              {section.questions} questions
                            </p>
                          </div>

                          <span className="text-sm text-muted-foreground">
                            <span className="sm:hidden">
                              Questions:{" "}
                            </span>
                            {section.questions}
                          </span>

                          <span className="text-sm font-medium text-foreground">
                            <span className="sm:hidden">
                              Marks:{" "}
                            </span>
                            {section.marks}
                          </span>

                          <span className="text-sm font-medium text-foreground">
                            <span className="sm:hidden">
                              Passing:{" "}
                            </span>
                            {section.passingMarks}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* =================================
                RIGHT COLUMN
            ================================== */}

            <aside className="min-w-0 space-y-6">
              {/* Validation */}

              <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground">
                      Final checklist
                    </h3>

                    <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                      Everything should be ready before publishing.
                    </p>
                  </div>

                  {allValid ? (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                      <CheckCircle2 className="size-5" />
                    </div>
                  ) : (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                      <Info className="size-5" />
                    </div>
                  )}
                </div>

                <div className="mt-5 min-w-0 space-y-3">
                  {validationChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-0 gap-3 rounded-xl border border-border p-3"
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.completed ? (
                          <CheckCircle2 className="size-5 text-success" />
                        ) : (
                          <div className="size-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-medium text-foreground">
                          {item.label}
                        </p>

                        <p className="mt-0.5 break-words text-xs text-muted-foreground [overflow-wrap:anywhere]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Visibility */}

              <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={Users}
                  title="Visibility"
                  description="Choose who can access your test."
                />

                <div className="mt-5 min-w-0 space-y-3">
                  <label
                    className={`block min-w-0 cursor-pointer rounded-xl border p-4 transition ${visibility === "public"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                      }`}
                  >
                    <input
                      type="radio"
                      value="public"
                      {...register("visibility")}
                      className="sr-only"
                    />

                    <div className="flex min-w-0 gap-3">
                      <div
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${visibility === "public"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        <Users className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Public
                        </p>

                        <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                          Your test can be discovered and attempted
                          by other students.
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`block min-w-0 cursor-pointer rounded-xl border p-4 transition ${visibility === "private"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                      }`}
                  >
                    <input
                      type="radio"
                      value="private"
                      {...register("visibility")}
                      className="sr-only"
                    />

                    <div className="flex min-w-0 gap-3">
                      <div
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${visibility === "private"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        <Shield className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Private
                        </p>

                        <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                          Keep this test private and control who can
                          access it.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              {/* Publish card */}

              <section className="sticky top-6 min-w-0 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 shadow-sm sm:p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Rocket className="size-5" />
                </div>

                <h3 className="mt-4 break-words text-lg font-bold text-foreground">
                  Ready to publish?
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
                  Once published, your test will be saved and made
                  available according to your selected visibility.
                </p>

                {!allValid && (
                  <div className="mt-4 flex min-w-0 gap-2 rounded-lg border border-warning/20 bg-warning/10 p-3 text-xs leading-5 text-warning">
                    <Info className="mt-0.5 size-4 shrink-0" />

                    <span className="min-w-0 break-words">
                      Some checklist items are incomplete. You can
                      still review them before publishing.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Rocket className="size-4 shrink-0" />

                  <span>
                    {loading
                      ? "Publishing..."
                      : "Publish Test"}
                  </span>
                </button>

                <p className="mt-3 break-words text-center text-[11px] leading-5 text-muted-foreground">
                  By publishing, you confirm that the test content
                  is ready for students.
                </p>
              </section>

              {/* Error */}

              {error && (
                <div className="min-w-0 overflow-hidden rounded-xl border border-destructive/20 bg-destructive/10 p-4">
                  <div className="flex min-w-0 gap-3">
                    <Info className="size-5 shrink-0 text-destructive" />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-destructive">
                        Publishing failed
                      </p>

                      <p className="mt-1 break-words text-xs leading-5 text-destructive/80 [overflow-wrap:anywhere]">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </form>
      </div>

      {/* =====================================
    PUBLISHING PROGRESS DIALOG
====================================== */}

      <Dialog open={loading}>
        <DialogContent
          showCloseButton={false}
          className="box-border w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border-border bg-card p-0 shadow-xl"
        >
          <div className="min-w-0 p-6 sm:p-7">
            {/* Header */}

            <div className="flex min-w-0 flex-col items-center text-center">
              {/* Progress Circle */}

              <div className="relative mb-6 size-24 shrink-0">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background circle */}

                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-muted"
                  />

                  {/* Progress circle */}

                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    className="text-primary transition-all duration-500"
                    strokeDasharray="276.48"
                    strokeDashoffset={
                      276.48 * ((100 - progress) / 100)
                    }
                  />
                </svg>

                {/* Percentage */}

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Title */}

              <h2 className="break-words text-lg font-bold text-foreground">
                Publishing your test
              </h2>

              {/* Current description */}

              <p className="mt-2 max-w-sm break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                {typeof description === "string"
                  ? description
                  : description?.message ||
                  description?.title ||
                  "Preparing your test..."}
              </p>
            </div>

            {/* Main Progress Bar */}

            <div className="mt-7 w-full min-w-0">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.max(progress, 0), 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Progress Steps */}

            <div className="mt-6 min-w-0 space-y-3">
              {PUBLIC_APPROVAL_STEPS?.slice(0, 6).map(
                (step, index) => {
                  const stepProgress =
                    ((index + 1) / 6) * 100;

                  const completed =
                    progress >= stepProgress;

                  const stepText =
                    typeof step === "string"
                      ? step
                      : step?.message ||
                      step?.title ||
                      `Step ${index + 1}`;

                  return (
                    <div
                      key={index}
                      className="flex min-w-0 items-center gap-3"
                    >
                      {/* Status */}

                      {completed ? (
                        <CheckCircle2 className="size-4 shrink-0 text-success" />
                      ) : (
                        <div className="size-4 shrink-0 rounded-full border-2 border-border" />
                      )}

                      {/* Step Text */}

                      <span
                        className={`min-w-0 break-words text-xs leading-5 ${completed
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                          }`}
                      >
                        {stepText}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="size-4 shrink-0 text-primary" />

        <span className="min-w-0 truncate text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="mt-2 flex min-w-0 items-baseline gap-1">
        <span className="truncate text-lg font-bold text-foreground">
          {value}
        </span>

        {subValue && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="break-words text-base font-semibold text-foreground">
          {title}
        </h2>

        <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   SETTING ITEM
========================================= */

function SettingItem({
  icon: Icon,
  label,
  enabled,
  value,
}) {
  const hasValue = value !== undefined;

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 overflow-hidden rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
          <Icon className="size-4" />
        </div>

        <span className="min-w-0 break-words text-sm font-medium text-foreground">
          {label}
        </span>
      </div>

      {hasValue ? (
        <span className="shrink-0 text-sm font-semibold text-primary">
          {value}
        </span>
      ) : enabled ? (
        <CheckCircle2 className="size-5 shrink-0 text-success" />
      ) : (
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          Off
        </span>
      )}
    </div>
  );
}