import { ROUTES } from "@/constant/routes";
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import {
  completeStep,
  setCurrentStep,
  updateSettings,
} from "@/features/CreateTest/createTestSlices";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepTreaker from "./StepTreaker";

export default function TestSetting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createTest = useSelector((state) => state.createTest);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      allowReview: true,
      calculatorAllowed: false,
      shuffleQuestions: false,
      shuffleOptions: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const payload = data;
    const updatedCreateTest = {
      ...createTest,
      settings: {
        ...createTest.settings,
        ...payload,
      },
    };
    dispatch(updateSettings(payload));
    localStorage.setItem("createTest", JSON.stringify(updatedCreateTest));
    dispatch(setCurrentStep(WORKFLOW_CREATETEST_STEPS.steps[3].step));
    dispatch(completeStep(WORKFLOW_CREATETEST_STEPS.steps[2].step));
    navigate(ROUTES.ADDQUESTION);
  };
  return (
    <>
      <StepTreaker/>
      <form onSubmit={handleSubmit(onSubmit)} id="AddSettings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allow Review */}
          <div className="bg-muted p-6 rounded-3xl border border-outline-variant flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-primary">
                  visibility
                </span>

                <label className="relative inline-flex items-center cursor-pointer bg-background rounded-full">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("allowReview")}
                  />

                  <div
                    className="w-11 h-6 rounded-full bg-outline-variant
              peer-checked:bg-primary
              after:content-['']
              after:absolute
              after:top-0.5
              after:left-0.5
              after:h-5
              after:w-5
              after:rounded-full
              after:bg-white
              after:transition-all
              peer-checked:after:translate-x-full"
                  />
                </label>
              </div>

              <h5 className="font-bold">Allow Review</h5>

              <p className="text-xs text-on-surface-variant">
                Students can review their answers after submitting the test.
              </p>
            </div>
          </div>

          {/* Shuffle Questions */}
          <div className="bg-muted p-6 rounded-3xl border border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary">
                shuffle
              </span>

              <label className="relative inline-flex items-center cursor-pointer bg-background rounded-full">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("shuffleQuestions")}
                />

                <div className="w-11 h-6 rounded-full bg-outline-variant peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            <h5 className="font-bold">Shuffle Questions</h5>

            <p className="text-xs text-on-surface-variant">
              Display questions in a random order for each student.
            </p>
          </div>

          {/* Shuffle Options */}
          <div className="bg-muted p-6 rounded-3xl border border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary">
                swap_horiz
              </span>

              <label className="relative inline-flex items-center cursor-pointer bg-background rounded-full">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("shuffleOptions")}
                />

                <div className="w-11 h-6 rounded-full bg-outline-variant peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            <h5 className="font-bold">Shuffle Options</h5>

            <p className="text-xs text-on-surface-variant">
              Randomize the order of answer options.
            </p>
          </div>

          {/* Calculator Allowed */}
          <div className="bg-muted p-6 rounded-3xl border border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary">
                calculate
              </span>

              <label className="relative inline-flex items-center cursor-pointer bg-background rounded-full">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("calculatorAllowed")}
                />

                <div className="w-11 h-6 rounded-full bg-outline-variant peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            <h5 className="font-bold">Calculator Allowed</h5>

            <p className="text-xs text-on-surface-variant">
              Allow students to use a calculator during the test.
            </p>
          </div>
        </div>
      </form>
      <footer className="fixed  bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40 flex items-center justify-between">
        <button className="px-6 py-2 rounded-lg border border-muted-foreground hover:border-white text-muted-foreground cursor-pointer hover:text-white transition-colors flex items-center gap-2">
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            form="AddSettings"
            className="px-8 py-2.5 rounded-lg bg-success  font-bold hover:bg-success/90 cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-success/20 disabled:cursor-not-allowed disabled:scale-none disabled:bg-muted/30 disabled:text-muted-foreground disabled:border-muted-foreground text-primary-foreground  active:scale-95"
          >
            <ArrowRight size={20} className="" /> Next
          </button>
        </div>
      </footer>
    </>
  );
}
