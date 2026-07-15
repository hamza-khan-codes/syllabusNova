import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";

const SectionConfiguration = ({
  visible = "visible",
  open,
  setOpen,
  sections,
  setSections,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [secDelete, setSecDelete] = useState({
    title: "",
  });

  const handleAddSection = () => {
    setOpen(true);
  };

  const handleDeleteSection = () => {
    const clean = sections.filter((s) => {
      return s.title !== secDelete.title
    })
    setSections(clean)
    return setConfirm(false)
  };

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
                  Delete Section
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this section? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted/60 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              command="close"
              commandfor="dialog"
              className="inline-flex w-full justify-center rounded-md bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground shadow-xs transition-colors hover:bg-destructive/90 sm:ml-3 sm:w-auto"
              onClick={handleDeleteSection}
            >
              Delete
            </button>
            <DialogClose className="mt-3 inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-xs ring-1 ring-border transition-colors hover:bg-muted sm:mt-0 sm:w-auto cursor-pointer">
              Cancel
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <section
        className={cn(
          "flex min-h-75 flex-col overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-[height] duration-30000",
          visible === "hidden" && "h-0 min-h-0 p-0",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            Section Configuration
          </h3>
          <button
            onClick={handleAddSection}
            type="button"
            disabled={sections.length === 5}
            className="flex cursor-pointer text-sm items-center gap-1 rounded-xl  p-1 px-1.5 disabled:bg-transparent disabled:scale-none
            disabled:cursor-not-allowed text-primary disabled:text-muted-foreground border-primary  
            font-semibold transition-all active:scale-95 hover:bg-muted"
          >
            <span className="material-symbols-outlined text-sm ">add</span>
            <span className=" font-bold">Add Section</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {sections.map((s, idx) => (
            <div
              className="flex items-center justify-between rounded-xl border border-border/60  p-3 shadow-sm bg-background"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                  {idx + 1}
                </div>
                <div>
                  <h5 className="font-bold capitalize text-foreground">
                    {s.title}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {s?.questions} Questions • {s?.duration} Minutes
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
                onClick={() => {
                  setConfirm(true);
                  setSecDelete({ title: s.title });
                  console.log(s.title)
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>

        {sections.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80">
              <span className="material-symbols-outlined text-3xl text-muted-foreground/70">
                layers_clear
              </span>
            </div>
            <h4 className="text-lg font-semibold text-muted-foreground">
              No sections added yet
            </h4>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground/70">
              Add a section to start structuring your exam questions and scoring
              rules.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default SectionConfiguration;
