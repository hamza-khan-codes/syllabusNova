import React from "react";
import InputInlineError from "./InlineError";

export default function NameFeild({ register, errors }) {
  return (
    <>
      <div className="relative">
        <input
          id="name"
          type="text"
          placeholder=""
          className="peer border w-full h-14 rounded bg-surface-container-low px-4  outline-none transition-all focus:ring-2 focus:ring-primary/20"
          {...register("name", {
            required: "Name is required.",
            validate: {
              minLength: (value) =>
                value.length >= 3 || "Name must be at least 3 characters",
            },
          })}
        />

        <label
          htmlFor="name"
          className="
      absolute
      left-5
      top-4
      text-muted-foreground
      transition-all
      duration-200
      pointer-events-none

      peer-placeholder-shown:top-4
      peer-placeholder-shown:text-base

      peer-focus:top-1
      peer-focus:left-0
      peer-focus:text-xs
      peer-focus:text-primary

      peer-not-placeholder-shown:top-0
      peer-not-placeholder-shown:left-0
      peer-not-placeholder-shown:text-base
    "
        >
          Your Full Name
        </label>
      </div>
      <div className="error h-1 flex items-center">
        {errors.name && <InputInlineError ErrorMsg={errors.name.message} />}
      </div>
    </>
  );
}
