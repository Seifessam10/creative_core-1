import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'client', type: 'string' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Apparel', 'Branding', 'Identity', 'Accessories'] },
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
})
