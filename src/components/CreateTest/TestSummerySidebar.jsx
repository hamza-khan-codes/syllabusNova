import { SIDEBARCONDITIONS } from "@/constant/createTest/sidebarConditions";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function TestSummerySidebar() {
  const location = useLocation()
  const createTest = useSelector((state) => state.createTest)
  const currentPath = createTest.workflow.stepOrder.filter((s) => {
    return s.path === location.pathname
  })
  const {publish} = SIDEBARCONDITIONS

  console.log("current Path :",currentPath)
  return (
    <>
      {/* Right Sidebar*/}
      <aside className={`${!publish.sidebar && "hidden"} w-full md:w-80 space-y-6`}>
        <div className=" space-y-6">
          <div className="w-full space-y-6 xl:w-80">
                  <div className="sticky top-24 rounded-2xl border border-primary/30 bg-card p-6 shadow-lg">
                    <h3 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        analytics
                      </span>
                      Test Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-background/80 p-3">
                        <span className="text-sm text-muted-foreground">
                          Total Questions
                        </span>
                        <span className="text-lg font-semibold text-primary">
                          0
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-background/80 p-3">
                        <span className="text-sm text-muted-foreground">
                          Total Marks
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          0
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-background/80 p-3">
                        <span className="text-sm text-muted-foreground">
                          Passing Marks
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          0
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-background/80 p-3">
                        <span className="text-sm text-muted-foreground">
                          Duration
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-semibold text-foreground">
                            0
                          </span>
                          <span className="text-xs text-muted-foreground">
                            mins
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/10 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-primary">
                          info
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Quick Note
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        These values will update automatically as you add
                        sections and questions in the next steps.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Shortcuts
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Save Progress
                        </span>
                        <span className="rounded border border-border bg-secondary/80 px-2 py-1 text-[10px] font-mono text-foreground">
                          ⌘ S
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Next Step
                        </span>
                        <span className="rounded border border-border bg-secondary/80 px-2 py-1 text-[10px] font-mono text-foreground">
                          ⌘ Enter
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
          <div className="bg-[#111827] border border-border rounded-xl p-5" data-purpose="preview-panel">
  <div className="flex items-center gap-2 mb-4">
    <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
    <h3 className="font-bold">Question Preview</h3>
  </div>
  <p className="text-[10px] text-textMuted mb-4">
    As it will appear to students
  </p>
  <div className="text-sm space-y-4">
    <p className="font-medium">Q. What is the derivative of $x^{'{'}2{'}'}$?</p>
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-xs">
        <div className="w-4 h-4 rounded-full border border-border" />
        <span>A. x</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-brand font-medium">
        <div className="w-4 h-4 rounded-full border-2 border-brand flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-brand" />
        </div>
        <span>B. 2x</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="w-4 h-4 rounded-full border border-border" />
        <span>C. $x^{'{'}2{'}'}$</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="w-4 h-4 rounded-full border border-border" />
        <span>D. 2</span>
      </div>
    </div>
  </div>
</div>

          {/* Test Summary */}
          <div className=" border  p-6 rounded-3xl shadow-sm">
            <h4 className="font-bold text-on-surface mb-4">Test Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Sections</span>
                <span className="font-bold text-on-surface">03</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Questions</span>
                <span className="font-bold text-on-surface">60</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Total Duration</span>
                <span className="font-bold text-on-surface">115 mins</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Total Marks</span>
                <span className="font-bold text-on-surface">240</span>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">
                  Primary Subject
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    Physics
                  </span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    Math
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Validation Checklist */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm">
            <h4 className="font-bold text-on-surface mb-4">Review Checklist</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-green-600 text-lg">
                  check_circle
                </span>
                Basic info complete
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-green-600 text-lg">
                  check_circle
                </span>
                Structure defined
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-lg">
                  radio_button_unchecked
                </span>
                Questions added (0/60)
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-lg">
                  radio_button_unchecked
                </span>
                Pricing/Access set
              </li>
            </ul>
          </div>
          {/* Auto Save Status */}
          <div className="flex items-center justify-center gap-2 text-on-surface-variant py-4 px-6 bg-surface-container rounded-2xl">
            <span className="material-symbols-outlined text-sm animate-spin">
              sync
            </span>
            <span className="text-xs font-medium italic">
              Draft Saved 2 minutes ago
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
