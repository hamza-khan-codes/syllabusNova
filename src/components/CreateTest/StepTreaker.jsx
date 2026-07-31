import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function StepTreaker() {
  const createTest = useSelector((state) => state.createTest)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = location.pathname
    const currentStep = createTest.workflow.stepOrder?.filter((s) => {
      return s.step === createTest.workflow.currentStep
    })[0]
    console.log("currentStep",currentStep)
    
    if (!(currentStep.path === currentPath)) {
      navigate(currentStep.path, {
        replace:true
      })
    }

  },[location])


console.log(createTest)
const steps = useMemo(() => {
  let steps = [];
WORKFLOW_CREATETEST_STEPS.steps.forEach((s, index) => {
    let status = "pending";
    const step = s.step;

    if (step === createTest.workflow.currentStep) {
      status = "current";
    } else if (createTest.workflow.completed.includes(step)) {
      status = "completed";
    }
     steps.push({
      step: index + 1,
      title: step,
      status,
     });
    
});
  localStorage.setItem("createTest", JSON.stringify(createTest));
  return steps
}, [
  createTest.workflow.currentStep,
  createTest.workflow.completed,
]);
  console.log("steps ",steps)
  console.log(createTest.workflow.completed)
  
  return (
    <>
      {/* Wizard Stepper */}
      <div className="flex items-center justify-between mb-8  mx-auto px-4">

        {steps.map((step,i) => {
       return (<div className={"flex capitalize  flex-col items-center gap-2 flex-1 relative "} key={i}>
          <div className={`${step.status === "pending"? "bg-muted text-muted-foreground":step.status === "current"? "bg-primary text-primary-foreground":"text-primary-foreground bg-success"} w-10 h-10 rounded-full flex items-center justify-center font-bold z-10`}>
            {step.step}
          </div>
          <span className="text-xs font-medium ">
            {step.title}
          </span>
          </div>)
        })}

      </div>
    </>
  );
}
