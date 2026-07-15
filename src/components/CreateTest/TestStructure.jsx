import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { check } from "zod";
import SectionConfiguration from "./SectionConfiguration";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import InputInlineError from "../common/InlineError";
import { SECTION_VALIDATION, TEST_VALIDATION } from "@/constant/validation";
import { Badge } from "../common/ui/Badge";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import { updateStructure } from "@/features/CreateTest/createTestSlices";
import getAddNumbers from "@/utils/getAddNumbers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";

export default function TestStructure() {
  const createTest = useSelector((state) => state.createTest);
  const dispatch = useDispatch();
  const {
    handleSubmit: handleMainSubmit,
    register: registerMain,
    watch: watchMain,
    formState: mainFormState,
    setError: setMainError,
    control: mainControl,
    setValue: setMainValue,
  } = useForm({
    defaultValues: {
      marksPerQuestion: 2,
      negativeMarking: true,
      negativeMarks: 1,
      passingPercentage: 70,
      section: "single",
      totalDuration: 60,
      totalQuestions: 100,
    },
    shouldUnregister: true,
    mode: "onBlur",
  });

  const {
    handleSubmit: handleSectionSubmit,
    register: registerSection,
    formState: sectionFormState,
  } = useForm();
  const { errors: mainErrors } = mainFormState;
  const { errors: sectionErrors } = sectionFormState;
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const negativeMarking = useWatch({
    control: mainControl,
    name: "negativeMarking",
  });
  const navigate  = useNavigate()

  const onSubmit = (data) => {
    const { section } = data;
    const isSectionWise = section !== "single";
    if (isSectionWise && sections.length < 2) {
      toast.error("Please make at least 2 sections");
      return "Error";
    }

    if (isSectionWise) {
      const {
        marksPerQuestion,
        passingPercentage,
        negativeMarks,
        negativeMarking,
      } = data;
      const totalQuestions = sections
        .map((q) => {
          return q.questions;
        })
        .reduce((sum, num) => {
          return sum + num;
        }, 0);
      const duration = sections
        .map((q) => {
          return q.duration;
        })
        .reduce((sum, num) => {
          return sum + num;
        }, 0);
      const totalMarks = marksPerQuestion * totalQuestions;
      const negativeM = negativeMarks * -1;

      const payload = {
        negativeMarking,
        negativeMarks: negativeM,
        isSectionWise,
        passingPercentage,
        totalMarks,
        duration,
        totalQuestions,
        sections,
      };
      const updatedCreateTest = {
        ...createTest,
        structure: {
          ...createTest.structure,
          ...payload,
        },
      };
      dispatch(updateStructure(payload));
      localStorage.setItem("createTest", JSON.stringify(updatedCreateTest));
      navigate();
    } else if (!isSectionWise) {
      const {
        marksPerQuestion,
        passingPercentage,
        negativeMarks,
        negativeMarking,
        totalDuration,
        totalQuestions,
      } = data;
      const negativeM = negativeMarks * -1;
      const totalMarks = marksPerQuestion * totalQuestions;
      const payload = {
        negativeMarking,
        negativeMarks: negativeM,
        isSectionWise,
        passingPercentage,
        totalMarks,
        duration: totalDuration,
        totalQuestions,
        sections,
      };
      const updatedCreateTest = {
        ...createTest,
        structure: {
          ...createTest.structure,
          ...payload,
        },
      };
      dispatch(updateStructure(payload));
      localStorage.setItem("createTest", JSON.stringify(updatedCreateTest));
      navigate(ROUTES.TESTSETTING)
    }
  };

  const addSection = (data) => {
    const { secDuration, secName, secQuestions } = data;
    const title = secName.trim();
    const isExist = sections.some((s) => s.title === title);
    if (isExist) {
      return setMainError("secName", {
        type: "manual",
        message: "This name already exist.",
      });
    }

    const Section = {
      title: secName,
      duration: parseInt(secDuration),
      questions: parseInt(secQuestions),
    };

    setSections((prev) => [...prev, Section]);
    return setOpen(false);
  };

  const sectionBtn = [
    {
      title: "Single Section",
      descrip:
        "All questions in a single continuous block. Best for quick quizzes.",
      type: "single",
    },
    {
      title: "Multi Section",
      descrip:
        "Group questions by subject or difficulty level. Advanced settings.",
      type: "multiple",
    },
  ];

  const mulSection = watchMain("section") === "multiple";
  return (
    <div>
      <Toaster />
      {mulSection && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="">
            <form
              className="sm:max-w-sm p-2"
              onSubmit={handleSectionSubmit(addSection)}
            >
              <DialogHeader>
                <DialogTitle asChild>
                  <h3 className="font-headline-md text-xl font-bold text-muted-foreground">
                    Add New Section
                  </h3>
                </DialogTitle>
              </DialogHeader>
              <div>
                <div className="p-4 sm:p-5">
                  <div className="space-y-4">
                    {/* Section Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm  font-medium text-foreground">
                        Section Name
                      </label>
                      <input
                        className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="e.g., Biology, English"
                        type="text"
                        {...registerSection("secName", {
                          required: SECTION_VALIDATION.NAME.REQUIRED,
                          minLength: {
                            value: SECTION_VALIDATION.NAME.MIN_LENGTH,
                            message: SECTION_VALIDATION.NAME.MIN_LENGTH_MSG,
                          },
                          maxLength: {
                            value: SECTION_VALIDATION.NAME.MAX_LENGTH,
                            message: SECTION_VALIDATION.NAME.MAX_LENGTH_MSG,
                          },
                          pattern: {
                            value: SECTION_VALIDATION.NAME.PATTERN,
                            message: SECTION_VALIDATION.NAME.PATTERN_MSG,
                          },
                        })}
                      />
                      <div className="error  h-6 flex items-center">
                        {sectionErrors.secName && (
                          <InputInlineError
                            ErrorMsg={sectionErrors.secName.message}
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols- gap-3">
                      {/* Number of Questions */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Questions
                        </label>
                        <input
                          className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder={0}
                          type="number"
                          {...registerSection("secQuestions", {
                            required: SECTION_VALIDATION.QUESTIONS.REQUIRED,
                            valueAsNumber: true,
                            min: {
                              value: SECTION_VALIDATION.QUESTIONS.MIN,
                              message: SECTION_VALIDATION.QUESTIONS.MIN_MSG,
                            },
                            max: {
                              value: SECTION_VALIDATION.QUESTIONS.MAX,
                              message: SECTION_VALIDATION.QUESTIONS.MAX_MSG,
                            },
                          })}
                        />
                        <div className="error  h-6 flex items-center">
                          {sectionErrors.secQuestions && (
                            <InputInlineError
                              ErrorMsg={sectionErrors.secQuestions.message}
                            />
                          )}
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Duration (Mins)
                        </label>
                        <input
                          className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder={0}
                          type="number"
                          {...registerSection("secDuration", {
                            required: SECTION_VALIDATION.DURATION.REQUIRED,
                            valueAsNumber: true,
                            min: {
                              value: SECTION_VALIDATION.DURATION.MIN,
                              message: SECTION_VALIDATION.DURATION.MIN_MSG,
                            },
                            max: {
                              value: SECTION_VALIDATION.DURATION.MAX,
                              message: SECTION_VALIDATION.DURATION.MAX_MSG,
                            },
                          })}
                        />
                        <div className="error  h-6 flex items-center">
                          {sectionErrors.secDuration && (
                            <InputInlineError
                              ErrorMsg={sectionErrors.secDuration.message}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-end gap-3">
                    <DialogClose className="h-11 rounded-lg border border-border/70 px-4 font-semibold text-muted-foreground transition-all hover:bg-muted/10">
                      Cancel
                    </DialogClose>
                    <button
                      type="submit"
                      className="h-11 text-center flex items-center rounded-lg bg-primary px-4   text-primary-foreground cursor-pointer  shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30 active:scale-95 font-extrabold"
                    >
                      <p>Add Section</p>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <form onSubmit={handleMainSubmit(onSubmit)} id="createTestForm">
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-6 xl:flex-row">
                <div className="flex-1 space-y-6">
                  {/* Sections */}
                  <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                      Exam Type
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {sectionBtn.map((s, i) => (
                        <label
                          key={i}
                          htmlFor={s.type}
                          className="
      flex cursor-pointer items-start gap-2 rounded-xl
      border-2 border-border p-6 shadow-sm transition-all
      hover:border-primary/50
      group
      has-checked:border-primary
      has-checked:bg-primary/5
    "
                        >
                          <input
                            id={s.type}
                            type="radio"
                            name="section"
                            value={s.type}
                            className="sr-only peer"
                            {...registerMain("section")}
                          />

                          <div
                            className="
        mt-1 flex items-center justify-center rounded-full
        border-2 border-border p-1
        peer-checked:border-primary
        group
      "
                          >
                            <div
                              className="
          h-2.5 w-2.5 rounded-full
          group-[.peer:checked+&]:bg-primary
        "
                            />
                          </div>

                          <div>
                            <h4 className="font-semibold">{s.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {s.descrip}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                  <section className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">
                      Scoring Logic
                    </h3>
                    <div className="mb-5 flex flex-wrap gap-4">
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          defaultChecked
                          className="h-5 w-5 border-outline-variant bg-transparent text-primary focus:ring-primary"
                          name="marks"
                          type="radio"
                        />
                        <span className="text-base font-medium text-on-surface">
                          Fixed Marks
                        </span>
                      </label>
                      <label className="flex cursor-not-allowed items-center gap-3 opacity-60">
                        <input
                          className="h-5 w-5 border-outline-variant bg-transparent text-primary focus:ring-primary"
                          disabled
                          name="marks"
                          type="radio"
                        />
                        <span className="text-base font-medium text-on-surface">
                          Dynamic/Adaptive
                        </span>
                        <Badge className=" bg-primary-foreground">
                          Comming soon
                        </Badge>
                      </label>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 bg-destructive/30 w-12 items-center justify-center rounded-xl bg-error/10">
                          <span className="material-symbols-outlined text-xl text-error">
                            remove_circle
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">
                            Negative Marking
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            Deduct points for incorrect answers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-background border-muted">
                        <div className="flex items-center gap-2">
                          <label
                            className={`text-sm font-medium ${
                              mainErrors.negativeMarks
                                ? "text-muted-foreground"
                                : "text-card-foreground"
                            }`}
                          >
                            {mainErrors.negativeMarks?.message || "Marks:"}
                          </label>
                          <input
                            type="number"
                            disabled={!negativeMarking}
                            className="h-11 w-20 rounded-lg border border-outline-variant bg-background text-center text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed"
                            {...registerMain("negativeMarks", {
                              valueAsNumber: true,
                              validate: (value) => {
                                if (!negativeMarking) return true;

                                if (
                                  value === undefined ||
                                  value === null ||
                                  value === ""
                                ) {
                                  return TEST_VALIDATION.NEGATIVE_MARKS
                                    .REQUIRED;
                                }

                                if (
                                  value < TEST_VALIDATION.NEGATIVE_MARKS.MIN
                                ) {
                                  return TEST_VALIDATION.NEGATIVE_MARKS.MIN_MSG;
                                }

                                if (
                                  value > TEST_VALIDATION.NEGATIVE_MARKS.MAX
                                ) {
                                  return TEST_VALIDATION.NEGATIVE_MARKS.MAX_MSG;
                                }

                                return true;
                              },
                            })}
                          />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            {...registerMain("negativeMarking", {
                              onChange: (e) => {
                                if (!e.target.checked) {
                                  setMainValue("negativeMarks", 0); // Reset to 0
                                }
                              },
                            })}
                          />
                          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                    </div>
                    {/* Percentage */}
                    <div className="mt-4 flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <span className="material-symbols-outlined text-xl text-primary">
                            percent
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-on-surface">
                            Passing Percentage
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            Minimum percentage required to pass
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <label
                            className={`text-sm font-medium ${
                              mainErrors.passingPercentage
                                ? "text-muted-foreground"
                                : "text-card-foreground"
                            }`}
                          >
                            {mainErrors.passingPercentage?.message ||
                              "Percentage:"}
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              className="h-11 w-24 rounded-lg border border-outline-variant bg-background pr-8 text-center text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                              {...registerMain("passingPercentage", {
                                valueAsNumber: true,
                                required:
                                  TEST_VALIDATION.PASSING_PERCENTAGE.REQUIRED,
                                min: {
                                  value: TEST_VALIDATION.PASSING_PERCENTAGE.MIN,
                                  message:
                                    TEST_VALIDATION.PASSING_PERCENTAGE.MIN_MSG,
                                },
                                max: {
                                  value: TEST_VALIDATION.PASSING_PERCENTAGE.MAX,
                                  message:
                                    TEST_VALIDATION.PASSING_PERCENTAGE.MAX_MSG,
                                },
                              })}
                            />

                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                          <span className="material-symbols-outlined text-xl text-success">
                            score
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-on-surface">
                            Marks Per Question
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            Marks awarded for each correct answer
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <label
                            className={`text-sm font-medium ${
                              mainErrors.marksPerQuestion
                                ? "text-muted-foreground"
                                : "text-card-foreground"
                            }`}
                          >
                            {mainErrors.marksPerQuestion?.message || "Marks:"}
                          </label>

                          <input
                            type="number"
                            className="h-11 w-24 rounded-lg border border-outline-variant bg-background text-center text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            {...registerMain("marksPerQuestion", {
                              valueAsNumber: true,
                              required:
                                TEST_VALIDATION.MARKS_PER_QUESTION.REQUIRED,
                              min: {
                                value: TEST_VALIDATION.MARKS_PER_QUESTION.MIN,
                                message:
                                  TEST_VALIDATION.MARKS_PER_QUESTION.MIN_MSG,
                              },
                              max: {
                                value: TEST_VALIDATION.MARKS_PER_QUESTION.MAX,
                                message:
                                  TEST_VALIDATION.MARKS_PER_QUESTION.MAX_MSG,
                              },
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {mulSection ? (
                    <SectionConfiguration
                      visible={!mulSection && "hidden"}
                      open={open}
                      setOpen={setOpen}
                      sections={sections}
                      setSections={setSections}
                    />
                  ) : (
                    <div className="flex flex-col bg-card py-4 px-5 justify-center">
                      {/* Number of Questions */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Questions
                        </label>
                        <input
                          className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder={0}
                          type="number"
                          {...registerMain("totalQuestions", {
                            required: TEST_VALIDATION.QUESTIONS.REQUIRED,
                            valueAsNumber: true,
                            min: {
                              value: TEST_VALIDATION.QUESTIONS.MIN,
                              message: TEST_VALIDATION.QUESTIONS.MIN_MSG,
                            },
                            max: {
                              value: TEST_VALIDATION.QUESTIONS.MAX,
                              message: TEST_VALIDATION.QUESTIONS.MAX_MSG,
                            },
                          })}
                        />
                        <div className="error  h-6 flex items-center">
                          {mainErrors.totalQuestions && (
                            <InputInlineError
                              ErrorMsg={mainErrors.totalQuestions.message}
                            />
                          )}
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                          Duration (Mins)
                        </label>
                        <input
                          className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder={0}
                          type="number"
                          {...registerMain("totalDuration", {
                            required: TEST_VALIDATION.DURATION.REQUIRED,
                            valueAsNumber: true,
                            min: {
                              value: TEST_VALIDATION.DURATION.MIN,
                              message: TEST_VALIDATION.DURATION.MIN_MSG,
                            },
                            max: {
                              value: TEST_VALIDATION.DURATION.MAX,
                              message: TEST_VALIDATION.DURATION.MAX_MSG,
                            },
                          })}
                        />
                        <div className="error  h-6 flex items-center">
                          {mainErrors.totalDuration && (
                            <InputInlineError
                              ErrorMsg={mainErrors.totalDuration.message}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}
