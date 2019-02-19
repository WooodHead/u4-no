import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import FunkyTable from './FunkyTable';
import LineChart from './LineChart';
import BarChart from './BarChart';
import findFootnotes from './findFootnotes';
import findLinks from './findLinks';
import { PullQuote, Figure, Table } from './';
import printFootnoteSerializer from './print/printFootnoteSerializer';

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

const getTextValue = (block = '') => {
  if (block.props && block.props.node && block.props.node.children) {
    return block.props.node.children.map(getTextValue).join(' ');
  }
  return block.toString();
};

function printSerializers(blocks) {
  const footnotes = findFootnotes(blocks);
  const links = findLinks(blocks);

  return {
    types: {
      image: ({ node }) => <Figure {...node} />,
      pullQuote: ({ node: { text } }) => (
        <div {...classes('medium')}>
          <PullQuote>{text}</PullQuote>
        </div>
      ),
      nugget: ({ node: { text, title } }) => (
        <div {...classes('standard')}>
          <div {...classes('nugget')}>
            <h2 {...classes('nugget-title')}>{title}</h2>
            <BlockContent blocks={text} serializers={serializers} />
          </div>
        </div>
      ),
      funkyTable: ({ node: { display = 'table', rows = [], title = false } }) => {
        if (display === 'line') return <LineChart rows={rows} title={title} />;
        if (display === 'bar') return <BarChart rows={rows} title={title} />;
        return <FunkyTable rows={rows} title={title} />;
      },
      box: ({ node: { content = false } }) =>
        content && (
          <div className="c-longform-grid__standard c-textbox--longform">
            <BlockContent blocks={content} serializers={printSerializers(content)} />
          </div>
        ),
      table: ({ node }) => (
        <div {...classes('full')}>
          <Table {...node} />
        </div>
      ),
      block: ({ node, children }) => {
        const style = node.style || 'normal';

        // Heading?
        if (/^h\d/.test(style)) {
          const level = parseInt(style.slice(1), 10);
          const heading = children.map(getTextValue).join(' ');
          const id =
            typeof heading === 'string' && (level === 2 || level === 3)
              ? slugify(heading, { lower: true, remove: /[$*_+~.:()'"!:@]/g })
              : undefined;

          return React.createElement(
            style,
            { id, className: 'c-longform-grid__standard' },
            children,
          );
        }

        if (style === 'blockquote') {
          return (
            <div {...classes('large-right')}>
              <blockquote>{children}</blockquote>
            </div>
          );
        }

        return <p {...classes('standard')}>{children}</p>;
      },
    },

    list: ({ type, children }) => {
      if (type === 'bullet') {
        return <ul {...classes('standard', null, 'list-bullets')}>{children}</ul>;
      }

      return <ol {...classes('standard', null, 'list-numbered')}>{children}</ol>;
    },
    marks: {
      internalReferance: props => <a href={props.mark.href}>{props.children}</a>,
      link: (props) => {
        if (props.mark.href) {
          if (props.mark.href.match(/#_ftn(\d+)/)) {
            return null;
          }
          if (props.mark.href.match(/#_ftnref(\d+)/)) {
            return null;
          }
          return (
            <span>
              {props.children}
              <a className="fn" href={props.mark.href}>
                {props.mark.href}
              </a>
            </span>
          );
        }
        return null;
      },
      blockNote: ({ markKey = '', mark = {} }) => {
        if (!mark.content) return null;
        return (
          <span>
            {markKey && (
              <BlockContent
                blocks={footnotes[markKey]}
                serializers={printFootnoteSerializer(markKey)}
              />
            )}
          </span>
        );
      },
      footnote: ({ children, markKey = '' }) => (
        <span>
          <span>
            {markKey && (
              <BlockContent
                blocks={footnotes[markKey]}
                serializers={printFootnoteSerializer(markKey)}
              />
            )}
          </span>
        </span>
      ),
    },
  };
}

export default printSerializers;
