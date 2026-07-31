import { z } from "zod";

export const addNewQuestionSchema = z
  .object({
    question: z
      .string()
      .trim()
      .min(3, "Question must be at least 3 characters long.")
      .max(350, "Question cannot exceed 350 characters."),

    section: z.string(),
    difficulty: z.string().min(1, "Please select a difficulty"),

    isMultiple: z.boolean(),

    options: z
      .array(
        z.object({
          optionId: z.string().uuid("Invalid option ID"),

          text: z.string().trim().min(1, "Option cannot be empty"),
        }),
      )
      .min(2, "At least 2 options are required")
      .max(4, "Maximum 4 options are allowed")
      .superRefine((options, ctx) => {
        const container = [];
        options.map((option, idx) => {
          if (
            container.some((text) => option.text.trim().toLowerCase() === text)
          ) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Duplicate option are not Allowed.",
              path: [idx, "text"],
            });
          } else {
            container.push(option.text.trim().toLowerCase());
          }
        });
      }),
    correctAnswer: z.array(z.string().uuid()),
    sectionId: z.string(),
    topic: z
      .string()
      .min(3, "Minimum 3 characters required.")
      .max(350, "Maximum 50 characters allowed."),
    questionId: z.string().uuid(),
    marks: z.number(),
    status: z.string().trim(),
    isSectionWise: z.boolean(),
  }).superRefine((data, ctx) => {
  if (data.isSectionWise && data.section.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["section"],
      message: "Please select section.",
    });
  }
})

