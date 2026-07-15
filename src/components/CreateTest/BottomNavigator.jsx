import React from 'react'

export default function BottomNavigator() {
  return (
      <>
          {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-5 py-3 text-on-surface-variant font-bold flex items-center gap-2 hover:bg-surface-container-high rounded-xl transition-colors">
              <span className="material-symbols-outlined">arrow_back</span> Back
            </button>
            <div className="h-6 w-px bg-outline-variant mx-2" />
            <p className="text-sm font-medium text-on-surface-variant">
              Drafting:{" "}
              <span className="text-on-surface font-bold italic">
                "Mid-Term Advanced Quantum Physics"
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-3 text-on-surface-variant font-bold hover:bg-surface-container-high rounded-xl transition-colors">
              Save Draft
            </button>
            <button className="px-5 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
              Preview Mode
            </button>
            <button
              type="submit"
              form="createTestForm"
              className="px-8 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              Publish Test{" "}
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
    </>
  )
}
