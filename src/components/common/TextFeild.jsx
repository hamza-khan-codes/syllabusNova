import InputInlineError from "./InlineError"


export default function TextFeild({ purpose ,register ,errors}) {
    const string = purpose.replaceAll(" ",'')
  return (
      <>
          <div className="relative mt-8">
                  <input
                    id={string}
                    type="text"
                    placeholder=""
                    className="
  peer
  w-full
  h-14
  rounded-lg
  foer
  text-foreground
  border-primary
  bg-background
  px-4
  outline-none
  transition-all
  focus:ring-2
  focus:ring-primary/20
  focus:border-primary
"
                    {...register(string, {
                      required: "Institude name is required.",
                    })}
                  />

                  <label
                    htmlFor={string}
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
                    {purpose}
                  </label>
                </div>
                <div className="error h-1 flex items-center">
                  {errors.string && (
                    <InputInlineError ErrorMsg={errors.string.message} />
                  )}
                </div>
      </>
  )
}
