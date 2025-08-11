import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  client: z.string().min(1, { message: "Client is required." }),
  overview: z.string().optional(),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 5, {
      message: "Please enter a valid year.",
    }),
  coverImage: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size > 0, {
          message: "Cover image is required.",
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "Cover image must be less than 5MB.",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "Cover image must be an image file.",
        }),
      z.string().url({ message: "Cover image URL must be valid." }),
    ])
    .transform((val) => val),
  techStack: z.array(z.string()).min(1, {
    message: "At least one technology is required.",
  }),
  features: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Feature title is required." }),
        description: z
          .string()
          .min(1, { message: "Feature description is required." }),
      })
    )
    .default([]),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
  isFeatures: z.boolean().default(false),
  githubLink: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "GitHub link must be a valid URL." }
    ),
  liveLink: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Live link must be a valid URL." }
    ),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;
