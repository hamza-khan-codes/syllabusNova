import React, { useMemo, useState } from "react";
import {
  Archive,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  FlaskConical,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const tests = [
  {
    id: 1,
    name: "MUET Entry Test 2026",
    description: "Complete MUET practice test...",
    category: "Entrance",
    categoryClass: "text-purple-400 bg-purple-500/10",
    icon: BookOpen,
    iconClass: "bg-purple-600/20 text-purple-400",
    questions: 110,
    duration: 120,
    status: "Published",
    updated: "2 hours ago",
    date: "May 28, 2026",
  },
  {
    id: 2,
    name: "Physics Practice Test",
    description: "Practice important concepts...",
    category: "Physics",
    categoryClass: "text-green-400 bg-green-500/10",
    icon: FlaskConical,
    iconClass: "bg-emerald-500/20 text-emerald-400",
    questions: 50,
    duration: 60,
    status: "Published",
    updated: "1 day ago",
    date: "May 27, 2026",
  },
  {
    id: 3,
    name: "Mathematics Mock Test",
    description: "Mock test for math section...",
    category: "Mathematics",
    categoryClass: "text-orange-400 bg-orange-500/10",
    icon: Sparkles,
    iconClass: "bg-orange-500/20 text-orange-400",
    questions: 80,
    duration: 90,
    status: "Draft",
    updated: "3 days ago",
    date: "May 25, 2026",
  },
  {
    id: 4,
    name: "English Language Test",
    description: "Grammar and vocabulary test...",
    category: "English",
    categoryClass: "text-blue-400 bg-blue-500/10",
    icon: FileText,
    iconClass: "bg-blue-500/20 text-blue-400",
    questions: 60,
    duration: 60,
    status: "Published",
    updated: "5 days ago",
    date: "May 23, 2026",
  },
  {
    id: 5,
    name: "Computer Basics Test",
    description: "Basic computer knowledge...",
    category: "Computer",
    categoryClass: "text-violet-400 bg-violet-500/10",
    icon: GraduationCap,
    iconClass: "bg-violet-500/20 text-violet-400",
    questions: 40,
    duration: 45,
    status: "Archived",
    updated: "1 week ago",
    date: "May 20, 2026",
  },
  {
    id: 6,
    name: "Chemistry Test",
    description: "General chemistry concepts...",
    category: "Chemistry",
    categoryClass: "text-pink-400 bg-pink-500/10",
    icon: FlaskConical,
    iconClass: "bg-pink-500/20 text-pink-400",
    questions: 55,
    duration: 60,
    status: "Draft",
    updated: "1 week ago",
    date: "May 19, 2026",
  },
];

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Explore Quizzes",
    icon: Search,
  },
  {
    label: "My Tests",
    icon: FileText,
    active: true,
  },
  {
    label: "Attempted Tests",
    icon: FolderOpen,
  },
  {
    label: "Create Test",
    icon: Plus,
  },
  {
    label: "My Questions",
    icon: ShieldCheck,
  },
  {
    label: "Bookmarks",
    icon: BookOpen,
  },
  {
    label: "Leaderboard",
    icon: BarChart3,
  },
  {
    label: "Teams",
    icon: Users,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
  {
    label: "Messages",
    icon: FileText,
    badge: "New",
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-card
        px-5 py-4
        transition
        hover:border-primary/40
        hover:bg-card/80
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex size-12 shrink-0 items-center justify-center
            rounded-xl
            bg-primary/20
            text-primary
          "
        >
          <Icon size={22} />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-2xl font-bold text-foreground">{value}</h3>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-success/10 text-success border-success/10",
    Draft: "bg-primary/10 text-primary border-primary/10",
    Archived: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-md border
        px-2.5 py-1
        text-xs font-medium
        ${styles[status]}
      `}
    >
      <span
        className={`
          size-1.5 rounded-full
          ${
            status === "Published"
              ? "bg-success"
              : status === "Draft"
                ? "bg-primary"
                : "bg-muted-foreground"
          }
        `}
      />

      {status}
    </span>
  );
}

function TestRow({ test }) {
  const Icon = test.icon;

  return (
    <div
      className="
        grid
        grid-cols-[minmax(260px,2.2fr)_1fr_0.7fr_0.7fr_0.8fr_1fr_120px]
        items-center
        gap-4
        border-t border-border
        px-5 py-4
        transition
        hover:bg-accent/30
      "
    >
      {/* Test */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex size-10 shrink-0 items-center justify-center
            rounded-lg
            ${test.iconClass}
          `}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
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
            inline-flex rounded-md
            px-2.5 py-1
            text-xs font-medium
            ${test.categoryClass}
          `}
        >
          {test.category}
        </span>
      </div>

      {/* Questions */}
      <div>
        <p className="text-sm font-semibold text-foreground">
          {test.questions}
        </p>
        <p className="text-xs text-muted-foreground">Questions</p>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-1.5 text-sm text-foreground">
        <Clock3 size={15} className="text-muted-foreground" />
        {test.duration} min
      </div>

      {/* Status */}
      <div>
        <StatusBadge status={test.status} />
      </div>

      {/* Updated */}
      <div>
        <p className="text-sm text-foreground">{test.updated}</p>

        <p className="text-xs text-muted-foreground">{test.date}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          title="Edit test"
          className="
            flex size-10 items-center justify-center
            rounded-lg
            border border-border
            bg-card
            text-primary
            transition
            hover:border-primary/50
            hover:bg-primary/10
          "
        >
          <Pencil size={16} />
        </button>

        <button
          title="View analytics"
          className="
            flex size-10 items-center justify-center
            rounded-lg
            border border-border
            bg-card
            text-primary
            transition
            hover:border-primary/50
            hover:bg-primary/10
          "
        >
          <BarChart3 size={16} />
        </button>

        <button
          title="More options"
          className="
            flex size-10 items-center justify-center
            rounded-lg
            border border-border
            bg-card
            text-muted-foreground
            transition
            hover:bg-accent
            hover:text-foreground
          "
        >
          <MoreVertical size={17} />
        </button>
      </div>
    </div>
  );
}




export default function MyTests() {
  const [activeTab, setActiveTab] = useState("All Tests");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");

  const tabs = ["All Tests", "Published", "Drafts", "Archived"];

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchCategory = category.includes(test.category) || category.includes("All Categorie")

      const matchTabs = activeTab.includes(test.status) || activeTab.includes("All Tests")

      const matchSearch = test.name.toLocaleLowerCase().replace(/s$/, "").includes(search.toLocaleLowerCase().replace(/s$/, "")) || search.toLocaleLowerCase().replace(/s$/, "") === ""

      return matchCategory && matchTabs && matchSearch
    });
  }, [activeTab, category, search]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main className="">
          <div className="p-5 sm:p-6 lg:p-8">
            {/* ==================================
              Page Header
          ================================== */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  My Tests
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  View, manage and analyze all the tests you have created.
                </p>
              </div>

              <button
                className="
                inline-flex items-center justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5 py-3
                text-sm font-semibold
                text-primary-foreground
                shadow-lg
                shadow-primary/20
                transition
                hover:bg-primary/90
                hover:shadow-primary/30
              "
              >
                <Plus size={18} />
                Create New Test
              </button>
            </div>

            {/* ==================================
              Stats
          ================================== */}
            <div
              className="
              mb-6 grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
            >
              <StatCard
                icon={FileText}
                title="Total Tests"
                value={tests.length}
                description="All tests created by you"
              />

              <StatCard
                icon={Check}
                title="Published"
                value="16"
                description="Tests live for students"
              />

              <StatCard
                icon={FileText}
                title="Drafts"
                value="6"
                description="Unpublished tests"
              />

              <StatCard
                icon={Archive}
                title="Archived"
                value="2"
                description="Tests moved to archive"
              />
            </div>

            {/* ==================================
              Tests Container
          ================================== */}
            <section
              className="
              overflow-hidden
              rounded-xl
              border border-border
              bg-card
            "
            >
              {/* Tabs + Filters */}
              <div
                className="
                flex flex-col
                border-b border-border
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
              >
                {/* Tabs */}
                <div className="flex overflow-x-auto px-5">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                      relative whitespace-nowrap
                      px-4 py-5
                      text-sm font-medium
                      transition
                      ${
                        activeTab === tab
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                    >
                      {tab}

                      {activeTab === tab && (
                        <span
                          className="
                          absolute
                          bottom-0 left-0 right-0
                          h-0.5
                          bg-primary
                        "
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 px-5 pb-4 lg:pb-0">
                  {/* Category */}
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="
                      h-10
                      appearance-none
                      rounded-lg
                      border border-border
                      bg-background
                      pl-3 pr-9
                      text-sm
                      text-foreground
                      outline-none
                      focus:border-primary
                    "
                    >
                      <option>All Categories</option>
                      {
                        tests.map((test)=><option>{test.category}</option>)
                      }
                    </select>

                    <ChevronDown
                      size={15}
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
                    className="
                    flex h-10
                    items-center gap-2
                    rounded-lg
                    border border-border
                    bg-background
                    px-3
                    text-sm
                    text-foreground
                    hover:bg-accent
                  "
                  >
                    <Calendar size={15} />
                    Last Updated
                    <ChevronDown size={15} />
                  </button>

                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={16}
                      className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                    "
                    />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search tests..."
                      className="
                      h-10
                      w-full
                      rounded-lg
                      border border-border
                      bg-background
                      pl-9 pr-3
                      text-sm
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      focus:border-primary
                      sm:w-55
                    "
                    />
                  </div>
                </div>
              </div>

              {/* ==================================
                Table Header
            ================================== */}

              <div
                className="
                hidden
                grid-cols-[minmax(260px,2.2fr)_1fr_0.7fr_0.7fr_0.8fr_1fr_120px]
                gap-4
                px-5 py-4
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
                xl:grid
              "
              >
                <div>Test Name</div>
                <div>Category</div>
                <div>Questions</div>
                <div>Duration</div>
                <div>Status</div>
                <div>Last Updated</div>
                <div className="text-right">Actions</div>
              </div>

              {/* ==================================
                Rows
            ================================== */}

              <div>
                {filteredTests.length > 0 ? (
                  filteredTests.map((test) => (
                    <TestRow key={test.id} test={test} />
                  ))
                ) : (
                  <div className="px-6 py-16 text-center">
                    <div
                      className="
                      mx-auto mb-4
                      flex size-14
                      items-center justify-center
                      rounded-full
                      bg-muted
                      text-muted-foreground
                    "
                    >
                      <Search size={22} />
                    </div>

                    <h3 className="font-semibold">No tests found</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing your filters or search.
                    </p>
                  </div>
                )}
              </div>

              {/* ==================================
                Footer / Pagination
            ================================== */}

              <div
                className="
                flex flex-col
                gap-4
                border-t border-border
                px-5 py-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
              >
                <p className="text-xs text-muted-foreground">
                  Showing 1 to {filteredTests.length} of 24 tests
                </p>

                <div className="flex items-center gap-2">
                  <button
                    className="
                    flex size-9 items-center justify-center
                    rounded-lg
                    border border-border
                    text-muted-foreground
                    hover:bg-accent
                    hover:text-foreground
                  "
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      className={`
                      flex size-9 items-center justify-center
                      rounded-lg
                      border
                      text-sm
                      ${
                        page === 1
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                    `}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="
                    flex size-9 items-center justify-center
                    rounded-lg
                    border border-border
                    text-muted-foreground
                    hover:bg-accent
                    hover:text-foreground
                  "
                  >
                    <ChevronRight size={16} />
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
