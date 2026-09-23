import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Download,
  Home,
  RotateCcw,
  Trophy,
  XCircle,
  MinusCircle,
  AlarmClock,
  Target,
  ChevronRight,
  Sparkles,
  TimerReset,
} from "lucide-react";

import { getResultController } from "@/controllers/Quiz/QuizControllers";
import { useNavigate, useParams } from "react-router-dom";
import getCalculateRank from "@/utils/getCalculateRank";
import getCalculatePercentile from "@/utils/getCalculatePercentile";
import { ROUTES } from "@/constant/routes";

/* =================================================
   PERFORMANCE MESSAGES
================================================= */

const performanceMessages = {
  excellent: {
    title: "Excellent Performance",
    status: "Passed",
    heading: "Outstanding work! 🎉",
    message:
      "You performed exceptionally well on this test. Keep practicing to maintain your accuracy and push your score even higher.",
  },

  good: {
    title: "Good Performance",
    status: "Passed",
    heading: "Well done! 👏",
    message:
      "You did a great job on this test. Review the questions you missed and keep practicing to improve your score.",
  },

  average: {
    title: "Average Performance",
    status: "Passed",
    heading: "Keep going! 💪",
    message:
      "You passed the test, but there is still room for improvement. Review your mistakes and strengthen the topics you found difficult.",
  },

  poor: {
    title: "Needs Improvement",
    status: "Failed",
    heading: "Don't give up! 💪",
    message:
      "Focus on the questions you found difficult, review your mistakes, and try again to improve your score.",
  },
};

/* =================================================
   MAIN COMPONENT
================================================= */

export default function IndualResult() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [resultState, setResultState] = useState({});
  const [loading, setLoading] = useState(true);

  /* -----------------------------------------------
     FETCH RESULT
  ----------------------------------------------- */

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);

        const response = await getResultController(quizId);

        setResultState(response || {});
      } catch (error) {
        console.error("Failed to load result:", error);
        setResultState({});
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchResult();
    }
  }, [quizId]);

  /* -----------------------------------------------
     BASIC DATA
  ----------------------------------------------- */

  const totalQuestions =
    resultState?.questionStates?.length || 0;

  const percentage = (value = 0) => {
    if (!totalQuestions) return 0;

    return Math.round(
      (Number(value) / totalQuestions) * 100
    );
  };

  const score = percentage(
    resultState?.correct?.num || 0
  );

  /* -----------------------------------------------
     RESULT STATUS
  ----------------------------------------------- */

  const resultStatus = () => {
    const passingPercentage =
      Number(resultState?.passingPercentage) || 0;

    if (score < passingPercentage) {
      return "poor";
    }

    if (score >= 90) {
      return "excellent";
    }

    if (score >= 75) {
      return "good";
    }

    return "average";
  };

  const performance =
    performanceMessages[resultStatus()];

  /* -----------------------------------------------
     RESULT DATA
  ----------------------------------------------- */

  const result = useMemo(() => {
    const timeTakenSec =
      Number(resultState?.timeTakenSec) || 0;

    /*
     * Prefer the exact total time saved when the test
     * was submitted.
     *
     * Fallback to duration when older results don't
     * contain totalTestTimeSec.
     */

    const totalTestTimeSec =
      Number(resultState?.totalTestTimeSec) ||
      Number(resultState?.duration || 0) * 60;

    const remainingTimeSec = Math.max(
      0,
      totalTestTimeSec - timeTakenSec
    );

    const perQuestionSeconds =
      Number(resultState?.perQuestionSeconds) || 0;

    return {
      title:
        resultState?.title || "Quiz Result",

      score,

      correct:
        Number(resultState?.correct?.num) || 0,

      wrong:
        Number(resultState?.wrong?.num) || 0,

      skipped:
        Number(resultState?.skipped?.num) || 0,

      notVisited:
        Number(resultState?.notVisited?.num) || 0,

      late:
        Number(resultState?.late?.num) || 0,

      total: totalQuestions,

      /* -------------------------------------------
         WHOLE TEST TIME
      ------------------------------------------- */

      timeTakenSec,

      totalTestTimeSec,

      remainingTimeSec,

      timeTaken:
        formatDuration(timeTakenSec),

      totalTime:
        formatDuration(totalTestTimeSec),

      remainingTime:
        formatDuration(remainingTimeSec),

      /* -------------------------------------------
         INDIVIDUAL QUESTION TIME
      ------------------------------------------- */

      perQuestionSeconds,

      perQuestionTime:
        formatDuration(perQuestionSeconds),

      /* -------------------------------------------
         RANK / PERCENTILE
      ------------------------------------------- */

      rank: getCalculateRank(score, [
        resultState?.studentsScores,
      ]),

      percentile: getCalculatePercentile(score, [
        resultState?.studentsScores,
      ]),
    };
  }, [
    resultState,
    score,
    totalQuestions,
  ]);

  /* -----------------------------------------------
     NAVIGATION
  ----------------------------------------------- */

  const goDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const retakeTest = () => {
    navigate(
      `${ROUTES.QUIZINTERFACE}/${quizId}`
    );
  };

  const reviewTest = () => {
    navigate(
      `${ROUTES.REVIEWQUESTIONS}/${quizId}/${resultState?.quizId}`
    );
  };

  /* -----------------------------------------------
     LOADING
  ----------------------------------------------- */

  if (loading) {
    return <ResultSkeleton />;
  }

  /* =================================================
     UI
  ================================================= */

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* =========================================
          TOP BAR
      ========================================= */}

      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={goDashboard}
            className="group inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />

            <span>Dashboard</span>
          </button>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground shadow-sm transition hover:border-primary/30 hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <Download className="size-4" />
              Download
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Share
            </button>

          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 lg:px-8 lg:pt-10">

        {/* =========================================
            PAGE HEADER
        ========================================= */}

        <section className="mb-7">

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">

            <span>Dashboard</span>

            <ChevronRight className="size-3.5" />

            <span>Results</span>

            <ChevronRight className="size-3.5" />

            <span className="max-w-48 truncate text-foreground">
              {result.title}
            </span>

          </div>

          <div className="mt-5">

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">

              <BarChart3 className="size-3.5" />

              Test Result

            </div>

            <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
              {result.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Here is a detailed breakdown of your performance.
            </p>

          </div>
        </section>

        {/* =========================================
            SCORE HERO
        ========================================= */}

        <section className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative grid items-center gap-8 p-5 sm:p-7 lg:grid-cols-[270px_minmax(0,1fr)] lg:p-10">

            {/* SCORE */}

            <div className="flex justify-center">

              <ScoreCircle
                score={result.score}
                passed={performance.status === "Passed"}
              />

            </div>

            {/* INFORMATION */}

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <StatusBadge
                  type={
                    performance.status === "Passed"
                      ? "success"
                      : "danger"
                  }
                >
                  {performance.status}
                </StatusBadge>

                <StatusBadge type="neutral">
                  {performance.title}
                </StatusBadge>

              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                {performance.heading}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {performance.message}
              </p>

              {/* QUICK METRICS */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <QuickMetric
                  icon={CheckCircle2}
                  label="Correct"
                  value={`${result.correct}/${result.total}`}
                  iconClass="text-success"
                />

                <QuickMetric
                  icon={Clock3}
                  label="Time used"
                  value={result.timeTaken}
                  iconClass="text-primary"
                />

                <QuickMetric
                  icon={Trophy}
                  label="Rank"
                  value={`#${result.rank || "-"}`}
                  iconClass="text-warning"
                />

                <QuickMetric
                  icon={Target}
                  label="Percentile"
                  value={`${result.percentile || 0}%`}
                  iconClass="text-info"
                />

              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            STAT CARDS
        ========================================= */}

        <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={CheckCircle2}
            label="Correct Answers"
            value={result.correct}
            percentage={percentage(result.correct)}
            type="success"
          />

          <StatCard
            icon={XCircle}
            label="Wrong Answers"
            value={result.wrong}
            percentage={percentage(result.wrong)}
            type="danger"
          />

          <StatCard
            icon={MinusCircle}
            label="Skipped"
            value={result.skipped}
            percentage={percentage(result.skipped)}
            type="warning"
          />

          <StatCard
            icon={Trophy}
            label="Percentile"
            value={`${result.percentile || 0}%`}
            percentage={result.percentile || 0}
            type="primary"
          />

        </section>

        {/* =========================================
            TIME ANALYSIS
        ========================================= */}

        <section className="mb-6 grid gap-4 lg:grid-cols-3">

          <TimeCard
            icon={Clock3}
            title="Whole Test Time"
            label="Total allowed time"
            value={result.totalTime}
            description={`You used ${result.timeTaken}`}
            progress={
              result.totalTestTimeSec > 0
                ? (result.timeTakenSec /
                    result.totalTestTimeSec) *
                  100
                : 0
            }
            type="primary"
          />

          <TimeCard
            icon={TimerReset}
            title="Time Used"
            label="Actual time spent"
            value={result.timeTaken}
            description={`${result.remainingTime} remaining`}
            progress={
              result.totalTestTimeSec > 0
                ? (result.timeTakenSec /
                    result.totalTestTimeSec) *
                  100
                : 0
            }
            type="success"
          />

          <TimeCard
            icon={AlarmClock}
            title="Question Time"
            label="Allowed per question"
            value={result.perQuestionTime}
            description={`${result.late} question(s) reached the time limit`}
            progress={0}
            type="warning"
          />

        </section>

        {/* =========================================
            PERFORMANCE + SUMMARY
        ========================================= */}

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* PERFORMANCE */}

          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">

            <SectionHeader
              icon={BarChart3}
              title="Performance breakdown"
              description="See how your answers were distributed."
            />

            <div className="mt-7 space-y-6">

              <ProgressRow
                label="Correct"
                value={result.correct}
                percentage={percentage(result.correct)}
                className="bg-success"
                textClass="text-success"
              />

              <ProgressRow
                label="Wrong"
                value={result.wrong}
                percentage={percentage(result.wrong)}
                className="bg-destructive"
                textClass="text-destructive"
              />

              <ProgressRow
                label="Skipped"
                value={result.skipped}
                percentage={percentage(result.skipped)}
                className="bg-warning"
                textClass="text-warning"
              />

              <ProgressRow
                label="Late"
                value={result.late}
                percentage={percentage(result.late)}
                className="bg-primary"
                textClass="text-primary"
              />

              <ProgressRow
                label="Not visited"
                value={result.notVisited}
                percentage={percentage(result.notVisited)}
                className="bg-muted-foreground"
                textClass="text-muted-foreground"
              />

            </div>
          </section>

          {/* SUMMARY */}

          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">

            <SectionHeader
              icon={CircleAlert}
              title="Test summary"
              description="Important information about your attempt."
            />

            <div className="mt-5 divide-y divide-border">

              <SummaryRow
                label="Total questions"
                value={result.total}
              />

              <SummaryRow
                label="Correct answers"
                value={result.correct}
                valueClass="text-success"
              />

              <SummaryRow
                label="Wrong answers"
                value={result.wrong}
                valueClass="text-destructive"
              />

              <SummaryRow
                label="Skipped questions"
                value={result.skipped}
                valueClass="text-warning"
              />

              <SummaryRow
                label="Late questions"
                value={result.late}
                valueClass={
                  result.late > 0
                    ? "text-warning"
                    : "text-success"
                }
              />

              <SummaryRow
                label="Whole test time"
                value={result.totalTime}
              />

              <SummaryRow
                label="Time used"
                value={result.timeTaken}
              />

              <SummaryRow
                label="Time remaining"
                value={result.remainingTime}
              />

              <SummaryRow
                label="Time per question"
                value={result.perQuestionTime}
              />

            </div>
          </section>
        </div>

        {/* =========================================
            QUESTION ANALYSIS
        ========================================= */}

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <SectionHeader
              icon={Award}
              title="Question analysis"
              description="Review how you performed on each question."
            />

            <button
              type="button"
              onClick={reviewTest}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-muted"
            >
              Review test

              <ChevronRight className="size-4" />
            </button>

          </div>

          {/* LEGEND */}

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 rounded-2xl bg-muted/40 p-4">

            <Legend
              className="bg-success"
              label="Correct"
            />

            <Legend
              className="bg-destructive"
              label="Wrong"
            />

            <Legend
              className="bg-warning"
              label="Marked"
            />

            <Legend
              className="bg-muted-foreground/50"
              label="Skipped"
            />

            <Legend
              className="bg-muted-foreground"
              label="Not visited"
            />

            <Legend
              className="bg-primary"
              label="Late"
            />

          </div>

          {/* QUESTIONS */}

          <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14">

            {resultState?.questionStates?.map(
              (questionState, index) => {

                const questionNumber = index + 1;

                const className =
                  getQuestionStatusClass(
                    questionState
                  );

                return (
                  <button
                    key={
                      questionState?.questionId ||
                      questionNumber
                    }
                    type="button"
                    className={`relative aspect-square rounded-xl border text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-sm ${className}`}
                    aria-label={`Question ${questionNumber}`}
                  >

                    {questionState?.late && (
                      <AlarmClock className="absolute -right-1.5 -top-1.5 size-3.5 rounded-full bg-background text-primary" />
                    )}

                    {questionNumber}

                  </button>
                );
              }
            )}

          </div>
        </section>

        {/* =========================================
            FINAL CTA
        ========================================= */}

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-primary/15 bg-primary/[0.035] p-5 sm:p-7">

          <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Sparkles className="size-4 text-primary" />

                <h3 className="font-bold text-foreground">
                  Want to improve your score?
                </h3>

              </div>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Review your mistakes and retake the test when you're
                ready to improve your previous attempt.
              </p>

            </div>

            <div className="flex w-full gap-2 sm:w-auto">

              <button
                type="button"
                onClick={goDashboard}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted sm:flex-none"
              >
                <Home className="size-4" />

                Dashboard
              </button>

              <button
                type="button"
                onClick={retakeTest}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-primary/90 sm:flex-none"
              >
                <RotateCcw className="size-4" />

                Retake
              </button>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* =================================================
   FORMAT DURATION
================================================= */

function formatDuration(seconds = 0) {
  const totalSeconds = Math.max(
    0,
    Number(seconds) || 0
  );

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }

  return `${secs}s`;
}

/* =================================================
   QUESTION STATUS
================================================= */

function getQuestionStatusClass(question) {
  if (question?.notVisited) {
    return "border-muted-foreground/30 bg-muted-foreground/5 text-muted-foreground";
  }

  if (question?.skipped) {
    return "border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground";
  }

  if (question?.marked) {
    return "border-warning/20 bg-warning/10 text-warning";
  }

  if (question?.isCorrect) {
    return "border-success/20 bg-success/10 text-success";
  }

  return "border-destructive/20 bg-destructive/10 text-destructive";
}

/* =================================================
   SCORE CIRCLE
================================================= */

function ScoreCircle({ score, passed }) {
  const radius = 82;

  const circumference =
    2 * Math.PI * radius;

  const safeScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100
  );

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <div className="relative size-56 sm:size-60">

      <svg
        viewBox="0 0 200 200"
        className="-rotate-90 size-full"
      >

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          className="text-muted"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={
            passed
              ? "text-success transition-all duration-1000"
              : "text-destructive transition-all duration-1000"
          }
        />

      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-5xl font-black tracking-tight">
          {safeScore}%
        </span>

        <span className="mt-1 text-xs font-medium text-muted-foreground">
          Overall score
        </span>

      </div>
    </div>
  );
}

/* =================================================
   QUICK METRIC
================================================= */

function QuickMetric({
  icon: Icon,
  label,
  value,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-3.5">

      <Icon className={`size-4 ${iconClass}`} />

      <p className="mt-3 text-[11px] font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 truncate text-base font-bold text-foreground">
        {value}
      </p>

    </div>
  );
}

/* =================================================
   STATUS BADGE
================================================= */

function StatusBadge({ children, type }) {
  const styles = {
    success:
      "bg-success/10 text-success ring-success/20",

    danger:
      "bg-destructive/10 text-destructive ring-destructive/20",

    neutral:
      "bg-muted text-muted-foreground ring-border",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${styles[type]}`}
    >
      {children}
    </span>
  );
}

/* =================================================
   STAT CARD
================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  percentage,
  type,
}) {
  const styles = {
    success: {
      icon: "bg-success/10 text-success",
      progress: "bg-success",
    },

    danger: {
      icon: "bg-destructive/10 text-destructive",
      progress: "bg-destructive",
    },

    warning: {
      icon: "bg-warning/10 text-warning",
      progress: "bg-warning",
    },

    primary: {
      icon: "bg-primary/10 text-primary",
      progress: "bg-primary",
    },
  };

  const safePercentage = Math.min(
    Math.max(Number(percentage) || 0, 0),
    100
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between gap-3">

        <div
          className={`grid size-10 place-items-center rounded-xl ${styles[type].icon}`}
        >
          <Icon className="size-5" />
        </div>

        <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
          {safePercentage}%
        </span>

      </div>

      <p className="mt-5 text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">

        <div
          className={`h-full rounded-full ${styles[type].progress}`}
          style={{
            width: `${safePercentage}%`,
          }}
        />

      </div>
    </div>
  );
}

/* =================================================
   TIME CARD
================================================= */

function TimeCard({
  icon: Icon,
  title,
  label,
  value,
  description,
  progress,
  type = "primary",
}) {
  const styles = {
    primary: {
      icon: "bg-primary/10 text-primary",
      progress: "bg-primary",
    },

    success: {
      icon: "bg-success/10 text-success",
      progress: "bg-success",
    },

    warning: {
      icon: "bg-warning/10 text-warning",
      progress: "bg-warning",
    },
  };

  const safeProgress = Math.min(
    Math.max(Number(progress) || 0, 0),
    100
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div
          className={`grid size-11 place-items-center rounded-xl ${styles[type].icon}`}
        >
          <Icon className="size-5" />
        </div>

        {safeProgress > 0 && (
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
            {Math.round(safeProgress)}%
          </span>
        )}

      </div>

      <p className="mt-5 text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <h3 className="mt-1 text-2xl font-black tracking-tight">
        {value}
      </h3>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>

      {safeProgress > 0 && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">

          <div
            className={`h-full rounded-full ${styles[type].progress}`}
            style={{
              width: `${safeProgress}%`,
            }}
          />

        </div>
      )}
    </div>
  );
}

/* =================================================
   SECTION HEADER
================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4.5" />
      </div>

      <div>

        <h2 className="text-base font-bold tracking-tight text-foreground">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>

      </div>
    </div>
  );
}

/* =================================================
   PROGRESS ROW
================================================= */

function ProgressRow({
  label,
  value,
  percentage,
  className,
  textClass,
}) {
  const safePercentage = Math.min(
    Math.max(Number(percentage) || 0, 0),
    100
  );

  return (
    <div>

      <div className="mb-2.5 flex items-center justify-between gap-3">

        <span className="text-sm font-medium text-foreground">
          {label}
        </span>

        <span
          className={`text-xs font-bold ${textClass}`}
        >
          {value}{" "}

          <span className="font-medium text-muted-foreground">
            ({safePercentage}%)
          </span>
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">

        <div
          className={`h-full rounded-full transition-all duration-700 ${className}`}
          style={{
            width: `${safePercentage}%`,
          }}
        />

      </div>
    </div>
  );
}

/* =================================================
   SUMMARY ROW
================================================= */

function SummaryRow({
  label,
  value,
  valueClass = "text-foreground",
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">

      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span
        className={`shrink-0 text-sm font-semibold ${valueClass}`}
      >
        {value}
      </span>

    </div>
  );
}

/* =================================================
   LEGEND
================================================= */

function Legend({
  className,
  label,
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`size-2.5 rounded-full ${className}`}
      />

      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>

    </div>
  );
}

/* =================================================
   LOADING SKELETON
================================================= */

function ResultSkeleton() {
  return (
    <main className="min-h-screen bg-background">

      <header className="border-b border-border">

        <div className="mx-auto h-16 max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">

          <div className="flex h-full items-center justify-between">

            <div className="h-9 w-24 rounded-xl bg-muted" />

            <div className="h-9 w-28 rounded-xl bg-muted" />

          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">

        <div className="h-4 w-24 rounded bg-muted" />

        <div className="mt-4 h-10 w-80 max-w-full rounded-xl bg-muted" />

        <div className="mt-3 h-4 w-96 max-w-full rounded bg-muted" />

        <div className="mt-8 h-80 rounded-3xl bg-muted" />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 rounded-3xl bg-muted"
            />
          ))}

        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-44 rounded-3xl bg-muted"
            />
          ))}

        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="h-96 rounded-3xl bg-muted" />

          <div className="h-96 rounded-3xl bg-muted" />

        </div>

      </div>
    </main>
  );
}