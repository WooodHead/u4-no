import { title, longTitle, image, leadText, featuredImage, slug, license } from './fields'
import annotationsLinksOnly from './fields/annotationsLinksOnly'

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    title,
    longTitle,
    leadText,
    featuredImage,
    {
      name: 'content',
      title: 'Content blocks',
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
            annotations: annotationsLinksOnly
          },
        },
        {
          name: 'heading',
          title: 'Centered heading',
          type: 'object',
          fields: [
            {
              name: 'headingValue',
              type: 'string',
            }
          ]
        },
        {
          name: 'textBlock',
          title: 'Text field',
          type: 'object',
          fields: [
            {
              name: 'text',
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
                    annotations: annotationsLinksOnly
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'features',
          title: 'Features',
          type: 'object',
          fields: [
            {
              name: 'featureArray',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    image,
                    {
                      name: 'featureText',
                      type: 'text',
                    },
                  ]
                }
              ]
            }
          ],
        },
        {
          name: 'workshops',
          title: 'Workshops list',
          type: 'object',
          fields: [
            {
              name: 'workshopsRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'event'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'courses',
          title: 'Courses list',
          type: 'object',
          fields: [
            {
              name: 'coursesRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'course'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'cta',
          title: 'Call to action link',
          type: 'object',
          fields: [
            {
              name: 'ctaValue',
              title: 'Lenketekst',
              type: 'string',
            },
            {
              name: 'ctaURL',
              title: 'URL',
              type: 'string',
            }
          ]
        },
        {
          name: 'boxOnBoxRef',
          title: 'Two text boxes',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [{
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
                  annotations: annotationsLinksOnly
                },
              }],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [{
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
                  annotations: annotationsLinksOnly
                }
              }],
            },
          ],
          preview: {
            select: {
              blocks: 'textLeft',
              blocks2: 'textRight',
            },
            prepare({ blocks, blocks2 }) {
                const block = (blocks || []).find(block => block._type === 'block')
                const block2 = (blocks2 || []).find(block => block._type === 'block')
                return {
                  title: block
                    ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title',
                  subtitle: block2
                    ? block2.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title'
                }
            },
          }
        },
        {
          name: 'boxOnImageRef',
          title: 'Text box on image',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
              type: 'image',
              fields: [
                {
                  name: 'altText',
                  title: 'Alternative text',
                  description: 'For users that can\'t see images',
                  type: 'string'
                },
                {
                  name: 'caption',
                  title: 'Caption text',
                  description: 'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [],
                      marks: {
                        // Only allow these decorators
                        decorators: [
                          { title: 'Emphasis', value: 'em' }
                        ],
                      },
                    },
                  ],
                },
                {
                  name: 'size',
                  title: 'Image size',
                  description: 'Set size for image in frontend that supports it',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'wide', value: 'wide' },
                      { title: 'normal', value: 'normal' },
                      { title: 'small', value: 'small' },
                      { title: 'narrow', value: 'narrow' },
                    ],
                  },
                },
                {
                  name: 'credit',
                  title: 'Credit',
                  description: 'Photographer/publisher’s name.',
                  type: 'text'
                },
                {
                  name: 'sourceUrl',
                  title: 'Credit URL',
                  type: 'url',
                  description: 'Enter link for source for the image or the originator'
                },
                license,
              ]
            },
            {
              name: 'block',
              title: 'Text in right hand box',
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
                    annotations: annotationsLinksOnly
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              blocks: 'block',
            },
            prepare({ blocks }) {
                const block = (blocks || []).find(block => block._type === 'block')
                return {
                  title: block
                    ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title'
                }
            },
          },
        },
        {
          type: 'reference',
          title: '',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        image,

      ]
    },
    slug
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
