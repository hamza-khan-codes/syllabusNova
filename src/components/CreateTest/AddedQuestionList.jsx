import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Search,
  Plus,
  Edit3,
  Eye,
  Trash2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileQuestion,
  Layers3,
  AlertTriangle,
  X,
  Filter,
  Sparkles,
  ClipboardList,
} from "lucide-react";

import { ROUTES } from "@/constant/routes";

import {
  deleteQuestion,
  editQuestion,
} from "@/features/CreateTest/createTestSlices";

import getHtmlToText from "@/utils/getHtmlToText";
import useMoveToNext from "@/hooks/useMoveToNext";

import {
  Dialog,
  DialogClose,
  DialogContent,
} from "../ui/dialog";

import QuestionPreview from "./QuestionPreview";

export default function AddedQuestionList() {
  const createTest = useSelector((state) => state.createTest);

  const dispatch = useDispatch();
  const moveToNext = useMoveToNext();

  const questions = createTest?.questions || [];
  const structure = createTest?.structure || {};
  const sections = structure?.sections || [];

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState(null);

  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredQuestions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return questions.filter((question) => {
      const questionText = getHtmlToText(
        question.question || ""
      ).toLowerCase();

      const topic = question?.topic?.toLowerCase() || "";

      const questionDifficulty =
        question?.difficulty?.toLowerCase() || "";

      const matchesSearch =
        !searchValue ||
        questionText.includes(searchValue) ||
        topic.includes(searchValue);

      const matchesDifficulty =
        difficulty === "all" ||
        questionDifficulty === difficulty.toLowerCase();

      return matchesSearch && matchesDifficulty;
    });
  }, [questions, search, difficulty]);

  /* =========================================================
     GROUP QUESTIONS
  ========================================================= */

  const groupedQuestions = useMemo(() => {
    if (structure?.isSectionWise) {
      return sections.map((section) => {
        const sectionQuestions = filteredQuestions.filter(
          (question) =>
            question.sectionId === section.sectionId
        );

        return {
          sectionTitle:
            section.title || "Untitled Section",

          sectionId: section.sectionId,

          questionNum: sectionQuestions.length,

          sectionQuestions: section.questions || 0,

          questions: sectionQuestions.map((question) => ({
            ...question,
            question: getHtmlToText(
              question.question || ""
            ),
          })),
        };
      });
    }

    return [
      {
        sectionTitle:
          createTest?.info?.title || "Questions",

        sectionId: "main-test",

        questionNum: filteredQuestions.length,

        sectionQuestions:
          structure?.totalQuestions || 0,

        questions: filteredQuestions.map((question) => ({
          ...question,
          question: getHtmlToText(
            question.question || ""
          ),
        })),
      },
    ];
  }, [
    filteredQuestions,
    sections,
    structure,
    createTest?.info?.title,
  ]);

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (id) => {
    dispatch(editQuestion([id]));
    moveToNext(ROUTES.ADDNEWQUESTION);
  };

  /* =========================================================
     PREVIEW
  ========================================================= */

  const handlePreview = (id) => {
    const question = questions.find(
      (item) => item.questionId === id
    );

    if (!question) return;

    setPreviewQuestion({
      ...question,
      question: getHtmlToText(
        question.question || ""
      ),
      editId: id,
    });

    setPreviewOpen(true);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setConfirm(true);
  };

  const handleDeleteQuestion = () => {
    if (!deleteId) return;

    dispatch(deleteQuestion(deleteId));

    const updatedQuestions = questions.filter(
      (question) =>
        question.questionId !== deleteId
    );

    const updatedCreateTest = {
      ...createTest,
      questions: updatedQuestions,
    };

    localStorage.setItem(
      "createTest",
      JSON.stringify(updatedCreateTest)
    );

    setDeleteId(null);
    setConfirm(false);
  };

  /* =========================================================
     STATS
  ========================================================= */

  const totalQuestions =
    structure?.totalQuestions || 0;

  const addedQuestions = questions.length;

  const remainingQuestions = Math.max(
    totalQuestions - addedQuestions,
    0
  );

  const overallProgress =
    totalQuestions > 0
      ? Math.min(
          (addedQuestions / totalQuestions) * 100,
          100
        )
      : 0;

  const hasFilters =
    Boolean(search.trim()) || difficulty !== "all";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          DELETE DIALOG
      ===================================================== */}

      <Dialog
        open={confirm}
        onOpenChange={setConfirm}
      >
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md overflow-hidden border-border bg-card p-0">
          <div className="min-w-0 p-5 sm:p-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-destructive/10">
                <AlertTriangle className="size-5 text-destructive" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-foreground">
                  Delete question?
                </h3>

                <p className="mt-1.5 break-words text-sm leading-6 text-muted-foreground">
                  This question will be permanently removed
                  from your test. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col-reverse gap-2 border-t border-border bg-muted/30 p-4 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              type="button"
              onClick={handleDeleteQuestion}
              className="w-full rounded-xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 sm:w-auto"
            >
              Delete Question
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* =====================================================
          PREVIEW
      ===================================================== */}

      {previewQuestion && (
        <QuestionPreview
          question={previewQuestion.question}
          options={previewQuestion.options}
          correctOptionId={previewQuestion.correctAnswer}
          editId={previewQuestion.editId}
          isOpen={previewOpen}
          setIsOpen={setPreviewOpen}
          editQuestionFunc={handleEdit}
        />
      )}

      {/* =====================================================
          PAGE
      ===================================================== */}
      <p className="hidden"></p>
      <main className="box-border w-full min-w-0 max-w-full overflow-x-hidden">
        <div className="box-border w-full min-w-0 max-w-full   ">
          {/* =================================================
              HEADER
          ================================================= */}

          <header className="mb-7 w-full min-w-0 max-w-full">
            <div className="flex w-full min-w-0 max-w-full flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex min-w-0 items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <ClipboardList className="size-5 text-primary" />
                  </div>

                  <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    Test Builder
                  </span>
                </div>

                <h1 className="break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Question Bank
                </h1>

                <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-muted-foreground sm:text-base">
                  Create, organize, preview, and manage the
                  questions in your assessment.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  moveToNext(ROUTES.ADDNEWQUESTION)
                }
                className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-0 lg:w-auto"
              >
                <Plus className="size-4 shrink-0 transition-transform group-hover:rotate-90" />
                <span className="truncate">
                  Create Question
                </span>
              </button>
            </div>
          </header>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="mb-6 grid w-full min-w-0 max-w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              icon={FileQuestion}
              label="Questions Added"
              value={addedQuestions}
              helper={`of ${totalQuestions}`}
            />

            <StatCard
              icon={Layers3}
              label="Remaining"
              value={remainingQuestions}
              helper="questions"
            />

            <StatCard
              icon={
                overallProgress >= 100
                  ? CheckCircle2
                  : Sparkles
              }
              label="Completion"
              value={`${Math.round(overallProgress)}%`}
              helper={
                overallProgress >= 100
                  ? "Test is complete"
                  : "Keep adding questions"
              }
              success={overallProgress >= 100}
            />
          </div>

          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="mb-6 w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="min-w-0 p-4 sm:p-5">
              <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Test completion
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {addedQuestions} of {totalQuestions}{" "}
                    questions added
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                  {Math.round(overallProgress)}%
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full max-w-full rounded-full transition-all duration-500 ${
                    overallProgress >= 100
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-7 w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
            <div className="flex w-full min-w-0 max-w-full flex-col gap-3 lg:flex-row">
              {/* Search */}

              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  type="text"
                  placeholder="Search questions or topics..."
                  className="box-border h-11 w-full min-w-0 max-w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Difficulty */}

              <div className="relative w-full min-w-0 lg:w-52 lg:shrink-0">
                <Filter className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <select
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(event.target.value)
                  }
                  className="box-border h-11 w-full min-w-0 max-w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="all">
                    All Difficulties
                  </option>

                  <option value="easy">
                    Easy
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="hard">
                    Hard
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {hasFilters && (
              <div className="mt-3 flex min-w-0 max-w-full items-center justify-between gap-3 border-t border-border/60 px-1 pt-3">
                <p className="min-w-0 truncate text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {filteredQuestions.length}
                  </span>{" "}
                  matching questions
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setDifficulty("all");
                  }}
                  className="shrink-0 text-xs font-semibold text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              QUESTIONS
          ================================================= */}

          <div className="w-full min-w-0 max-w-full space-y-5">
            {groupedQuestions.map((section) => {
              const percentage =
                section.sectionQuestions > 0
                  ? Math.min(
                      (section.questionNum /
                        section.sectionQuestions) *
                        100,
                      100
                    )
                  : 0;

              return (
                <section
                  key={section.sectionId}
                  className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  {/* Section Header */}

                  <div className="w-full min-w-0 max-w-full border-b border-border bg-muted/20 p-4 sm:p-5">
                    <div className="flex w-full min-w-0 max-w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Layers3 className="size-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
                            {section.sectionTitle}
                          </h2>

                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {section.questionNum} of{" "}
                            {section.sectionQuestions}{" "}
                            questions
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 lg:w-64 lg:shrink-0">
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress
                          </span>

                          <span className="shrink-0 font-semibold text-foreground">
                            {Math.round(percentage)}%
                          </span>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full max-w-full rounded-full transition-all ${
                              percentage >= 100
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}

                  {section.questions.length > 0 ? (
                    <div className="w-full min-w-0 max-w-full divide-y divide-border">
                      {section.questions.map(
                        (question, index) => {
                          const isCompleted =
                            question?.status === "saved";

                          return (
                            <QuestionItem
                              key={question.questionId}
                              question={question}
                              index={index}
                              isCompleted={isCompleted}
                              onEdit={handleEdit}
                              onPreview={handlePreview}
                              onDelete={openDeleteDialog}
                            />
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <EmptySection
                      hasFilters={hasFilters}
                      onAdd={() =>
                        moveToNext(
                          ROUTES.ADDNEWQUESTION
                        )
                      }
                    />
                  )}
                </section>
              );
            })}

            {/* No Results */}

            {filteredQuestions.length === 0 &&
              hasFilters && (
                <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted">
                    <Search className="size-6 text-muted-foreground" />
                  </div>

                  <h3 className="mt-4 font-semibold text-foreground">
                    No matching questions
                  </h3>

                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    Try changing your search or difficulty
                    filter.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setDifficulty("all");
                    }}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  success = false,
}) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
            success
              ? "bg-success/10 text-success"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </p>

          <div className="mt-0.5 flex min-w-0 items-baseline gap-1.5">
            <span className="shrink-0 text-xl font-bold text-foreground">
              {value}
            </span>

            <span className="min-w-0 truncate text-[11px] text-muted-foreground">
              {helper}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUESTION ITEM
========================================================= */

function QuestionItem({
  question,
  index,
  isCompleted,
  onEdit,
  onPreview,
  onDelete,
}) {
  const difficulty =
    question?.difficulty?.toLowerCase();

  const difficultyClass =
    difficulty === "easy"
      ? "bg-success/10 text-success"
      : difficulty === "medium"
      ? "bg-warning/10 text-warning"
      : "bg-destructive/10 text-destructive";

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden p-4 transition-colors hover:bg-muted/20 sm:p-5">
      <div className="flex w-full min-w-0 max-w-full items-start gap-3 sm:gap-4">
        {/* Number */}

        <div className="hidden size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-xs font-bold text-muted-foreground sm:flex">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Main Content */}

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex min-w-0 items-start gap-2">
            <span className="mt-1 shrink-0 text-xs font-bold text-primary sm:hidden">
              Q{index + 1}
            </span>

            <p className="min-w-0 flex-1 break-words text-sm font-medium leading-6 text-foreground sm:text-[15px]">
              {question.question}
            </p>
          </div>

          {/* Metadata */}

          <div className="mt-3 flex min-w-0 max-w-full flex-wrap items-center gap-2">
            {question.topic && (
              <span className="min-w-0 max-w-full truncate rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:max-w-[220px]">
                {question.topic}
              </span>
            )}

            {question.difficulty && (
              <span
                className={`inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold capitalize ${difficultyClass}`}
              >
                <Circle className="size-2.5 shrink-0 fill-current" />

                <span className="truncate">
                  {question.difficulty}
                </span>
              </span>
            )}

            <span className="shrink-0 rounded-lg bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {question.marks}{" "}
              {question.marks === 1 ? "mark" : "marks"}
            </span>

            <span
              className={`inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold ${
                isCompleted
                  ? "text-success"
                  : "text-warning"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="size-3.5 shrink-0" />
              ) : (
                <Circle className="size-3.5 shrink-0" />
              )}

              <span className="capitalize">
                {question.status || "draft"}
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Actions */}

        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <ActionButton
            title="Edit question"
            onClick={() =>
              onEdit(question.questionId)
            }
            icon={<Edit3 />}
            className="hover:bg-primary/10 hover:text-primary"
          />

          <ActionButton
            title="Preview question"
            onClick={() =>
              onPreview(question.questionId)
            }
            icon={<Eye />}
            className="hover:bg-muted hover:text-foreground"
          />

          <ActionButton
            title="Delete question"
            onClick={() =>
              onDelete(question.questionId)
            }
            icon={<Trash2 />}
            className="hover:bg-destructive/10 hover:text-destructive"
          />
        </div>

        {/* Mobile Preview */}

        <button
          type="button"
          onClick={() =>
            onPreview(question.questionId)
          }
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Mobile Actions */}

      <div className="mt-4 flex w-full min-w-0 gap-2 border-t border-border/60 pt-3 sm:hidden">
        <button
          type="button"
          onClick={() =>
            onEdit(question.questionId)
          }
          className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border text-xs font-medium transition-colors hover:bg-muted"
        >
          <Edit3 className="size-3.5 shrink-0" />
          <span className="truncate">Edit</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onPreview(question.questionId)
          }
          className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border text-xs font-medium transition-colors hover:bg-muted"
        >
          <Eye className="size-3.5 shrink-0" />
          <span className="truncate">Preview</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(question.questionId)
          }
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-destructive/20 text-destructive transition-colors hover:bg-destructive/10"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  title,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors ${className}`}
    >
      <span className="[&>svg]:size-4">
        {icon}
      </span>
    </button>
  );
}

/* =========================================================
   EMPTY SECTION
========================================================= */

function EmptySection({
  hasFilters,
  onAdd,
}) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden px-6 py-14 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
        <FileQuestion className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">
        No questions found
      </h3>

      <p className="mt-1 break-words text-xs text-muted-foreground">
        {hasFilters
          ? "Try changing your filters."
          : "Start adding questions to this section."}
      </p>

      {!hasFilters && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-3.5" />
          Add Question
        </button>
      )}
    </div>
  );
}