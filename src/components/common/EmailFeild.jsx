import InputInlineError from "./InlineError";


export default function EmailFeild({register,errors}) {
  return (
      <>
          <div className="relative mt-8">
                            <input
                              id="email"
                              type="email"
                              placeholder=" "
                              className="peer border w-full h-14 rounded bg-background px-4  outline-none transition-all focus:ring-2 focus:ring-primary/20"
                              {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              
                              })}
                            />
          
                            <label
                              htmlFor="email"
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
                              Email Address
                            </label>
                          </div>
                          <div className="error h-1 flex items-center">
                            {errors.email && (
                              <InputInlineError ErrorMsg={errors.email.message} />
                            )}
                          </div>
      </>
  )
}
