
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  FlaskConical,
  GraduationCap,
  LoaderCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import MainLayout from "@/layouts/MainLayout";
import {
  getQuizzesMetaDataController,
} from "@/controllers/Quiz/QuizControllers";
import { ROUTES } from "@/constant/routes";

const TABS = ["All Tests", "Published", "Drafts", "Archived", "Rejected",  "Completed"];

const CATEGORY_ICONS = {
  Mathematics: Sparkles,
  Calculus: Sparkles,
  Physics: FlaskConical,
  Chemistry: FlaskConical,
  English: FileText,
  Computer: GraduationCap,
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

function formatDate(timestamp) {
  if (!timestamp) return "Not available";

  try {
    // Firestore Timestamp
    const date =
      typeof timestamp.toDate === "function"
        ? timestamp.toDate()
        : timestamp.seconds != null
          ? new Date(timestamp.seconds * 1000)
          : new Date(timestamp);

    if (Number.isNaN(date.getTime())) return "Not available";

    return new Intl.DateTimeFormat("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "Not available";
  }
}

function normalizeTest(item) {
  const data = item?.DATA ?? item?.data ?? item ?? {};
  const currentPath = data?.workflow?.stepOrder?.filter((s) => {
    const step = s.step
    const current = data?.workflow?.currentStep
    return step === current
  })[0].path

  return {
    id: item?.ID ?? item?.id ?? data?.id,
    title: data?.info?.title || "Untitled test",
    description: data?.info?.description || "",
    category: data?.info?.category || "Uncategorized",
    subject: data?.info?.subject || "General",
    difficulty: data?.info?.difficulty || "Not specified",
    totalQuestions: Number(data?.structure?.totalQuestions ?? 0),
    totalMarks: Number(data?.structure?.totalMarks ?? 0),
    duration: Number(
      data?.settings?.duration ??
      data?.structure?.duration ??
      0,
    ),
    status: String(data?.publish?.status || "draft").toLowerCase(),
    approvalStatus: String(
      data?.publish?.approvalStatus || "pending",
    ).toLowerCase(),
    visibility: data?.publish?.visibility || "private",
    updatedAt: data?.updatedAt ?? data?.createdAt,
    creator: data?.creator?.name || "Unknown creator",
    currentPath: currentPath || WORKFLOW_CREATETEST_STEPS.steps[0].step

  };
}

function StatusBadge({ status, type = "status" }) {
  const config =
    type === "approval"
      ? {
        pending: {
          label: "Approval Pending",
          style: "bg-warning/15 text-foreground",
        },
        approved: {
          label: "Approved",
          style: "bg-success/15 text-foreground",
        },
        rejected: {
          label: "Rejected",
          style: "bg-destructive/10 text-destructive",
        },
      }
      : {
        draft: {
          label: "Draft",
          style: "bg-primary/10 text-primary",
        },
        pending: {
          label: "Pending Review",
          style: "bg-warning/15 text-foreground",
        },
        approved: {
          label: "Approved",
          style: "bg-success/15 text-foreground",
        },
        rejected: {
          label: "Rejected",
          style: "bg-destructive/10 text-destructive",
        },
        published: {
          label: "Published",
          style: "bg-success/15 text-foreground",
        },
        archived: {
          label: "Archived",
          style: "bg-muted text-muted-foreground",
        },
        expired: {
          label: "Expired",
          style: "bg-muted text-muted-foreground",
        },
        suspended: {
          label: "Suspended",
          style: "bg-destructive/10 text-destructive",
        },
        processing: {
          label: "Processing",
          style: "bg-primary/10 text-primary",
        },
        completed: {
          label: "Completed",
          style: "bg-success/15 text-foreground",
        },
        cancelled: {
          label: "Cancelled",
          style: "bg-muted text-muted-foreground",
        },
      };

  const item = config[status] ?? {
    label: status || "Unknown",
    style: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-xs font-medium capitalize",
        item.style,
      )}
    >
      {item.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function TestCard({ test, onEdit }) {
  const Icon = CATEGORY_ICONS[test.category] || BookOpen;
  console.log("TEST ",test)

  return (
    <article className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/35 hover:shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="truncate font-semibold tracking-tight"
            title={test.title}
          >
            {test.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {test.subject} · {test.category}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEdit({ id: test.id, currentPath: test.currentPath})}
          disabled={!test.id}
          title="Edit test"
          aria-label={`Edit ${test.title}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-40"
        >
          <Pencil size={16} />
        </button>
      </div>

      {test.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {test.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
        <div>
          <p className="text-lg font-semibold">
            {test.totalQuestions}
          </p>
          <p className="text-xs text-muted-foreground">Questions</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{test.totalMarks}</p>
          <p className="text-xs text-muted-foreground">Total marks</p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-lg font-semibold">
            <Clock3 size={15} className="text-muted-foreground" />
            {test.duration}
          </p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={test.status} />
        <StatusBadge status={test.approvalStatus} type="approval" />
      </div>  

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck size={14} />
          <span className="truncate">{test.visibility}</span>
        </div>

        <p className="shrink-0 text-xs text-muted-foreground">
          Updated {formatDate(test.updatedAt)}
        </p>
      </div>
    </article>
  );
}

export default function MyTests() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [activeTab, setActiveTab] = useState("All Tests");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchTests() {
      setLoading(true);
      setError("");

      try {
        const response = await getQuizzesMetaDataController();

        // Your response is an array of { ID, DATA } objects.
        const items = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.quizzes)
              ? response.quizzes
              : [];

        const normalized = items
          .map(normalizeTest)
          .filter((test) => test.id);
        console.log("RESPONSE ", response)
        console.log("NORMALIZED :", normalizeTest)
        console.log("ITEMS :",items)
        if (!cancelled) setTests(normalized);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Could not load your tests.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTests();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => [
      "All Categories",
      ...new Set(tests.map((test) => test.category)),
    ],
    [tests],
  );

  const stats = useMemo(
    () => ({
      total: tests.length,
      published: tests.filter((test) => test.status === "published").length,
      drafts: tests.filter((test) => test.status === "draft").length,
      pending: tests.filter(
        (test) => test.approvalStatus === "pending",
      ).length,
    }),
    [tests],
  );

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tests.filter((test) => {
      const matchesTab =
        activeTab === "All Tests" ||
        (activeTab === "Published" && test.status === "published") ||
        (activeTab === "Drafts" && test.status === "draft") ||
        (activeTab === "Archived" && test.status === "archived");

      const matchesCategory =
        category === "All Categories" || test.category === category;

      const matchesSearch =
        !query ||
        [test.title, test.description, test.category, test.subject]
          .some((value) => value.toLowerCase().includes(query));

      return matchesTab && matchesCategory && matchesSearch;
    });
  }, [tests, activeTab, category, search]);

  function handleEdit({id,currentPath}) {
    console.log("ID", id)
    console.log("test :", tests)
    console.log(currentPath)
    if (id) navigate(ROUTES.CREATETEST + "/" + id + "/" + currentPath);
  }

  return (
    <MainLayout>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto w-full max-w-[1440px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Page header */}
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText size={16} />
                <span>Workspace</span>
                <span>/</span>
                <span className="text-foreground">My Tests</span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                My Tests
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Create, organize, and manage your assessments in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(ROUTES.CREATETEST)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Plus size={18} />
              Create new test
            </button>
          </header>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={FileText}
              label="Total tests"
              value={stats.total}
              description="All your assessments"
            />
            <StatCard
              icon={CheckCircle2}
              label="Published"
              value={stats.published}
              description="Available to students"
            />
            <StatCard
              icon={BookOpen}
              label="Drafts"
              value={stats.drafts}
              description="Tests still in progress"
            />
            <StatCard
              icon={Clock3}
              label="Awaiting approval"
              value={stats.pending}
              description="Submitted for review"
            />
          </section>

          {/* Test list */}
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border p-4 sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="font-semibold">Your assessments</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filteredTests.length}{" "}
                    {filteredTests.length === 1 ? "test" : "tests"} found
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 sm:min-w-64">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by title or subject..."
                      aria-label="Search tests"
                      className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-accent"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="Filter by category"
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex gap-1 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition",
                      activeTab === tab
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {tab}
                    {tab === "All Tests" && (
                      <span className="ml-2 text-xs">{stats.total}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {loading ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-muted-foreground">
                  <LoaderCircle className="animate-spin" size={28} />
                  <p className="text-sm">Loading your tests...</p>
                </div>
              ) : error ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm text-destructive">{error}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredTests.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Search size={24} />
                  </div>

                  <h3 className="mt-4 font-semibold">No tests found</h3>
                  <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                    {tests.length === 0
                      ? "You haven't created any tests yet. Create your first assessment to get started."
                      : "Try another search or change the selected filters."}
                  </p>

                  {tests.length === 0 && (
                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.CREATETEST)}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus size={16} />
                      Create your first test
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                  {filteredTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
            </div>

            {!loading && !error && filteredTests.length > 0 && (
              <footer className="border-t border-border px-4 py-3 sm:px-5">
                <p className="text-xs text-muted-foreground">
                  Showing {filteredTests.length} of {tests.length} tests
                </p>
              </footer>
            )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
