import { title, leadText, featuredImage, language, slug } from './fields'

export default {
  title: 'Course Type',
  name: 'courseType',
  type: 'document',
  fields: [
    title,
    leadText,
    {
      name: 'content',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
      ],
    },
    language,
    {
      name: 'contact',
      title: 'Contact person',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    {
      name: 'topics',
      description: 'Select relevant U4 topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          weak: true,
          to: [
            {
              type: 'topics'
            }
          ]
        }
      ],
      preview: {
        title: 'topics.title'
      }
    },
    slug,
    {
      title: 'Legacy waiting list number',
      name: 'waitingListId',
      type: 'number'
    }
  ],
}
