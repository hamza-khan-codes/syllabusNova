import React from "react";
import InputInlineError from "./InlineError";

export default function DropDownFeild({
  watch,
  register,
  errors,
  purpose,
  OPTIONS = [],
}) {
  const fieldName = purpose.replaceAll(" ", "");
  const selectedValue = watch(fieldName);

  return (
    <>
      <div className="relative mt-8">
        {selectedValue && (
          <label
            htmlFor={fieldName}
            className="
              absolute
              -top-2
              left-3
              z-10
              bg-background
              px-1
              text-xs
              text-primary
              pointer-events-none
            "
          >
            {purpose}
          </label>
        )}

        <select
          id={fieldName}
          defaultValue=""
          className="
            w-full
            h-14
            rounded-lg
            border
            border-border
            bg-background
            px-3
            text-foreground
            capitalize
            outline-none
            transition-all
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
          {...register(fieldName, {
            required: `${purpose} is required.`,
          })}
        >
          <option value="" disabled>
            Select {purpose}
          </option>

          {OPTIONS.map((option, index) => (
            <option
              value={option.value}
              key={index}
              className="capitalize"
            >
              {option.value}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-5 px-1 pt-1">
        {errors[fieldName] && (
          <InputInlineError
            ErrorMsg={errors[fieldName].message}
          />
        )}
      </div>
    </>
  );
}