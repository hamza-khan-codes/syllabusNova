
import { ROUTES } from "@/constant/routes";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  GraduationCap,
  Menu,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
  BookOpen,
  CircleCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const exams = [
  {
    name: "MUET",
    subtitle: "Mehran University Entry Test",
    questions: "300+",
    color: "primary",
    icon: GraduationCap,
  },
  {
    name: "ECAT",
    subtitle: "Engineering College Admission",
    questions: "400+",
    color: "info",
    icon: Brain,
  },
  {
    name: "MDCAT",
    subtitle: "Medical & Dental Admission",
    questions: "420+",
    color: "success",
    icon: ShieldCheck,
  },
  {
    name: "NTS",
    subtitle: "National Testing Service",
    questions: "250+",
    color: "warning",
    icon: Target,
  },
];

const features = [
  {
    icon: Target,
    title: "Real Exam Patterns",
    description:
      "Practice with questions designed around real admission test patterns.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Understand your performance with accuracy, speed and progress insights.",
  },
  {
    icon: Brain,
    title: "Smart Practice",
    description:
      "Focus your preparation on weak areas and improve where it matters.",
  },
  {
    icon: Zap,
    title: "Fast Learning",
    description:
      "Practice efficiently with timed tests, instant results and focused revision.",
  },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "10K+", label: "Practice Tests" },
  { value: "95%", label: "Satisfaction" },
  { value: "4.8/5", label: "Average Rating" },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in seconds and access your preparation dashboard.",
    icon: Users,
  },
  {
    number: "02",
    title: "Choose your exam",
    description: "Select MUET, ECAT, MDCAT, NTS or your target test.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Practice & test",
    description: "Attempt exam-style questions with realistic time limits.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Track progress",
    description: "Analyze your results and improve your weak areas.",
    icon: Trophy,
  },
];

const testimonials = [
  {
    name: "Ayesha Khan",
    exam: "MUET Aspirant",
    text: "SyllabusNova made my MUET preparation much easier. The practice tests feel close to the real exam.",
  },
  {
    name: "Usman Ali",
    exam: "ECAT Candidate",
    text: "The detailed analytics helped me identify my weak areas and improve my score through regular practice.",
  },
  {
    name: "Sara Ahmed",
    exam: "MDCAT Aspirant",
    text: "I can practice whenever I have time and immediately see where I need to improve.",
  },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
        <GraduationCap className="h-5 w-5 text-primary-foreground" />
      </div>

      <span className="text-lg font-bold tracking-tight">
        Syllabus<span className="text-primary">Nova</span>
      </span>
    </a>
  );
}

function SectionBadge({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Glow */}
      <div className="absolute -inset-10 rounded-full bg-primary/15 blur-3xl" />

      {/* Floating stat */}
      <div className="animate-float absolute -left-4 top-20 z-20 hidden w-36 rounded-2xl border border-border/70 bg-card/90 p-3 shadow-2xl backdrop-blur-xl lg:block">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15 text-success">
            <Check className="h-4 w-4" />
          </div>
          <span className="text-[11px] text-muted-foreground">
            Accuracy
          </span>
        </div>

        <p className="text-xl font-bold">92%</p>
        <p className="mt-1 text-[10px] text-success">
          +8.4% this week
        </p>
      </div>

      {/* Main Dashboard */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl shadow-black/30">
        {/* Dashboard header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>

            <span className="text-xs font-semibold">
              Syllabus<span className="text-primary">Nova</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden h-7 w-28 rounded-md bg-secondary sm:block" />
            <div className="h-7 w-7 rounded-full bg-primary/20" />
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-40 shrink-0 border-r border-border p-3 md:block">
            <div className="space-y-1">
              {[
                ["Dashboard", BarChart3],
                ["Practice Tests", FileCheck2],
                ["My Progress", Trophy],
                ["Study Plan", BookOpen],
              ].map(([label, Icon], index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] ${
                    index === 0
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </aside>

          {/* Dashboard content */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-4">
              <p className="text-[10px] text-muted-foreground">
                Monday, September 23
              </p>

              <h3 className="mt-1 text-base font-bold">
                Good Morning, Hamza! 👋
              </h3>
            </div>

            {/* Progress card */}
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Overall Progress
                  </p>

                  <p className="mt-1 text-2xl font-bold">72%</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-primary/20 border-t-primary text-[9px] font-bold">
                  72%
                </div>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["12", "Tests"],
                  ["8", "Day Streak"],
                  ["92%", "Accuracy"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-xs font-bold">{value}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold">
                  Start Practicing
                </p>
                <span className="text-[9px] text-primary">
                  View all
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Logical Reasoning", Brain],
                  ["Verbal Ability", BookOpen],
                  ["Numerical Ability", BarChart3],
                  ["Personality Test", Target],
                ].map(([label, Icon]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background/40 p-2.5"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-medium">
                        {label}
                      </p>
                      <p className="text-[8px] text-muted-foreground">
                        5 Tests
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating performance card */}
      <div className="animate-float absolute -right-4 -top-5 hidden w-40 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-2xl backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            Performance
          </span>

          <BarChart3 className="h-4 w-4 text-primary" />
        </div>

        <div className="mt-3 flex h-12 items-end gap-1">
          {[30, 45, 38, 55, 48, 72, 88].map((height, index) => (
            <div
              key={index}
              className={`flex-1 rounded-sm ${
                index === 6 ? "bg-primary" : "bg-primary/25"
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <p className="mt-2 text-[9px] text-success">
          +18.6% improvement
        </p>
      </div>
    </div>
  );
}

export default function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex">
            {["Home", "Features", "Exams", "How It Works", "Pricing"].map(
              (item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  className={`text-sm transition-colors hover:text-primary ${
                    index === 0
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={()=>navigate(ROUTES.LOGIN)}
              className="px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">
              Log in
            </button>

            <button
              onClick={()=>navigate(ROUTES.REGISTER)}
              className="group flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-primary/30">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg border border-border p-2 md:hidden"
          >
            {mobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="space-y-1">
              {["Home", "Features", "Exams", "How It Works", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    onClick={() => setMobileMenu(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden pt-28"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24">
          {/* Hero copy */}
          <div>
            <SectionBadge>
              <Rocket className="h-3.5 w-3.5" />
              Your Success, Our Mission
            </SectionBadge>

            <h1 className="max-w-2xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Prepare Smarter.
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                Achieve More.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Prepare for MUET, ECAT, MDCAT, NTS and more with
              realistic practice tests, detailed analytics and a
              focused learning experience — all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-primary/30">
                Start Free Practice
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 text-sm font-semibold transition hover:border-primary/40 hover:bg-secondary">
                <Play className="h-4 w-4 fill-current text-primary" />
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["A", "H", "S", "M"].map((letter, index) => (
                  <div
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-bold"
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-0.5 text-warning">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Trusted by students preparing for admission tests
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <DashboardPreview />
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 divide-x divide-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-7 text-center">
              <p className="text-2xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section id="features" className="relative py-24">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionBadge>Why SyllabusNova?</SectionBadge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to{" "}
              <span className="text-primary">prepare better.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              Stop studying randomly. Build a focused preparation
              routine with tools designed around your exam goals.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXAMS
      ====================================================== */}
      <section id="exams" className="border-y border-border bg-card/20 py-24">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionBadge>Popular Exams</SectionBadge>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Practice for your{" "}
                <span className="text-primary">dream university.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Choose your target exam and start practicing with
                focused question sets.
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm font-medium text-primary">
              View all exams
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((exam) => {
              const Icon = exam.icon;

              return (
                <div
                  key={exam.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold">
                      {exam.name}
                    </h3>

                    <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">
                      {exam.subtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileCheck2 className="h-3.5 w-3.5" />
                        {exam.questions} questions
                      </div>
                    </div>

                    <button className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-xs font-semibold text-primary-foreground transition hover:opacity-90">
                      Start Practice
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionBadge>Simple Steps</SectionBadge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it <span className="text-primary">works.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Get started in a few simple steps and build a consistent
              preparation routine.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[calc(100%+4px)] top-7 hidden w-8 border-t border-dashed border-border md:block" />
                  )}

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">
                        {step.number}
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-sm font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ANALYTICS SHOWCASE
      ====================================================== */}
      <section className="relative overflow-hidden border-y border-border bg-card/20 py-24">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1100px] items-center gap-14 px-5 lg:grid-cols-2">
          <div>
            <SectionBadge>
              <BarChart3 className="h-3.5 w-3.5" />
              Know Your Performance
            </SectionBadge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Turn every test into{" "}
              <span className="text-primary">better preparation.</span>
            </h2>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              SyllabusNova gives you more than a score. Understand
              your accuracy, timing, question performance and areas
              that need more attention.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Subject and topic-wise performance",
                "Correct, incorrect and skipped questions",
                "Average time per question",
                "Progress tracking over time",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-3.5 w-3.5" />
                  </div>

                  <span className="text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics card */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Performance Overview
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  Your Progress
                </h3>
              </div>

              <button className="rounded-lg border border-border px-3 py-1.5 text-[10px] text-muted-foreground">
                Last 30 days
              </button>
            </div>

            <div className="mt-7 flex h-48 items-end gap-2 border-b border-l border-border px-3 pb-0">
              {[35, 42, 38, 55, 48, 62, 58, 72, 68, 81, 76, 91].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group relative flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-primary/25 transition group-hover:bg-primary"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ["92%", "Accuracy"],
                ["1m 12s", "Avg. Time"],
                ["+18%", "Improvement"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl bg-secondary/60 p-3"
                >
                  <p className="text-sm font-bold">{value}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionBadge>Student Stories</SectionBadge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for students who{" "}
              <span className="text-primary">want to improve.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex gap-0.5 text-warning">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  “{testimonial.text}”
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      {testimonial.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {testimonial.exam}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-5 pb-24">
        <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-primary/30 bg-primary p-8 shadow-2xl shadow-primary/20 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
                <Sparkles className="h-4 w-4" />
                Your future starts here
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Start preparing smarter today.
              </h2>

              <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                Build confidence, practice consistently and get
                closer to your university goals with SyllabusNova.
              </p>
            </div>

            <button className="group flex h-12 shrink-0 items-center gap-2 rounded-xl bg-background px-6 text-sm font-semibold text-foreground shadow-xl transition hover:-translate-y-0.5">
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-border bg-card/20">
        <div className="mx-auto max-w-[1100px] px-5 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Logo />

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Smart practice. Better results. SyllabusNova helps
                students prepare for competitive admission tests
                with confidence.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <CircleCheck className="h-4 w-4 text-success" />
                Built for students
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Platform</h3>

              <div className="mt-4 space-y-3">
                {[
                  "Practice Tests",
                  "Question Bank",
                  "Analytics",
                  "Leaderboards",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-xs text-muted-foreground transition hover:text-primary"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Company</h3>

              <div className="mt-4 space-y-3">
                {["About", "Contact", "Privacy", "Terms"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="block text-xs text-muted-foreground transition hover:text-primary"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()} SyllabusNova. All rights
              reserved.
            </p>

            <p>Smart Practice. Better Results.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

