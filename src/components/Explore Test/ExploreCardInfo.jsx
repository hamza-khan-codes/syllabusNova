import { ROUTES } from "@/constant/routes";
import { getQuizMetaDataController } from "@/controllers/Quiz/QuizControllers";

import {
  Award,
  BarChart3,
  Bookmark,
  CalendarDays,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock,
  Eye,
  Layers3,
  ListRestart,
  MessageSquare,
  MinusCircle,
  Play,
  Share2,
  Shuffle,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ExploreCardInfo() {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({});

  const navigate = useNavigate();
  const { quizCardId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await getQuizMetaDataController(quizCardId);

        setQuiz(response || {});
      } catch (error) {
        console.error("Failed to load quiz:", error);
      } finally {
        setLoading(false);
      }
    }

    if (quizCardId) {
      fetchData();
    }
  }, [quizCardId]);

  const info = quiz?.info || {};
  const structure = quiz?.structure || {};
  const settings = quiz?.settings || {};
  const creator = quiz?.creator || {};

  const totalQuestions = structure?.totalQuestions || 0;

  const profileLogo = useMemo(() => {
    const name = creator?.name || "User";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word?.[0] || "")
      .join("")
      .toUpperCase();
  }, [creator?.name]);

  const startQuiz = () => {
    navigate(`${ROUTES.QUIZINTERFACE}/${quizCardId}`);
  };

  const difficultyClass = {
    Easy: "bg-success/10 text-success ring-success/20",
    Medium: "bg-warning/10 text-warning ring-warning/20",
    Hard: "bg-destructive/10 text-destructive ring-destructive/20",
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
        {/* =========================================
            TOP BAR
        ========================================= */}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigate(ROUTES.EXPLORETESTS)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Explore Quizzes
                </button>
              </li>

              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />

              <li className="text-muted-foreground">
                {info?.category || "Quiz"}
              </li>

              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" />

              <li className="max-w-40 truncate font-medium text-foreground sm:max-w-none">
                {info?.title || "Quiz"}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground"
            >
              <Share2 className="size-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              type="button"
              aria-label="Bookmark quiz"
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <Bookmark className="size-4" />
            </button>
          </div>
        </div>

        {/* =========================================
            MAIN LAYOUT
        ========================================= */}

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* =======================================
              LEFT
          ======================================= */}

          <div className="min-w-0 space-y-6">
            {loading ? (
              <HeroSkeleton />
            ) : (
              <Hero
                info={info}
                creator={creator}
                profileLogo={profileLogo}
                difficultyClass={difficultyClass}
                totalQuestions={totalQuestions}
                structure={structure}
              />
            )}

            {!loading && (
              <QuizOverview
                info={info}
                structure={structure}
                settings={settings}
                onStart={startQuiz}
              />
            )}
          </div>

          {/* =======================================
              RIGHT SIDEBAR
          ======================================= */}

          <aside className="min-w-0 space-y-6">
            {loading ? (
              <SidebarSkeleton />
            ) : (
              <>
                <QuizStats />

                <QuizHighlights structure={structure} settings={settings} />

                <TopPerformers />
              </>
            )}
          </aside>
        </div>
      </div>

      {/* =========================================
          MOBILE STICKY CTA
      ========================================= */}

      {!loading && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xl xl:hidden">
          <div className="mx-auto flex max-w-3xl gap-2">
            <button
              type="button"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
            >
              Practice
            </button>

            <button
              type="button"
              onClick={startQuiz}
              className="flex-[1.5] rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* =================================================
   HERO
================================================= */

function Hero({
  info,
  creator,
  profileLogo,
  difficultyClass,
  totalQuestions,
  structure,
}) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
        {/* Content */}

        <div className="relative z-10 flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
          {/* Category + Difficulty */}

          <div className="mb-5 flex flex-wrap items-center gap-2">
            {info?.category && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                {info.category}
              </span>
            )}

            {info?.difficulty && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  difficultyClass?.[info.difficulty] ||
                  "bg-muted text-muted-foreground ring-border"
                }`}
              >
                {info.difficulty}
              </span>
            )}
          </div>

          {/* Title */}

          <h1 className="max-w-3xl break-words text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            {info?.title || "Untitled Quiz"}
          </h1>

          {/* Description */}

          <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-muted-foreground sm:text-base">
            {info?.description ||
              "Test your knowledge with this practice quiz."}
          </p>

          {/* Creator */}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-muted/60 px-3 py-2.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
                {profileLogo}
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Created by</p>

                <p className="max-w-40 truncate text-sm font-semibold text-foreground">
                  {creator?.name || "Unknown creator"}
                </p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 text-primary" />
              <span>12 Mar 2026</span>
            </div>
          </div>

          {/* Quick Stats */}

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat
              icon={CircleHelp}
              label="Questions"
              value={totalQuestions}
            />

            <MiniStat
              icon={Clock}
              label="Duration"
              value={`${structure?.duration || 0} min`}
            />

            <MiniStat
              icon={Award}
              label="Marks"
              value={structure?.totalMarks || 0}
            />

            <MiniStat
              icon={Target}
              label="Passing"
              value={`${structure?.passingPercentage || 0}%`}
            />
          </div>
        </div>

        {/* Cover */}

        <div className="relative min-h-[260px] overflow-hidden lg:min-h-[500px]">
          {info?.cover ? (
            <img
              src={info.cover}
              alt={info?.title || "Quiz cover"}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent lg:bg-gradient-to-r lg:from-card lg:via-transparent lg:to-transparent" />

          <div className="absolute bottom-5 right-5 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
            {info?.subject || "Practice Quiz"}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================
   OVERVIEW
================================================= */

function QuizOverview({ info, structure, settings, onStart }) {
  const topics = [
    "Algebra",
    "Geometry",
    "Trigonometry",
    "Statistics",
    "Mensuration",
  ];

  const features = [
    "Instant results",
    "Detailed explanations",
    "Performance analytics",
    "Leaderboard ranking",
    "Topic-wise report",
    "Practice recommendations",
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Tab */}

      <div className="border-b border-border px-5 sm:px-7">
        <div className="inline-flex border-b-2 border-primary px-2 py-4 text-sm font-semibold text-foreground">
          Overview
        </div>
      </div>

      <div className="space-y-9 p-5 sm:p-7 lg:p-8">
        {/* About */}

        <div>
          <SectionTitle
            title="About this quiz"
            description="Everything you need to know before you begin."
          />

          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            {info?.description ||
              "This quiz is designed to help you assess your understanding and improve your performance."}
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <InfoStat
            icon={CircleHelp}
            label="Questions"
            value={structure?.totalQuestions || 0}
          />

          <InfoStat
            icon={Clock}
            label="Duration"
            value={`${structure?.duration || 0} min`}
          />

          <InfoStat
            icon={Award}
            label="Total marks"
            value={structure?.totalMarks || 0}
          />

          <InfoStat
            icon={MinusCircle}
            label="Negative"
            value={structure?.negativeMarks || 0}
          />

          <InfoStat
            icon={Target}
            label="Passing"
            value={`${structure?.passingPercentage || 0}%`}
          />
        </div>

        {info?.instructions && (
          <div>
            <SectionTitle
              title="Instructions"
              description="Please read these instructions before starting the quiz."
            />

            <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4 sm:p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {info.instructions}
              </p>
            </div>
          </div>
        )}

        {/* CTA */}

        <div className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Ready to test yourself?
              </h3>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                You can review your answers before submitting.
              </p>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">


              <button
                type="button"
                onClick={onStart}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-primary/90 sm:flex-none"
              >
                <Play className="size-4 fill-current" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================
   SIDEBAR STATS
================================================= */

function QuizStats() {
  const stats = [
    {
      icon: Users,
      value: "12.4K",
      label: "Attempts",
      className: "text-info",
    },
    {
      icon: Star,
      value: "4.8",
      label: "Rating",
      className: "text-warning",
    },
    {
      icon: MessageSquare,
      value: "128",
      label: "Reviews",
      className: "text-primary",
    },
    {
      icon: TrendingUp,
      value: "Top 24%",
      label: "Average score",
      className: "text-success",
    },
    {
      icon: Bookmark,
      value: "2.3K",
      label: "Bookmarks",
      className: "text-destructive",
    },
  ];

  const progress = 50;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Quiz statistics
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          How students are engaging with this quiz.
        </p>
      </div>

      {/* Completion */}

      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-border bg-muted/40 p-4">
        <div className="relative size-[76px] shrink-0">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-border"
            />

            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-primary"
            />
          </svg>

          <span className="absolute inset-0 grid place-items-center text-sm font-bold text-foreground">
            {progress}%
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Completion rate
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Most students finish within the allotted time.
          </p>
        </div>
      </div>

      {/* Statistics Grid */}

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-muted/30 p-3.5 transition hover:border-primary/20 hover:bg-muted/50"
            >
              <Icon className={`size-4 ${stat.className}`} />

              <p className="mt-3 text-base font-bold text-foreground">
                {stat.value}
              </p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =================================================
   HIGHLIGHTS
================================================= */

function QuizHighlights({ structure, settings }) {
  const highlights = [
    {
      icon: Layers3,
      label: "Section-wise questions",
      enabled: structure?.isSectionWise,
    },
    {
      icon: Shuffle,
      label: "Shuffle questions",
      enabled: settings?.shuffleQuestions,
    },
    {
      icon: ListRestart,
      label: "Shuffle options",
      enabled: settings?.shuffleOptions,
    },
    {
      icon: Calculator,
      label: "Calculator allowed",
      enabled: settings?.calculatorAllowed,
    },
    {
      icon: Eye,
      label: "Review answers",
      enabled: settings?.allowReview,
    },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-foreground">
        Quiz highlights
      </h2>

      <div className="mt-4 divide-y divide-border">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3 py-3">
              <Icon className="size-4 shrink-0 text-muted-foreground" />

              <span className="min-w-0 flex-1 text-sm text-muted-foreground">
                {item.label}
              </span>

              {item.enabled ? (
                <CheckCircle2 className="size-4 shrink-0 text-success" />
              ) : (
                <span className="text-[11px] font-medium text-muted-foreground">
                  Off
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =================================================
   TOP PERFORMERS
================================================= */

function TopPerformers() {
  const performers = [
    ["AR", "Ali Raza", "58/60"],
    ["SK", "Sarah Khan", "57/60"],
    ["UA", "Usman Ahmed", "56/60"],
    ["AN", "Ayesha Noor", "55/60"],
  ];

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Top performers
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Highest scores in this quiz.
          </p>
        </div>

        <button className="text-xs font-semibold text-primary transition hover:text-primary/80">
          View all
        </button>
      </div>

      <div className="mt-4 space-y-1">
        {performers.map(([initials, name, score], index) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-muted/60"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
              {index + 1}
            </span>

            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
              {initials}
            </span>

            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {name}
            </span>

            <span className="shrink-0 text-xs font-bold text-primary">
              {score}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =================================================
   COMPONENTS
================================================= */

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-3">
      <Icon className="size-4 text-primary" />

      <p className="mt-2 truncate text-lg font-bold text-foreground">{value}</p>

      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function InfoStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-muted/40 p-4 text-center transition hover:bg-muted/70">
      <Icon className="mx-auto size-5 text-primary" />

      <p className="mt-2 text-[11px] text-muted-foreground">{label}</p>

      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div>
      <h2 className="text-lg font-bold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =================================================
   HERO SKELETON
================================================= */

function HeroSkeleton() {
  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
        <div className="animate-pulse p-6 sm:p-8 lg:p-10">
          <div className="h-6 w-24 rounded-full bg-muted" />

          <div className="mt-5 h-11 max-w-xl rounded-xl bg-muted" />

          <div className="mt-4 space-y-2">
            <div className="h-4 max-w-xl rounded bg-muted" />
            <div className="h-4 max-w-lg rounded bg-muted" />
            <div className="h-4 max-w-md rounded bg-muted" />
          </div>

          <div className="mt-7 h-14 w-48 rounded-2xl bg-muted" />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-20 rounded-2xl bg-muted" />
            ))}
          </div>
        </div>

        <div className="min-h-[260px] animate-pulse bg-muted lg:min-h-[500px]" />
      </div>
    </section>
  );
}

/* =================================================
   SIDEBAR SKELETON
================================================= */

function SidebarSkeleton() {
  return (
    <>
      {[1, 2, 3].map((section) => (
        <section
          key={section}
          className="animate-pulse rounded-3xl border border-border bg-card p-5 sm:p-6"
        >
          <div className="h-5 w-32 rounded bg-muted" />

          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-12 rounded-xl bg-muted" />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
