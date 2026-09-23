import { Badge } from "../common/ui/Badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import DOMPurify from "dompurify";
import {
  CheckCircle2,
  Circle,
  Pencil,
  X,
  FileQuestion,
  ListChecks,
} from "lucide-react";

export default function QuestionPreview({
  isOpen = true,
  setIsOpen,
  editQuestionFunc,
  badgeObj = [{ value: "math" }],
  question,
  options = [],
  correctOptionId = [],
  editId,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="
          flex flex-col
          w-[calc(100vw-1rem)]
          sm:w-[95vw]
          sm:max-w-5xl
          h-[92vh]
          p-0
          overflow-hidden
          rounded-2xl
          border-border
          bg-background
          shadow-2xl
        "
      >
        {/* ================= HEADER ================= */}
        <header className="shrink-0 border-b border-border bg-card">
          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileQuestion size={20} />
                </div>

                <div className="min-w-0">
                  <DialogTitle className="truncate text-base font-semibold text-foreground sm:text-lg">
                    Question Preview
                  </DialogTitle>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Review the question and answer options
                  </p>
                </div>
              </div>

              {/* Badges */}
              {badgeObj?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 pl-0 sm:pl-[52px]">
                  {badgeObj.map((b, index) => (
                    <Badge
                      key={`${b?.value}-${index}`}
                      className="
                        rounded-full
                        border border-primary/15
                        bg-primary/10
                        px-3 py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-primary
                      "
                    >
                      {b?.value}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <DialogClose asChild>
              <button
                type="button"
                aria-label="Close question preview"
                className="
                  flex size-9 shrink-0 items-center justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-all
                  hover:bg-muted
                  hover:text-foreground
                  active:scale-95
                "
              >
                <X size={19} />
              </button>
            </DialogClose>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-4 py-5
            sm:px-7 sm:py-7
            scrollbar-thin
            scrollbar-thumb-muted-foreground/30
          "
        >
          <div className="mx-auto max-w-4xl space-y-7">
            {/* ================= QUESTION ================= */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileQuestion size={15} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Question
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-border
                  bg-card
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(question || ""),
                  }}
                  className="
                    prose
                    prose-sm
                    max-w-none
                    text-foreground
                    leading-7
                    sm:prose-base
                    sm:leading-8
                    dark:prose-invert
                  "
                />
              </div>
            </section>

            {/* ================= OPTIONS ================= */}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ListChecks size={15} />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Answer Options
                  </p>
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {options.length} options
                </span>
              </div>

              <div className="grid gap-3">
                {options?.map((o, i) => {
                  const isCorrect = correctOptionId?.includes(o.optionId);

                  return (
                    <div
                      key={o.optionId || i}
                      className={`
                        group relative flex items-center gap-3
                        rounded-xl
                        border
                        p-4
                        transition-all
                        sm:p-4
                        ${
                          isCorrect
                            ? "border-success/50 bg-success/5 shadow-sm shadow-success/5"
                            : "border-border bg-card hover:border-primary/30 hover:bg-muted/30"
                        }
                      `}
                    >
                      {/* Option Letter */}
                      <div
                        className={`
                          flex size-9 shrink-0 items-center justify-center
                          rounded-lg
                          text-sm font-bold
                          ${
                            isCorrect
                              ? "bg-success/15 text-success"
                              : "bg-muted text-muted-foreground"
                          }
                        `}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>

                      {/* Option Text */}
                      <span
                        className={`
                          min-w-0 flex-1 text-sm leading-6 sm:text-base
                          ${
                            isCorrect
                              ? "font-medium text-foreground"
                              : "text-foreground"
                          }
                        `}
                      >
                        {o.text}
                      </span>

                      {/* Correct Indicator */}
                      {isCorrect ? (
                        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-success">
                          <CheckCircle2 size={16} />
                          <span className="hidden text-[11px] font-semibold sm:inline">
                            Correct
                          </span>
                        </div>
                      ) : (
                        <Circle
                          size={17}
                          className="shrink-0 text-muted-foreground/30"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= ANSWER SUMMARY ================= */}
            <section
              className="
                rounded-xl
                border border-success/20
                bg-success/5
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-success"
                />

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Correct answer
                    {correctOptionId?.length > 1 ? "s" : ""}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {correctOptionId?.length > 0
                      ? `${correctOptionId.length} correct option${
                          correctOptionId.length > 1 ? "s" : ""
                        } selected.`
                      : "No correct answer selected."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <footer
          className="
            shrink-0
            border-t border-border
            bg-card
            px-4 py-4
            sm:px-7
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <DialogClose asChild>
              <button
                type="button"
                className="
                  w-full
                  rounded-xl
                  border border-border
                  bg-background
                  px-5 py-2.5
                  text-sm font-medium
                  text-foreground
                  transition-all
                  hover:bg-muted
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                Close Preview
              </button>
            </DialogClose>

            <button
              type="button"
              onClick={() => editQuestionFunc(editId)}
              className="
                flex w-full
                items-center justify-center gap-2
                rounded-xl
                bg-primary
                px-5 py-2.5
                text-sm font-semibold
                text-primary-foreground
                shadow-sm
                shadow-primary/20
                transition-all
                hover:bg-primary/90
                hover:shadow-md
                hover:shadow-primary/20
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <Pencil size={16} />
              Edit Question
            </button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}