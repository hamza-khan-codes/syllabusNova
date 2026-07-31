import { ROUTES } from "@/constant/routes";
import { BadgeCheck, ClipboardCheck, Clock3, FilePenLine, HelpCircle, Rocket } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTestInitial() {
  const navigate = useNavigate()
  const quickStats = [
    {
      icon: <ClipboardCheck size={22} />,
      title: "Tests Created",
      value:12
    },
    {
      icon: <HelpCircle size={22} />,
      title: "Total Questions",
      value:12
    },
    {
      icon: <BadgeCheck size={22} />,
      title: "Approved",
      value:12
    },
    {
      icon: <FilePenLine size={22} />,
      title: "Draft",
      value:12
    },
  ]
  return (
    <>
      <main className="flex-1 overflow-y-auto px-margin-desktop py-6">
        <div className="max-w-container-max mx-auto space-y-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-2xl bg-primary/80 h-64 flex items-center shadow-lg shadow-primary/20">
            <div className="relative z-10 px-12 w-2/3">
              <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">
                Let's Create Your Test
              </h2>
              <p className="text-lg font-medium text-primary-foreground/90 mb-6">
                Start from a blank canvas or jumpstart your workflow with our
                professionally crafted educational templates.
              </p>
              <div className="flex gap-4">
                <button onClick={() => navigate(ROUTES.TESTINFO)} className="px-4 py-2 cursor-pointer bg-primary-foreground text-primary font-medium rounded-lg shadow-md  hover:shadow-lg transition-all active:scale-95 flex gap-2 items-center">
                  <Rocket size={18}/>
                  Start Creating
                </button>

              </div>
            </div>

          </section>
          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {quickStats.map((q, i) => {
              return (
              <div className="bg-card  p-4 rounded-xl hover-card transition-all group" key={i}>
              <div className="w-10 h-10 rounded-lg  flex items-center justify-center mb-4 bg-primary text-primary-foreground  ">
                {q.icon}
              </div>
              <div className=" font-label-xs uppercase tracking-wider mb-1">
                {q.title}
              </div>
                <div className="font-headline-sm text-card-foreground">{q.value}</div>
            </div>)})}

          </section>
          <div className="grid grid-cols-12 gap-6">
            {/* Recent Drafts */}
            <div className="col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-on-surface">
                  Recent Drafts
                </h3>
                <button className="text-primary font-label-md hover:underline flex items-center gap-2">
                  View All
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                      <th className="px-4 py-3 font-label-xs text-on-surface-variant uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-4 py-3 font-label-xs text-on-surface-variant uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 font-label-xs text-on-surface-variant uppercase tracking-wider">
                        Questions
                      </th>
                      <th className="px-4 py-3 font-label-xs text-on-surface-variant uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-4 py-3 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">
                              calculate
                            </span>
                          </div>
                          <span className="font-label-md">
                            Advanced Calculus II
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-body-sm">Mathematics</td>
                      <td className="px-4 py-3 text-body-sm">18 / 30</td>
                      <td className="px-4 py-3 text-body-sm text-on-surface-variant">
                        2 hours ago
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-primary font-label-md px-3 py-2 hover:bg-primary/5 rounded-lg transition-colors">
                          Continue
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">
                              code
                            </span>
                          </div>
                          <span className="font-label-md">
                            Data Structures &amp; Algos
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-body-sm">Comp Sci</td>
                      <td className="px-4 py-3 text-body-sm">45 / 50</td>
                      <td className="px-4 py-3 text-body-sm text-on-surface-variant">
                        Yesterday
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-primary font-label-md px-3 py-2 hover:bg-primary/5 rounded-lg transition-colors">
                          Continue
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Empty State Example (Hidden by default but structured) */}
                <div className="hidden flex-col items-center justify-center py-8 px-4 text-center">
                  <span className="material-symbols-outlined text-[64px] text-outline-variant/40 mb-4">
                    inventory_2
                  </span>
                  <p className="font-headline-md text-on-surface-variant mb-1">
                    No active drafts found
                  </p>
                  <p className="font-body-sm text-on-surface-variant mb-6">
                    Start a new project from the button above.
                  </p>
                </div>
              </div>
            </div>
            {/* Sidebar Tips & Help */}
            <div className="col-span-4 space-y-6">
              <h3 className="font-headline-md text-on-surface">
                Tips &amp; Resources
              </h3>
              <div className="bg-surface border border-outline-variant/20 rounded-2xl p-4 shadow-sm space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">
                      psychology
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface mb-1">
                      Accessibility First
                    </h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      Ensure your questions use clear, concise language to
                      maintain a high accessibility score.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-outline-variant/10 pt-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[18px]">
                      security
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface mb-1">
                      Security Matters
                    </h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      Enable "Strict Proctoring" in step 3 to prevent
                      tab-switching during exams.
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <button className="w-full py-3 bg-surface-container hover:bg-surface-container-high rounded-lg font-label-md transition-colors flex items-center justify-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined">menu_book</span>
                    Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Template Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-on-surface">
                Recommended Templates
              </h3>
              <div className="flex gap-2">
                <button className="p-2 bg-surface border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-all text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button className="p-2 bg-surface border border-outline-variant/20 rounded-lg hover:bg-surface-container transition-all text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Template Card: Math */}
              <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl hover-card transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">functions</span>
                </div>
                <h4 className="font-label-md text-on-surface mb-1">Math</h4>
                <p className="text-body-sm text-on-surface-variant mb-4">
                  Formula support &amp; graphing.
                </p>
                <button className="w-full py-2 text-primary font-label-sm border border-primary/20 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                  Use Template
                </button>
              </div>
              {/* Template Card: CS */}
              <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl hover-card transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <h4 className="font-label-md text-on-surface mb-1">Comp Sci</h4>
                <p className="text-body-sm text-on-surface-variant mb-4">
                  IDE &amp; code execution.
                </p>
                <button className="w-full py-2 text-secondary font-label-sm border border-secondary/20 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all">
                  Use Template
                </button>
              </div>
              {/* Template Card: English */}
              <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl hover-card transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h4 className="font-label-md text-on-surface mb-1">English</h4>
                <p className="text-body-sm text-on-surface-variant mb-4">
                  Essays &amp; grammar.
                </p>
                <button className="w-full py-2 text-accent font-label-sm border border-accent/20 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all">
                  Use Template
                </button>
              </div>
              {/* Template Card: Physics */}
              <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl hover-card transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">rocket</span>
                </div>
                <h4 className="font-label-md text-on-surface mb-1">Physics</h4>
                <p className="text-body-sm text-on-surface-variant mb-4">
                  Simulations &amp; units.
                </p>
                <button className="w-full py-2 text-warning font-label-sm border border-warning/20 rounded-lg hover:bg-warning hover:text-on-warning transition-all">
                  Use Template
                </button>
              </div>
              {/* Template Card: Chemistry */}
              <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl hover-card transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <h4 className="font-label-md text-on-surface mb-1">
                  Chemistry
                </h4>
                <p className="text-body-sm text-on-surface-variant mb-4">
                  Periodic table &amp; balancing.
                </p>
                <button className="w-full py-2 text-destructive font-label-sm border border-destructive/20 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all">
                  Use Template
                </button>
              </div>
            </div>
          </section>
          {/* Spacer to clear footer */}
          <div className="h-24" />
        </div>
      </main>
    </>
  );
}
