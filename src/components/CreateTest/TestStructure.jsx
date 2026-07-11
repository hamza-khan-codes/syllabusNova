import { useForm } from "react-hook-form";

export default function TestStructure() {
    const { register, handleSubmit } = useForm({

    });
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div>
      {/* Step 2: Test Structure */}
      <form onSubmit={handleSubmit(onSubmit)}>

      <section className="space-y-6">
        <>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Test Structure
          </h3>
          <input
            className="hiddn"
            type="radio"
            {...register("sectionType")}
            value="single"
            id="singleSec"
            defaultChecked
          />
          <input
            className="hiddn"
            type="radio"
            {...register("sectionType")}
            value="multi"
            id="multiSec"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label
              htmlFor="singleSec"
              className="p-6 bg-surface-container-lowest border border-outline-variant rounded-3xl cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-primary" />
              </div>
              <h4 className="font-bold text-on-surface mb-1">
                Single Section Quiz
              </h4>
              <p className="text-sm text-on-surface-variant">
                One continuous flow of questions. Ideal for short weekly
                assessments.
              </p>
            </label>

            <label
              htmlFor="multiSec"
              className="p-6 bg-surface-container-lowest border-2 border-primary rounded-3xl cursor-pointer shadow-md transition-all relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">layers</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xs">
                    check
                  </span>
                </div>
              </div>
              <h4 className="font-bold text-on-surface mb-1">
                Multi-Section Exam
              </h4>
              <p className="text-sm text-on-surface-variant">
                Segmented into subjects or topics. Recommended for final and
                mid-term exams.
              </p>
            </label>
          </div>
        </>
        {/* Section Builder */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-label-md text-on-surface-variant uppercase tracking-wider">
              Section Builder
            </h4>
            <button className="text-primary font-bold flex items-center gap-1 text-sm hover:underline">
              <span className="material-symbols-outlined text-sm">add</span> Add
              Section
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">
                drag_indicator
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-on-surface">Mathematics</h5>
                  <span className="text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium">
                    Auto-Graded
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Calculus, Linear Algebra, Statistics
                </p>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Questions
                  </p>
                  <p className="font-bold text-on-surface">25</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Time
                  </p>
                  <p className="font-bold text-on-surface">45m</p>
                </div>
              </div>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">
                drag_indicator
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-on-surface">Physics</h5>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Thermodynamics, Electromagnetism
                </p>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Questions
                  </p>
                  <p className="font-bold text-on-surface">20</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Time
                  </p>
                  <p className="font-bold text-on-surface">40m</p>
                </div>
              </div>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant flex items-center gap-4 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">
                drag_indicator
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-on-surface">Chemistry</h5>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Organic Chemistry, Periodicity
                </p>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Questions
                  </p>
                  <p className="font-bold text-on-surface">15</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Time
                  </p>
                  <p className="font-bold text-on-surface">30m</p>
                </div>
              </div>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      </form>
    </div>
  );
}
