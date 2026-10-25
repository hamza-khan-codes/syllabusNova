import {
  completeStep,
  setCurrentStep,
} from "@/features/CreateTest/createTestSlices";
import { ArrowLeft, Eye, FilePenLine, Rocket } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BottomNavigator() {
  const createTest = useSelector((state) => state.createTest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextStep = createTest.workflow.stepOrder.filter((s) => {
    return s.step === createTest.workflow.nextStep;
  })[0];

  const handleNext = () => {
    if (!createTest.workflow.nextStep) {
      console.error("Next step is not available.");
      return;
    }
    dispatch(setCurrentStep(nextStep.step));
    dispatch(completeStep(createTest.workflow.currentStep));
    console.log()
    return 
    navigate(nextStep.path);
  };
  return (
    <>
      {/* Sticky Bottom Bar */}

      <footer className="fixed hidden  bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40  items-center justify-between">
        <button className="px-6 py-2 rounded-lg border border-muted-foreground hover:border-white text-muted-foreground cursor-pointer hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={20} className=""/> Back
        </button>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-lg bg-card border border-border text-slate-200 font-medium hover:bg-border transition-colors flex items-center gap-2">
            <FilePenLine size={20} /> Save Draft
          </button>
          <button className="px-6 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors flex items-center gap-2">
            <Eye size={20} /> Preview Test
          </button>
          <button
            onClick={() => handleNext()}
            disabled={!createTest.workflow.nextStep}
            className="px-8 py-2.5 rounded-lg bg-success text-white font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-lg shadow-success/20 disabled:cursor-not-allowed disabled:scale-none disabled:bg-muted/30 disabled:text-muted-foreground disabled:border-muted-foreground"
          >
            <Rocket size={20} className="" /> Publish Test
          </button>
        </div>
      </footer>
    </>
  );
}
