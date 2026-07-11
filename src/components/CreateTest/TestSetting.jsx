import React from 'react'

export default function TestSetting() {
  return (
    <div> {/* Step 3: Test Settings */}
              <section className="space-y-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Test Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="material-symbols-outlined text-primary">
                          visibility
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            defaultChecked
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      <h5 className="font-bold text-on-surface mb-1">
                        Public Visibility
                      </h5>
                      <p className="text-xs text-on-surface-variant">
                        Make this test discoverable in the global explore bank.
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="material-symbols-outlined text-primary">
                          timer
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            defaultChecked
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      <h5 className="font-bold text-on-surface mb-1">
                        Timed Test
                      </h5>
                      <p className="text-xs text-on-surface-variant">
                        Students must complete the exam within the set section
                        limits.
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="material-symbols-outlined text-primary">
                          shuffle
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      <h5 className="font-bold text-on-surface mb-1">
                        Shuffle Questions
                      </h5>
                      <p className="text-xs text-on-surface-variant">
                        Each student receives questions in a randomized
                        sequence.
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="material-symbols-outlined text-primary">
                          error
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      <h5 className="font-bold text-on-surface mb-1">
                        Negative Marking
                      </h5>
                      <p className="text-xs text-on-surface-variant">
                        Deduct marks for incorrect answers (-0.25 by default).
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant border-dashed opacity-70 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="material-symbols-outlined text-on-surface-variant">
                          camera_indoor
                        </span>
                        <span className="text-[10px] font-bold text-primary uppercase bg-primary-container px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      </div>
                      <h5 className="font-bold text-on-surface mb-1">
                        AI Proctoring
                      </h5>
                      <p className="text-xs text-on-surface-variant">
                        Monitor webcam and tab switching using computer vision.
                      </p>
                    </div>
                  </div>
                </div>
              </section></div>
  )
}
