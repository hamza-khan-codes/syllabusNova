

export default function StepTreaker() {
  return (
      <>
           {/* Wizard Stepper */}
                        <div className="flex items-center justify-between mb-8  mx-auto px-4">
                          <div className="flex flex-col items-center gap-2 flex-1 relative step-indicator">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10">
                              1
                            </div>
                            <span className="text-xs font-bold text-primary">Info</span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1 relative step-indicator">
                            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold z-10">
                              2
                            </div>
                            <span className="text-xs font-medium text-on-surface-variant">
                              Structure
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1 relative step-indicator">
                            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground text-on-surface-variant flex items-center justify-center font-bold z-10 border border-outline-variant">
                              3
                            </div>
                            <span className="text-xs font-medium text-on-surface-variant">
                              Settings
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1 relative step-indicator">
                            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground text-on-surface-variant flex items-center justify-center font-bold z-10 border border-outline-variant">
                              4
                            </div>
                            <span className="text-xs font-medium text-on-surface-variant">
                              Questions
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold z-10 border border-outline-variant">
                              5
                            </div>
                            <span className="text-xs font-medium text-on-surface-variant">
                              Access
                            </span>
                          </div>
                        </div>
    </>
  )
}
