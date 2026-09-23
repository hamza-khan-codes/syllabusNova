import { ROUTES } from "@/constant/routes";
import {
  getQuizQuestionsController,
  getResultController,
} from "@/controllers/Quiz/QuizControllers";

import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  CircleHelp,
  CircleX,
  Clock3,
  Flag,
  Loader2,
  SkipForward,
  Tag,
  Timer,
} from "lucide-react";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

export default function IndualReview() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  const { reviewQuizId, quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!reviewQuizId || !quizId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const questionsResponse =
          await getQuizQuestionsController(reviewQuizId);

        const resultResponse =
          await getResultController(quizId);

        setQuestions(questionsResponse || []);
        setResult(resultResponse?.questionStates || []);
      } catch (error) {
        console.error("Failed to fetch review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reviewQuizId, quizId]);

  /* =========================================================
     Result Map
  ========================================================= */

  const resultMap = useMemo(() => {
    return Object.fromEntries(
      result.map((item) => [
        item.questionId,
        item,
      ]),
    );
  }, [result]);

  /* =========================================================
     Statistics
  ========================================================= */

  const stats = useMemo(() => {
    const attempted = result.filter(
      (item) => item.attempted,
    );

    const correct = result.filter(
      (item) => item.isCorrect,
    );

    const wrong = result.filter(
      (item) =>
        item.attempted &&
        !item.isCorrect,
    );

    const skipped = result.filter(
      (item) => item.skipped,
    );

    const notVisited = result.filter(
      (item) => item.notVisited,
    );

    const marked = result.filter(
      (item) => item.marked,
    );

    const late = result.filter(
      (item) => item.late,
    );

    const totalTime = result.reduce(
      (total, item) =>
        total + Number(item.time || 0),
      0,
    );

    const accuracy =
      attempted.length > 0
        ? Math.round(
            (correct.length / attempted.length) *
              100,
          )
        : 0;

    return {
      attempted: attempted.length,
      correct: correct.length,
      wrong: wrong.length,
      skipped: skipped.length,
      notVisited: notVisited.length,
      marked: marked.length,
      late: late.length,
      totalTime,
      accuracy,
    };
  }, [result]);

  /* =========================================================
     Total Marks
  ========================================================= */

  const totalMarks = questions.reduce(
    (total, question) =>
      total + Number(question.marks || 0),
    0,
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm">
            Loading review...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-6 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          <div className="p-5 sm:p-6">

            {/* Back */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  ROUTES.RESULT + `/${quizId}`,
                )
              }
              className="mb-5 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Result
            </button>

            {/* Title */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <CircleHelp className="h-5 w-5" />
                </div>

                <span className="text-sm font-medium text-muted-foreground">
                  Quiz Review
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight">
                Review Questions
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Review your answers, correct answers,
                timing and question status.
              </p>
            </div>

            {/* =================================================
                MAIN STATS
            ================================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

              <StatCard
                label="Questions"
                value={questions.length}
                icon={
                  <CircleHelp className="h-4 w-4" />
                }
              />

              <StatCard
                label="Correct"
                value={stats.correct}
                variant="success"
                icon={
                  <CheckCircle2 className="h-4 w-4" />
                }
              />

              <StatCard
                label="Wrong"
                value={stats.wrong}
                variant="danger"
                icon={
                  <CircleX className="h-4 w-4" />
                }
              />

              <StatCard
                label="Attempted"
                value={stats.attempted}
                icon={
                  <CheckCircle2 className="h-4 w-4" />
                }
              />

              <StatCard
                label="Marked"
                value={stats.marked}
                variant="warning"
                icon={
                  <Flag className="h-4 w-4" />
                }
              />

              <StatCard
                label="Accuracy"
                value={`${stats.accuracy}%`}
                variant="primary"
                icon={
                  <Award className="h-4 w-4" />
                }
              />

            </div>

            {/* =================================================
                EXTRA SUMMARY
            ================================================= */}

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

              <SummaryItem
                label="Total Marks"
                value={totalMarks}
                icon={
                  <Award className="h-4 w-4" />
                }
              />

              <SummaryItem
                label="Time"
                value={formatTime(stats.totalTime)}
                icon={
                  <Timer className="h-4 w-4" />
                }
              />

              <SummaryItem
                label="Skipped"
                value={stats.skipped}
                icon={
                  <SkipForward className="h-4 w-4" />
                }
              />

              <SummaryItem
                label="Not Visited"
                value={stats.notVisited}
                icon={
                  <CircleHelp className="h-4 w-4" />
                }
              />

              <SummaryItem
                label="Late"
                value={stats.late}
                icon={
                  <Clock3 className="h-4 w-4" />
                }
              />

            </div>

          </div>

          {/* =====================================================
              QUESTION NAVIGATION
          ===================================================== */}

          {questions.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto border-t border-border bg-muted/20 px-5 py-3 sm:px-6">

              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                Questions:
              </span>

              {questions.map((question, index) => {

                const questionId =
                  question.questionId ||
                  question.id;

                const questionResult =
                  resultMap[questionId];

                return (
                  <a
                    key={questionId || index}
                    href={`#question-${index + 1}`}
                    title={getStatusText(
                      questionResult,
                    )}
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold transition-colors",

                      questionResult?.isCorrect
                        ? "border-success/40 bg-success/10 text-success hover:bg-success/20"

                        : questionResult?.attempted
                          ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20"

                          : "border-border bg-card text-muted-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
                    ].join(" ")}
                  >
                    {index + 1}
                  </a>
                );
              })}
            </div>
          )}

        </section>

        {/* =====================================================
            QUESTIONS
        ===================================================== */}

        {questions.length === 0 ? (

          <section className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <CircleHelp className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              No questions found
            </h2>

            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              There are no questions available
              for this quiz.
            </p>

          </section>

        ) : (

          <div className="space-y-5">

            {questions.map(
              (question, index) => {

                const questionId =
                  question.questionId ||
                  question.id;

                return (
                  <QuestionCard
                    key={
                      questionId || index
                    }
                    question={question}
                    result={
                      resultMap[questionId]
                    }
                    index={index}
                  />
                );
              },
            )}

          </div>
        )}

      </div>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon,
  variant = "default",
}) {
  const styles = {
    default:
      "bg-muted/40 text-muted-foreground",

    success:
      "bg-success/10 text-success",

    danger:
      "bg-destructive/10 text-destructive",

    warning:
      "bg-warning/10 text-warning",

    primary:
      "bg-primary/10 text-primary",
  };

  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">

      <div className="flex items-center justify-between">

        <span className="text-xs text-muted-foreground">
          {label}
        </span>

        <span
          className={[
            "rounded-lg p-1.5",
            styles[variant],
          ].join(" ")}
        >
          {icon}
        </span>

      </div>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
  icon,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   QUESTION CARD
========================================================= */

function QuestionCard({
  question,
  result,
  index,
}) {
  /*
   * Use result.correctAns when available.
   * This represents the answer saved with
   * this particular attempt.
   */

  const correctAnswers =
    result?.correctAns?.length
      ? result.correctAns
      : question.correctAnswer || [];

  const selectedAnswers =
    result?.selectedAns || [];

  const attempted =
    Boolean(result?.attempted);

  const isCorrect =
    Boolean(result?.isCorrect);

  const isMarked =
    Boolean(result?.marked);

  const isLate =
    Boolean(result?.late);

  const isSkipped =
    Boolean(result?.skipped);

  const isNotVisited =
    Boolean(result?.notVisited);

  return (
    <article
      id={`question-${index + 1}`}
      className={[
        "scroll-mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm",

        isCorrect
          ? "border-success/30"

          : attempted
            ? "border-destructive/30"

            : "border-border",
      ].join(" ")}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-border bg-muted/20 px-5 py-4 sm:px-6">

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Question Number */}
            <div className="flex items-center gap-3">

              <div
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",

                  isCorrect
                    ? "bg-success text-success-foreground"

                    : attempted
                      ? "bg-destructive text-destructive-foreground"

                      : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {index + 1}
              </div>

              <div>

                <h2 className="text-sm font-semibold">
                  Question {index + 1}
                </h2>

                {question.topic && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {question.topic}
                  </p>
                )}

              </div>

            </div>

            {/* Question Meta */}
            <div className="flex flex-wrap items-center gap-2">

              <DifficultyBadge
                difficulty={
                  question.difficulty
                }
              />

              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">

                <Award className="h-3.5 w-3.5" />

                {question.marks || 0} marks

              </span>

              {question.isMultiple && (
                <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
                  Multiple Answer
                </span>
              )}

            </div>

          </div>

          {/* Question Result */}
          <QuestionStatus
            result={result}
          />

        </div>

      </header>

      {/* =====================================================
          BODY
      ===================================================== */}

      <div className="p-5 sm:p-6">

        {/* Question */}
        <div
          className="text-base leading-7 text-foreground"
          dangerouslySetInnerHTML={{
            __html:
              DOMPurify.sanitize(
                question.question || "",
              ),
          }}
        />

        {/* =================================================
            ATTEMPT DETAILS
        ================================================= */}

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

          <InfoBadge
            icon={
              <Clock3 className="h-4 w-4" />
            }
            label="Time"
            value={formatTime(
              result?.time,
            )}
          />

          <InfoBadge
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
            label="Attempted"
            value={
              attempted
                ? "Yes"
                : "No"
            }
            variant={
              attempted
                ? "success"
                : "default"
            }
          />

          <InfoBadge
            icon={
              <Flag className="h-4 w-4" />
            }
            label="Marked"
            value={
              isMarked
                ? "Yes"
                : "No"
            }
            variant={
              isMarked
                ? "warning"
                : "default"
            }
          />

          <InfoBadge
            icon={
              <AlertCircle className="h-4 w-4" />
            }
            label="Late"
            value={
              isLate
                ? "Yes"
                : "No"
            }
            variant={
              isLate
                ? "danger"
                : "default"
            }
          />

        </div>

        {/* =================================================
            ANSWER OPTIONS
        ================================================= */}

        <div className="mt-6 flex items-center gap-2">

          <div
            className={[
              "h-5 w-1 rounded-full",

              isCorrect
                ? "bg-success"

                : attempted
                  ? "bg-destructive"

                  : "bg-muted-foreground",
            ].join(" ")}
          />

          <h3 className="text-sm font-semibold">
            Answer Options
          </h3>

          <span className="text-xs text-muted-foreground">
            • Your answer and correct answer
          </span>

        </div>

        <div className="mt-3 space-y-3">

          {question.options?.map(
            (option, optionIndex) => {

              const optionId =
                option.optionId;

              const optionIsCorrect =
                correctAnswers.includes(
                  optionId,
                );

              const optionIsSelected =
                selectedAnswers.includes(
                  optionId,
                );

              return (
                <Option
                  key={optionId}
                  option={option}
                  optionIndex={optionIndex}
                  isCorrect={
                    optionIsCorrect
                  }
                  isSelected={
                    optionIsSelected
                  }
                />
              );
            },
          )}

        </div>

        {/* =================================================
            ANSWER SUMMARY
        ================================================= */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          <AnswerSummary
            label="Your Answer"
            answers={selectedAnswers}
            question={question}
            type="selected"
          />

          <AnswerSummary
            label="Correct Answer"
            answers={correctAnswers}
            question={question}
            type="correct"
          />

        </div>

        {/* =================================================
            QUESTION INFORMATION
        ================================================= */}

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <DetailItem
            label="Question Number"
            value={
              result?.number ||
              index + 1
            }
          />

          <DetailItem
            label="Answers Selected"
            value={
              selectedAnswers.length
            }
          />

          <DetailItem
            label="Correct Answers"
            value={
              correctAnswers.length
            }
          />

          <DetailItem
            label="Status"
            value={getStatusText(result)}
          />

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">

          {question.topic && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">

              <Tag className="h-3.5 w-3.5" />

              <span>
                Topic:
              </span>

              <span className="font-medium text-foreground">
                {question.topic}
              </span>

            </div>
          )}

          {question.section && (
            <div className="text-xs text-muted-foreground">

              Section:

              <span className="ml-1 font-medium text-foreground">
                {question.section}
              </span>

            </div>
          )}

          {isSkipped && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-warning">

              <SkipForward className="h-3.5 w-3.5" />

              Skipped

            </div>
          )}

          {isNotVisited && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">

              <CircleHelp className="h-3.5 w-3.5" />

              Not Visited

            </div>
          )}

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   QUESTION STATUS
========================================================= */

function QuestionStatus({ result }) {
  if (!result || result.notVisited) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">

        <CircleHelp className="h-4 w-4 text-muted-foreground" />

        <div>
          <p className="text-xs font-semibold">
            Not Visited
          </p>

          <p className="text-xs text-muted-foreground">
            This question was not visited.
          </p>
        </div>

      </div>
    );
  }

  if (result.skipped) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2.5">

        <SkipForward className="h-4 w-4 text-warning" />

        <div>
          <p className="text-xs font-semibold text-warning">
            Skipped
          </p>

          <p className="text-xs text-muted-foreground">
            This question was skipped.
          </p>
        </div>

      </div>
    );
  }

  if (result.isCorrect) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3 py-2.5">

        <CheckCircle2 className="h-4 w-4 text-success" />

        <div>
          <p className="text-xs font-semibold text-success">
            Correct Answer
          </p>

          <p className="text-xs text-muted-foreground">
            Your answer was recorded as correct.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2.5">

      <CircleX className="h-4 w-4 text-destructive" />

      <div>
        <p className="text-xs font-semibold text-destructive">
          Incorrect Answer
        </p>

        <p className="text-xs text-muted-foreground">
          Your answer was recorded as incorrect.
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   INFO BADGE
========================================================= */

function InfoBadge({
  icon,
  label,
  value,
  variant = "default",
}) {
  const styles = {
    default:
      "bg-muted/40 text-muted-foreground",

    success:
      "bg-success/10 text-success",

    warning:
      "bg-warning/10 text-warning",

    danger:
      "bg-destructive/10 text-destructive",
  };

  return (
    <div
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2.5",
        styles[variant],
      ].join(" ")}
    >

      {icon}

      <div>
        <p className="text-[11px] opacity-70">
          {label}
        </p>

        <p className="text-xs font-semibold">
          {value}
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">

      <p className="text-[11px] text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   ANSWER SUMMARY
========================================================= */

function AnswerSummary({
  label,
  answers,
  question,
  type,
}) {
  const optionLabels = answers
    .map((answerId) => {

      const index =
        question.options?.findIndex(
          (option) =>
            option.optionId ===
            answerId,
        );

      return index >= 0
        ? String.fromCharCode(
            65 + index,
          )
        : null;
    })
    .filter(Boolean);

  const isCorrect =
    type === "correct";

  return (
    <div
      className={[
        "rounded-xl border p-3.5",

        isCorrect
          ? "border-success/30 bg-success/5"
          : "border-border bg-muted/20",
      ].join(" ")}
    >

      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      {optionLabels.length > 0 ? (

        <div className="mt-2 flex flex-wrap gap-2">

          {optionLabels.map(
            (label) => (
              <span
                key={label}
                className={[
                  "flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-bold",

                  isCorrect
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-foreground",
                ].join(" ")}
              >
                {label}
              </span>
            ),
          )}

        </div>

      ) : (

        <p className="mt-2 text-xs font-medium text-muted-foreground">
          No answer selected
        </p>

      )}

    </div>
  );
}

/* =========================================================
   OPTION
========================================================= */

function Option({
  option,
  optionIndex,
  isCorrect,
  isSelected,
}) {
  let containerClass =
    "border-border bg-background hover:bg-muted/40";

  let letterClass =
    "bg-muted text-muted-foreground";

  if (isSelected && isCorrect) {

    containerClass =
      "border-success/40 bg-success/10";

    letterClass =
      "bg-success text-success-foreground";

  } else if (isSelected && !isCorrect) {

    containerClass =
      "border-destructive/40 bg-destructive/10";

    letterClass =
      "bg-destructive text-destructive-foreground";

  } else if (isCorrect) {

    containerClass =
      "border-success/30 bg-success/5";

    letterClass =
      "bg-success/10 text-success";
  }

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl border p-3.5 transition-colors sm:p-4",
        containerClass,
      ].join(" ")}
    >

      {/* Letter */}
      <div
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
          letterClass,
        ].join(" ")}
      >
        {String.fromCharCode(
          65 + optionIndex,
        )}
      </div>

      {/* Text */}
      <p
        className={[
          "min-w-0 flex-1 text-sm leading-6",

          isSelected || isCorrect
            ? "font-medium text-foreground"
            : "text-muted-foreground",
        ].join(" ")}
      >
        {option.text}
      </p>

      {/* Status */}
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">

        {isSelected && isCorrect && (
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-success">

            <CheckCircle2 className="h-4 w-4" />

            <span className="hidden text-xs font-semibold sm:block">
              Your Answer • Correct
            </span>

          </span>
        )}

        {isSelected && !isCorrect && (
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-destructive">

            <CircleX className="h-4 w-4" />

            <span className="hidden text-xs font-semibold sm:block">
              Your Answer
            </span>

          </span>
        )}

        {!isSelected && isCorrect && (
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-success">

            <CheckCircle2 className="h-4 w-4" />

            <span className="hidden text-xs font-semibold sm:block">
              Correct Answer
            </span>

          </span>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   DIFFICULTY
========================================================= */

function DifficultyBadge({
  difficulty,
}) {
  const styles = {
    Easy:
      "bg-success/10 text-success",

    Medium:
      "bg-warning/15 text-warning",

    Hard:
      "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
        styles[difficulty] ||
        "bg-muted text-muted-foreground"
      }`}
    >
      {difficulty || "Unknown"}
    </span>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatTime(seconds) {
  const value = Math.max(
    0,
    Number(seconds || 0),
  );

  if (value < 60) {
    return `${value}s`;
  }

  const minutes = Math.floor(
    value / 60,
  );

  const remainingSeconds =
    value % 60;

  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  const remainingMinutes =
    minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

function getStatusText(result) {
  if (!result) {
    return "No Result";
  }

  if (result.notVisited) {
    return "Not Visited";
  }

  if (result.skipped) {
    return "Skipped";
  }

  if (result.isCorrect) {
    return "Correct";
  }

  if (result.attempted) {
    return "Incorrect";
  }

  return "Not Answered";
}