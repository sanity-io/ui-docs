// {
//   /* <meta name="twitter:card" content="summary_large_image" class="jsx-1232615650">
// <meta name="twitter:site" content="@sanity_io" class="jsx-1232615650"></meta>

import {defineField, defineType} from 'sanity'

// <meta name="description" content="Build beyond your expectations with Sanity. The modern, developer friendly platform."></meta>
// <meta property="og:description" content="Build beyond your expectations with Sanity. The modern, developer-friendly platform."></meta>
// <meta property="og:image" content="https://cdn.sanity.io/images/3do82whm/next/99a373b08c338e0e1bf2c0fda5e0e29c0886cb64-3560x1872.png?rect=0,1,3560,1869&amp;w=1200&amp;h=630&amp;fm=png&amp;fit=fill&amp;auto=format"></meta>
// <meta property="og:url" content="https://www.sanity.io/"></meta>
// <meta property="og:site_name" content="Sanity.io"></meta>
// <meta property="og:title" content="The Ultimate Content Platform – Sanity.io"></meta>
// <meta property="og:type" content="website"></meta> */
// }

export const seoType = defineType({
  type: 'object',
  name: 'seo',
  title: 'SEO',
  fields: [
    defineField({
      type: 'object',
      name: 'twitter',
      title: 'Twitter',
      fields: [
        defineField({
          type: 'string',
          name: 'cardType',
          title: 'Card type',
          options: {
            list: [
              {
                title: 'summary_large_image',
                value: 'summary_large_image',
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'og',
      title: 'OpenGraph',
      fields: [
        defineField({
          type: 'string',
          name: 'type',
          title: 'Type',
          options: {
            list: [
              {
                title: 'website',
                value: 'website',
              },
            ],
          },
        }),
        defineField({
          type: 'string',
          name: 'title',
          title: 'Title',
        }),
        defineField({
          type: 'text',
          name: 'description',
          title: 'Description',
        }),
        defineField({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
})
