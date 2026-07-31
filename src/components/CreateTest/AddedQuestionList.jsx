import { ROUTES } from "@/constant/routes";
import {
  clearEditQuestion,
  deleteQuestion,
  editQuestion,
} from "@/features/CreateTest/createTestSlices";
import getHtmlToText from "@/utils/getHtmlToText";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import QuestionPreview from "./QuestionPreview";
import useMoveToNext from "@/hooks/useMoveToNext";

export default function AddedQuestionList() {
  const moveToNext = useMoveToNext()

  const [Preview, setPreview] = useState(false);
  const [previewQuestion, setpreviewQuestion] = useState({});
  const createTest = useSelector((state) => state.createTest);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const { questions } = createTest;
  const [sortBySections, setsortBySections] = useState([]);

  // Sorter
  const sorterSection = (qs) => {
    const sortedQBySections = [];
    if (createTest.structure.isSectionWise) {
      createTest.structure.sections.forEach((section) => {
        const { sectionId } = section;
        const { title } = section;
        const Questions = qs.filter((question) => {
          return question.sectionId === sectionId;
        });
        const questionNum = Questions.length;
        const clean = Questions.map((q) => {
          return { ...q, question: getHtmlToText(q.question) };
        });
        console.log(section)
        sortedQBySections.push({
          sectionTitle: title,
          sectionId,
          questionNum,
          questions: clean,
          sectionQuestions: section.questions
        
        });
      });
    } else {
        const clean = createTest.questions.map((q) => {
          return { ...q, question: getHtmlToText(q.question) };
        });
      sortedQBySections.push({
          sectionTitle: createTest.info.title,
          sectionId:"createTest.info.title",
          questionNum: createTest.questions.length,
          questions: clean,
          sectionQuestions: createTest.structure.totalQuestions
        
        });
    }
    setsortBySections(sortedQBySections);
    return sortedQBySections;
  };
  console.log(createTest)

  useEffect(() => {
    sorterSection(questions);
  }, [questions]);

  const EditQuestion = (id) => {
    dispatch(editQuestion([id]));
    moveToNext(ROUTES.ADDNEWQUESTION);
  };

  const PreviewQuestion = (id) => {
    const preview = createTest.questions.filter((q) => {
      return q.questionId === id;
    });
    setpreviewQuestion({...preview[0],editId:id});
    setPreview(true);
  };

  const handleDeleteQuestion = () => {
    console.log("Delete", deleteId);
    dispatch(deleteQuestion(deleteId[0]));
    const clean = createTest.questions.filter((q) => {
      return q.questionId !== deleteId[0];
    });
    const updateCreateTest = {
      ...createTest,
      questions: clean,
    };
    localStorage.setItem("createTest", JSON.stringify(updateCreateTest)); // Save Updated data
    setDeleteId([]);
    setConfirm(false);
  };
  console.log(createTest.questions)

  return (
    <>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <div className="bg-card px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-destructive/10 sm:mx-0 sm:size-10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-6 text-destructive"
                >
                  <path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  id="dialog-title"
                  className="text-base font-semibold text-foreground"
                >
                  Delete Question
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this question? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted/60 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              onClick={handleDeleteQuestion}
              type="button"
              command="close"
              commandfor="dialog"
              className="inline-flex cursor-pointer w-full justify-center rounded-md bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground shadow-xs transition-colors hover:bg-destructive/90 sm:ml-3 sm:w-auto"
            >
              Delete
            </button>
            <DialogClose className="mt-3 inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-xs ring-1 ring-border transition-colors hover:bg-muted sm:mt-0 sm:w-auto cursor-pointer">
              Cancel
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <QuestionPreview
        question={previewQuestion?.question}
        options={previewQuestion?.options}
        correctOptionId={previewQuestion?.correctAnswer}
        editId={previewQuestion?.editId}  
        isOpen={Preview}
        setIsOpen={setPreview}
        editQuestionFunc={EditQuestion}
      />
      <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto custom-scrollbar">
        {/* Page Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display-xl text-display-xl text-foreground tracking-tight">
              Question Bank
            </h1>
            <p className="text-body-md text-muted-foreground mt-1">
              Manage and organize assessment questions by sections.
            </p>
          </div>
          <button
            className="bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
            onClick={() => {
              moveToNext(ROUTES.ADDNEWQUESTION);
            }}
          >
            <span className="material-symbols-outlined text-lg">
              add_circle
            </span>
            Create New Question
          </button>
        </div>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-card border-transparent focus:border-primary focus:ring-0 rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all"
              placeholder="Search questions, keywords..."
              type="text"
            />
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-card border-transparent focus:border-primary focus:ring-0 rounded-xl py-4 px-4 text-foreground transition-all">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              expand_more
            </span>
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-card border-transparent focus:border-primary focus:ring-0 rounded-xl py-4 px-4 text-foreground transition-all">
              <option>Difficulty: All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              filter_list
            </span>
          </div>
        </div>
        {/* Question Sections */}
        <div className="space-y-xl">
          {/* Mathematics Section */}
          {sortBySections.map((s) => (
            <section key={s.sectionId}>
              <div className="flex items-center justify-between py-4 border-b border-outline-variant/20 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="font-headline-md text-headline-md text-foreground">
                    {s.sectionTitle}
                    
                  </h3>
                </div>
                <div className="w-72">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium">
                          Question {s.questionNum || 0} of{" "}
                          {s.sectionQuestions || 0}
                        </span>
                        <span className="text-textMuted">
                          {Math.floor(
                            (s.questionNum /s.sectionQuestions ) *
                              100,
                          ) || 0}
                          %
                        </span>
                      </div>
                  <div className="w-full bg-dark border border-border h-2 rounded-full overflow-hidden">
                    {/* fill */}
                        <div
                          className={`${(s.questionNum /s.sectionQuestions) === 1 ?"bg-success":"bg-primary"} h-full rounded-full w-0`}
                          style={{
                            width:
                              Math.floor(
                                (s.questionNum /s.sectionQuestions) *
                                  100,
                              ) + "%",
                          }}
                        />
                      </div>
                    </div>
              </div>
              <div className="space-y-2">
                {s.questions.map((q, index) => (
                  <div
                    key={q.questionId}
                    className="group flex items-center gap-6 p-4 hover:bg-card/8 rounded-xl border border-transparent hover:border-border/10 transition-all"
                  >
                    <div className="w-10 text-muted-foreground font-medium">
                      Q{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-body-md line-clamp-1">
                        {q.question}
                      </p>
                      <div className="flex items-center gap-4 mt-base">
                        <span className="text-[10px] line-clamp-1 uppercase font-bold tracking-widest text-muted-foreground px-2 py-0.5 bg-muted rounded">
                          {q?.topic}
                        </span>
                        <span className="flex items-center  capitalize gap-1 text-muted-foreground text-label-sm">
                          <span className="material-symbols-outlined text-sm">
                            grade
                          </span>
                          {q?.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-foreground font-semibold">
                        {q?.marks} Marks
                      </span>
                    </div>
                    <div className="w-32 text-center">
                      <span
                        className={`${q?.status === "saved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"} px-4 py-1 rounded-full text-[12px] font-bold   uppercase`}
                      >
                        {q?.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-card/10 rounded-lg text-muted-foreground hover:text-primary"
                        onClick={() => {
                          EditQuestion(q?.questionId);
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </button>
                      <button
                        className="p-2 hover:bg-card/10 rounded-lg text-muted-foreground hover:text-foreground"
                        onClick={() => PreviewQuestion(q?.questionId)}
                      >
                        <span className="material-symbols-outlined text-lg">
                          visibility
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setConfirm(true);
                          setDeleteId([q.questionId]);
                        }}
                        className="p-2 cursor-pointer hover:bg-card/10 rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
