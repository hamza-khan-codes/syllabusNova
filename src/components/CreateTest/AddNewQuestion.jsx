import React, { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mathematics from "@tiptap/extension-mathematics";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

import {
  ArrowLeft,
  ArrowRight,
  Bold,
  Check,
  ChevronDown,
  Code2,
  FileText,
  Info,
  Italic,
  List,
  Plus,
  Save,
  Trash2,
  Underline as UnderlineIcon,
  X,
  Layers3,
  CircleCheck,
  Settings2,
} from "lucide-react";

import { Badge } from "../common/ui/Badge";
import InputInlineError from "../common/InlineError";
import Toaster from "../ui/sonner";

import { toast } from "sonner";

import {
  addQuestion,
  clearEditQuestion,
  completeStep,
  setCurrentStep,
  updateQuestion,
} from "@/features/CreateTest/createTestSlices";

import { addNewQuestionSchema } from "@/schema/addNewQuestionSchema";
import getHtmlToText from "@/utils/getHtmlToText";
import { ADD_NEW_QUESTION } from "@/constant/validation";
import { ROUTES } from "@/constant/routes";
import useMoveToNext from "@/hooks/useMoveToNext";
import { useNavigate } from "react-router-dom";

export default function AddNewQuestion() {
  const createTest = useSelector((state) => state.createTest);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sections = [] } = createTest?.structure || {};
  const { questions = [] } = createTest;

  /* =========================================================
     Helpers
  ========================================================= */

  const createOption = () => ({
    optionId: crypto.randomUUID(),
    text: "",
  });

  /* =========================================================
     RHF
  ========================================================= */

  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    formState,
    handleSubmit,
    setError,
    resetField,
    clearErrors,
  } = useForm({
    defaultValues: {
      question: "",
      section: "",
      isMultiple: false,
      options: [createOption(), createOption(), createOption()],
      topic: "",
      difficulty: "",
      correctAnswer: [],
      sectionId: "",
      questionId: crypto.randomUUID(),
      marks:
        createTest.structure.totalMarks /
        createTest.structure.totalQuestions,
      status: "saved",
      isSectionWise: createTest.structure.isSectionWise,
    },
    resolver: zodResolver(addNewQuestionSchema),
    mode: "onSubmit",
  });

  const { errors } = formState;

  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: "options",
  });

  const isSectionWise = watch("isSectionWise");
  const correctAnswer = watch("correctAnswer");
  const options = watch("options");
  const isMultiple = watch("isMultiple");
  const section = watch("section");

  /* =========================================================
     Difficulty
  ========================================================= */

  const difficultyLevels = [
    {
      title: "Easy",
      description: "Basic understanding",
    },
    {
      title: "Medium",
      description: "Requires application",
    },
    {
      title: "Hard",
      description: "Advanced thinking",
    },
  ];

  /* =========================================================
     Tiptap
  ========================================================= */

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Mathematics,
      Placeholder.configure({
        placeholder: "Write your question here...",
      }),
    ],
    content: watch("question"),

    onUpdate: ({ editor }) => {
      setValue("question", editor.getHTML(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  /* =========================================================
     Edit Question
  ========================================================= */

  const EditQuestion = (id) => {
    const wantEditQuestion = questions.find(
      (question) => question.questionId === id,
    );

    if (!wantEditQuestion || !editor) return;

    editor.commands.setContent(wantEditQuestion.question);

    setValue("question", wantEditQuestion.question);
    replace(wantEditQuestion.options);

    setValue("isMultiple", wantEditQuestion.isMultiple);
    setValue("correctAnswer", wantEditQuestion.correctAnswer);
    setValue("difficulty", wantEditQuestion.difficulty);
    setValue("sectionId", wantEditQuestion.sectionId);
    setValue("section", wantEditQuestion.section);
    setValue("topic", wantEditQuestion.topic);
    setValue("questionId", wantEditQuestion.questionId);

    toast.success("Question loaded for editing.");
  };

  useEffect(() => {
    if (createTest.edit.length === 1) {
      EditQuestion(createTest.edit[0]);
    }
  }, []);

  /* =========================================================
     Correct Answer
  ========================================================= */

  const setCorrect = (id) => {
    const multiple = getValues("isMultiple");

    if (!multiple) {
      setValue("correctAnswer", [id], {
        shouldValidate: true,
        shouldDirty: true,
      });

      clearErrors("correctAnswer");
      return;
    }

    const previous = getValues("correctAnswer");

    if (previous.includes(id)) {
      setValue(
        "correctAnswer",
        previous.filter((item) => item !== id),
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    } else {
      setValue("correctAnswer", [...previous, id], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    clearErrors("correctAnswer");
  };

  /* =========================================================
     Selected Section
  ========================================================= */

  const selectedSection = useMemo(() => {
    if (!isSectionWise) {
      return [
        {
          ...createTest.info,
          questions: createTest.structure.totalQuestions || 0,
        },
      ];
    }

    return sections.filter((s) => {
      if (!section || !s?.title) return false;

      return (
        s.title.toLowerCase().trim() === section.toLowerCase().trim()
      );
    });
  }, [section, sections, isSectionWise, createTest]);

  useEffect(() => {
    if (selectedSection[0]?.sectionId) {
      setValue("sectionId", selectedSection[0].sectionId, {
        shouldValidate: true,
      });
    }
  }, [selectedSection, setValue]);

  /* =========================================================
     Question Progress
  ========================================================= */

  const createdSecQuestions = isSectionWise
    ? questions.filter(
        (q) =>
          q?.sectionId?.trim() ===
          selectedSection[0]?.sectionId?.trim(),
      )
    : questions;

  const sectionQuestionLimit =
    selectedSection[0]?.questions || 0;

  const questionProgress =
    sectionQuestionLimit > 0
      ? Math.min(
          (createdSecQuestions.length / sectionQuestionLimit) * 100,
          100,
        )
      : 0;

  /* =========================================================
     Submit
  ========================================================= */

  const onSubmit = (payload) => {
    if (!isMultiple && correctAnswer.length === 0) {
      return setError("correctAnswer", {
        type: "manual",
        message: "Select one correct answer.",
      });
    }

    if (isMultiple && correctAnswer.length < 2) {
      return setError("correctAnswer", {
        type: "manual",
        message: "Select at least two correct answers.",
      });
    }

    if (
      isSectionWise &&
      selectedSection[0]?.questions === createdSecQuestions.length
    ) {
      return toast.error(
        "You cannot add more questions to this section.",
      );
    }

    if (
      !isSectionWise &&
      selectedSection[0]?.questions === questions.length
    ) {
      return toast.error(
        "You cannot add more questions to this test.",
      );
    }

    const Question = getHtmlToText(payload.question)
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim();

    const Options = payload.options;

    const Questions = questions.map((q) => ({
      question: getHtmlToText(q.question),
      options: q.options,
    }));

    const isExist = Questions.some((qs) => {
      const q = qs.question
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim();

      const isOpExist = qs.options.every((op) => {
        const opText = op.text
          .trim()
          .replace(/[^a-zA-Z0-9\s]/g, "");

        return Options.some((payloadOp) => {
          const payloadTextOp = payloadOp.text
            .trim()
            .replace(/[^a-zA-Z0-9\s]/g, "");

          return opText === payloadTextOp;
        });
      });

      return q === Question && isOpExist;
    });

    if (isExist && createTest.edit.length !== 1) {
      return setError("question", {
        type: "manual",
        message:
          "This question already exists, including its options.",
      });
    }

    let updatedCreateTest;

    if (createTest.edit.length === 1) {
      dispatch(updateQuestion(payload));

      const clean = questions.filter(
        (q) => q.questionId !== payload.questionId,
      );

      updatedCreateTest = {
        ...createTest,
        edit: [],
        questions: [...clean, payload],
      };
    } else {
      const newPayload = {
        ...payload,
        questionId: crypto.randomUUID(),
      };

      dispatch(addQuestion(newPayload));

      updatedCreateTest = {
        ...createTest,
        questions: [...questions, newPayload],
        edit: [],
      };
    }

    localStorage.setItem(
      "createTest",
      JSON.stringify(updatedCreateTest),
    );

    toast.success(
      `Question ${
        createTest.edit.length === 1 ? "edited" : "added"
      } successfully.`,
    );

    dispatch(clearEditQuestion());

    resetField("question");

    resetField("options", {
      defaultValue: [
        createOption(),
        createOption(),
        createOption(),
      ],
    });

    resetField("correctAnswer", {
      defaultValue: [],
    });

    resetField("topic");

    resetField("difficulty");

    editor?.commands.clearContent();
  };

  /* =========================================================
     Navigation
  ========================================================= */

  const moveToNext = useMoveToNext();

  const navigatehandle = (path) => {
    moveToNext(path);
  };

  const nextStep = createTest.workflow.stepOrder.find(
    (s) => s.step === createTest.workflow.nextStep,
  );

  const handleNext = () => {
    if (!createTest.workflow.nextStep || !nextStep) {
      return;
    }

    dispatch(setCurrentStep(nextStep.step));
    dispatch(completeStep(createTest.workflow.currentStep));

    navigate(nextStep.path);
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      <Toaster />

      <form
        id="AddNewQuestion"
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen bg-background text-foreground"
      >
        {/* =====================================================
            Header
        ===================================================== */}

        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => {
                if (createTest.edit.length === 1) {
                  toast.error("Please finish editing this question.");
                  return;
                }

                navigatehandle(ROUTES.ADDNEWQUESTIONLIST);
              }}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card transition group-hover:border-primary/40 group-hover:bg-primary/5">
                <ArrowLeft size={17} />
              </span>

              <span className="hidden sm:inline">
                Back to Questions
              </span>
            </button>

            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">
                Question progress
              </p>

              <p className="text-sm font-semibold">
                {createdSecQuestions.length} /{" "}
                {sectionQuestionLimit}
              </p>
            </div>
          </div>
        </header>

        {/* =====================================================
            Main
        ===================================================== */}

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Page Heading */}

          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="border border-primary/20 bg-primary/10 text-primary">
                Question Builder
              </Badge>

              {isSectionWise && selectedSection[0]?.title && (
                <Badge className="border border-border bg-muted text-muted-foreground">
                  {selectedSection[0].title}
                </Badge>
              )}
            </div>

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Add Question
                </h1>

                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  Create a clear and engaging question for your test.
                </p>
              </div>

              {/* Progress */}

              <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold">
                    {isSectionWise
                      ? selectedSection[0]?.title || "Section"
                      : "Test"}{" "}
                    questions
                  </span>

                  <span className="font-medium text-muted-foreground">
                    {Math.round(questionProgress)}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      questionProgress >= 100
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                    style={{
                      width: `${questionProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              Editor Card
          =================================================== */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Question
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Write the question students will answer.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Toolbar */}

              <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-border bg-muted/50 p-2">
                <ToolbarButton
                  label="Bold"
                  onClick={() =>
                    editor?.chain().focus().toggleBold().run()
                  }
                  active={editor?.isActive("bold")}
                >
                  <Bold size={16} />
                </ToolbarButton>

                <ToolbarButton
                  label="Italic"
                  onClick={() =>
                    editor?.chain().focus().toggleItalic().run()
                  }
                  active={editor?.isActive("italic")}
                >
                  <Italic size={16} />
                </ToolbarButton>

                <ToolbarButton
                  label="Underline"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  active={editor?.isActive("underline")}
                >
                  <UnderlineIcon size={16} />
                </ToolbarButton>

                <div className="mx-1 h-6 w-px bg-border" />

                <ToolbarButton
                  label="Bullet list"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  active={editor?.isActive("bulletList")}
                >
                  <List size={16} />
                </ToolbarButton>

                <ToolbarButton
                  label="Code"
                  onClick={() =>
                    editor?.chain().focus().toggleCode().run()
                  }
                  active={editor?.isActive("code")}
                >
                  <Code2 size={16} />
                </ToolbarButton>

                <button
                  type="button"
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .insertContent(" $x^2 + y^2 = z^2$ ")
                      .run()
                  }
                  className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-background hover:text-primary"
                >
                  <span className="font-serif italic">
                    fx
                  </span>
                  Math
                </button>
              </div>

              {/* Editor */}

              <Controller
                name="question"
                control={control}
                render={({ fieldState }) => (
                  <>
                    <EditorContent
                      editor={editor}
                      className="
                        min-h-55
                        rounded-b-xl
                        border-x
                        border-b
                        border-border
                        bg-background
                        [&_.ProseMirror]:min-h-55
                        [&_.ProseMirror]:p-5
                        [&_.ProseMirror]:text-sm
                        [&_.ProseMirror]:leading-7
                        [&_.ProseMirror]:outline-none
                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground
                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
                      "
                    />

                    {fieldState.error && (
                      <p className="mt-2 text-xs font-medium text-destructive">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </section>

          {/* ===================================================
              Options
          =================================================== */}

          <section className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">
                    Answer Options
                  </h2>

                  <Badge className="bg-muted text-muted-foreground">
                    {fields.length} options
                  </Badge>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Select the correct answer using the circle.
                </p>
              </div>

              <button
                type="button"
                disabled={
                  options.length >=
                  ADD_NEW_QUESTION.QUESTION.MAX_OPTIONS
                }
                onClick={() => append(createOption())}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Add Option
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => {
                const isCorrect = correctAnswer.includes(
                  field.optionId,
                );

                return (
                  <div
                    key={field.id}
                    className={`group flex items-start gap-3 rounded-xl border p-3 transition sm:items-center sm:p-4 ${
                      isCorrect
                        ? "border-success/50 bg-success/5 shadow-sm"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    {/* Correct selector */}

                    <button
                      type="button"
                      onClick={() =>
                        setCorrect(field.optionId)
                      }
                      aria-label={`Mark option ${
                        index + 1
                      } as correct`}
                      className={`mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition sm:mt-0 ${
                        isCorrect
                          ? "border-success bg-success text-primary-foreground"
                          : "border-muted-foreground/30 hover:border-primary"
                      }`}
                    >
                      {isCorrect && <Check size={15} />}
                    </button>

                    {/* Option letter */}

                    <div
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold sm:mt-0 ${
                        isCorrect
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    {/* Input */}

                    <div className="min-w-0 flex-1">
                      <input
                        {...register(`options.${index}.text`)}
                        className="w-full bg-transparent py-1 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                        placeholder={`Option ${index + 1}`}
                      />

                      {errors.options?.[index]?.text && (
                        <p className="mt-1 text-xs text-destructive">
                          {
                            errors.options[index].text
                              .message
                          }
                        </p>
                      )}
                    </div>

                    {/* Correct badge */}

                    {isCorrect && (
                      <Badge className="hidden border border-success/20 bg-success/10 text-success sm:flex">
                        <CircleCheck
                          size={13}
                          className="mr-1"
                        />
                        Correct
                      </Badge>
                    )}

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 2}
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-30 sm:mt-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {errors.correctAnswer && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-xs font-medium text-destructive">
                <X size={15} />
                {errors.correctAnswer.message}
              </div>
            )}
          </section>

          {/* ===================================================
              Question Metadata
          =================================================== */}

          <section className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Settings2 size={19} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Question Details
                </h2>

                <p className="text-xs text-muted-foreground">
                  Add metadata to organize this question.
                </p>
              </div>
            </div>

            <div
              className={`grid gap-5 ${
                isSectionWise
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {/* Section */}

              {isSectionWise && (
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Section
                    {errors.section && (
                      <span className="ml-1 text-destructive">
                        *
                      </span>
                    )}
                  </label>

                  <div className="relative">
                    <select
                      {...register("section")}
                      disabled={sections.length === 0}
                      className="input appearance-none pr-10"
                    >
                      <option value="" disabled>
                        {sections.length === 0
                          ? "No sections available"
                          : "Select section"}
                      </option>

                      {sections.map((s) => (
                        <option
                          key={s.sectionId || s.title}
                          value={s.title}
                        >
                          {s.title}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>

                  {errors.section && (
                    <InputInlineError
                      ErrorMsg={errors.section.message}
                    />
                  )}
                </div>
              )}

              {/* Difficulty */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Difficulty
                  {errors.difficulty && (
                    <span className="ml-1 text-destructive">
                      *
                    </span>
                  )}
                </label>

                <div className="relative">
                  <select
                    {...register("difficulty")}
                    className="input appearance-none pr-10"
                  >
                    <option value="" disabled>
                      Select difficulty
                    </option>

                    {difficultyLevels.map((level) => (
                      <option
                        key={level.title}
                        value={level.title}
                      >
                        {level.title}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                </div>

                {errors.difficulty && (
                  <InputInlineError
                    ErrorMsg={errors.difficulty.message}
                  />
                )}
              </div>

              {/* Topic */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Topic
                  {errors.topic && (
                    <span className="ml-1 text-destructive">
                      *
                    </span>
                  )}
                </label>

                <input
                  {...register("topic")}
                  placeholder="e.g. Algebra"
                  className="input"
                />

                {errors.topic && (
                  <InputInlineError
                    ErrorMsg={errors.topic.message}
                  />
                )}
              </div>
            </div>
          </section>

          {/* ===================================================
              Multiple Answer
          =================================================== */}

          <section className="mb-8 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Layers3 size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">
                  Multiple correct answers
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Allow students to select more than one
                  correct option for this question.
                </p>
              </div>

              {/* Switch */}

              <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register("isMultiple", {
                    onChange: () => {
                      setValue("correctAnswer", [], {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    },
                  })}
                />

                <div className="h-6 w-11 rounded-full bg-muted-foreground/25 transition peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </section>

          {/* ===================================================
              Footer Actions
          =================================================== */}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                navigatehandle(
                  ROUTES.ADDNEWQUESTIONLIST,
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition hover:bg-muted"
            >
              <ArrowLeft size={16} />
              Back to Questions
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 active:scale-[0.98]"
              >
                Save & Next Question
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </main>
      </form>

      {/* =======================================================
          Completion Footer
      ======================================================= */}

      {createTest.structure.totalQuestions ===
        createTest.questions.length && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 shadow-2xl backdrop-blur-xl lg:left-64">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <Info size={15} />
              All questions have been added.
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-success px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-success/20 transition hover:bg-success/90 active:scale-[0.98]"
            >
              Continue to Publish
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =============================================================
   Toolbar Button
============================================================= */

function ToolbarButton({
  children,
  onClick,
  active,
  label,
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex h-8 items-center justify-center rounded-lg px-2.5 transition ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-background hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}