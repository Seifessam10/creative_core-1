import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'startingPrice', type: 'string' }),
    defineField({ name: 'turnaround', type: 'string' }),
    defineField({
      name: 'visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
