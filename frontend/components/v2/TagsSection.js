import React from 'react';

/**
 * TagsSection component to list topics and keywords (keyword categories: "regions" and "keywords")
 * Used in BlogEntry component, blog page
 *
 * @param {Array} topics
 * @param {Array} keywords
 */

export const TagsSection = ({ topics = [], keywords = [] }) => {
  return (
    <div className="tags-section">
      <h3 className="title">Tags</h3>
      {topics && (
        <div className="tags-section__row">
          <h6>Topics</h6>
          {topics.map((topic, index) => (
            <span className="topic" key={index}>
              {topic.title}
            </span>
          ))}
        </div>
      )}

      {keywords && (
        <div className="tags-section__row">
          <h6>Region</h6>
          {keywords
            .filter(keyword => keyword.category === 'region')
            .map((keyword, index) => (
              <span className="keyword" key={index}>
                {keyword.keyword}
              </span>
            ))}
        </div>
      )}

      {keywords && (
        <div className="tags-section__row">
          <h6>Keywords</h6>
          {keywords
            .filter(keyword => keyword.category === 'keyword')
            .map((keyword, index) => (
              <span className="keyword" key={index}>
                {keyword.keyword}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

// link:
// {topics.length > 0 && (
//   <p className="c-longform-grid__standard">
//     Related topics:{' '}
//     {topics.map(({ _ref = '', target = {} }) => (
//       <Link
//         key={_ref}
//         route="topic.entry"
//         params={{ slug: target.slug ? target.slug.current : '' }}
//       >
//         <a className="c-article-header__link-item">{target.title}</a>
//       </Link>
//     ))}
//   </p>
// )}