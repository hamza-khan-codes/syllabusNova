import { Badge } from "../common/ui/Badge";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import DOMPurify from "dompurify";

export default function QuestionPreview({
  isOpen = true,
  setIsOpen,
  editQuestionFunc,
  badgeObj = [{ value: "math" }],
  question,
  options = [],
  correctOptionId = [],
  editId
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col w-[95vw] sm:max-w-[95vw] h-[90vh] "
      >
        <div className="flex items-start justify-between gap-4 border-b px-6 py-5">
          <div className="min-w-0 space-y-3">
            <DialogTitle className="text-lg font-semibold tracking-tight sm:text-xl">
              Question Preview
            </DialogTitle>
            <div className="flex flex-wrap gap-2">
              {badgeObj.map((b) => (
                <Badge className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {b?.value}
                </Badge>
              ))}
            </div>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close question preview"
              className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </DialogClose>
        </div>

        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground px-6 py-6">
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Question Stem
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(question),
              }}
              className="text-base leading-relaxed text-foreground sm:text-lg"
            />
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Options
            </p>
            <div className="grid gap-3">
              {options?.map((o, i) => {
                const isCorrect = correctOptionId.includes(o.optionId);
                return (
                  <div className={`${isCorrect?"border-success":"bg-background"} rounded-lg flex justify-between border  p-4 text-sm text-foreground sm:text-base`}>
                    <span>
                      {String.fromCharCode(65 + i)}) {o.text}
                    </span>
                    {isCorrect && <span
                      className="material-symbols-outlined shrink-0 text-success"
                      aria-label="Correct answer"
                    >
                      check_circle
                    </span>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { editQuestionFunc(editId) }}
              className="flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted sm:flex-none"
            >
              Edit Question
            </button>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="w-full rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Close Preview
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
