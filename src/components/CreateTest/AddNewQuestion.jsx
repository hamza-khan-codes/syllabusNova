import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function AddNewQuestion() {
  const [question, setQuestion] = useState(
    "What is the derivative of $x^{2}$?",
    );
    
                //     <ReactMarkdown
                //   remarkPlugins={[remarkMath]}
                //   rehypePlugins={[rehypeKatex]}
                // >
                //   {question}
                // </ReactMarkdown>

  return (
    <>
      {/* BEGIN: MainLayout */}
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 bg-darker">
          {/* Main Scrollable Content Area */}
          <main className="flex-1 overflow-hidden flex">
            {/* BEGIN: CenterEditor */}
            <section
              className="flex-1 overflow-y-auto p-8"
              data-purpose="question-editor"
            >
              <div className="max-w-4xl mx-auto">
                <a
                  className="flex items-center gap-2 text-textMuted text-sm mb-6 hover:text-white transition-colors"
                  href="#"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Back to Questions List
                </a>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Add Question</h1>
                    <p className="text-textMuted text-sm">
                      Create a new question for your test
                    </p>
                  </div>
                  <div className="w-72">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium">Question 12 of 60</span>
                      <span className="text-textMuted">20%</span>
                    </div>
                    <div className="w-full bg-dark border border-border h-2 rounded-full overflow-hidden">
                      <div className="bg-brand h-full w-[20%]" />
                    </div>
                  </div>
                </div>
                {/* BEGIN: QuestionInputContainer */}
                <div className="bg-dark border border-border rounded-xl p-6 mb-6">
                  <label className="block text-sm font-semibold mb-3">
                    Question <span className="text-red-500">*</span>
                  </label>
                  {/* Editor Toolbar Mock */}
                  <div className="flex items-center gap-4 bg-[#0D1117] border border-border rounded-t-lg px-4 py-2 border-b-0">
                    <div className="flex gap-2 border-r border-border pr-4">
                      <button className="w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-gray-800 rounded">
                        B
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center text-sm italic hover:bg-gray-800 rounded">
                        I
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center text-sm underline hover:bg-gray-800 rounded">
                        U
                      </button>
                    </div>
                    <div className="flex gap-2 border-r border-border pr-4">
                      <button className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 6h12M4 10h12M4 14h12" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2 border-r border-border pr-4">
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-800 rounded italic font-serif">
                        fx
                      </button>
                    </div>
                  </div>
                  <textarea
                    className="w-full bg-[#0D1117] border border-border rounded-b-lg p-4 min-h-35 text-lg"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                {/* END: QuestionInputContainer */}
                {/* BEGIN: OptionsContainer */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold">
                      Options <span className="text-red-500">*</span>
                    </label>
                    <button className="text-brand text-sm font-semibold flex items-center gap-1 hover:underline">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Add Option
                    </button>
                  </div>
                  <div className="space-y-4">
                    {/* Option A */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full border-2 border-border shrink-0 cursor-pointer" />
                      <div className="flex-1 flex items-center bg-dark border border-border rounded-lg px-4 py-3">
                        <span className="w-8 text-textMuted font-bold text-xs uppercase">
                          A
                        </span>
                        <input
                          className="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1"
                          type="text"
                          defaultValue="x"
                        />
                      </div>
                      <button className="text-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Option B (Selected) */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full border-2 border-brand bg-darker flex items-center justify-center shrink-0 cursor-pointer">
                        <div className="w-3 h-3 rounded-full bg-brand" />
                      </div>
                      <div className="flex-1 flex items-center bg-dark border border-border rounded-lg px-4 py-3 ring-1 ring-brand/50">
                        <span className="w-8 text-textMuted font-bold text-xs uppercase">
                          B
                        </span>
                        <input
                          className="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1"
                          type="text"
                          defaultValue="2x"
                        />
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/20">
                          Correct Answer
                        </span>
                      </div>
                      <button className="text-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Option C */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full border-2 border-border shrink-0 cursor-pointer" />
                      <div className="flex-1 flex items-center bg-dark border border-border rounded-lg px-4 py-3">
                        <span className="w-8 text-textMuted font-bold text-xs uppercase">
                          C
                        </span>
                        <input
                          className="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1"
                          type="text"
                          defaultValue="x^2"
                        />
                      </div>
                      <button className="text-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Option D */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full border-2 border-border shrink-0 cursor-pointer" />
                      <div className="flex-1 flex items-center bg-dark border border-border rounded-lg px-4 py-3">
                        <span className="w-8 text-textMuted font-bold text-xs uppercase">
                          D
                        </span>
                        <input
                          className="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1"
                          type="text"
                          defaultValue={2}
                        />
                      </div>
                      <button className="text-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* END: OptionsContainer */}
                {/* BEGIN: MetadataSelectors */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Section <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 appearance-none focus:ring-brand focus:border-brand text-sm">
                        <option>Mathematics</option>
                        <option>Science</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                          className="w-4 h-4 text-textMuted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Marks <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 appearance-none focus:ring-brand focus:border-brand text-sm">
                        <option>2</option>
                        <option>5</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                          className="w-4 h-4 text-textMuted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Difficulty
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      </div>
                      <select className="w-full bg-dark border border-border rounded-lg pl-8 pr-4 py-2.5 appearance-none focus:ring-brand focus:border-brand text-sm">
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                          className="w-4 h-4 text-textMuted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END: MetadataSelectors */}
                {/* BEGIN: FormFooter */}
                <div className="flex items-center justify-between pt-8 border-t border-border">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-dark border border-border rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    Save Draft
                  </button>
                  <button className="flex items-center gap-2 px-8 py-2.5 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90 transition-colors">
                    Save &amp; Next Question
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>
                </div>
                {/* END: FormFooter */}
              </div>
            </section>
            {/* END: CenterEditor */}
            {/* BEGIN: RightSidePanel */}
          </main>
        </div>
      </div>
    </>
  );
}
