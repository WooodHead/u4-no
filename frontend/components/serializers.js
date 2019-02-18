import { createElement } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import ReactPlayer from 'react-player';
import buildUrl from '../helpers/buildUrl';
import FunkyTable from './FunkyTable';
import LineChart from './LineChart';
import BarChart from './BarChart';
import {
  Figure,
  PullQuote,
  BoxOnBox,
  BoxOnBoxTopics,
  BoxOnImage,
  WorkshopMosaic,
  Feature,
  SimpleMosaic,
  Mosaic,
  ToggleTextBox,
} from './';
import { ArrowRight } from './icons';

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

const serializers = {
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
    heading: ({ node: { headingValue = '' } }) => (
      <h2
        id={slugify(headingValue, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-topic-section__title u-margin-bottom-none"
      >
        {headingValue}
      </h2>
    ),
    cta: ({ node: { ctaValue = '', ctaURL = '' } }) => (
      <h2 className="c-topic-section__cta">
        <a href={ctaURL}>
          {ctaValue} &nbsp;
          <ArrowRight />
        </a>
      </h2>
    ),
    box: ({ node: { content = false } }) =>
      content && (
        <div className="c-longform-grid__standard">
          <ToggleTextBox content={content} />
        </div>
      ),

    textBlock: ({ node: { text = false } }) =>
      text && (
        <div className="o-wrapper-inner c-article u-margin-top u-margin-bottom-large">
          <BlockContent blocks={text} serializers={serializers} />
        </div>
      ),

    oneColumn: ({ node: { text = false, colorScheme = 'darkOnWhite' } }) =>
      text && (
        <div className={`c-oneColumnBox c-oneColumnBox__${colorScheme}`}>
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
            <BlockContent blocks={text} serializers={serializers} />
          </div>
        </div>
      ),

    twoColumns: ({ node: { textLeft, textRight } }) => (
      <div className="o-wrapper-inner">
        <div className="c-columns c-columns--two">
          <div className="c-columns__item c-columns--two__item">
            <BlockContent blocks={textLeft} serializers={serializers} />
          </div>
          <div className="c-columns__item c-columns--two__item">
            <BlockContent blocks={textRight} serializers={serializers} />
          </div>
        </div>
      </div>
    ),
    boxOnBoxRef: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBox left={textLeft} right={textRight} />
      </section>
    ),
    boxOnBoxTopics: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBoxTopics left={textLeft} right={textRight} />
      </section>
    ),
    HelpdeskTeam: ({
      node: {
        textRight, img, headingLeft, headingRight, personLeft, personRight,
      },
    }) => (
      <section className="c-topic-section">
        <BoxOnImage
          wide
          text={textRight}
          image={img}
          headingLeft={headingLeft}
          headingRight={headingRight}
          personsLeft={personLeft}
          personsRight={personRight}
        />
      </section>
    ),
    boxOnImageRef: ({ node: { block, img } }) => (
      <section className="c-topic-section">
        <BoxOnImage text={block} image={img} />
      </section>
    ),
    workshops: ({ node: { workshopsRef } }) => (
      <div className="o-wrapper">
        <WorkshopMosaic resources={workshopsRef} />
      </div>
    ),
    expertAnswers: ({ node: { expertAnswersRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={expertAnswersRef} />
      </div>
    ),
    resources: ({ node: { resourcesRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={resourcesRef} />
      </div>
    ),
    assets: ({ node: { assetsRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={assetsRef} />
      </div>
    ),
    mosaic: ({ node: { itemsRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={itemsRef} />
      </div>
    ),
    courses: ({ node: { coursesRef } }) => (
      <div className="o-wrapper">
        <SimpleMosaic resources={coursesRef} cta="Register" />
      </div>
    ),
    vimeo: ({ node: { src, title } }) => (
      <div {...classes('full')}>
        <div className="u-bg-light-blue o-wrapper-full-width">
          <div className="o-wrapper o-wrapper-medium ">
            <h2 className="c-topic-section__title u-margin-top-large u-margin-bottom-huge">
              {title}
            </h2>
            <div className="u-video u-margin-bottom-huge">
              <ReactPlayer
                controls
                width="100%"
                vimeoConfig={{
                  preload: true,
                }}
                style={{
                  margin: '40px auto 40px',
                }}
                url={src}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    workshops: ({ node: { workshopsRef } }) => (
      <div className="o-wrapper">
        <WorkshopMosaic resources={workshopsRef} />
      </div>
    ),
    table: ({ node: { htmlStr = '', caption = [], title = '' } }) => (
      // We trust html content coming from Sanity and output it.
      <div {...classes('full')}>
        <h3
          id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
          className="u-margin-bottom-none"
        >
          {title}
        </h3>
        <div className="c-table" dangerouslySetInnerHTML={{ __html: htmlStr }} />
        <BlockContent blocks={caption} serializers={serializers} />
      </div>
    ),
    chart: ({ node: { htmlStr = '' } }) => (
      <div {...classes('larger')}>
        <div className="c-chart">Chart is not built yet.</div>
      </div>
    ),
    features: ({ node: { featureArray } }) => (
      <section className="o-wrapper c-topic-section">
        <div className="c-features">
          {featureArray.map(item => (
            <Feature title={item.featureText} iconUrl={item.image.asset.url} />
          ))}
        </div>
      </section>
    ),
    block: (props) => {
      const { node, children = [] } = props;
      const style = node.style || 'normal';
      // Heading?
      if (/^h\d/.test(style)) {
        const level = parseInt(style.slice(1), 10);
        const heading = children.map(getTextValue).join(' ');
        const id =
          typeof heading === 'string' && (level === 2 || level === 3)
            ? slugify(heading, { lower: true, remove: /[$*_+~.:()'"!:@]/g })
            : undefined;
        return createElement(style, { id, className: 'c-longform-grid__standard' }, children);
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
    internalReferance: (props) => {
      const { children = [], mark: { target: { slug = '', _type = '' } = {} } = {} } = props;
      return <a href={buildUrl({ _type, slug: slug.current })}>{children}</a>;
    },
    link: (props) => {
      if (props.mark.href) {
        if (props.mark.href.match(/#_ftn(\d+)/)) {
          const ref = props.mark.href.match(/#_ftn(\d+)/)[1];
          return (
            <sup id={`fnref:${ref}`}>
              <a href={`#fn:${ref}`} rel="footnote">
                {ref}
              </a>
            </sup>
          );
        }
        if (props.mark.href.match(/#_ftnref(\d+)/)) {
          const ref = props.mark.href.match(/#_ftnref(\d+)/)[1];
          return (
            <li className="c-footnote__item" id={`fn:${ref}`}>
              {props.children}
              <a href={`#fnref:${ref}`} title="return to article">
                {' '}
                ↩
              </a>
            </li>
          );
        }

        return <a href={props.mark.href}>{props.children}</a>;
      }
      return null;
    },
    blockNote: ({ children, markKey = '', mark = {} }) => {
      if (!mark.content) return <span />;
      return (
        <span>
          <span id={`fnref:${markKey}`}>
            <a href={`#fn:${markKey}`} rel="footnote">
              {markKey}
            </a>
          </span>
        </span>
      );
    },
    footnote: ({ children, mark = {}, markKey = '' }) => {
      if (!mark.content) return <span />;
      return (
        <span>
          {children}
          <span id={`fnref:${markKey}`}>
            <a href={`#fn:${markKey}`} rel="footnote">
              {markKey}
            </a>
          </span>
        </span>
      );
    },
  },
};
export default serializers;
