import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function StepTreaker() {
  const{info,publish
,settings,questions,
structure
  } = useSelector((state) => state.createTest)
  const location = useLocation()
  const [Status, setStatus] = useState({
    info: "current",
    structure: "pending",
    settings: "pending",
    questions: "pending",
    publish:"pending"
  })
  const turnCompleted = (condition,value) => {
    if (condition) {
      setStatus((prev) => {
        return{...prev,[value]:"completed"}
      })
    }
  }
  useEffect(() => {
    const Info = (info.title !== "") ? JSON.parse(localStorage.getItem("createTest"))?.info : info
    const structure = (info.title !== "") ? JSON.parse(localStorage.getItem("createTest"))?.info : info
   turnCompleted(Info?.title !== "","info") 
  }, [location])
  const steps = [
  {
    step: 1,
    title: "Info",
    status: Status.info,
  },
  {
    step: 2,
    title: "Structure",
    status: Status.structure,
  },
  {
    step: 3,
    title: "Settings",
    status: Status.settings,
  },
  {
    step: 4,
    title: "Questions",
    status: Status.questions,
  },
  {
    step: 5,
    title: "Publish",
    status: Status.publish,
  },
];
  return (
    <>
      {/* Wizard Stepper */}
      <div className="flex items-center justify-between mb-8  mx-auto px-4">

        {steps.map((step,i) => {
       return (<div className={"flex  flex-col items-center gap-2 flex-1 relative "} key={i}>
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
