import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Search,
  FileText,
  ClipboardList,
  PlusCircle,
  HelpCircle,
  Bookmark,
  Trophy,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { Badge } from "../components/common/ui/Badge";
import useTheme from "../hooks/useTheme";
import { ROUTES } from "@/constant/routes";
import { useSelector } from "react-redux";




const nav = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutGrid },
  { to: ROUTES.EXPLOREQUIZ, label: "Explore Quizzes", icon: Search },
  { to: ROUTES.MYTESTS, label: "My Tests", icon: FileText },
  { to: ROUTES.ATTEMPTEDTESTS, label: "Attempted Tests", icon: ClipboardList },
  { to: ROUTES.CREATETEST, label: "Create Test", icon: PlusCircle },
  { to: ROUTES.MYQUESTIONS, label: "My Questions", icon: HelpCircle },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },

  { to: "/settings", label: "Settings", icon: Settings },
];

export default function  MainLayout({ children ,sidebar= true}) {
  const { theme, toggle } = useTheme();
  const {user} = useSelector((state)=>state.auth)
  const email = user?.email
  const name = user?.displayName
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      {sidebar &&<aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col border-r bg-sidebar border-sidebar-border">
        <div className="flex items-center gap-2 px-6 h-20 border-b border-sidebar-border">
          <div className="size-9 rounded-lg bg-primary/15 text-primary grid place-items-center">
            <GraduationCap className="size-5" />
          </div>

          <span className="font-bold text-lg tracking-tight">
            Syllabus Quiz
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto mt-5">
          {nav.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({isActive}) =>`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-sidebar-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-4.5" />

                <span className="flex-1">{item.label}</span>

                {item.badge && (
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15 border-0 text-[10px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* <div className="p-4">
          <div className="rounded-xl bg-linear-to-br from-primary to-violet-500 p-5 text-primary-foreground">
            <Crown className="size-6 mb-3" />

            <div className="font-semibold">Go Premium</div>

            <p className="text-xs opacity-90 mt-1 mb-4">
              Unlock all premium features and unlimited tests.
            </p>

            <Button
              variant="secondary"
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Upgrade Now
            </Button>
          </div>
        </div> */}
      </aside>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-card border-b flex items-center gap-4 px-4 lg:px-8 sticky top-0 z-50">
          <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex-1 max-w-xl relative">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <input
              placeholder="Search quizzes, topics, users or tests..."
              className="w-full h-11 pl-11 pr-16 rounded-lg bg-muted/60 border border-transparent focus:bg-card focus:border-input focus:outline-none text-sm"
            />

            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-card border rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle Theme"
              className="p-2 rounded-md hover:bg-muted text-muted-foreground"
            >
              {theme === "dark" ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>

            <button className="p-2 rounded-md hover:bg-muted text-muted-foreground relative">
              <Bell className="size-5" />

              <span className="absolute top-1 right-1 size-4 rounded-full bg-destructive text-destructive-foreground text-[10px] grid place-items-center font-semibold">
                6
              </span>
            </button>

            <div className="flex items-center gap-2 pl-2">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt={name}
                className="size-9 rounded-full object-cover"
              />

              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-semibold">{name}</div>

                <div className="text-xs text-muted-foreground">Student</div>
              </div>

              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

