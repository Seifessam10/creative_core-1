import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'displayName', type: 'string' }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({
      name: 'profilePhoto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'instagram', type: 'string' }),
    defineField({ name: 'behance', type: 'url' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'inquiryEmail', type: 'string' }),
    defineField({
      name: 'acceptingInquiries',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
