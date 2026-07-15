import z from "zod"

const createTestSchema = z.object({
  title: z
    .string().trim()
    .min(1, "Title is required.")
    .min(5, "Title must be at least 5 characters.")
    .max(200, "Maximum 200 characters."),

  description: z
    .string()
    .trim().min(1,"Discription is required.")
    .min(10, "Description must be at least 10 characters.")
    .max(400,"Maximum 400 characters."),

  category: z
    .string()
    .min(1, "Select a category"),

  difficulty: z
    .string()
    .min(1, "Select a difficulty"),

  cover: z
  .any()
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;

      const file = files[0];

      return (
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(file.type) &&
        file.size <= 5 * 1024 * 1024
      );
    },
    {
      message: "Upload a JPG, JPEG, PNG, or WebP image under 5MB.",
    }
  )
  .optional(),
});

export default createTestSchema;
