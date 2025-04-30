import { defineField, defineType } from 'sanity'

export const portfolioType = defineType({
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
        defineField({
            name: 'projectLink',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'githubLink',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'technologies',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (rule) => rule.required(),
        }),
    ],
})