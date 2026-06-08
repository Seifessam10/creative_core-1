import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'projectType', type: 'string' }),
    defineField({ name: 'budgetRange', type: 'string' }),
    defineField({ name: 'timeline', type: 'string' }),
    defineField({ name: 'brief', type: 'text' }),
    defineField({ name: 'source', type: 'string' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['new', 'seen', 'replied'] },
      initialValue: 'new',
    }),
  ],
})
