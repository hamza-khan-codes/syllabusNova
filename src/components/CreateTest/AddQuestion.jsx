import { ROUTES } from '@/constant/routes'
import { changeStepPath } from '@/features/CreateTest/createTestSlices'
import useMoveToNext from '@/hooks/useMoveToNext'
import React from 'react'


export default function AddQuestion() {
  const moveToNext = useMoveToNext()
  return (
    <div> {/* Step 4: Add Questions */}
              <section className="space-y-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Add Questions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div onClick={()=>moveToNext(ROUTES.ADDNEWQUESTION,true)} className="bg-card p-8 border border-outline-variant rounded-3xl hover:border-primary hover:shadow-lg transition-all group cursor-pointer text-center">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">
                        edit_note
                      </span>
                    </div>
                    <h4 className="font-bold text-on-surface">Create New</h4>
                    <p className="text-sm text-on-surface-variant mt-2">
                      Design questions manually using our rich editor.
                    </p>
                  </div>
                  <div className="bg-card p-8 border border-outline-variant rounded-3xl hover:border-primary hover:shadow-lg transition-all group cursor-pointer text-center">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">
                        inventory_2
                      </span>
                    </div>
                    <h4 className="font-bold text-on-surface">
                      Import from Bank
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-2">
                      Reuse questions from your organization's database.
                    </p>
                  </div>
                  <div className="bg-card p-8 border border-outline-variant rounded-3xl hover:border-primary hover:shadow-lg transition-all group cursor-pointer text-center">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">
                        upload_file
                      </span>
                    </div>
                    <h4 className="font-bold text-on-surface">
                      Upload PDF/Excel
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-2">
                      Bulk import questions using standardized templates.
                    </p>
                  </div>
                  <div className="bg-card p-8 border border-primary/40 rounded-3xl hover:border-primary hover:shadow-lg transition-all group cursor-pointer text-center bg-linear-to-br from-primary/5 to-transparent">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-on-primary shadow-lg shadow-primary/30">
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        auto_awesome
                      </span>
                    </div>
                    <h4 className="font-bold text-on-surface">
                      AI Question Generator
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-2">
                      Generate questions instantly from text or syllabus.
                    </p>
                  </div>
                </div>
      </section>
    </div>
  )
}
