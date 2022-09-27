import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  type: 'document',
  name: 'settings',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
  ],
})
