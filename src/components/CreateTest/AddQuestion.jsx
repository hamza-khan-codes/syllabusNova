
import {
  ArrowRight,
  FileSpreadsheet,
  FileText,
  Library,
  Plus,
  Sparkles,
} from "lucide-react";

import { ROUTES } from "@/constant/routes";
import useMoveToNext from "@/hooks/useMoveToNext";
import { useParams } from "react-router-dom";

export default function AddQuestion() {
  const moveToNext = useMoveToNext();
  const {testId} = useParams()


  const handleCreateNew = () => {
    moveToNext(ROUTES.CREATETEST + "/" + testId + "/" + ROUTES.ADDNEWQUESTION, true);
  };

  return (
    <section className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>

          <span className="text-sm font-medium text-primary">
            Step 4 of 5
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Add Questions
          </h3>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            Choose how you want to add questions to your test. You can create
            them manually, reuse existing questions, or import them in bulk.
          </p>
        </div>
      </div>

      {/* Create New */}
      <button
        type="button"
        onClick={handleCreateNew}
        className="group relative w-full overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Plus className="h-7 w-7" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-foreground">
                Create your first question
              </h4>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                Recommended
              </span>
            </div>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Design questions manually using the rich editor with support for
              multiple question types, answers, options, and explanations.
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </button>

      {/* Other Options */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Other options
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Import from Bank */}
          <button
            type="button"
            className="group rounded-2xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <Library className="h-5 w-5" />
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>

            <h4 className="mt-4 font-semibold text-foreground">
              Import from Bank
            </h4>

            <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
              Reuse questions from your existing question bank.
            </p>
          </button>

          {/* Upload PDF / Excel */}
          <button
            type="button"
            className="group rounded-2xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <FileSpreadsheet className="h-5 w-5" />
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>

            <h4 className="mt-4 font-semibold text-foreground">
              Upload PDF / Excel
            </h4>

            <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
              Bulk import questions using a supported template.
            </p>
          </button>

          {/* AI Question Generator */}
          <button
            type="button"
            className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 via-card to-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:col-span-2"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    AI Question Generator
                  </h4>

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                    AI
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Generate questions from your syllabus, topic, or study
                  material.
                </p>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          i
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          You can add more questions later. Your progress will be saved while
          creating the test.
        </p>
      </div>
    </section>
  );
}

