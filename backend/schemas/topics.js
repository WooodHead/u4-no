import { title, longTitle, explainerText, featuredImage, slug } from './fields'

export default {
  name: 'topics',
  title: 'Topic',
  type: 'object',
  fields: [
    {
      title: 'Is this topic published (available on the website)',
      name: 'isPublished',
      type: 'boolean'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Short title',
      description: 'Keywords that people search. Not including "corruption". Max 5 words',
    },
    longTitle,
    explainerText,
    featuredImage,
    {
      name: 'parent',
      title: 'This is an area of…',
      description: 'This topic is an area of another topic',
      type: 'reference',
      to: [
        {
          type: 'topics'
        }
      ]
    },
    {
      name: 'introduction',
      title: 'Basic guide',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
        {
          type: 'reference',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        {
          type: 'image'
        }
      ]
    },
    {
      name: 'agenda',
      title: 'Research and policy agenda',
      type: 'array',
      of: [
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
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
        {
          type: 'reference',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        {
          type: 'image'
        }
      ]
    },
    {
      name: 'advisors',
      type: 'array',
      of: [
        {
          name: 'advisor',
          type: 'reference',
          to: [
            {
              type: 'person'
            }
          ]
        }
      ]
    },
    slug,
    {
      name: 'resources',
      description: 'Relevant resources for this topic page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article'
            },
            {
              type: 'publication'
            }
          ]
        }
      ]
    }
  ]
}
