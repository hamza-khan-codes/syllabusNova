import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Sun,
  Maximize,
  Bookmark,
  Check,
  Lightbulb,
  Clock3,
  CircleDot,
  Flag,
  CircleCheck,
  Circle,
  CircleAlert,
  ChevronLeft,
  ChevronRight,
  Send,
  ListChecks,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addResultController,
  getQuizMetaDataController,
  getQuizQuestionsController,
} from "@/controllers/Quiz/QuizControllers";

import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import ProgressLoading from "../common/ProgressLoading";
import { ROUTES } from "@/constant/routes";
import { deleteAllResults } from "@/services/firestoreService";

export default function IndualQluizInterface() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  /* =========================================================
     BASIC STATE
  ========================================================= */

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [questions, setQuestions] = useState([]);

  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const [attempted, setAttempted] = useState([]);

  const [passingPercentage, setPassingPercentage] = useState(0);

  const [title, setTitle] = useState("");

  const [marks, setMarks] = useState({
    negative: 0,
    positive: 1,
  });

  /* =========================================================
     WHOLE TEST TIMER
  ========================================================= */

  /*
    This timer belongs to the ENTIRE TEST.

    Example:
    duration = 30 minutes

    testTimeSec = 1800

    It decreases continuously regardless
    of which question is open.
  */

  const [testTimeSec, setTestTimeSec] = useState(0);

  const [totalTestTimeSec, setTotalTestTimeSec] = useState(0);

  /* =========================================================
     INDIVIDUAL QUESTION TIMER
  ========================================================= */

  /*
    Every question has its own timer.

    Example:

    Q1 -> 60 sec
    Q2 -> 60 sec
    Q3 -> 60 sec

    Each question's remaining time is stored
    inside attempted[].time
  */

  const [perQuestionSeconds, setPerQuestionSeconds] = useState(0);

  const [testDetails, setTestDetails] = useState({})

  /* =========================================================
     SUBMIT / LOADING
  ========================================================= */

  const [Loading, setLoading] = useState(false);

  const [progressLoad, setProgressLoad] = useState(0);

  const [Description, setDescription] = useState({
    title: "Submitting...",
    message: "",
  });

  /* =========================================================
     QUESTION COUNTERS
  ========================================================= */

  const [questionStates, setQuestionStates] = useState({
    notVisited: 0,
    answered: 0,
    current: 1,
    review: 0,
    late: 0,
  });

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await getQuizQuestionsController(quizId);

        const metaData = await getQuizMetaDataController(quizId);
        // Test info
        setTestDetails(metaData?.info)

        if (!mounted) return;

        const totalSeconds = Number(metaData?.structure?.duration || 0) * 60;

        const passing = Number(metaData?.structure?.passingPercentage || 0);

        const negativeMarks = Number(metaData?.structure?.negativeMarks || 0);

        const positiveMarks =
          response.length > 0
            ? Number(metaData?.structure?.totalMarks || 0) / response.length
            : 0;

        /*
          =====================================================
          WHOLE TEST TIME
          =====================================================
        */

        setTotalTestTimeSec(totalSeconds);

        setTestTimeSec(totalSeconds);

        /*
          =====================================================
          INDIVIDUAL QUESTION TIME
          =====================================================

          Example:

          Test = 30 minutes
          Questions = 30

          1800 / 30 = 60 seconds/question
        */

        const individualTime =
          response.length > 0 ? Math.floor(totalSeconds / response.length) : 0;

        setPerQuestionSeconds(individualTime);

        setQuestions(response);

        setPassingPercentage(passing);

        setMarks({
          negative: negativeMarks,
          positive: positiveMarks,
        });

        setTitle(metaData?.info?.title || "Quiz");

        setQuestionStates({
          notVisited: response.length,
          answered: 0,
          current: 1,
          review: 0,
          late: 0,
        });
      } catch (error) {
        console.error("Fetch Data Error:", error);

        setQuestions([]);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [quizId]);

  /* =========================================================
     INITIALIZE QUESTIONS
  ========================================================= */

  useEffect(() => {
    if (questions.length === 0 || perQuestionSeconds <= 0) {
      return;
    }

    const selectedArr = questions.map((question) => ({
      questionId: question.questionId,

      selectedAns: [],
    }));

    const attemptedArr = questions.map((question, index) => ({
      questionId: question.questionId,

      attempted: false,

      correctAns: question.correctAnswer || [],

      marked: false,

      number: index + 1,

      notVisited: true,

      skipped: false,

      late: false,

      /*
            Individual question timer.
          */

      time: perQuestionSeconds,
    }));

    setSelectedAnswer(selectedArr);

    setAttempted(attemptedArr);
  }, [questions, perQuestionSeconds]);

  /* =========================================================
     CURRENT QUESTION
  ========================================================= */

  const current = questions[currentQuestion - 1];

  const currentAttempt = attempted[currentQuestion - 1];

  /*
    Remaining time for current question.
  */

  const currentQuestionTime = currentAttempt?.time ?? 0;

  /* =========================================================
     WHOLE TEST TIMER
  ========================================================= */

  useEffect(() => {
    if (testTimeSec <= 0 || Loading || questions.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTestTimeSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          /*
            Whole test finished.
          */

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [testTimeSec, Loading, questions.length]);

  /* =========================================================
     AUTO SUBMIT WHEN WHOLE TEST ENDS
  ========================================================= */

  useEffect(() => {
    if (testTimeSec !== 0 || questions.length === 0 || Loading) {
      return;
    }

    submitTestHandle();
  }, [testTimeSec, questions.length]);

  /* =========================================================
     INDIVIDUAL QUESTION TIMER
  ========================================================= */

  useEffect(() => {
    if (
      !attempted.length ||
      !currentAttempt ||
      currentQuestionTime <= 0 ||
      Loading
    ) {
      return;
    }

    /*
      ONLY CURRENT QUESTION TIMER
      DECREASES HERE.

      Other questions remain untouched.
    */

    const timer = setInterval(() => {
      setAttempted((prev) => {
        return prev.map((question) => {
          if (question.number !== currentQuestion) {
            return question;
          }

          if (question.time <= 0) {
            return question;
          }

          const nextTime = question.time - 1;

          return {
            ...question,

            time: nextTime,

            late: nextTime <= 0,
          };
        });
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentQuestion, currentQuestionTime, attempted.length, Loading]);

  /* =========================================================
     INDIVIDUAL QUESTION TIMEOUT
  ========================================================= */

  useEffect(() => {
    if (!currentAttempt || currentAttempt.time !== 0 || Loading) {
      return;
    }

    /*
      Current question has expired.

      Mark it late.
    */

    setAttempted((prev) =>
      prev.map((question) => {
        if (question.number !== currentQuestion) {
          return question;
        }

        return {
          ...question,

          time: 0,

          late: true,

          notVisited: false,
        };
      }),
    );

    /*
      Automatically move to next question.
    */

    if (currentQuestion < questions.length) {
      const timeout = setTimeout(() => {
        setCurrentQuestion((prev) => Math.min(questions.length, prev + 1));
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }

    /*
      If last question expires,
      whole test is NOT necessarily over.

      We only submit if the whole test
      timer has also reached zero.

      Otherwise the user can submit manually.
    */
  }, [currentAttempt?.time, currentQuestion, questions.length, Loading]);

  /* =========================================================
     WHOLE TEST TIMER FORMAT
  ========================================================= */

  const testSeconds = testTimeSec % 60;

  const testMinutes = Math.floor(testTimeSec / 60) % 60;

  const testHours = Math.floor(testTimeSec / 3600);

  const isWholeTestTimeLow = testTimeSec <= 60;

  const wholeTestProgress =
    totalTestTimeSec > 0
      ? Math.max(0, Math.min(100, (testTimeSec / totalTestTimeSec) * 100))
      : 0;

  /* =========================================================
     INDIVIDUAL TIMER FORMAT
  ========================================================= */

  const questionSeconds = currentQuestionTime % 60;

  const questionMinutes = Math.floor(currentQuestionTime / 60) % 60;

  const questionHours = Math.floor(currentQuestionTime / 3600);

  const isQuestionTimeLow = currentQuestionTime <= 10;

  const questionTimerProgress =
    perQuestionSeconds > 0
      ? Math.max(
          0,
          Math.min(100, (currentQuestionTime / perQuestionSeconds) * 100),
        )
      : 0;

  /* =========================================================
     QUIZ PROGRESS
  ========================================================= */

  const progress =
    questions.length > 0
      ? Math.round((currentQuestion / questions.length) * 100)
      : 0;

  /* =========================================================
     UPDATE COUNTERS
  ========================================================= */

  useEffect(() => {
    if (!attempted.length) {
      return;
    }

    const answered = attempted.filter((question) => question.attempted).length;

    const notVisited = attempted.filter(
      (question) => question.notVisited,
    ).length;

    const review = attempted.filter((question) => question.marked).length;

    const late = attempted.filter((question) => question.late).length;

    setQuestionStates({
      answered,

      notVisited,

      review,

      late,

      current: currentQuestion,
    });
  }, [attempted, currentQuestion]);

  /* =========================================================
     MARK FOR REVIEW
  ========================================================= */

  const toggleReview = () => {
    const currentAttempt = attempted[currentQuestion - 1];

    if (!currentAttempt) {
      return;
    }

    const newMarked = !currentAttempt.marked;

    setAttempted((prev) =>
      prev.map((question) => {
        if (question.questionId !== currentAttempt.questionId) {
          return question;
        }

        return {
          ...question,

          marked: newMarked,

          notVisited: false,
        };
      }),
    );
  };

  /* =========================================================
     QUESTION STATUS
  ========================================================= */

  const getQuestionStatus = (question) => {
    if (question.number === currentQuestion) {
      return "current";
    }

    if (question.late) {
      return "late";
    }

    if (question.marked) {
      return "review";
    }

    if (question.attempted) {
      return "answered";
    }

    return "notVisited";
  };

  const getNavigatorClasses = (question) => {
    const status = getQuestionStatus(question);

    const styles = {
      current:
        "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20",

      answered: "border-success/30 bg-success/10 text-success",

      review: "border-warning/30 bg-warning/10 text-warning",

      notVisited: "border-border bg-secondary text-secondary-foreground",

      late: "border-destructive/30 bg-destructive/10 text-destructive",
    };

    const icons = {
      current: <CircleDot size={11} />,

      answered: <CircleCheck size={11} />,

      review: <Flag size={11} />,

      notVisited: <Circle size={11} />,

      late: <CircleAlert size={11} />,
    };

    return {
      style: styles[status],
      icon: icons[status],
    };
  };

  /* =========================================================
     ANSWER HANDLER
  ========================================================= */

  const setAttemptedHandle = (questionId, value = true) => {
    setAttempted((prev) =>
      prev.map((question) => {
        if (question.questionId !== questionId) {
          return question;
        }

        return {
          ...question,

          attempted: value,

          notVisited: false,
        };
      }),
    );
  };

  const selectedHandle = (optionId, questionId) => {
    setSelectedAnswer((prev) =>
      prev.map((item) => {
        if (item.questionId !== questionId) {
          return item;
        }

        /*
          SINGLE ANSWER
        */

        if (!current?.isMultiple) {
          setAttemptedHandle(questionId, true);

          return {
            ...item,

            selectedAns: [optionId],
          };
        }

        /*
          MULTIPLE ANSWER
        */

        if (item.selectedAns.includes(optionId)) {
          const newSelected = item.selectedAns.filter((id) => id !== optionId);

          setAttemptedHandle(questionId, newSelected.length > 0);

          return {
            ...item,

            selectedAns: newSelected,
          };
        }

        const newSelected = [...item.selectedAns, optionId];

        setAttemptedHandle(questionId, true);

        return {
          ...item,

          selectedAns: newSelected,
        };
      }),
    );
  };

  /* =========================================================
     TIME TAKEN
  ========================================================= */

  const timeTakenSec = useMemo(() => {
    /*
      Test allowed time - current remaining
      test time = time actually spent.

      This is more accurate than calculating
      from individual question timers because
      the whole test timer is the authoritative
      test duration.
    */

    return Math.max(0, totalTestTimeSec - testTimeSec);
  }, [totalTestTimeSec, testTimeSec]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goNext = () => {
    if (currentQuestion >= questions.length) {
      return;
    }

    setCurrentQuestion((prev) => Math.min(questions.length, prev + 1));
  };

  const goPrevious = () => {
    if (currentQuestion <= 1) {
      return;
    }

    setCurrentQuestion((prev) => Math.max(1, prev - 1));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function submitTestHandle() {
    if (Loading) {
      return;
    }

    try {
      setLoading(true);

      setDescription({
        title: "Submitting...",
        message: "Processing Your Result",
      });

      setProgressLoad(10);

      let correct = {
        num: 0,
        ids: [],
      };

      let wrong = {
        num: 0,
        ids: [],
      };

      let late = {
        num: 0,
        ids: [],
      };

      let notVisited = {
        num: 0,
        ids: [],
      };

      let skipped = {
        num: 0,
        ids: [],
      };

      let marked = {
        num: 0,
        ids: [],
      };

      const result = attempted.map((attempt) => {
        const selected = selectedAnswer.find(
          (answer) => answer.questionId === attempt.questionId,
        );

        const selectedIds = selected?.selectedAns || [];

        const correctIds = attempt.correctAns || [];

        const selectedSorted = [...selectedIds].sort();

        const correctSorted = [...correctIds].sort();

        const isCorrect =
          selectedSorted.length === correctSorted.length &&
          selectedSorted.every((id, index) => id === correctSorted[index]);

        /*
              CORRECT
            */

        if (isCorrect) {
          correct = {
            num: correct.num + 1,

            ids: [...correct.ids, attempt.questionId],
          };
        } else {
          wrong = {
            num: wrong.num + 1,

            ids: [...wrong.ids, attempt.questionId],
          };
        }

        /*
              LATE
            */

        if (attempt.late) {
          late = {
            num: late.num + 1,

            ids: [...late.ids, attempt.questionId],
          };
        }

        /*
              NOT VISITED
            */

        if (attempt.notVisited) {
          notVisited = {
            num: notVisited.num + 1,

            ids: [...notVisited.ids, attempt.questionId],
          };
        }

        /*
              SKIPPED
            */

        if (attempt.skipped) {
          skipped = {
            num: skipped.num + 1,

            ids: [...skipped.ids, attempt.questionId],
          };
        }

        /*
              MARKED
            */

        if (attempt.marked) {
          marked = {
            num: marked.num + 1,

            ids: [...marked.ids, attempt.questionId],
          };
        }

        return {
          ...attempt,

          selectedAns: selectedIds,

          isCorrect,
        };
      });

      const Result = {
        questionStates: result,

        correct,

        wrong,

        late,

        notVisited,

        skipped,

        marked,

        quizId,

        user,

        testDetails,

        /*
          Whole test time consumed.
        */

        timeTakenSec,

        /*
          Keep the total allowed time too.
        */

        totalTestTimeSec,

        /*
          Individual question time.
        */

        perQuestionSeconds,

        passingPercentage,

        positiveMarks: marks.positive,

        negativeMarks: marks.negative,

        title,
      };


      console.log("FINAL RESULT:", Result);


        // Your actual Firestore submission:

        const res =
          await addResultController(
            Result
          );

        setProgressLoad(100);

        setDescription({
          title: "Submitted",
          message:
            "Quiz successfully submitted",
        });

        setTimeout(() => {
          setLoading(false);
          setProgressLoad(0);

          navigate(
            ROUTES.RESULT + "/" + res.id
          );
        }, 1000);


      setProgressLoad(100);

      setDescription({
        title: "Submitted",
        message: "Quiz successfully submitted",
      });
    } catch (error) {
      console.error("Submit Error:", error);

      setLoading(false);
      setProgressLoad(0);
    } finally {
      setLoading(false);
      setProgressLoad(0);
      
    }
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      <ProgressLoading
        Loading={Loading}
        Description={Description}
        cross={false}
        setLoading={setLoading}
        progressLoad={progressLoad}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen size={21} className="text-primary" />
              </div>

              <span className="hidden text-lg font-bold tracking-tight text-primary sm:block">
                SyllabusNova
              </span>
            </div>

            <div className="hidden max-w-[420px] flex-1 px-6 text-center md:block">
              <p className="truncate text-sm font-semibold">
                {title || "Quiz"}
              </p>

              <p className="text-xs text-muted-foreground">
                Question {currentQuestion} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
              >
                <Sun size={19} />
              </button>

              <button
                type="button"
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary sm:flex"
              >
                <Maximize size={18} />
              </button>

              <button
                type="button"
                className="ml-1 rounded-lg border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground sm:px-4"
              >
                Quit
              </button>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="space-y-5 lg:sticky lg:top-[84px] lg:h-fit">
              {/* =================================================
                  WHOLE TEST TIMER
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="border-b border-border px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Whole Test Time
                      </p>

                      <p
                        className={`mt-1 text-2xl font-bold tracking-tight ${
                          isWholeTestTimeLow
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {String(testHours).padStart(2, "0")}:
                        {String(testMinutes).padStart(2, "0")}:
                        {String(testSeconds).padStart(2, "0")}
                      </p>
                    </div>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isWholeTestTimeLow
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Clock3 size={20} />
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isWholeTestTimeLow ? "bg-destructive" : "bg-primary"
                      }`}
                      style={{
                        width: `${wholeTestProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Remaining for entire quiz
                  </p>
                </div>

                {/* =================================================
                    INDIVIDUAL QUESTION TIMER
                ================================================= */}

                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Question Time
                      </p>

                      <p
                        className={`mt-1 text-xl font-bold ${
                          isQuestionTimeLow
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {String(questionHours).padStart(2, "0")}:
                        {String(questionMinutes).padStart(2, "0")}:
                        {String(questionSeconds).padStart(2, "0")}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning">
                      <Clock3 size={18} />
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isQuestionTimeLow ? "bg-destructive" : "bg-warning"
                      }`}
                      style={{
                        width: `${questionTimerProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Remaining for Question {currentQuestion}
                  </p>
                </div>

                {/* Quiz Progress */}

                <div className="border-t border-border px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Quiz Progress
                    </span>

                    <span className="text-xs font-semibold">{progress}%</span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {currentQuestion} of {questions.length} questions
                  </p>
                </div>
              </section>

              {/* =================================================
                  QUESTION NAVIGATOR
              ================================================= */}

              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Question Navigator
                    </h3>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Track your progress
                    </p>
                  </div>

                  <ListChecks size={18} className="text-muted-foreground" />
                </div>

                <div className="mt-5 grid grid-cols-5 gap-2">
                  {attempted.map((question) => {
                    const nav = getNavigatorClasses(question);

                    const canNavigate =
                      question.attempted ||
                      question.marked ||
                      question.late ||
                      question.number === currentQuestion;

                    return (
                      <button
                        type="button"
                        key={question.questionId}
                        disabled={!canNavigate}
                        onClick={() => setCurrentQuestion(question.number)}
                        className={`relative flex h-10 items-center justify-center rounded-lg border text-xs font-semibold transition-all ${nav.style} ${
                          canNavigate
                            ? "cursor-pointer hover:-translate-y-0.5"
                            : "cursor-not-allowed opacity-60"
                        }`}
                      >
                        {question.number}

                        <span className="absolute right-1 top-1">
                          {nav.icon}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-2.5 border-t border-border pt-4">
                  <LegendItem
                    className="bg-secondary"
                    label="Not Visited"
                    value={questionStates.notVisited}
                  />

                  <LegendItem
                    className="bg-success"
                    label="Answered"
                    value={questionStates.answered}
                  />

                  <LegendItem
                    className="bg-primary"
                    label="Current"
                    value={1}
                  />

                  <LegendItem
                    className="bg-warning"
                    label="Review"
                    value={questionStates.review}
                  />

                  <LegendItem
                    className="bg-destructive"
                    label="Late"
                    value={questionStates.late}
                  />
                </div>
              </section>
            </aside>

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="min-w-0">
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    Question {currentQuestion}
                  </span>

                  <span className="text-xs font-medium text-muted-foreground">
                    {progress}% complete
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Card */}

              <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="border-b border-border bg-muted/20 px-5 py-4 sm:px-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                        {currentQuestion}
                      </span>

                      <span className="text-sm font-semibold">Question</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {current?.isMultiple && (
                        <span className="rounded-full bg-warning/10 px-3 py-1.5 text-[11px] font-semibold text-warning">
                          Multiple Selection
                        </span>
                      )}

                      {current?.marks && (
                        <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
                          {current.marks} marks
                        </span>
                      )}

                      {currentAttempt?.late && (
                        <span className="rounded-full bg-destructive/10 px-3 py-1.5 text-[11px] font-semibold text-destructive">
                          Time Expired
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-7 sm:px-7 sm:py-8">
                  <div
                    className="max-w-4xl text-[18px] font-semibold leading-8 sm:text-[21px] sm:leading-9"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(current?.question || ""),
                    }}
                  />

                  <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Answer
                      </p>

                      {current?.isMultiple && (
                        <p className="text-xs text-muted-foreground">
                          Select all that apply
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {current?.options?.map((option, index) => {
                        const isSelected = selectedAnswer[
                          currentQuestion - 1
                        ]?.selectedAns?.includes(option.optionId);

                        return (
                          <button
                            key={option.optionId}
                            type="button"
                            disabled={currentAttempt?.late || testTimeSec <= 0}
                            onClick={() =>
                              selectedHandle(
                                option.optionId,
                                current.questionId,
                              )
                            }
                            className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all sm:p-4 ${
                              isSelected
                                ? "border-success bg-success/5 ring-2 ring-success/10"
                                : "border-border bg-background hover:border-primary/40"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                                isSelected
                                  ? "bg-success text-success-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </span>

                            <span className="min-w-0 flex-1 text-sm leading-6">
                              {option.text}
                            </span>

                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                isSelected
                                  ? "border-success bg-success text-success-foreground"
                                  : "border-border text-transparent"
                              }`}
                            >
                              <Check size={14} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}

                <div className="border-t border-border bg-muted/10 px-5 py-4 sm:px-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      disabled={currentQuestion === 1}
                      onClick={goPrevious}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold disabled:opacity-40"
                    >
                      <ChevronLeft size={17} />
                      Previous
                    </button>

                    <div className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={toggleReview}
                        className={`inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${
                          currentAttempt?.marked
                            ? "bg-warning/10 text-warning"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <Bookmark
                          size={17}
                          fill={
                            currentAttempt?.marked ? "currentColor" : "none"
                          }
                        />

                        <span className="hidden sm:block">
                          {currentAttempt?.marked
                            ? "Marked"
                            : "Mark for Review"}
                        </span>
                      </button>

                      {currentQuestion < questions.length && (
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={
                            !currentAttempt?.attempted && !currentAttempt?.late
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                          <ChevronRight size={17} />
                        </button>
                      )}

                      {currentQuestion === questions.length && (
                        <button
                          type="button"
                          onClick={submitTestHandle}
                          disabled={
                            !currentAttempt?.attempted && !currentAttempt?.late
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-success px-5 py-3 text-sm font-semibold text-success-foreground disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Send size={16} />
                          Submit Quiz
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Tip */}

              <section className="mt-5 flex gap-3 rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lightbulb size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Quick Tip</h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    The whole test timer keeps running continuously, while each
                    question has its own independent timer. Returning to a
                    question preserves its remaining time.
                  </p>
                </div>
              </section>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

/* =========================================================
   LEGEND
========================================================= */

function LegendItem({ className, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
        <span className={`h-3 w-3 rounded ${className}`} />

        <span>{label}</span>
      </div>

      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}
