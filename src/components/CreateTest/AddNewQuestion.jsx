import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mathematics from "@tiptap/extension-mathematics";
import { Badge } from "../common/ui/Badge";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewQuestionSchema } from "@/schema/addNewQuestionSchema";
import InputInlineError from "../common/InlineError";
import {
  addQuestion,
  clearEditQuestion,
  completeStep,
  setCurrentStep,
  updateQuestion,
} from "@/features/CreateTest/createTestSlices";
import getHtmlToText from "@/utils/getHtmlToText";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import { ADD_NEW_QUESTION } from "@/constant/validation";
import { ROUTES } from "@/constant/routes";
import Placeholder from "@tiptap/extension-placeholder";
import useMoveToNext from "@/hooks/useMoveToNext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddNewQuestion() {
  const createTest = useSelector((state) => state.createTest);
  const dispatch = useDispatch();
  const { sections = [] } = createTest?.structure || {};
  const { questions = [] } = createTest;

  const createOption = () => ({
    optionId: crypto.randomUUID(),
    text: "",
  });
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
        createTest.structure.totalMarks / createTest.structure.totalQuestions,
      status: "saved",
      isSectionWise: createTest.structure.isSectionWise,
    },
    resolver: zodResolver(addNewQuestionSchema),
  });
  const { errors } = formState;
  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: "options",
  });
  const isSectionWise = watch("isSectionWise");

  const difficultyLevels = [
    {
      title: "Easy",
    },
    {
      title: "medium",
    },
    {
      title: "hard",
    },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mathematics,
      Placeholder.configure({ placeholder: "Write your question here..." }),
    ],
    content: watch("question"),
    onUpdate: ({ editor }) => {
      setValue("question", editor.getHTML(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  const EditQuestion = (id) => {
    console.log(id);
    const wantEditQuestion = questions.find(
      (question) => question.questionId === id,
    );

    if (!wantEditQuestion || !editor) return;

    editor.commands.setContent(wantEditQuestion.question);
    console.log("want :", wantEditQuestion);

    setValue("question", wantEditQuestion.question);
    replace(wantEditQuestion.options);
    setValue("options", wantEditQuestion.options);
    setValue("isMultiple", wantEditQuestion.isMultiple);
    setValue("correctAnswer", wantEditQuestion.correctAnswer);
    setValue("difficulty", wantEditQuestion.difficulty);
    setValue("sectionId", wantEditQuestion.sectionId);
    setValue("section", wantEditQuestion.section);
    setValue("topic", wantEditQuestion.topic);
    setValue("questionId", wantEditQuestion.questionId);

    toast.success("This question is edit successfully!");
  };

  useEffect(() => {
    if (createTest.edit.length === 1) {
      EditQuestion(createTest.edit[0]);
    }
  }, []);

  const correctAnswer = watch("correctAnswer");
  const options = watch("options");
  const isMultiple = watch("isMultiple");

  const setCorrect = (id) => {
    const isMultiple = getValues("isMultiple");
    if (!isMultiple) {
      setValue("correctAnswer", [id], {
        shouldValidate: true,
      });
    } else if (isMultiple) {
      const prevCorrectAns = getValues("correctAnswer");
      if (prevCorrectAns.some((i) => i == id)) {
        const clean = prevCorrectAns.filter((i) => {
          return i !== id;
        });

        return setValue("correctAnswer", clean, {
          shouldValidate: true,
        });
      }
      return setValue("correctAnswer", [...prevCorrectAns, id], {
        shouldValidate: true,
      });
    }
  };

  const section = watch("section");

  const selectedSection = useMemo(() => {
    const selectedSection = !isSectionWise
      ? [
          {
            ...createTest.info,
            questions: createTest.structure.totalQuestions || 0,
          },
        ]
      : sections.filter((s) => {
          if (!section || !s?.title) return false;
          return s.title.toLowerCase().trim() === section.toLowerCase().trim();
        });
    return selectedSection;
  }, [section, sections, isSectionWise]);

  useEffect(() => {
    if (selectedSection[0]?.sectionId) {
      setValue("sectionId", selectedSection[0].sectionId, {
        shouldValidate: true,
      });
    }
  }, [selectedSection, setValue]);

      const createdSecQuestions = isSectionWise
      ? questions.filter((q) => {
          return q?.sectionId?.trim() === selectedSection[0]?.sectionId?.trim();
        })
      : createTest.questions;


  console.log("create Sec Q", createdSecQuestions);
  const onSubmit = (payload) => {
    console.log("sectioned sec", selectedSection);
    console.log("create", createTest);
    if (!isMultiple) {
      if (correctAnswer.length === 0) {
        return setError("correctAnswer", {
          type: "manual",
          message: "Select at least one correct answer",
        });
      }
    } else if (isMultiple) {
      if (correctAnswer.length < 2) {
        return setError("correctAnswer", {
          type: "manual",
          message: "Select at least two correct answer",
        });
      }
    }

    if (
      isSectionWise &&
      selectedSection[0]?.questions === createdSecQuestions.length
    ) {
      return toast.error("You cannot add more questions to this section.");
    } else if (!isSectionWise && selectedSection[0]?.questions === createTest.questions.length) {
      return toast.error("You cannot add more questions to this test.");
    }

    const { questions } = createTest;
    //Payload Question and Options
    const Question = getHtmlToText(payload.question).replace(
      /[^a-zA-Z0-9\s]/g,
      "",
    );
    const Options = payload.options;
    // Redux Questions
    const Questions = questions.map((q) => {
      return { question: getHtmlToText(q.question), options: q.options };
    });

    // Check Question and Options already isExist
    const isExist = Questions.some((qs) => {
      const q = qs.question.replace(/[^a-zA-Z0-9\s]/g, ""); // redux question

      const isOpExist = qs.options.every((op) => {
        const opText = op.text.trim().replace(/[^a-zA-Z0-9\s]/g, "");
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
        message: "This question already exists, including its options.",
      });
    }

    let updatedCreateTest;
    if (createTest.edit.length === 1) {
      dispatch(updateQuestion(payload));
      const clean = createTest.questions.filter((q) => {
        return q.questionId !== payload.questionId;
      });
      updatedCreateTest = {
        ...createTest,
        edit: [],
        questions: [...clean, payload],
      };
    } else {
      setValue("questionId", crypto.randomUUID());
      dispatch(addQuestion(payload));
      updatedCreateTest = {
        ...createTest,
        questions: [...createTest.questions, payload],
        edit: [],
      };
    }

    console.log("updatedCreateTest:", updatedCreateTest);

    localStorage.setItem("createTest", JSON.stringify(updatedCreateTest)); // Save Updated data
    toast.success(
      `Question ${createTest.edit.length === 1 ? "edited" : "added"} successfully.`,
    ); // for showing toast
    dispatch(clearEditQuestion());
    resetField("question");
    resetField("options", {
      defaultValue: [createOption(), createOption(), createOption()],
    });
    editor.commands.clearContent();
  };

  console.log(createTest);

  const moveToNext = useMoveToNext();
  const navigatehandle = (path) => {
    moveToNext(path);
    console.log("path :", path);
  };

  const navigate = useNavigate();
  const nextStep = createTest.workflow.stepOrder.filter((s) => {
    return s.step === createTest.workflow.nextStep;
  })[0];

  const handleNext = () => {
    if (!createTest.workflow.nextStep) {
      console.error("Next step is not available.");
      return;
    }
    dispatch(setCurrentStep(nextStep.step));
    dispatch(completeStep(createTest.workflow.currentStep));
    navigate(nextStep.path);
  };

  return (
    <>
      <Toaster />
      {/* BEGIN: MainLayout */}
      <div className="flex h-full overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 flex flex-col min-w-0 bg-darker">
            {/* Main Scrollable Content Area */}
            <main className="flex-1 overflow-hidden flex">
              {/* BEGIN: CenterEditor */}
              <section
                className="flex-1 overflow-y-auto p-8"
                data-purpose="question-editor"
              >
                <div className="max-w-4xl mx-auto">
                  <div
                    onClick={() => {
                      if (createTest.edit.length === 1) {
                        toast.error("Please edit question.");
                        return;
                      }
                      navigatehandle(ROUTES.ADDNEWQUESTIONLIST);
                    }}
                    className={`${createTest.edit.length === 1 ? "text-muted-foreground  cursor-not-allowed" : "text-foreground cursor-pointer hover:text-white"} flex  items-center gap-2  text-sm mb-6  transition-colors  `}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    Back to Questions List
                  </div>
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">Add Question</h1>
                      <p className="text-textMuted text-sm">
                        Create a new question for your test
                      </p>
                    </div>
                    <div className="w-72">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium">
                          <span className=" capitalize">
                            {isSectionWise && selectedSection[0]?.title}{" "}
                          </span>
                          Question {createdSecQuestions.length || 0} of{" "}
                          {selectedSection[0]?.questions || 0}
                        </span>
                        <span className="text-textMuted">
                          {Math.floor(
                            (createdSecQuestions.length /
                              selectedSection[0]?.questions) *
                              100,
                          ) || 0}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-dark border border-border h-2 rounded-full overflow-hidden">
                        {/* fill */}
                        <div
                          className={`${
                            createdSecQuestions.length /
                              selectedSection[0]?.questions ===
                            1
                              ? "bg-success"
                              : "bg-primary"
                          } h-full rounded-full w-0`}
                          style={{
                            width:
                              Math.floor(
                                (createdSecQuestions.length /
                                  selectedSection[0]?.questions) *
                                  100,
                              ) + "%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* BEGIN: QuestionInputContainer */}
                  <div className="bg-dark  border overflow-hidden border-border rounded-xl p-6 mb-6">
                    <label className="block text-sm font-semibold mb-3">
                      Question{" "}
                      {errors.question && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {/* Editor Toolbar Mock */}
                    <div className="flex items-center gap-4 bg-[#0D1117] border border-border rounded-t-lg px-4 py-2 border-b-0">
                      <div className="flex gap-2 border-r border-border pr-4">
                        <button
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                          className="w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-gray-800 rounded"
                        >
                          B
                        </button>
                        <button
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                          className="w-6 h-6 flex items-center justify-center text-sm italic hover:bg-gray-800 rounded"
                        >
                          I
                        </button>
                        <button
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                          className="w-6 h-6 flex items-center justify-center text-sm underline hover:bg-gray-800 rounded"
                        >
                          U
                        </button>
                      </div>

                      <div className="flex gap-2 border-r border-border pr-4">
                        <button
                          onClick={() =>
                            editor?.chain().focus().toggleBlockquote().run()
                          }
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </button>

                        <div className="flex gap-2">
                          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded italic font-serif">
                            <kbd>fx</kbd>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Controller
                      name="question"
                      control={control}
                      render={({ fieldState }) => (
                        <>
                          <EditorContent
                            editor={editor}
                            className="
          border
          rounded-b-lg
          bg-background
          [&_.ProseMirror]:min-h-50
          [&_.ProseMirror]:w-180
          [&_.ProseMirror]:p-4
          [&_.ProseMirror]:outline-none
        "
                          />

                          {fieldState.error && (
                            <p className="text-destructive text-sm mt-1">
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* END: QuestionInputContainer */}

                  {/* BEGIN: OptionsContainer */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-semibold">
                        Options{" "}
                        {errors.options && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <button
                        disabled={
                          options.length ===
                          ADD_NEW_QUESTION.QUESTION.MAX_OPTIONS
                        }
                        onClick={() => {
                          append(createOption());
                        }}
                        className="text-primary disabled:text-muted-foreground disabled:cursor-not-allowed text-sm font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Add Option
                      </button>
                    </div>

                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className={` flex items-center gap-4 group`}
                        >
                          {/* Custom Radio and checkbox */}
                          <button
                            type="button"
                            onClick={() => setCorrect(field.optionId)}
                            className={`w-6 h-6  rounded-full border-2 flex items-center justify-center cursor-pointer shrink-0
        ${correctAnswer.some((i) => i === field.optionId) ? "border-success" : "border-border"}`}
                          >
                            {correctAnswer.some(
                              (i) => i === field.optionId,
                            ) && (
                              <div className="w-3 h-3 rounded-full bg-success" />
                            )}
                          </button>

                          {/* Option Input */}
                          <div
                            className={`${correctAnswer.some((i) => i === field.optionId) ? "border-success" : "border-border"} flex-1  flex items-center bg-dark border rounded-lg px-4 py-3`}
                          >
                            <span className="w-8 font-bold ">
                              {String.fromCharCode(65 + index)}
                            </span>

                            <input
                              {...register(`options.${index}.text`)}
                              className={`flex-1  outline-none `}
                              placeholder={`Option ${index + 1}`}
                            />
                            {errors.options?.[index]?.text && (
                              <span className="text-destructive text-xs mt-1">
                                <InputInlineError
                                  ErrorMsg={errors.options[index].text.message}
                                />
                              </span>
                            )}
                            {errors?.correctAnswer && (
                              <span className="text-destructive text-xs mt-1">
                                <InputInlineError
                                  ErrorMsg={errors.correctAnswer.message}
                                />
                              </span>
                            )}

                            {correctAnswer.some(
                              (i) => i === field.optionId,
                            ) && (
                              <Badge className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/20">
                                Correct Answer
                              </Badge>
                            )}
                          </div>

                          <button
                            onClick={() => remove(index)}
                            className="text-muted  hover:text-destructive   transition-colors cursor-pointer"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* END: OptionsContainer */}
                  {/* BEGIN: MetadataSelectors */}
                  <div
                    className={` grid grid-cols-${isSectionWise ? "3" : "2"} gap-6 mb-12`}
                  >
                    {
                      <div className={`${isSectionWise || "sr-only"}`}>
                        <label className="block text-sm font-semibold mb-2">
                          Section{" "}
                          {errors?.section && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <div className="relative">
                          <select
                            className="w-full bg-background text-foreground border border-border rounded-lg px-4 py-3.5 appearance-none text-sm capitalize outline-none"
                            {...register("section")}
                            defaultValue={""}
                            autoComplete="off"
                            disabled={sections.length === 0}
                          >
                            <option
                              value=""
                              className="capitalize bg-muted text-muted-foreground"
                              disabled
                            >
                              {sections.length === 0
                                ? "No sections available"
                                : "Select section"}
                            </option>
                            {sections.map((s, i) => {
                              return (
                                <option
                                  key={i}
                                  value={s.title}
                                  className="capitalize bg-muted text-muted-foreground"
                                >
                                  {s.title}
                                </option>
                              );
                            })}
                          </select>
                          {errors?.section && (
                            <span className="text-destructive text-xs mt-1">
                              <InputInlineError
                                ErrorMsg={errors.section.message}
                              />
                            </span>
                          )}
                          <div className="absolute top-3/12 right-3 flex items-center pointer-events-none">
                            <svg
                              className="w-4 h-4 text-textMuted"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 9l-7 7-7-7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    }
                    <div>
                      <label className="block text-sm font-semibold capitalize mb-2">
                        Difficulty{" "}
                        {errors?.difficulty && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <select
                          className="w-full bg-background text-foreground border border-border rounded-lg px-4 py-3.5 appearance-none text-sm capitalize outline-none"
                          {...register("difficulty")}
                          defaultValue={""}
                          autoComplete="off"
                        >
                          <option
                            value=""
                            className="capitalize bg-muted text-muted-foreground"
                            disabled
                          >
                            Select difficulty level
                          </option>
                          {difficultyLevels.map((s, i) => {
                            return (
                              <option
                                key={i}
                                value={s.title}
                                className="capitalize bg-muted text-muted-foreground"
                              >
                                {s.title}
                              </option>
                            );
                          })}
                        </select>
                        {errors?.section && (
                          <span className="text-destructive text-xs mt-1">
                            <InputInlineError
                              ErrorMsg={errors.section.message}
                            />
                          </span>
                        )}
                        {errors?.difficulty && (
                          <span className="text-destructive text-xs mt-1">
                            <InputInlineError
                              ErrorMsg={errors.difficulty.message}
                            />
                          </span>
                        )}

                        <div className="absolute top-3/12 right-3 flex items-center pointer-events-none">
                          <svg
                            className="w-4 h-4 text-textMuted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 9l-7 7-7-7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block capitalize text-sm font-semibold mb-2">
                        topic{" "}
                        {errors?.topic && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full bg-background text-foreground border border-border rounded-lg px-4 py-3.5 appearance-none  text-sm capitalize outline-none"
                          {...register("topic")}
                        />

                        {errors?.topic && (
                          <span className="text-destructive text-xs mt-1">
                            <InputInlineError ErrorMsg={errors.topic.message} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* END: MetadataSelectors */}
                  {/* BEGIN : is multiple check */}
                  <div className="bg-muted p-6 rounded-3xl border border-outline-variant">
                    <div className="flex items-center justify-between mb-4">
                      <span className="material-symbols-outlined text-primary">
                        checklist
                      </span>

                      <label className="relative inline-flex items-center cursor-pointer bg-background rounded-full">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          {...register("isMultiple", {
                            onChange: () => {
                              setValue("correctAnswer", [], {
                                shouldValidate: true,
                              });
                            },
                          })}
                        />

                        <div className="w-11 h-6 rounded-full bg-outline-variant peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>

                    <h5 className="font-bold">Multiple Correct Answers</h5>

                    <p className="text-xs text-on-surface-variant">
                      Allow more than one option to be marked as the correct
                      answer.
                    </p>
                  </div>
                  {/* end : ismultiple check */}
                  {/* BEGIN: FormFooter */}
                  <div className="flex items-center justify-between pt-8 border-t border-border">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-dark border border-border rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Save Draft
                    </button>
                    <button className="flex text-primary-foreground  cursor-pointer transition-all items-center group gap-2 px-8 py-2.5 bg-primary  rounded-lg text-sm font-semibold hover:bg-primary/90 active:scale-95">
                      Save &amp; Next Question
                      <svg
                        className="w-4 h-4  group-hover:translate-x-1 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </button>
                  </div>
                  {/* END: FormFooter */}
                </div>
              </section>
              {/* END: CenterEditor */}
              {/* BEGIN: RightSidePanel */}
            </main>
          </div>
        </form>
      </div>
      <footer
        className={`fixed px-3 overflow-hidden ${createTest.structure.totalQuestions === createTest.questions.length ? "flex" : "hidden"}      transition-all
    duration-300
    
    animate-accordion-up    bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40  items-center justify-between`}
      >
        <button className="px-6 py-2 rounded-lg border border-muted-foreground hover:border-white text-muted-foreground cursor-pointer hover:text-white transition-colors flex items-center gap-2">
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            form="AddNewQuestion"
            className="px-8 py-2.5 rounded-lg bg-success  font-bold hover:bg-success/90 cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-success/20 disabled:cursor-not-allowed disabled:scale-none disabled:bg-muted/30 disabled:text-muted-foreground disabled:border-muted-foreground text-primary-foreground  active:scale-95"
            onClick={handleNext}
          >
            <ArrowRight size={20} className="" /> Next
          </button>
        </div>
      </footer>
    </>
  );
}
