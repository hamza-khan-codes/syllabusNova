
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  ClipboardList,
  PlusCircle,
  HelpCircle,
  Bookmark,
  Settings,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  GraduationCap,
  PanelLeft,
  Sparkles,
} from "lucide-react";

import { Badge } from "../components/common/ui/Badge";
import useTheme from "../hooks/useTheme";
import { ROUTES } from "@/constant/routes";
import { useSelector } from "react-redux";

const nav = [
  {
    to: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    to: ROUTES.EXPLOREQUIZ,
    label: "Explore Quizzes",
    icon: LayoutGrid,
  },
  {
    to: ROUTES.MYTESTS,
    label: "My Tests",
    icon: FileText,
  },
  {
    to: ROUTES.ATTEMPTEDTESTS,
    label: "Attempted Tests",
    icon: ClipboardList,
  },
  {
    to: ROUTES.CREATETEST,
    label: "Create Test",
    icon: PlusCircle,
  },
  {
    to: ROUTES.MYQUESTIONS,
    label: "My Questions",
    icon: HelpCircle,
  },
  {
    to: "/bookmarks",
    label: "Bookmarks",
    icon: Bookmark,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MainLayout({ children, sidebar = true }) {
  const { theme, toggle } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const {User} = user


  const name = User?.name || "Student";
  const email = User?.email || "";
  const profileImage =
    User?.profileImageUrl || "https://i.pravatar.cc/80?img=12";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}
        {sidebar && (
          <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">

            {/* Brand */}
            <div className="flex h-[76px] items-center border-b border-sidebar-border px-5">
              <div className="flex items-center gap-3">
                <div className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                  <GraduationCap className="size-[21px]" />

                  <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-success ring-2 ring-sidebar" />
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-[15px] font-bold tracking-tight">
                    SyllabusNova
                  </h1>

                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    Learn. Practice. Improve.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6">
              <div className="mb-3 flex items-center justify-between px-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Workspace
                </p>
              </div>

              <div className="space-y-1">
                {nav.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5",
                          "text-[13px] font-medium transition-all duration-200",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-primary/15"
                            : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={[
                              "grid size-8 shrink-0 place-items-center rounded-lg transition-all",
                              isActive
                                ? "bg-primary-foreground/15"
                                : "bg-transparent group-hover:bg-background/70",
                            ].join(" ")}
                          >
                            <Icon
                              className={[
                                "size-[17px]",
                                isActive
                                  ? "text-sidebar-primary-foreground"
                                  : "text-muted-foreground group-hover:text-foreground",
                              ].join(" ")}
                              strokeWidth={isActive ? 2.2 : 1.8}
                            />
                          </div>

                          <span className="flex-1 truncate">
                            {item.label}
                          </span>

                          {item.badge && (
                            <Badge
                              className={[
                                "border-0 px-1.5 py-0 text-[9px]",
                                isActive
                                  ? "bg-primary-foreground/15 text-primary-foreground"
                                  : "bg-primary/10 text-primary",
                              ].join(" ")}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </nav>

            {/* Study card */}
            <div className="border-t border-sidebar-border p-3">
              <div className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-background/60 p-3.5 transition-colors hover:bg-background">
                <div className="absolute -right-5 -top-5 size-16 rounded-full bg-primary/10 blur-xl" />

                <div className="relative flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">
                      Exam Preparation
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      Keep practicing daily
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* =====================================================
            MAIN AREA
        ===================================================== */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}
          <header className="sticky top-0 z-40 h-[72px] shrink-0 border-b border-border/70 bg-card/85 backdrop-blur-xl">

            <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">

              {/* Mobile menu */}
              <button
                type="button"
                className="mr-3 grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <PanelLeft className="size-[19px]" />
              </button>

              {/* Welcome */}
              <div className="hidden sm:block">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Welcome back
                </p>

                <h2 className="mt-0.5 text-sm font-semibold tracking-tight">
                  {name}
                </h2>
              </div>

              {/* Right actions */}
              <div className="ml-auto flex items-center gap-1.5">

                {/* Theme */}
                <button
                  type="button"
                  onClick={toggle}
                  aria-label="Toggle theme"
                  className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  {theme === "dark" ? (
                    <Sun className="size-[18px]" strokeWidth={1.8} />
                  ) : (
                    <Moon className="size-[18px]" strokeWidth={1.8} />
                  )}
                </button>

                {/* Notifications */}
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative grid size-10 place-items-center rounded-xl text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <Bell className="size-[18px]" strokeWidth={1.8} />

                  <span className="absolute right-2 top-2 grid size-3.5 place-items-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground ring-2 ring-card">
                    6
                  </span>
                </button>

                <div className="mx-2 hidden h-7 w-px bg-border sm:block" />

                {/* Profile */}
                <button
                  type="button"
                  className="group flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition-all hover:bg-muted"
                >
                  <img
                    src={profileImage}
                    alt={name}
                    className="size-9 rounded-xl object-cover ring-1 ring-border"
                  />

                  <div className="hidden max-w-36 text-left leading-tight md:block">
                    <p className="truncate text-[13px] font-semibold">
                      {name}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                      {email || "Student"}
                    </p>
                  </div>

                  <ChevronDown className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-y-0.5 sm:block" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
