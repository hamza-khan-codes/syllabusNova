import {
  useEffect,
} from "react";

import { useForm } from "react-hook-form";

import {
  Clock3,
  Layers3,
  Percent,
  FileText,
  Info,
  ArrowRight,
  BookOpen,
  CircleHelp,
  Trophy,
  Save,
  ChevronRight,
  Lock,
  Calculator,
  SearchIcon,
  ShuffleIcon,
  CircleMinus,
  BadgeMinus,
} from "lucide-react";

import {
  completeStep,
  setCurrentStep,
  updateSettings,
} from "@/features/CreateTest/createTestSlices";

import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import { ROUTES } from "@/constant/routes";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateTestSetting({
  initialData = {},
  structure = {},
  onBack,
  onContinue,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTest = useSelector((state) => state.createTest);

  const Structure = createTest.structure || structure || {};

  const testInfo = {
    cover: createTest.info?.cover,
    title: createTest.info?.title,
    description: createTest.info?.description,
    category: createTest.info?.category,
    subject: createTest.info?.subject,
  };

  const defaultValues = {
    duration: Structure?.duration ?? 30,
    passingPercentage: Structure?.passingPercentage ?? 50,
    sectionTitle: Structure?.sectionTitle ?? "",

    allowReview: true,
    calculatorAllowed: false,
    shuffleOptions: true,
    shuffleQuestions: true,

    negativeMarking: false,
    negativeMarks: 0,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      ...initialData,
    },
  });

  const values = watch();

  const totalQuestions = Structure?.totalQuestions ?? 50;
  const totalMarks = Structure?.totalMarks ?? 100;

  const sections =
    Structure?.sections ??
    structure?.sections ??
    [];

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      duration: Number(data.duration),
      negativeMarks: Number(data.negativeMarks),
      passingPercentage: Number(data.passingPercentage),
      passingMarks: Number(data.passingMarks || 0),
    };

    const updatedCreateTest = {
      ...createTest,
      settings: {
        ...createTest.settings,
        ...payload,
      },
    };

    console.log("DATA:", updatedCreateTest);

    dispatch(updateSettings(payload));

    localStorage.setItem(
      "createTest",
      JSON.stringify(updatedCreateTest)
    );

    dispatch(
      setCurrentStep(
        WORKFLOW_CREATETEST_STEPS.steps[3].step
      )
    );

    dispatch(
      completeStep(
        WORKFLOW_CREATETEST_STEPS.steps[2].step
      )
    );

    if (onContinue) {
      onContinue(payload);
    } else {
      navigate(ROUTES.ADDQUESTION);
    }
  };

  const toggleValue = (field) => {
    setValue(field, !values[field], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="w-full bg-background text-foreground">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="min-h-screen"
      >
        {/* ================= CONTENT ================= */}

        <div
          className="
            mx-auto
            mt-6
            grid
            w-full
            max-w-[1400px]
            grid-cols-1
            gap-5
            px-4
            pb-32
            sm:px-6
            xl:grid-cols-[minmax(0,1fr)_360px]
            2xl:grid-cols-[minmax(0,1fr)_380px]
          "
        >
          {/* ================= LEFT ================= */}

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-card
              p-5
              shadow-sm
              sm:p-7
            "
          >
            {/* Header */}

            <div>
              <h2 className="text-xl font-semibold">
                Test Settings
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Configure additional settings for your test.
              </p>
            </div>

            {/* ================= SETTINGS GRID ================= */}

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Duration */}

              <SettingCard
                icon={<Clock3 />}
                title="Test Duration"
                description="Set the time limit for the test."
              >
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    {...register("duration", {
                      required: "Duration is required",
                      min: {
                        value: 1,
                        message:
                          "Minimum duration is 1 minute",
                      },
                    })}
                    className="input"
                  />

                  <span className="shrink-0 text-sm text-muted-foreground">
                    minutes
                  </span>
                </div>

                {errors.duration && (
                  <ErrorMessage>
                    {errors.duration.message}
                  </ErrorMessage>
                )}
              </SettingCard>

              {/* Allow Review */}

              <SettingCard
                icon={<SearchIcon />}
                title="Allow Review"
                description="Allow students to review their answers."
              >
                <Toggle
                  checked={values.allowReview}
                  onClick={() =>
                    toggleValue("allowReview")
                  }
                />

                <input
                  type="hidden"
                  {...register("allowReview")}
                />
              </SettingCard>

              {/* Calculator */}

              <SettingCard
                icon={<Calculator />}
                title="Calculator Allowed"
                description="Allow students to use a calculator."
              >
                <Toggle
                  checked={values.calculatorAllowed}
                  onClick={() =>
                    toggleValue("calculatorAllowed")
                  }
                />

                <input
                  type="hidden"
                  {...register("calculatorAllowed")}
                />
              </SettingCard>

              {/* Shuffle Options */}

              <SettingCard
                icon={<ShuffleIcon />}
                title="Shuffle Options"
                description="Randomize the order of answer options."
              >
                <Toggle
                  checked={values.shuffleOptions}
                  onClick={() =>
                    toggleValue("shuffleOptions")
                  }
                />

                <input
                  type="hidden"
                  {...register("shuffleOptions")}
                />
              </SettingCard>

              {/* Shuffle Questions */}

              <SettingCard
                icon={<ShuffleIcon />}
                title="Shuffle Questions"
                description="Randomize the order of questions."
              >
                <Toggle
                  checked={values.shuffleQuestions}
                  onClick={() =>
                    toggleValue("shuffleQuestions")
                  }
                />

                <input
                  type="hidden"
                  {...register("shuffleQuestions")}
                />
              </SettingCard>

              {/* Negative Marking */}

              <SettingCard
                icon={<BadgeMinus />}
                title="Negative Marking"
                description="Deduct marks for incorrect answers."
              >
                <Toggle
                  checked={values.negativeMarking}
                  onClick={() =>
                    toggleValue("negativeMarking")
                  }
                />

                <input
                  type="hidden"
                  {...register("negativeMarking")}
                />
              </SettingCard>

              {/* Negative Marks */}

              <SettingCard
                icon={<CircleMinus />}
                title="Negative Marks"
                description="Marks deducted for each incorrect answer."
              >
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    disabled={!values.negativeMarking}
                    {...register("negativeMarks", {
                      valueAsNumber: true,
                    })}
                    className="
                      input
                      w-24
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />

                  <span className="text-sm text-muted-foreground">
                    marks
                  </span>
                </div>
              </SettingCard>

              {/* Passing Percentage */}

              <SettingCard
                icon={<Percent />}
                title="Passing Percentage"
                description="Set the minimum percentage to pass the test."
              >
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    {...register(
                      "passingPercentage",
                      {
                        required:
                          "Passing percentage is required",

                        min: {
                          value: 0,
                          message: "Minimum is 0%",
                        },

                        max: {
                          value: 100,
                          message: "Maximum is 100%",
                        },

                        onChange: (e) => {
                          const percentage =
                            Number(e.target.value);

                          setValue(
                            "passingMarks",
                            Math.round(
                              (totalMarks *
                                percentage) /
                                100
                            )
                          );
                        },
                      }
                    )}
                    className="input"
                  />

                  <span className="shrink-0 text-sm text-muted-foreground">
                    %
                  </span>
                </div>

                {errors.passingPercentage && (
                  <ErrorMessage>
                    {errors.passingPercentage.message}
                  </ErrorMessage>
                )}
              </SettingCard>
            </div>

            {/* ================= SECTION TITLE ================= */}

            <div className="mt-4">
              <SettingCard
                icon={<FileText />}
                title="Section Title"
                description="Custom title for the test (optional)."
              >
                <input
                  type="text"
                  placeholder="e.g. Mid Term Exam"
                  {...register("sectionTitle", {
                    maxLength: {
                      value: 100,
                      message:
                        "Maximum 100 characters",
                    },
                  })}
                  className="input"
                />

                {errors.sectionTitle && (
                  <ErrorMessage>
                    {errors.sectionTitle.message}
                  </ErrorMessage>
                )}
              </SettingCard>
            </div>

            {/* ================= INFO ================= */}

            <div
              className="
                mt-4
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-primary/20
                bg-primary/5
                px-4
                py-3
                text-sm
                text-primary
              "
            >
              <Info className="mt-0.5 size-4 shrink-0" />

              <span className="leading-5">
                These settings will help you create a fair
                and secure test experience for all students.
              </span>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <div className="space-y-5">
            {/* ================= TEST PREVIEW ================= */}

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Test Preview
                </h3>

                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-primary
                  "
                >
                  Preview
                </span>
              </div>

              {/* Cover */}

              <div className="mt-4 h-32 overflow-hidden rounded-xl bg-mesh">
                {testInfo?.cover ? (
                  <img
                    src={testInfo.cover}
                    alt="Test cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="size-12 text-white/80" />
                  </div>
                )}
              </div>

              {/* Title */}

              <div className="mt-4">
                <div className="flex items-start gap-3">
                  <h3 className="min-w-0 flex-1 truncate text-lg font-semibold">
                    {testInfo?.title ||
                      "Mid Term Exam"}
                  </h3>

                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Medium
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    line-clamp-3
                    text-sm
                    leading-5
                    text-muted-foreground
                  "
                >
                  {testInfo?.description ||
                    "Practice test covering Mathematics, Physics and English."}
                </p>
              </div>

              {/* Preview Details */}

              <div className="mt-5 space-y-1 border-t border-border pt-4">
                <PreviewRow
                  icon={<BookOpen />}
                  label="Category"
                  value={
                    testInfo?.category ||
                    "Mathematics"
                  }
                />

                <PreviewRow
                  icon={<FileText />}
                  label="Subject"
                  value={
                    testInfo?.subject ||
                    "Algebra"
                  }
                />

                <PreviewRow
                  icon={<CircleHelp />}
                  label="Questions"
                  value={totalQuestions}
                />

                <PreviewRow
                  icon={<Trophy />}
                  label="Total Marks"
                  value={totalMarks}
                />

                <PreviewRow
                  icon={<Clock3 />}
                  label="Duration"
                  value={`${values.duration || 0} min`}
                />
              </div>
            </div>

            {/* ================= STRUCTURE SUMMARY ================= */}

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                shadow-sm
              "
            >
              <h3 className="font-semibold">
                Structure Summary
              </h3>

              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-primary/15
                  bg-primary/5
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Layers3 className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold">
                      {Structure?.isSectionWise
                        ? "Multiple Sections"
                        : "Single Section"}
                    </p>

                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {Structure?.isSectionWise
                        ? `${sections.length} sections`
                        : "All questions in one section"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-primary/10 pt-4 text-sm">
                  <SummaryRow
                    label="Total Questions"
                    value={totalQuestions}
                  />

                  <SummaryRow
                    label="Total Marks"
                    value={totalMarks}
                  />

                  <SummaryRow
                    label="Passing Percentage"
                    value={`${values.passingPercentage || 0}%`}
                  />
                </div>
              </div>

              {/* Sections */}

              {Structure?.isSectionWise &&
                sections.length > 0 && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-border">
                    {sections.map(
                      (section, index) => (
                        <div
                          key={index}
                          className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-border
                            px-3
                            py-3
                            last:border-b-0
                          "
                        >
                          <div
                            className="
                              flex
                              size-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-primary
                              text-xs
                              font-semibold
                              text-primary-foreground
                            "
                          >
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {section.title ||
                                `Section ${
                                  index + 1
                                }`}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {section.questions} Q
                              {" • "}
                              {section.marks} M
                              {" • "}
                              {section.negativeMarks} N
                              {" • "}
                              {section.passingMarks} P
                            </p>
                          </div>

                          <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ACTIONS ================= */}

        <div
          className="
            fixed
            bottom-0
            left-0
            z-40
            w-full
            border-t
            border-border
            bg-background/95
            px-4
            py-3
            backdrop-blur
            sm:px-6
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-[1400px]
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Save Draft */}

            <button
              type="button"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-card
                px-5
                py-2.5
                text-sm
                font-medium
                transition
                hover:border-primary/50
                hover:bg-muted
              "
            >
              <Save size={17} />
              Save as Draft
            </button>

            {/* Auto Save */}

            <div
              className="
                hidden
                items-center
                gap-2
                text-xs
                text-muted-foreground
                lg:flex
              "
            >
              <Lock size={14} />
              Your test will be saved automatically as
              you proceed.
            </div>

            {/* Continue */}

            <button
              type="submit"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-7
                py-2.5
                text-sm
                font-semibold
                text-primary-foreground
                shadow-sm
                transition
                hover:opacity-90
                focus:outline-none
                focus:ring-2
                focus:ring-primary/30
              "
            >
              Continue
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({ checked, onClick }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onClick}
      className={`
        relative
        mt-1
        h-6
        w-11
        shrink-0
        rounded-full
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-primary/20
        ${
          checked
            ? "bg-primary"
            : "bg-muted"
        }
      `}
    >
      <span
        className={`
          absolute
          top-1/2
          size-5
          -translate-y-1/2
          rounded-full
          bg-white
          shadow-sm
          transition-all
          ${
            checked
              ? "left-[22px]"
              : "left-[2px]"
          }
        `}
      />
    </button>
  );
}

/* =========================================================
   SETTING CARD
========================================================= */

function SettingCard({
  icon,
  title,
  description,
  children,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-card
        p-4
        transition-colors
        hover:border-primary/30
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-primary/10
            text-primary
          "
        >
          <span className="[&>svg]:size-5">
            {icon}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">
            {title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {description}
          </p>

          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PREVIEW ROW
========================================================= */

function PreviewRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="shrink-0 text-primary [&>svg]:size-4">
        {icon}
      </span>

      <span className="min-w-0 flex-1 text-sm text-muted-foreground">
        {label}
      </span>

      <span className="max-w-[55%] truncate text-right text-sm font-medium">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="shrink-0 font-medium">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   ERROR MESSAGE
========================================================= */

function ErrorMessage({ children }) {
  return (
    <p className="mt-1 text-xs text-destructive">
      {children}
    </p>
  );
}