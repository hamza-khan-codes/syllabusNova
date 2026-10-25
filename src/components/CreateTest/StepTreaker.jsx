
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import { Check } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function StepTreaker() {
  const createTest = useSelector((state) => state.createTest);
  const location = useLocation();
  const navigate = useNavigate();

  const { currentStep, completed = [], stepOrder = [] } =
    createTest.workflow;

  const activeWorkflowStep = stepOrder.find(
    (step) => step.step === currentStep
  );

  // Keep URL synced with workflow
  useEffect(() => {
    if (!activeWorkflowStep?.path) return;
    const currentPath = location.pathname.split("/").pop();
    if (activeWorkflowStep.path !== currentPath) {
      // navigate(activeWorkflowStep.path, {
      //   replace: true,
      // });
    }
  }, [activeWorkflowStep?.path, location.pathname, navigate]);

  const steps = useMemo(() => {
    return WORKFLOW_CREATETEST_STEPS.steps.map((step, index) => {
      let status = "pending";

      if (step.step === currentStep) {
        status = "current";
      } else if (completed.includes(step.step)) {
        status = "completed";
      }

      return {
        ...step,
        number: index + 1,
        status,
      };
    });
  }, [currentStep, completed]);

  return (
    <div className="mb-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const active = step.status === "current";
          const isCompleted = step.status === "completed";

          return (
            <div
              key={step.step}
              className="relative flex items-start gap-3"
            >
              {/* Icon */}
              <div
                className={[
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : isCompleted
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? (
                  <Check size={21} strokeWidth={2.5} />
                ) : Icon ? (
                  <Icon size={21} />
                ) : (
                  <span className="text-sm font-bold">{step.number}</span>
                )}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p
                  className={[
                    "text-sm font-semibold transition-colors",
                    active || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {step.title}
                </p>

                {step.description && (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                )}

                {/* Step number */}
                <span
                  className={[
                    "mt-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground",
                  ].join(" ")}
                >
                  {step.number}
                </span>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className={[
                    "absolute left-14.5 -right-5 top-6 hidden border-t border-dashed lg:block",
                    isCompleted
                      ? "border-primary/50"
                      : "border-border",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

