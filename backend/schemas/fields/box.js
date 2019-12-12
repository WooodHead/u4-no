import annotations from './annotations';
import { image } from './';

const box = {
  name: 'box',
  title: 'Text box',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
            // Support annotating text with a reference to an author
            annotations,
          },
        },
        {
          type: 'reference',
          tile: 'Nugget',
          to: [
            {
              type: 'nugget',
            },
          ],
        },
        {
          type: 'pullQuote',
        },
        {
          type: 'funkyTable',
          options: {
            defaultNumRows: 3,
            defaultNumColumns: 3,
          },
        },
        image,
        {
          name: 'vimeo',
          title: 'Vimeo video',
          type: 'object',
          fields: [
            {
              name: 'src',
              title: 'URL to the vimeo video (not the whole embed code)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'size',
              title: 'Video size',
              description: 'Set size for the video player.',
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
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      blocks: 'content',
    },
    prepare(value) {
      const block = (value.blocks || []).find(block => block._type === 'block');
      return {
        title: block
          ? block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : '(click to add content)',
      };
    },
  },
};

export default box;
