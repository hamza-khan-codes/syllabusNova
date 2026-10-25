
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Search,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

import MainLayout from "@/layouts/MainLayout";
import { getAllResult, getUserResults } from "@/services/firestoreService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { useSelector } from "react-redux";
import { getUserResultsController } from "@/controllers/Quiz/QuizControllers";

/* =========================================================
   HELPERS
========================================================= */

function formatTime(seconds = 0) {
  const totalSeconds = Number(seconds) || 0;

  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  if (minutes === 0) {
    return `${secs}s`;
  }

  if (secs === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${secs}s`;
}

function formatDate(timestamp) {
  if (!timestamp) return "-";

  try {
    const date = timestamp?.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

function formatDateTime(timestamp) {
  if (!timestamp) return "-";

  try {
    const date = timestamp?.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
}

function getCategoryStyles(category = "") {
  const value = category.toLowerCase();

  if (value.includes("physics")) {
    return {
      className: "bg-success/10 text-success",
      iconClass: "bg-success/10 text-success",
      icon: FlaskConical,
    };
  }

  if (value.includes("chemistry")) {
    return {
      className: "bg-destructive/10 text-destructive",
      iconClass: "bg-destructive/10 text-destructive",
      icon: FlaskConical,
    };
  }

  if (value.includes("math")) {
    return {
      className: "bg-warning/10 text-warning",
      iconClass: "bg-warning/10 text-warning",
      icon: FileText,
    };
  }

  if (value.includes("computer")) {
    return {
      className: "bg-primary/10 text-primary",
      iconClass: "bg-primary/10 text-primary",
      icon: GraduationCap,
    };
  }

  if (value.includes("english")) {
    return {
      className: "bg-info/10 text-info",
      iconClass: "bg-info/10 text-info",
      icon: FileText,
    };
  }

  if (value.includes("entrance")) {
    return {
      className: "bg-primary/10 text-primary",
      iconClass: "bg-primary/10 text-primary",
      icon: BookOpen,
    };
  }

  return {
    className: "bg-primary/10 text-primary",
    iconClass: "bg-primary/10 text-primary",
    icon: BookOpen,
  };
}

/* =========================================================
   TRANSFORM FIRESTORE RESULT
========================================================= */

function transformResult(result) {
  const totalQuestions =
    result?.questionStates?.length || 0;

  const correct = Number(result?.correct?.num) || 0;
  const wrong = Number(result?.wrong?.num) || 0;
  const skipped = Number(result?.skipped?.num) || 0;
  const notVisited =
    Number(result?.notVisited?.num) || 0;

  const score = totalQuestions
    ? Math.round((correct / totalQuestions) * 100)
    : 0;

  const passingPercentage =
    Number(result?.passingPercentage) || 0;

  const status =
    score >= passingPercentage
      ? "Completed"
      : "Completed";

  const category =
    result?.testDetails?.category || "General";

  const styles = getCategoryStyles(category);

  return {
    id: result?.id,
    quizId: result?.quizId,

    name:
      result?.testDetails?.title ||
      result?.title ||
      "Untitled Test",

    description:
      result?.testDetails?.description ||
      "No description available.",

    category,

    categoryClass: styles.className,
    iconClass: styles.iconClass,
    icon: styles.icon,

    score,

    marks: `${correct} / ${totalQuestions}`,

    correct,
    wrong,
    skipped,
    notVisited,

    percentile: "-",

    timeTakenSec:
      Number(result?.timeTakenSec) || 0,

    totalTestTimeSec:
      Number(result?.totalTestTimeSec) || 0,

    timeTaken: formatTime(result?.timeTakenSec),

    duration: Math.round(
      (Number(result?.totalTestTimeSec) || 0) / 60
    ),

    attemptedOn: formatDate(result?.createdAt),

    time: formatDateTime(result?.createdAt),

    status,

    passingPercentage,

    positiveMarks:
      Number(result?.positiveMarks) || 0,

    negativeMarks:
      Number(result?.negativeMarks) || 0,

    perQuestionSeconds:
      Number(result?.perQuestionSeconds) || 0,

    questionStates:
      result?.questionStates || [],
  };
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
  valueClass = "text-foreground",
  trend,
}) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-border/70 bg-card
        p-5 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:shadow-md
      "
    >
      <div
        className="
          absolute right-0 top-0 h-20 w-20
          translate-x-8 -translate-y-8
          rounded-full bg-primary/5
        "
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`
            flex size-11 shrink-0 items-center justify-center
            rounded-xl ${iconClass}
            transition-transform duration-200
            group-hover:scale-105
          `}
        >
          <Icon size={20} strokeWidth={2} />
        </div>

        {trend && (
          <span
            className="
              inline-flex items-center gap-1
              rounded-full bg-success/10
              px-2 py-1 text-[11px]
              font-semibold text-success
            "
          >
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <h3
          className={`
            mt-1 text-2xl font-bold tracking-tight
            ${valueClass}
          `}
        >
          {value}
        </h3>

        <p className="mt-1.5 text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const completed = status === "Completed";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full
        px-2.5 py-1 text-[11px] font-semibold
        ${
          completed
            ? "bg-success/10 text-success"
            : "bg-warning/10 text-warning"
        }
      `}
    >
      <span
        className={`
          size-1.5 rounded-full
          ${completed ? "bg-success" : "bg-warning"}
        `}
      />

      {status}
    </span>
  );
}

/* =========================================================
   SCORE
========================================================= */

function Score({ score }) {
  let scoreClass = "text-success";
  let label = "Good";

  if (score >= 85) {
    scoreClass = "text-success";
    label = "Excellent";
  } else if (score < 50) {
    scoreClass = "text-destructive";
    label = "Needs work";
  } else if (score < 70) {
    scoreClass = "text-warning";
    label = "Average";
  }

  return (
    <div>
      <p className={`text-base font-bold ${scoreClass}`}>
        {score}%
      </p>

      <p className={`mt-0.5 text-[11px] ${scoreClass}`}>
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   TEST ICON
========================================================= */

function TestIcon({ test }) {
  const Icon = test.icon;

  return (
    <div
      className={`
        flex size-10 shrink-0 items-center
        justify-center rounded-xl
        ${test.iconClass}
      `}
    >
      <Icon size={19} />
    </div>
  );
}

/* =========================================================
   DESKTOP ROW
========================================================= */

function AttemptedTestRow({ test, onViewResult }) {
  return (
    <div
      className="
        group hidden items-center
        border-t border-border/60
        px-5 py-4
        transition-colors
        hover:bg-muted/30
        xl:grid
        xl:grid-cols-[minmax(260px,2fr)_0.8fr_0.65fr_0.8fr_0.75fr_0.9fr_1fr_0.8fr_44px]
        xl:gap-4
      "
    >
      {/* Test */}

      <div className="flex min-w-0 items-center gap-3">
        <TestIcon test={test} />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {test.name}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {test.description}
          </p>
        </div>
      </div>

      {/* Category */}

      <div>
        <span
          className={`
            inline-flex rounded-full
            px-2.5 py-1 text-[11px]
            font-semibold
            ${test.categoryClass}
          `}
        >
          {test.category}
        </span>
      </div>

      {/* Score */}

      <Score score={test.score} />

      {/* Marks */}

      <div>
        <p className="text-sm font-semibold">
          {test.marks}
        </p>
      </div>

      {/* Percentile */}

      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          {test.percentile}
        </p>
      </div>

      {/* Time */}

      <div>
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <Clock3
            size={14}
            className="text-muted-foreground"
          />

          {test.timeTaken}
        </div>

        <p className="mt-0.5 text-[11px] text-muted-foreground">
          of {formatTime(test.totalTestTimeSec)}
        </p>
      </div>

      {/* Date */}

      <div>
        <p className="text-sm">
          {test.attemptedOn}
        </p>

        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {test.time}
        </p>
      </div>

      {/* Status */}

      <div>
        <StatusBadge status={test.status} />
      </div>

      {/* Action */}

      <button
        type="button"
        title="View result"
        onClick={() => onViewResult(test)}
        className="
          flex size-9 items-center justify-center
          rounded-xl border border-border
          text-muted-foreground
          transition-all
          hover:border-primary/30
          hover:bg-primary/10
          hover:text-primary
        "
      >
        <BarChart3 size={16} />
      </button>
    </div>
  );
}

/* =========================================================
   MOBILE CARD
========================================================= */

function AttemptedTestMobileCard({
  test,
  onViewResult,
}) {
  return (
    <div
      className="
        border-t border-border/60
        p-4 transition-colors
        hover:bg-muted/20
        xl:hidden
      "
    >
      <div className="flex items-start gap-3">
        <TestIcon test={test} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">
                {test.name}
              </h3>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {test.description}
              </p>
            </div>

            <StatusBadge status={test.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`
                rounded-full px-2.5 py-1
                text-[11px] font-semibold
                ${test.categoryClass}
              `}
            >
              {test.category}
            </span>

            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">
              {test.score}% score
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Score
          </p>

          <div className="mt-1">
            <Score score={test.score} />
          </div>
        </div>

        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Answers
          </p>

          <p className="mt-1 text-sm font-semibold">
            {test.marks}
          </p>
        </div>

        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Time
          </p>

          <p className="mt-1 text-sm font-semibold">
            {test.timeTaken}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={13} />
          {test.attemptedOn}
        </div>

        <button
          type="button"
          onClick={() => onViewResult(test)}
          className="
            inline-flex items-center gap-1.5
            rounded-lg border border-border
            px-3 py-1.5
            text-xs font-medium
            transition
            hover:border-primary/30
            hover:bg-primary/10
            hover:text-primary
          "
        >
          View result
          <BarChart3 size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AttemptedTests() {
const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] =
    useState("All Categories");

  const [activeStatus, setActiveStatus] =
    useState("All Status");

  const [search, setSearch] = useState("");

  /* =========================================================
     FETCH RESULTS
  ========================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getUserResultsController(user.uid)

        console.log("Results:", response);

        const transformedResults = (
          Array.isArray(response) ? response : []
        ).map(transformResult);

        setResults(transformedResults);
      } catch (error) {
        console.error(
          "Failed to fetch results:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        results.map((result) => result.category)
      ),
    ];

    return ["All Categories", ...uniqueCategories];
  }, [results]);

  /* =========================================================
     FILTER RESULTS
  ========================================================= */

  const filteredTests = useMemo(() => {
    const query = search.toLowerCase().trim();

    return results.filter((test) => {
      const categoryMatch =
        activeCategory === "All Categories" ||
        test.category === activeCategory;

      const statusMatch =
        activeStatus === "All Status" ||
        test.status === activeStatus;

      const searchMatch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query);

      return (
        categoryMatch &&
        statusMatch &&
        searchMatch
      );
    });
  }, [
    results,
    activeCategory,
    activeStatus,
    search,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const statistics = useMemo(() => {
    const totalTests = results.length;

    if (!totalTests) {
      return {
        totalTests: 0,
        averageScore: 0,
        highestScore: 0,
        highestScoreName: "-",
        totalTime: "0s",
      };
    }

    const totalScore = results.reduce(
      (sum, test) => sum + test.score,
      0
    );

    const averageScore = Math.round(
      totalScore / totalTests
    );

    const highestTest = results.reduce(
      (highest, current) =>
        current.score > highest.score
          ? current
          : highest,
      results[0]
    );

    const totalSeconds = results.reduce(
      (sum, test) =>
        sum + (test.timeTakenSec || 0),
      0
    );

    return {
      totalTests,
      averageScore,
      highestScore: highestTest?.score || 0,
      highestScoreName:
        highestTest?.name || "-",
      totalTime: formatTime(totalSeconds),
    };
  }, [results]);

  /* =========================================================
     FILTER HELPERS
  ========================================================= */

  const hasFilters =
    activeCategory !== "All Categories" ||
    activeStatus !== "All Status" ||
    search !== "";

  const clearFilters = () => {
    setActiveCategory("All Categories");
    setActiveStatus("All Status");
    setSearch("");
  };

  /* =========================================================
     VIEW RESULT
  ========================================================= */

  const handleViewResult = (test) => {
    navigate(
      `${ROUTES.RESULT}/${test.id}`
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="h-8 w-52 animate-pulse rounded-lg bg-muted" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>

            <div className="mt-6 h-[500px] animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main>
          <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span>Dashboard</span>

                    <ChevronRight size={13} />

                    <span className="text-foreground">
                      Attempted Tests
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Attempted Tests
                  </h1>

                  <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                    Track your test performance, review
                    results, and monitor your progress over
                    time.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    inline-flex h-10 items-center justify-center
                    gap-2 rounded-xl border border-border
                    bg-card px-4 text-sm font-semibold
                    shadow-sm transition
                    hover:border-primary/30
                    hover:bg-muted/50
                  "
                >
                  <Download size={16} />
                  Export Report
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* =================================================
                STAT CARDS
            ================================================= */}

            <div
              className="
                mb-6 grid grid-cols-1 gap-4
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              <StatCard
                icon={FileText}
                title="Tests Attempted"
                value={statistics.totalTests}
                description="Across all tests"
                iconClass="bg-primary/10 text-primary"
              />

              <StatCard
                icon={CheckCircle2}
                title="Average Score"
                value={`${statistics.averageScore}%`}
                description="Your overall average"
                iconClass="bg-success/10 text-success"
                valueClass="text-success"
              />

              <StatCard
                icon={Star}
                title="Highest Score"
                value={`${statistics.highestScore}%`}
                description={statistics.highestScoreName}
                iconClass="bg-info/10 text-info"
                valueClass="text-info"
              />

              <StatCard
                icon={Clock3}
                title="Total Time"
                value={statistics.totalTime}
                description="Time spent practicing"
                iconClass="bg-warning/10 text-warning"
                valueClass="text-warning"
              />
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <section
              className="
                overflow-hidden rounded-2xl
                border border-border/70
                bg-card shadow-sm
              "
            >
              {/* =================================================
                  TOOLBAR
              ================================================= */}

              <div className="border-b border-border/70 p-4 sm:p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

                  <div className="flex flex-1 flex-wrap gap-2">

                    {/* Category */}

                    <div className="relative">
                      <select
                        value={activeCategory}
                        onChange={(e) =>
                          setActiveCategory(
                            e.target.value
                          )
                        }
                        className="
                          h-10 appearance-none
                          rounded-xl border border-border
                          bg-background pl-3 pr-9
                          text-sm font-medium outline-none
                          transition
                          hover:border-primary/30
                          focus:border-primary
                          focus:ring-2
                          focus:ring-primary/10
                        "
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-muted-foreground
                        "
                      />
                    </div>

                    {/* Status */}

                    <div className="relative">
                      <select
                        value={activeStatus}
                        onChange={(e) =>
                          setActiveStatus(
                            e.target.value
                          )
                        }
                        className="
                          h-10 appearance-none
                          rounded-xl border border-border
                          bg-background pl-3 pr-9
                          text-sm font-medium outline-none
                          transition
                          hover:border-primary/30
                          focus:border-primary
                          focus:ring-2
                          focus:ring-primary/10
                        "
                      >
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>Incomplete</option>
                      </select>

                      <ChevronDown
                        size={14}
                        className="
                          pointer-events-none
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-muted-foreground
                        "
                      />
                    </div>

                    {/* Date */}

                    <button
                      type="button"
                      className="
                        flex h-10 items-center gap-2
                        rounded-xl border border-border
                        bg-background px-3
                        text-sm font-medium
                        transition
                        hover:border-primary/30
                        hover:bg-muted/50
                      "
                    >
                      <Calendar
                        size={15}
                        className="text-muted-foreground"
                      />

                      Last 30 Days

                      <ChevronDown size={14} />
                    </button>

                    {/* Clear */}

                    {hasFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="
                          inline-flex h-10 items-center
                          gap-1.5 rounded-xl px-3
                          text-xs font-semibold
                          text-muted-foreground
                          transition
                          hover:bg-muted
                          hover:text-foreground
                        "
                      >
                        <X size={14} />
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Search */}

                  <div className="relative w-full xl:w-72">
                    <Search
                      size={16}
                      className="
                        pointer-events-none
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-muted-foreground
                      "
                    />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search tests..."
                      className="
                        h-10 w-full rounded-xl
                        border border-border
                        bg-background pl-9 pr-3
                        text-sm outline-none
                        transition
                        placeholder:text-muted-foreground
                        hover:border-primary/30
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                </div>

                {/* Result count */}

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {filteredTests.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {results.length}
                    </span>{" "}
                    attempts
                  </p>
                </div>
              </div>

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <div
                className="
                  hidden border-b border-border/50
                  bg-muted/20 px-5 py-3
                  text-[10px] font-bold uppercase
                  tracking-wider text-muted-foreground
                  xl:grid
                  xl:grid-cols-[minmax(260px,2fr)_0.8fr_0.65fr_0.8fr_0.75fr_0.9fr_1fr_0.8fr_44px]
                  xl:gap-4
                "
              >
                <div>Test</div>
                <div>Category</div>
                <div>Score</div>
                <div>Answers</div>
                <div>Percentile</div>
                <div>Time</div>
                <div>Attempted</div>
                <div>Status</div>
                <div />
              </div>

              {/* =================================================
                  RESULTS
              ================================================= */}


              {filteredTests.length > 0 ? (
                <>
                  {filteredTests.map((test) => (
                    
                    <React.Fragment key={test.id}>
                      <AttemptedTestRow
                        test={test}
                        onViewResult={handleViewResult}
                      />

                      {
                        console.log(test)
                      }

                      <AttemptedTestMobileCard
                        test={test}
                        onViewResult={handleViewResult}
                      />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <div className="px-6 py-20 text-center">
                  <div
                    className="
                      mx-auto flex size-14
                      items-center justify-center
                      rounded-2xl bg-muted
                      text-muted-foreground
                    "
                  >
                    <Search size={22} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    No attempted tests found
                  </h3>

                  <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
                    We couldn't find any tests matching
                    your current filters.
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="
                        mt-4 rounded-lg
                        bg-primary px-4 py-2
                        text-xs font-semibold
                        text-primary-foreground
                        transition
                        hover:bg-primary/90
                      "
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}

              {/* =================================================
                  PAGINATION
              ================================================= */}

              <div
                className="
                  flex flex-col gap-3
                  border-t border-border/70
                  px-4 py-4
                  sm:flex-row sm:items-center
                  sm:justify-between
                "
              >
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filteredTests.length}
                  </span>{" "}
                  results
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled
                    className="
                      flex size-9 items-center
                      justify-center rounded-lg
                      border border-border
                      text-muted-foreground
                      transition
                      hover:bg-muted
                      disabled:opacity-50
                    "
                  >
                    <ChevronLeft size={15} />
                  </button>

                  <button
                    type="button"
                    className="
                      flex size-9 items-center
                      justify-center rounded-lg
                      border border-primary
                      bg-primary
                      text-xs font-semibold
                      text-primary-foreground
                      shadow-sm
                    "
                  >
                    1
                  </button>

                  <button
                    type="button"
                    disabled
                    className="
                      flex size-9 items-center
                      justify-center rounded-lg
                      border border-border
                      text-muted-foreground
                      transition
                      hover:bg-muted
                      disabled:opacity-50
                    "
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

