import {
  ArrowLeft,
  ArrowLeftRight,
  BadgeMinus,
  Calculator,
  CheckCircle,
  CheckCircle2,
  CircleMinus,
  CirclePercent,
  CircleQuestionMark,
  ClipboardCheck,
  Clock,
  Eye,
  FilePenLine,
  FolderOpen,
  HandHelping,
  Info,
  LayoutPanelTop,
  Rocket,
  RocketIcon,
  Shield,
  Shuffle,
  Sparkles,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../common/ui/Badge";
import { useForm } from "react-hook-form";
import PublishTestPopPop from "./PublishTestPopPop";
import {
  resetCreateTest,
  updateCreateTest,
  updatePublish,
} from "@/features/CreateTest/createTestSlices";

import {
  addTestController,
  setQuestionsController,
} from "@/controllers/Create Test/createTestControllers";
import { Dialog } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import { PUBLIC_APPROVAL_STEPS } from "@/constant/createTest/progressLoadingMsgs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";

export default function TestPublish() {
  const [progress, setProgress] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Description, setDescription] = useState(PUBLIC_APPROVAL_STEPS);
  const createTest = useSelector((state) => state.createTest);
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      visibility: "public",
    },
  });
  const { structure } = createTest;
  const { settings } = createTest;
  const { publish } = createTest;
  console.log(createTest);
  const VALIDATION_CHECKLIST = [
    {
      id: "title",
      label: "Test title",
      completed: true,
    },
    {
      id: "description",
      label: "Description",
      completed: true,
    },
    {
      id: "category",
      label: "Category",
      completed: true,
    },
    {
      id: "structure",
      label: "Structure configured",
      completed: true,
    },
    {
      id: "questions",
      label: "Questions added",
      completed: true,
    },
    {
      id: "settings",
      label: "Settings completed",
      completed: true,
    },
  ];

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setDescription(PUBLIC_APPROVAL_STEPS[0]);
    setProgress(16.666666666666668);

    const payload = data;
    await delay(200);
    setDescription(PUBLIC_APPROVAL_STEPS[1]);
    setProgress(16.666666666666668 * 2);

    const updatedCreateTest = {
      ...createTest,
      publish: {
        ...createTest.publish,
        visibility: payload.visibility,
      },
      creator: {
        uid: auth.user.uid,
        name: auth.user.displayName,
      },
    };
    console.log("update:", updatedCreateTest);
    await delay(100);
    setDescription(PUBLIC_APPROVAL_STEPS[2]);
    setProgress(16.666666666666668 * 3);

    dispatch(updatePublish(payload));
    localStorage.setItem("createTest", JSON.stringify(updatedCreateTest));
    // Create Firestore object without workflow
    const {
      workflow,
      edit,
      error,
      loading,
      questions,
      ...saveInFireStoreTests
    } = updatedCreateTest;
    const saveInFireStoreQuestions = updatedCreateTest.questions;

    console.log("Local Storage:", updatedCreateTest);
    console.log("Firestore test:", saveInFireStoreTests);
    console.log("Firestore questions:", saveInFireStoreQuestions);
    console.log("Auth :", auth);

    try {
      const testRef = await addTestController(saveInFireStoreTests);

      await setQuestionsController(testRef.id, saveInFireStoreQuestions);

      setDescription(PUBLIC_APPROVAL_STEPS[3]);
      setProgress(16.666666666666668 * 4);

      await delay(200);
      setDescription(PUBLIC_APPROVAL_STEPS[4]);
      setProgress(16.666666666666668 * 5);

      await delay(100);
      setDescription(PUBLIC_APPROVAL_STEPS[5]);
      setProgress(16.666666666666668 * 6);
      console.log("All questions saved successfully.");
      await delay(300);
      setLoading(false)
      setProgress(0)
      localStorage.removeItem("createTest");
      dispatch(resetCreateTest())
      navigate(ROUTES.CREATETEST)
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };
  const cx = 48;
  const cy = 48;
  const r = 44;
  // circumference = 2πr
  const circumference = 2 * Math.PI * r;

  const variablecircumference = 276.48 * ((100 - progress) / 100);

  return (
    <>
      <Dialog open={Loading}  onOpenChange={setLoading}>
        <DialogContent 
          className={`flex justify-center p-6 max-w-[90%] sm:max-w-[50%] py-8`}
        >
          <div className="relative flex flex-col items-center text-center">
            {/* Circular Progress with Rocket */}
            <div
              className="relative w-24 h-24 mb-8"
              data-purpose="circular-loader"
            >
              {/* Outer Circle Track */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx={cx}
                  cy={cy}
                  fill="transparent"
                  r={r}
                  stroke="#1e293b"
                  strokeWidth={6}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  fill="transparent"
                  id="circularProgress"
                  r={r}
                  stroke={`${progress === 100 ? "var(--success)" : "var(--primary)"}`}
                  strokeDasharray={circumference}
                  strokeDashoffset={variablecircumference}
                  strokeLinecap="round"
                  strokeWidth={6}
                  style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
                />
              </svg>
              {/* Rocket Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <RocketIcon
                  size={30}
                  className={`${progress === 100 ? "text-success" : "text-primary "} animate-pulse`}
                />
              </div>
            </div>
            <h2
              className="text-3xl font-bold mb-3 tracking-tight"
              id="modalHeading"
            >
              {Description?.title}
            </h2>
            <p
              className="text-muted-foreground text-base mb-10"
              id="modalSubtext"
            >
              {Description?.message}
            </p>
            {/* Linear Progress Bar */}
            <div
              className="w-full max-w-xs mb-4"
              data-purpose="progress-bar-container"
            >
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progress === 100 ? "bg-success" : "bg-primary"} rounded-full  transition-all`}
                  id="linearProgressBar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p
                className={`${progress === 100 ? "text-success" : "text-primary"} font-bold text-xl mt-4`}
              >
                {Math.floor(progress)}%
              </p>
            </div>
            {/* Status Hint */}
            <div className="flex items-center gap-2 text-muted text-sm mt-4">
              <Sparkles
                size={15}
                className={`${progress === 100 ? "text-success" : "text-primary"}   fill-primary animate-pulse`}
              />
              <span className="text-muted-foreground ">
                This may take a few seconds
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <PublishTestPopPop/> */}
      <main className="flex-1 overflow-y-auto  bg-background">
        <div className="max-w-300 mx-auto">
          {/* Header */}
          <header className="mb-3 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-medium text-foreground">
                Publish Test
              </h1>
              <p className=" text-muted-foreground mt-xs text-xs">
                Review your test details before publishing
              </p>
            </div>
          </header>
          <div className="grid  gap-4">
            {/*  Summary & Settings */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              {/* test summary card */}
              <div className="col-span-12 bg-card lg:col-span-7 card-bg rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                    {createTest.info.cover ? (
                      <img
                        src={createTest.info.cover}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground-foreground uppercase font-bold tracking-wider mb-1">
                      Test Summary
                    </p>
                    <h2 className="text-xl font-bold">
                      {createTest.info.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {createTest.info.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Structure test */}
              <div className="col-span-12 bg-card lg:col-span-3  border border-border rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground-foreground mb-6">
                  Structure Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <Clock size={20} className="text-success" />
                      Duration
                    </div>
                    <span className="text-sm font-medium">
                      {structure.duration} mins
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <CircleQuestionMark size={20} className="text-primary" />
                      Total Questions
                    </div>
                    <span className="text-sm font-medium">
                      {structure.totalQuestions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <Star size={20} className="text-warning" />
                      Total Marks
                    </div>
                    <span className="text-sm font-medium">
                      {structure.totalMarks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <CirclePercent size={20} className="text-success" />
                      Passing Percentage
                    </div>
                    <span className="text-sm font-medium text-success">
                      {structure.passingPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <CircleMinus size={20} className="text-destructive" />
                      Negative Marking
                    </div>
                    {structure.negativeMarking ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <BadgeMinus size={20} className="text-destructive" />
                      Negative Marks
                    </div>
                    <span className="text-sm font-medium text-destructive">
                      -0.25
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <LayoutPanelTop size={20} className="text-primary" />
                      Section Wise
                    </div>
                    {structure.isSectionWise ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <FolderOpen size={20} className="text-primary" />
                      Sections
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {structure.sections.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* Settings Summary */}
              <div
                class="col-span-12 lg:col-span-2 bg-card border border-border rounded-xl p-6"
                data-purpose="settings-summary"
              >
                <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground-foreground mb-6">
                  Settings Summary
                </h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <Shuffle size={20} className="text-primary" />
                      Shuffle Questions
                    </div>
                    {settings.shuffleQuestions ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <ArrowLeftRight size={20} className="text-primary" />
                      Shuffle Options
                    </div>
                    {settings.shuffleOptions ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <ClipboardCheck size={20} className="text-primary" />
                      Allow Review
                    </div>

                    {settings.allowReview ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-sm text-muted-foreground-foreground">
                      <Calculator size={20} className="text-primary" />
                      Calculator Allowed
                    </div>

                    {settings.calculatorAllowed ? (
                      <span className="text-sm text-success font-medium ">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-medium ">
                        No
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Validation Checklist */}
              <div className="col-span-12 lg:col-span-3 bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground-foreground mb-6">
                  Validation Checklist
                </h3>
                <div className="space-y-4">
                  {VALIDATION_CHECKLIST.map((c, index) => {
                    return (
                      <div
                        key={c.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 size={20} className="text-success" />
                          {c.label}
                        </div>
                        <Badge
                          className={` ${c.completed ? "text-success bg-success/10" : "text-warning bg-warning/10"}  text-xs  capitalize `}
                        >
                          {c.completed ? "Completed" : "pending"}
                        </Badge>
                      </div>
                    );
                  })}
                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg flex gap-3">
                    <CheckCircle size={25} className="text-success" />
                    <div>
                      <p className="text-sm font-bold text-success">
                        Ready to Publish
                      </p>
                      <p className="text-xs text-muted-foreground-foreground">
                        All required information is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Info */}
              <div className="col-span-12 bg-card lg:col-span-4  border border-border rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground-foreground mb-6">
                  Approval Information
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground-foreground">
                      Approval Status
                    </span>
                    <Badge
                      className={`${publish.approvalStatus === "pending" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"} px-2 py-0.5 rounded-full  text-xs font-bold  capitalize tracking-tight`}
                    >
                      {publish.approvalStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground-foreground">
                      Approved By
                    </span>
                    <span className="text-sm font-medium">
                      {!publish.aapprovedBy ? "—" : publish.aapprovedBy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground-foreground">
                      Approved At
                    </span>
                    <span className="text-sm font-medium">
                      {!publish.aapprovedAt ? "—" : publish.aapprovedAt}
                    </span>
                  </div>
                </div>
                <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-lg p-4 flex gap-3">
                  <Info size={25} className="text-primary" />
                  <p className="text-xs text-muted-foreground-foreground leading-relaxed">
                    This test will be reviewed by admin before it becomes
                    available to others.
                  </p>
                </div>
              </div>
              {/* Publishing options */}
              <div
                className="col-span-12 lg:col-span-4 bg-card border border-border rounded-xl p-6"
                data-purpose="publishing-options"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
                  Publishing Options
                </h3>
                <form
                  className="space-y-6"
                  id="PublichTest"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label className="text-sm font-bold block mb-1">
                      Visibility
                    </label>
                    <p className="text-xs text-muted-foreground mb-4">
                      Choose who can access this test.
                    </p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-accent bg-primary/5 justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            className="sr-only peer"
                            name="visibility"
                            type="radio"
                            value={"Private"}
                            {...register("visibility", {
                              required: true,
                            })}
                          />

                          <div
                            className="
      w-4 h-4 rounded-full border border-primary
      flex items-center justify-center
      after:content-['']
      after:w-2 after:h-2
      after:rounded-full
      after:bg-primary
      after:scale-0
      after:transition-transform
      peer-checked:after:scale-100
    "
                          />
                          <div>
                            <p className="text-sm font-medium">Private</p>
                            <p className="text-[10px] text-muted-foreground">
                              Only you and admins can access
                            </p>
                          </div>
                        </div>
                        <Shield
                          size={20}
                          className="text-primary fill-primary"
                        />
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-accent bg-primary/5 justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            className="sr-only peer"
                            name="visibility"
                            type="radio"
                            value={"public"}
                            {...register("visibility")}
                          />
                          <div
                            className="
      w-4 h-4 rounded-full border border-primary
      flex items-center justify-center
      after:content-['']
      after:w-2 after:h-2
      after:rounded-full
      after:bg-primary
      after:scale-0
      after:transition-transform
      peer-checked:after:scale-100
    "
                          />
                          <div>
                            <p className="text-sm font-medium">Public</p>
                            <p className="text-[10px] text-muted-foreground">
                              Anyone can access this test
                            </p>
                          </div>
                        </div>
                        <Eye size={20} className="text-primary" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold block mb-3">
                      Status
                    </label>
                    <div className="inline-flex text-primary px-4 py-1 bg-primary/10 border border-primary/30 rounded  capitalize font-medium text-xs">
                      {publish.status}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      You can publish this test when you're ready.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32" />
      </main>
      <footer className="fixed  bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40 flex items-center justify-between">
        <button className="px-6 py-2 rounded-lg border border-muted-foreground hover:border-white text-muted-foreground cursor-pointer hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={20} className="" /> Back
        </button>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-lg bg-card border border-border text-slate-200 font-medium hover:bg-border transition-colors flex items-center gap-2">
            <FilePenLine size={20} /> Save Draft
          </button>
          <button className="px-6 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors flex items-center gap-2">
            <Eye size={20} /> Preview Test
          </button>
          <button
            type="submit"
            form="PublichTest"
            className="px-8 py-2.5 rounded-lg bg-success  font-bold hover:bg-success/90 cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-success/20 disabled:cursor-not-allowed disabled:scale-none disabled:bg-muted/30 disabled:text-muted-foreground disabled:border-muted-foreground text-primary-foreground"
          >
            <Rocket size={20} className="" /> Publish Test
          </button>
        </div>
      </footer>
    </>
  );
}
