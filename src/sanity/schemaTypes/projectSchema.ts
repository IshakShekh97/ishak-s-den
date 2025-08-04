import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description:
        "A number to manually order the projects. Lower numbers appear first.",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      description: "Set to true to feature this project.",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "A unique URL-friendly identifier for the project.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "creationYear",
      title: "Creation Year",
      type: "number",
      validation: (rule) =>
        rule.required().min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "My Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview Paragraph",
      type: "text",
      description: "A brief summary of the project.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "designScreenshots",
      title: "Design Screen Shots",
      type: "array",
      description:
        "(Optional) Upload screenshots of the design process or final product.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Screenshot",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title/Caption",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      description: "List of technologies, frameworks, and tools used.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description: "(Optional) Detail the key features of the project.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Feature Title",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Feature Description",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Add tags for filtering and categorization (e.g., "Web App", "Mobile").',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "githubLink",
      title: "GitHub Link",
      type: "url",
    }),
    defineField({
      name: "liveLink",
      title: "Live Link",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
