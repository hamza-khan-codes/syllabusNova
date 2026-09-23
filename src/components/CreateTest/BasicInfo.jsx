import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";
import { useState } from "react";
import imgController from "@/controllers/imgController";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import createTestSchema from "@/schema/createTestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputInlineError from "../common/InlineError";
import { useDispatch, useSelector } from "react-redux";
import { completeStep, setCurrentStep, updateInfo } from "@/features/CreateTest/createTestSlices";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { WORKFLOW_CREATETEST_STEPS } from "@/constant/workflow";
import { ArrowLeft, ArrowRight, Eye, FilePenLine, Rocket } from "lucide-react";

export default function BasicInfo() {


  return (
    <>
      <Toaster />
      <form
        id="AddInfo"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        {" "}
        {/* Step 1: Basic Information */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Basic Information
            </h3>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Step 1 of 5
            </span>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 col-span-full">
                <label className="font-label-md text-on-surface-variant block">
                  Test Title
                </label>
                <input
                  className="w-full   rounded-md py-4 px-6 focus:ring-1 border focus:ring-primary transition-all text-body-md outline-none"
                  placeholder="e.g. Mid-Term Advanced Quantum Physics 2026"
                  type="text"
                  {...register("title", { required: "Title is required." })}
                />
              </div>
              <div className="error h-1 flex items-center text-white ">
                {errors.title && (
                  <InputInlineError ErrorMsg={errors.title.message} />
                )}
              </div>
              <div className="space-y-4 col-span-full">
                <label className="font-label-md text-on-surface-variant block">
                  Description
                </label>
                <textarea
                  className="w-full border rounded-md py-4 px-6 focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
                  placeholder="Detailed syllabus, rules, and objectives for the test..."
                  rows={4}
                  {...register("description")}
                />
                <div className="error h-1 flex items-center text-white ">
                  {errors.description && (
                    <InputInlineError ErrorMsg={errors.description.message} />
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <label className="font-label-md text-on-surface-variant block">
                  Category
                </label>
                <select
                  className={
                    "w-full  border outline-none rounded-md focus:border-primary py-4 px-6  transition-all  appearance-none"
                  }
                  {...register("category")}
                >
                  {examType.map((e) => (
                    <option
                      key={e.type}
                      className="bg-muted text-muted-foreground"
                      value={e.type}
                    >
                      {e.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <label className="font-label-md text-on-surface-variant block">
                  Difficulty
                </label>
                <select
                  className={
                    "w-full rounded-md border outline-none focus:border-primary py-4 px-6  transition-all  appearance-none"
                  }
                  {...register("difficulty")}
                >
                  {examLevel.map((e) => (
                    <option
                      key={e.type}
                      className="bg-muted text-muted-foreground "
                      value={e.type}
                    >
                      {e.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4 ">
              <label className="font-label-md text-on-surface-variant block">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-outline-variant rounded-3xl p-6 flex flex-col items-center justify-center bg-surface hover:bg-primary-container/10 transition-colors cursor-pointer min-h-40 relative">
                {(() => {
                  const coverRegister = register("cover");
                  return (
                    <input
                      type="file"
                      accept="image/*"
                      {...coverRegister}
                      onChange={(e) => {
                        coverRegister.onChange(e);
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          setCoverPreview(URL.createObjectURL(file));
                        } else {
                          setCoverPreview(null);
                        }
                      }}
                      className="w-full opacity-0 absolute inset-0 cursor-pointer"
                    />
                  );
                })()}
                <span className="material-symbols-outlined text-primary text-4xl mb-2">
                  wallpaper
                </span>
                <p className="text-sm font-medium text-on-surface">
                  Upload wide cover image
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Optimal: 1200x400px
                </p>
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="cover preview"
                    className="mt-3 max-h-40 rounded-md"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="h-32" />
      </form>
      <footer className="fixed  bottom-0 left-0 xl:left-64 right-0 bg-background border-t px-lg py-4 z-40 flex items-center justify-between">
              <button className="px-6 py-2 rounded-lg border border-muted-foreground hover:border-white text-muted-foreground cursor-pointer hover:text-white transition-colors flex items-center gap-2">
                Back
              </button>
              <div className="flex items-center gap-3">


                <button
                  type="submit"
                  form="AddInfo"
                  className="px-8 py-2.5 rounded-lg bg-success  font-bold hover:bg-success/90 cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-success/20 disabled:cursor-not-allowed disabled:scale-none disabled:bg-muted/30 disabled:text-muted-foreground disabled:border-muted-foreground text-primary-foreground  active:scale-95"
                >
                  <ArrowRight size={20} className="" />  Next
                </button>
              </div>
            </footer>
    </>
  );
}
