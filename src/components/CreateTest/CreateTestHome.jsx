import React from "react";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardCheck,
  PlusCircle,
  CircleHelp,
  Bookmark,
  Trophy,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Sun,
  Bell,
  ChevronDown,
  FilePlus2,
  ListChecks,
  Settings2,
  Eye,
  HelpCircle,
  FolderOpen,
  Timer,
  Shuffle,
  ShieldCheck,
  BarChart4,
  CheckCircle2,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { addTestController, setQuestionsController } from "@/controllers/Create Test/createTestControllers";
import createTestInitialState from "@/features/CreateTest/createTestInitialState";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import { addQuestion } from "@/features/CreateTest/createTestSlices";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Explore Quizzes", icon: Search },
  { label: "My Tests", icon: FileText },
  { label: "Attempted Tests", icon: ClipboardCheck },
  { label: "Create Test", icon: PlusCircle, active: true },
  { label: "My Questions", icon: CircleHelp },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Leaderboard", icon: Trophy },
  { label: "Teams", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Messages", icon: MessageSquare, badge: "New" },
  { label: "Settings", icon: Settings },
];

const steps = [
  {
    number: "1",
    title: "Create",
    description:
      "Add basic details like title, category, subject and duration.",
    icon: FilePlus2,
  },
  {
    number: "2",
    title: "Add Questions",
    description:
      "Add MCQs, true/false or subjective questions easily.",
    icon: ListChecks,
  },
  {
    number: "3",
    title: "Settings",
    description:
      "Set marks, negative marking, time limit and test behavior.",
    icon: Settings2,
  },
  {
    number: "4",
    title: "Review & Publish",
    description:
      "Preview your test and publish when you're ready.",
    icon: Eye,
  },
];

const features = [
  {
    title: "Multiple Question Types",
    description:
      "Add MCQs, true/false, short answer and descriptive questions.",
    icon: HelpCircle,
    iconClass: "bg-success/10 text-success",
  },
  {
    title: "Organize with Categories",
    description:
      "Add categories and subjects to keep your tests well organized.",
    icon: FolderOpen,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    title: "Time & Marks Control",
    description:
      "Set time limit, total marks and negative marking as you prefer.",
    icon: Timer,
    iconClass: "bg-warning/10 text-warning",
  },
  {
    title: "Shuffle Questions",
    description:
      "Randomize questions and options to ensure test fairness.",
    icon: Shuffle,
    iconClass: "bg-info/10 text-info",
  },
  {
    title: "Detailed Analytics",
    description:
      "Track performance with in-depth reports and insights.",
    icon: BarChart4,
    iconClass: "bg-info/10 text-info",
  },
  {
    title: "Secure & Reliable",
    description:
      "Your tests are safe, secure and available anytime.",
    icon: ShieldCheck,
    iconClass: "bg-destructive/10 text-destructive",
  },
];

const benefits = [
  {
    title: "Assess knowledge effectively",
    description:
      "Create tests tailored to your learning goals.",
  },
  {
    title: "Practice smarter",
    description:
      "Focus on weak areas and improve results.",
  },
  {
    title: "Share and collaborate",
    description:
      "Publish and share with others or your team.",
  },
  {
    title: "Build your question bank",
    description:
      "Save questions for future use and reuse.",
  },
];

export default function CreateTestHome() {
  const navigate = useNavigate()

  const handleCreateTest = async () => {
    const toastId = toast.loading("Creating new test...")
    try {
      const {
        questions,
        ...Data
      } = createTestInitialState
      const snapShot = await addTestController(Data)
      const { id } = snapShot
      if (!id) throw new Error("Something went wrong");
      toast.success("Successfully Created!",{
        id: toastId,
      });
      navigate(id + "/" + ROUTES.TESTINFO)
    } catch (error) {
      console.error(error);
      toast.error(error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="flex min-h-screen">



        {/* =====================================================
            MAIN
        ===================================================== */}

        <div className="min-w-0 flex-1">
          {/* ===================================================
              CONTENT
          =================================================== */}

          <main className="p-5 sm:p-7 lg:p-8">

            <div className="mx-auto max-w-[1380px]">

              {/* =================================================
                  PAGE TITLE
              ================================================= */}

              <section
                className="
                  relative mb-6
                  flex min-h-[135px]
                  items-center
                  justify-between
                  overflow-hidden
                "
              >
                <div className="relative z-10">

                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex size-10
                        items-center justify-center
                        rounded-full
                        border-2 border-primary
                        text-primary
                      "
                    >
                      <PlusCircle size={25} />
                    </div>

                    <h1
                      className="
                        text-3xl font-bold
                        tracking-tight
                        sm:text-4xl
                      "
                    >
                      Create Test
                    </h1>
                  </div>

                  <p
                    className="
                      mt-3 text-sm
                      text-muted-foreground
                      sm:text-base
                    "
                  >
                    Create high-quality tests in just a few
                    simple steps.
                  </p>

                  <p
                    className="
                      mt-1 text-sm
                      text-muted-foreground
                      sm:text-base
                    "
                  >
                    Design, add questions, configure settings
                    and publish.
                  </p>
                </div>

                {/* Illustration */}

                <div
                  className="
                    hidden pr-12
                    text-primary/40
                    lg:block
                  "
                >
                  <div className="relative">

                    <div
                      className="
                        absolute inset-0
                        rounded-full
                        bg-primary/10
                        blur-3xl
                      "
                    />

                    <div
                      className="
                        relative flex
                        items-center gap-[-10px]
                      "
                    >
                      <FileText
                        size={85}
                        strokeWidth={1}
                        className="text-primary/50"
                      />

                      <ClipboardCheck
                        size={105}
                        strokeWidth={1}
                        className="
                          -ml-8
                          text-primary
                        "
                      />

                      <PlusCircle
                        size={35}
                        className="
                          -ml-5
                          mt-14
                          text-primary
                        "
                      />
                    </div>

                  </div>
                </div>
              </section>


              {/* =================================================
                  STEPS
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border border-border
                  bg-card
                  p-5 sm:p-6
                "
              >
                <div
                  className="
                    grid grid-cols-1
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                  "
                >
                  {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.number}
                        className="
                          relative flex gap-4
                          xl:border-r xl:border-border
                          xl:pr-6
                          last:border-r-0
                        "
                      >

                        <div className="shrink-0">

                          <div
                            className="
                              flex size-12
                              items-center justify-center
                              rounded-full
                              bg-primary/15
                              text-primary
                            "
                          >
                            <Icon size={22} />
                          </div>

                          <div
                            className="
                              mx-auto mt-2
                              flex size-7
                              items-center justify-center
                              rounded-full
                              bg-primary
                              text-xs font-bold
                              text-primary-foreground
                            "
                          >
                            {step.number}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {step.title}
                          </h3>

                          <p
                            className="
                              mt-2 text-xs
                              leading-5
                              text-muted-foreground
                            "
                          >
                            {step.description}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>


              {/* =================================================
                  INFORMATION CARDS
              ================================================= */}

              <section
                className="
                  mt-5 grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-[1.1fr_0.9fr]
                "
              >

                {/* What you can do */}

                <div
                  className="
                    rounded-2xl
                    border border-border
                    bg-card
                    p-5
                  "
                >
                  <div className="mb-5 flex items-center gap-3">

                    <div
                      className="
                        flex size-8
                        items-center justify-center
                        rounded-lg
                        bg-primary
                        text-primary-foreground
                      "
                    >
                      <Bookmark size={17} />
                    </div>

                    <h2 className="text-lg font-semibold">
                      What you can do
                    </h2>

                  </div>

                  <div
                    className="
                      grid grid-cols-1
                      gap-5
                      sm:grid-cols-2
                    "
                  >
                    {features.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <div
                          key={feature.title}
                          className="
                            flex gap-3
                            border-b border-border
                            pb-4
                            last:border-0
                            sm:last:border-b
                          "
                        >
                          <div
                            className={`
                              flex size-11 shrink-0
                              items-center justify-center
                              rounded-xl
                              ${feature.iconClass}
                            `}
                          >
                            <Icon size={21} />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold">
                              {feature.title}
                            </h3>

                            <p
                              className="
                                mt-1 text-xs
                                leading-5
                                text-muted-foreground
                              "
                            >
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


                {/* Why create */}

                <div
                  className="
                    relative overflow-hidden
                    rounded-2xl
                    border border-border
                    bg-card
                    p-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex size-8
                        items-center justify-center
                        rounded-lg
                        bg-primary
                        text-primary-foreground
                      "
                    >
                      <Star size={17} />
                    </div>

                    <h2 className="text-lg font-semibold">
                      Why create your own test?
                    </h2>

                  </div>

                  <div className="mt-6 space-y-5">

                    {benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="flex gap-3"
                      >

                        <CheckCircle2
                          size={21}
                          className="
                            mt-0.5 shrink-0
                            text-primary
                          "
                        />

                        <div>
                          <h3 className="text-sm font-semibold">
                            {benefit.title}
                          </h3>

                          <p
                            className="
                              mt-1 text-xs
                              text-muted-foreground
                            "
                          >
                            {benefit.description}
                          </p>
                        </div>

                      </div>
                    ))}

                  </div>

                  {/* Decorative trophy */}

                  <div
                    className="
                      pointer-events-none
                      absolute bottom-3 right-5
                      hidden opacity-10
                      lg:block
                    "
                  >
                    <Trophy size={150} />
                  </div>
                </div>
              </section>


              {/* =================================================
                  CTA
              ================================================= */}

              <section
                className="
                  relative mt-5
                  overflow-hidden
                  rounded-2xl
                  border border-primary/50
                  bg-card
                  p-6
                  sm:p-7
                "
              >
                {/* Background glow */}

                <div
                  className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-52 rounded-full
                    bg-primary/10 blur-3xl
                  "
                />

                <div
                  className="
                    relative z-10
                    flex flex-col gap-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  "
                >

                  {/* CTA left */}

                  <div className="flex items-center gap-5">

                    <div
                      className="
                        hidden size-16
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-primary/15
                        text-primary
                        sm:flex
                      "
                    >
                      <FilePlus2 size={30} />
                    </div>

                    <div>
                      <h2
                        className="
                          text-xl
                          font-semibold
                        "
                      >
                        Ready to create something amazing?
                      </h2>

                      <p
                        className="
                          mt-1 max-w-[560px]
                          text-sm
                          leading-6
                          text-muted-foreground
                        "
                      >
                        Start building your test now and
                        empower learners with quality
                        assessments.
                      </p>
                    </div>

                  </div>


                  {/* CTA right */}

                  <div className="shrink-0">

                    <button
                      onClick={handleCreateTest}
                      className="
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-7 py-3.5
                        text-sm font-semibold
                        text-primary-foreground
                        shadow-lg
                        shadow-primary/20
                        transition-all
                        hover:-translate-y-0.5
                        hover:shadow-xl
                        hover:shadow-primary/30
                        sm:w-auto
                      "
                    >
                      <PlusCircle size={19} />
                      Create New Test
                    </button>

                    <p
                      className="
                        mt-2 text-center
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      🔒 Your tests are saved as drafts
                      automatically.
                    </p>

                  </div>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}