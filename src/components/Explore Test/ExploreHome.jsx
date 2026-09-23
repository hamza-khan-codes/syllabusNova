import { getQuizzesMetaDataController } from "@/controllers/Quiz/QuizControllers";
import { useEffect, useState } from "react";
import ExploreCardLoading from "./ExploreCardLoading";

import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";

export default function ExploreHome() {
  const navigate = useNavigate();

  const bgColors = [
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
    "bg-fuchsia-700",
    "bg-blue-700",
    "bg-sky-700",
    "bg-cyan-700",
    "bg-emerald-700",
    "bg-teal-700",
    "bg-slate-700",
  ];

  const getBgColor = (text = "") => {
    let hash = 0;

    for (let i = 0; i < text.length; i++) {
      hash += text.charCodeAt(i);
    }

    return bgColors[hash % bgColors.length];
  };

  const [quizzes, setQuizzes] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getQuizzesMetaDataController();

        setQuizzes(response || []);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToQuizInfo = (quizId) => {
    navigate(`${ROUTES.EXPLORECARDINFO}/${quizId}`);
  };

  const toggleBookmark = (quizId) => {
    setBookmarked((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (!search.trim()) return true;

    const info = quiz?.DATA?.info;

    const searchText = [
      info?.title,
      info?.category,
      info?.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Discover & Learn
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Quizzes
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Find practice tests, exam preparation quizzes, and community
              challenges that match your learning goals.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs shadow-sm sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users size={15} />
            </div>

            <div>
              <p className="font-bold text-foreground">
                1,234+
              </p>

              <p className="text-[10px] text-muted-foreground">
                Community quizzes
              </p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="mb-7 rounded-2xl border border-border bg-card p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quizzes, topics, or creators..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-16 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search Button */}
            <button
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            >
              <Search size={16} />
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 pr-1 text-xs font-semibold text-muted-foreground">
              <SlidersHorizontal size={15} />
              Filters
            </div>

            {[
              "All Categories",
              "All Difficulties",
              "All Types",
              "All Durations",
              "All Visibility",
            ].map((filter) => (
              <button
                key={filter}
                className="group flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
              >
                {filter}

                <ChevronDown
                  size={13}
                  className="text-muted-foreground transition group-hover:text-primary"
                />
              </button>
            ))}

            <button
              onClick={() => setSearch("")}
              className="ml-auto rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ================= TOOLBAR ================= */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-bold text-foreground">
              {loading ? "..." : filteredQuizzes.length}
            </span>{" "}
            quizzes
          </p>

          <div className="flex items-center gap-2">

            <button className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-secondary sm:flex">
              <SlidersHorizontal size={14} />
              Most Relevant

              <ChevronDown
                size={13}
                className="text-muted-foreground"
              />
            </button>

            <div className="flex overflow-hidden rounded-lg border border-border bg-card shadow-sm">

              <button className="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary">
                <Grid2X2 size={16} />
              </button>

              <button className="flex h-9 w-9 items-center justify-center text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                <List size={16} />
              </button>

            </div>
          </div>
        </div>

        {/* ================= QUIZ GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3  ">

          {/* Loading */}
          {loading &&
            quizzes.map((_, index) => (
              <ExploreCardLoading
                key={`loading-${index}`}
              />
            ))}

          {/* Quiz Cards */}
          {!loading &&
            filteredQuizzes.map((q, index) => {
              const info = q?.DATA?.info;
              const structure = q?.DATA?.structure;

              if (!info) return null;

              const isBookmarked = bookmarked.includes(q?.ID);

              return (
                <article
                  key={q?.ID || `quiz-${index}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >

                  {/* ================= COVER ================= */}
                  <div className="relative h-48 overflow-hidden">

                    {info.cover ? (
                      <img
                        src={info.cover}
                        alt={info.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center ${getBgColor(
                          info.category
                        )}`}
                      >
                        <span className="px-5 text-center text-3xl font-black tracking-tight text-white/95">
                          {info.category}
                        </span>
                      </div>
                    )}

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Category */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                        {info.category}
                      </span>
                    </div>

                    {/* Bookmark */}
                    <button
                      aria-label="Bookmark quiz"
                      onClick={() => toggleBookmark(q?.ID)}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition ${
                        isBookmarked
                          ? "bg-primary text-primary-foreground"
                          : "bg-black/30 text-white hover:bg-white hover:text-foreground"
                      }`}
                    >
                      {isBookmarked ? (
                        <Check size={16} />
                      ) : (
                        <Bookmark size={17} />
                      )}
                    </button>

                    {/* Cover Footer */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">

                      <span className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                        Practice Test
                      </span>

                      <div className="flex items-center gap-1 text-xs font-semibold text-white">
                        <Star
                          size={13}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        4.8
                      </div>
                    </div>
                  </div>

                  {/* ================= CONTENT ================= */}
                  <div className="flex min-h-[190px] flex-col p-4">

                    <div>
                      <h3 className="line-clamp-2 text-base font-bold leading-6 tracking-tight text-foreground">
                        {info.title}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {info.description ||
                          "Test your knowledge and improve your understanding with this quiz."}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">

                      <span className="flex items-center gap-1.5">
                        <CircleHelp
                          size={15}
                          className="text-primary"
                        />

                        {structure?.totalQuestions || 0}

                        <span className="hidden sm:inline">
                          Questions
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3
                          size={15}
                          className="text-primary"
                        />

                        {structure?.duration || 0} min
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        4.8
                      </span>
                    </div>

                    <div className="my-4 h-px bg-border" />

                    {/* Footer */}
                    <div className="mt-auto flex items-center gap-3">

                      {/* Creator Avatar */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {info.title
                          ?.charAt(0)
                          ?.toUpperCase() || "Q"}
                      </div>

                      {/* Creator */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-foreground">
                          Quiz Creator
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          Community quiz
                        </p>
                      </div>

                      {/* Start */}
                      <button
                        onClick={() => goToQuizInfo(q?.ID)}
                        className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-95"
                      >
                        Start Test
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {!loading && filteredQuizzes.length === 0 && (
          <div className="mt-2 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <Search
                size={24}
                className="text-muted-foreground"
              />
            </div>

            <h3 className="text-lg font-bold">
              No quizzes found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              We couldn't find any quizzes matching your search.
              Try a different keyword.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {!loading && filteredQuizzes.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-1.5">

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              <ChevronLeft size={17} />
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm">
              1
            </button>

            {[2, 3].map((page) => (
              <button
                key={page}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {page}
              </button>
            ))}

            <span className="px-1 text-muted-foreground">
              ...
            </span>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              10
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}