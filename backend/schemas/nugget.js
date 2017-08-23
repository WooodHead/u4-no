/**
 * A nugget is a bit of reusable information
 */
import {
  title,
  image,
} from './fields';

export default {
  name: 'nugget',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'text',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
    },
    image,
    {
      name: 'resources',
      type: 'reference',
      to: [
        {
          type: 'person'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text'
    },
    prepare({ title = '', subtitle = [] }) {
      console.log(subtitle)
      const firstTextLine = (subtitle ? subtitle[0].spans[0].text : 'Empty');
      return {
        title: title,
        subtitle: firstTextLine,
      };
    },
  },
}
