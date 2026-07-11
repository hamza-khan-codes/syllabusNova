import React from "react";
import InputInlineError from "./InlineError";

export default function DropDownFeild({
  watch,
  register,
  errors,
  purpose,
  OPTIONS = {},
}) {
  const selectedQualification = watch("string");
  const string = purpose.replaceAll(" ", "");
  return (
    <>
      <div className="relative mt-8">
        {selectedQualification && (
          <label
            htmlFor={string}
            className="      
          
                text-primary
                transition-all
                duration-200
                pointer-events-none
                text-xs
                ml-2
                "
          >
            Last Qulification
          </label>
        )}
        <select
          name={string}
          id={string}
          className="peer w-full capitalize border h-14 rounded text-muted-foreground pl-2 outline-none transition-all focus:ring-2 focus:ring-primary/20"
          {...register("string", {
            required: "Last Qulification is required.",
          })}
          defaultValue=""
        >
          <option
            value=""
            className="text-muted-foreground capitalize font-semibold bg-muted p-2"
          >
            Select {purpose}
          </option>
          {OPTIONS.map((q, i) => {
            return (
              <option
                value={q.value}
                key={i}
                className="text-muted-foreground capitalize font-semibold bg-muted "
              >
                {q.value}
              </option>
            );
          })}
        </select>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]"></span>
        </button>
      </div>
      <div className="error h-1 flex items-center">
        {errors.string && <InputInlineError ErrorMsg={errors.string.message} />}
      </div>
    </>
  );
}
