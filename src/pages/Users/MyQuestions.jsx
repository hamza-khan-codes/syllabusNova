import React, { useMemo, useState } from "react";
import {
  Archive,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit3,
  FileText,
  Filter,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

/* =========================================================
   QUESTIONS DATA
========================================================= */

const questions = [
  {
    id: 1,
    question: "What is the value of sin²θ + cos²θ for any angle θ?",
    subject: "Mathematics",
    subjectClass: "bg-warning/10 text-warning",
    icon: GraduationCap,
    iconClass: "bg-warning/20 text-warning",
    type: "MCQ",
    difficulty: "Easy",
    difficultyClass: "bg-success/10 text-success",
    answer: "1",
    usedIn: 4,
    status: "Approved",
    created: "May 28, 2026",
  },

  {
    id: 2,
    question:
      "Which law states that pressure and volume of a gas are inversely proportional at constant temperature?",
    subject: "Physics",
    subjectClass: "bg-success/10 text-success",
    icon: FlaskConical,
    iconClass: "bg-success/20 text-success",
    type: "MCQ",
    difficulty: "Medium",
    difficultyClass: "bg-warning/10 text-warning",
    answer: "Boyle's Law",
    usedIn: 3,
    status: "Approved",
    created: "May 27, 2026",
  },

  {
    id: 3,
    question: "Choose the correct synonym of the word 'Resilient'.",
    subject: "English",
    subjectClass: "bg-info/10 text-info",
    icon: BookOpen,
    iconClass: "bg-info/20 text-info",
    type: "MCQ",
    difficulty: "Easy",
    difficultyClass: "bg-success/10 text-success",
    answer: "Strong",
    usedIn: 2,
    status: "Approved",
    created: "May 26, 2026",
  },

  {
    id: 4,
    question: "Which data structure follows the LIFO principle?",
    subject: "Computer",
    subjectClass: "bg-primary/10 text-primary",
    icon: FileText,
    iconClass: "bg-primary/20 text-primary",
    type: "MCQ",
    difficulty: "Medium",
    difficultyClass: "bg-warning/10 text-warning",
    answer: "Stack",
    usedIn: 5,
    status: "Approved",
    created: "May 25, 2026",
  },

  {
    id: 5,
    question: "What is the atomic number of Carbon?",
    subject: "Chemistry",
    subjectClass: "bg-destructive/10 text-destructive",
    icon: FlaskConical,
    iconClass: "bg-destructive/20 text-destructive",
    type: "MCQ",
    difficulty: "Easy",
    difficultyClass: "bg-success/10 text-success",
    answer: "6",
    usedIn: 2,
    status: "Draft",
    created: "May 24, 2026",
  },

  {
    id: 6,
    question: "If f(x) = 2x + 3, what is the value of f(4)?",
    subject: "Mathematics",
    subjectClass: "bg-warning/10 text-warning",
    icon: GraduationCap,
    iconClass: "bg-warning/20 text-warning",
    type: "MCQ",
    difficulty: "Easy",
    difficultyClass: "bg-success/10 text-success",
    answer: "11",
    usedIn: 1,
    status: "Pending",
    created: "May 23, 2026",
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

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
  },
  {
    label: "Attempted Tests",
    icon: FileText,
  },
  {
    label: "Create Test",
    icon: Plus,
  },
  {
    label: "My Questions",
    icon: HelpCircle,
    active: true,
  },
  {
    label: "Bookmarks",
    icon: BookOpen,
  },
  {
    label: "Leaderboard",
    icon: Star,
  },
  {
    label: "Teams",
    icon: Users,
  },
  {
    label: "Analytics",
    icon: FileText,
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

function Sidebar() {
  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-50
        hidden w-62.5
        border-r border-sidebar-border
        bg-sidebar
        lg:block
      "
    >
      {/* Logo */}

      <div
        className="
          flex h-18.5
          items-center
          border-b border-sidebar-border
          px-6
        "
      >
        <div
          className="
            mr-3 flex size-10
            items-center justify-center
            rounded-xl
            bg-primary/20
            text-primary
          "
        >
          <GraduationCap size={22} />
        </div>

        <span
          className="
            text-lg font-bold
            text-sidebar-foreground
          "
        >
          SyllabusNova
        </span>
      </div>

      {/* Navigation */}

      <nav className="space-y-1 px-4 py-7">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                flex w-full
                items-center gap-4
                rounded-xl
                px-3 py-3
                text-sm font-medium
                transition-all
                ${
                  item.active
                    ? `
                      bg-primary/20
                      text-primary
                    `
                    : `
                      text-sidebar-foreground
                      hover:bg-sidebar-accent
                      hover:text-sidebar-accent-foreground
                    `
                }
              `}
            >
              <Icon size={20} />

              <span>{item.label}</span>

              {item.badge && (
                <span
                  className="
                    ml-auto
                    rounded-full
                    bg-primary
                    px-2 py-0.5
                    text-[10px]
                    font-semibold
                    text-primary-foreground
                  "
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Premium */}

      <div className="absolute bottom-5 left-4 right-4">
        <div
          className="
            rounded-xl
            border border-primary/30
            bg-linear-to-br
            from-primary/20
            to-primary/5
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">♛</span>

            <span className="font-semibold">Unlock Premium</span>
          </div>

          <p
            className="
              mt-3
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Get advanced analytics, unlimited tests and more.
          </p>

          <button
            className="
              mt-4 w-full
              rounded-lg
              bg-primary
              px-4 py-2.5
              text-sm font-semibold
              text-primary-foreground
              transition
              hover:bg-primary/90
            "
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function Topbar() {
  return (
    <header
      className="
        fixed top-0 right-0 left-0 z-40
        h-18.5
        border-b border-border
        bg-background/90
        backdrop-blur-xl
        lg:left-62.5
      "
    >
      <div className="flex h-full items-center gap-5 px-6">
        {/* Menu */}

        <button
          className="
            hidden size-10
            items-center justify-center
            rounded-lg
            text-muted-foreground
            hover:bg-accent
            hover:text-foreground
            lg:flex
          "
        >
          <span className="text-xl">☰</span>
        </button>

        {/* Search */}

        <div className="relative max-w-150 flex-1">
          <Search
            size={18}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <input
            placeholder="
              Search quizzes, topics, users or tests...
            "
            className="
              h-11 w-full
              rounded-xl
              border border-border
              bg-card
              pl-11 pr-14
              text-sm
              text-foreground
              outline-none
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />

          <kbd
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              rounded-md
              border border-border
              bg-muted
              px-2 py-1
              text-xs
              text-muted-foreground
            "
          >
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Theme */}

          <button
            className="
              hidden size-10
              items-center justify-center
              rounded-lg
              text-xl
              text-muted-foreground
              hover:bg-accent
              sm:flex
            "
          >
            ☼
          </button>

          {/* Notification */}

          <button
            className="
              relative size-10
              rounded-lg
              text-muted-foreground
              hover:bg-accent
            "
          >
            <span className="text-xl">♧</span>

            <span
              className="
                absolute right-1 top-1
                flex size-4
                items-center justify-center
                rounded-full
                bg-destructive
                text-[9px]
                font-bold
                text-destructive-foreground
              "
            >
              6
            </span>
          </button>

          {/* User */}

          <div className="hidden items-center gap-3 sm:flex">
            <div
              className="
                flex size-10
                items-center justify-center
                rounded-full
                bg-primary/20
                text-sm font-bold
                text-primary
              "
            >
              HK
            </div>

            <div>
              <p className="text-sm font-semibold">hamza khan</p>

              <p className="text-xs text-muted-foreground">Student</p>
            </div>

            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon: Icon, title, value, description, iconClass }) {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-card
        p-5
        transition
        hover:border-primary/30
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            flex size-12 shrink-0
            items-center justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          <Icon size={22} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-2xl font-bold">{value}</h3>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    Approved: {
      className: "bg-success/10 text-success",
      dot: "bg-success",
    },

    Draft: {
      className: "bg-muted text-muted-foreground",
      dot: "bg-muted-foreground",
    },

    Pending: {
      className: "bg-warning/10 text-warning",
      dot: "bg-warning",
    },
  };

  const item = config[status];

  return (
    <span
      className={`
        inline-flex
        items-center gap-1.5
        rounded-md
        px-2.5 py-1
        text-xs font-medium
        ${item.className}
      `}
    >
      <span
        className={`
          size-1.5 rounded-full
          ${item.dot}
        `}
      />

      {status}
    </span>
  );
}

/* =========================================================
   QUESTION ROW
========================================================= */

function QuestionRow({ question }) {
  const Icon = question.icon;

  return (
    <div
      className="
        grid
        grid-cols-[minmax(320px,2.5fr)_1fr_0.7fr_0.8fr_0.8fr_0.9fr_120px]
        items-center
        gap-4
        border-t border-border
        px-5 py-4
        transition
        hover:bg-accent/20
      "
    >
      {/* Question */}

      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex size-10 shrink-0
            items-center justify-center
            rounded-lg
            ${question.iconClass}
          `}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <p
            className="
              line-clamp-2
              text-sm
              font-medium
              leading-5
              text-foreground
            "
          >
            {question.question}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Created {question.created}
          </p>
        </div>
      </div>

      {/* Subject */}

      <div>
        <span
          className={`
            inline-flex
            rounded-md
            px-2.5 py-1
            text-xs font-medium
            ${question.subjectClass}
          `}
        >
          {question.subject}
        </span>
      </div>

      {/* Type */}

      <div>
        <span
          className="
            rounded-md
            border border-border
            bg-background
            px-2.5 py-1
            text-xs
            text-muted-foreground
          "
        >
          {question.type}
        </span>
      </div>

      {/* Difficulty */}

      <div>
        <span
          className={`
            inline-flex
            rounded-md
            px-2.5 py-1
            text-xs font-medium
            ${question.difficultyClass}
          `}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Used */}

      <div>
        <p className="text-sm font-semibold">{question.usedIn}</p>

        <p className="text-xs text-muted-foreground">Tests</p>
      </div>

      {/* Status */}

      <div>
        <StatusBadge status={question.status} />
      </div>

      {/* Actions */}

      <div className="flex items-center justify-end gap-1.5">
        <button
          title="Edit question"
          className="
            flex size-9
            items-center justify-center
            rounded-lg
            border border-border
            text-primary
            transition
            hover:border-primary/50
            hover:bg-primary/10
          "
        >
          <Edit3 size={15} />
        </button>

        <button
          title="More"
          className="
            flex size-9
            items-center justify-center
            rounded-lg
            border border-border
            text-muted-foreground
            hover:bg-accent
            hover:text-foreground
          "
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function MyQuestions() {
  const [category, setCategory] = useState("All Subjects");

  const [difficulty, setDifficulty] = useState("All Difficulty");

  const [status, setStatus] = useState("All Status");

  const [search, setSearch] = useState("");

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const categoryMatch =
        category === "All Subjects" || question.subject === category;

      const difficultyMatch =
        difficulty === "All Difficulty" || question.difficulty === difficulty;

      const statusMatch = status === "All Status" || question.status === status;

      const searchMatch =
        question.question.toLowerCase().includes(search.toLowerCase()) ||
        question.subject.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && difficultyMatch && statusMatch && searchMatch;
    });
  }, [category, difficulty, status, search]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main
          className="

        "
        >
          <div className="p-5 sm:p-6 lg:p-8">
            {/* =================================================
              PAGE HEADER
          ================================================= */}

            <div
              className="
              mb-7
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
            >
              <div>
                <h1
                  className="
                  text-2xl
                  font-bold
                  tracking-tight
                  sm:text-3xl
                "
                >
                  My Questions
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage, organize and reuse your question bank.
                </p>
              </div>

              <button
                className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5 py-3
                text-sm
                font-semibold
                text-primary-foreground
                shadow-lg
                shadow-primary/20
                transition
                hover:bg-primary/90
              "
              >
                <Plus size={18} />
                Add Question
              </button>
            </div>

            {/* =================================================
              STATS
          ================================================= */}

            <div
              className="
              mb-6
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
            >
              <StatCard
                icon={HelpCircle}
                title="Total Questions"
                value="248"
                description="Questions in your bank"
                iconClass="bg-primary/20 text-primary"
              />

              <StatCard
                icon={CheckCircle2}
                title="Approved"
                value="198"
                description="Ready to use"
                iconClass="bg-success/20 text-success"
              />

              <StatCard
                icon={FileText}
                title="Drafts"
                value="32"
                description="Questions in progress"
                iconClass="bg-warning/20 text-warning"
              />

              <StatCard
                icon={Archive}
                title="Used in Tests"
                value="186"
                description="Questions already used"
                iconClass="bg-info/20 text-info"
              />
            </div>

            {/* =================================================
              QUESTION BANK
          ================================================= */}

            <section
              className="
              overflow-hidden
              rounded-xl
              border border-border
              bg-card
            "
            >
              {/* =================================================
                FILTER BAR
            ================================================= */}

              <div
                className="
                flex
                flex-col
                gap-3
                border-b border-border
                p-5
                lg:flex-row
                lg:items-center
              "
              >
                {/* Subject */}

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
                    <option>All Subjects</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>English</option>
                    <option>Computer</option>
                    <option>Chemistry</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                  />
                </div>

                {/* Difficulty */}

                <div className="relative">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="
                    h-10
                    appearance-none
                    rounded-lg
                    border border-border
                    bg-background
                    pl-3 pr-9
                    text-sm
                    outline-none
                    focus:border-primary
                  "
                  >
                    <option>All Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                  />
                </div>

                {/* Status */}

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                    h-10
                    appearance-none
                    rounded-lg
                    border border-border
                    bg-background
                    pl-3 pr-9
                    text-sm
                    outline-none
                    focus:border-primary
                  "
                  >
                    <option>All Status</option>
                    <option>Approved</option>
                    <option>Draft</option>
                    <option>Pending</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                  />
                </div>

                {/* Filter */}

                <button
                  className="
                  flex h-10
                  items-center
                  gap-2
                  rounded-lg
                  border border-border
                  bg-background
                  px-3
                  text-sm
                  text-muted-foreground
                  hover:bg-accent
                  hover:text-foreground
                "
                >
                  <Filter size={15} />
                  More Filters
                </button>

                {/* Search */}

                <div className="relative ml-auto">
                  <Search
                    size={16}
                    className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search questions..."
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
                    focus:ring-2
                    focus:ring-primary/10
                    sm:w-67.5
                  "
                  />
                </div>
              </div>

              {/* =================================================
                TABLE HEADER
            ================================================= */}

              <div
                className="
                hidden
                grid-cols-[minmax(320px,2.5fr)_1fr_0.7fr_0.8fr_0.8fr_0.9fr_120px]
                gap-4
                px-5
                py-4
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
                xl:grid
              "
              >
                <div>Question</div>

                <div>Subject</div>

                <div>Type</div>

                <div>Difficulty</div>

                <div>Used In</div>

                <div>Status</div>

                <div className="text-right">Actions</div>
              </div>

              {/* =================================================
                QUESTIONS
            ================================================= */}

              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionRow key={question.id} question={question} />
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

                  <h3 className="font-semibold">No questions found</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your filters or search.
                  </p>
                </div>
              )}

              {/* =================================================
                FOOTER
            ================================================= */}

              <div
                className="
                flex
                flex-col
                gap-4
                border-t border-border
                px-5
                py-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
              >
                <p className="text-xs text-muted-foreground">
                  Showing 1 to {filteredQuestions.length} of 248 questions
                </p>

                <div className="flex items-center gap-2">
                  <button
                    className="
                    flex size-9
                    items-center justify-center
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
                      flex size-9
                      items-center justify-center
                      rounded-lg
                      border
                      text-sm
                      ${
                        page === 1
                          ? `
                            border-primary
                            bg-primary
                            text-primary-foreground
                          `
                          : `
                            border-border
                            text-muted-foreground
                            hover:bg-accent
                            hover:text-foreground
                          `
                      }
                    `}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="
                    flex size-9
                    items-center justify-center
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
