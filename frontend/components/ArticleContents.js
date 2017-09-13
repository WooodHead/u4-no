import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import BlockContent from '@sanity/block-content-to-react';
import randomKey from '../helpers/randomKey';

function findTitles(articleContents) {
  return articleContents.reduce((result, elem) => {
    if (elem.style === 'h2') {
      result.push({
        style: 'h2',
        title: elem.spans[0].text,
      });
    }
    return result;
  }, []);
}

const getClassName = menuItem => `o-list-bare__item menu__item menu__item--${menuItem.style}`;

const ArticleContents = ({ content = [] }) => (
  <ul className="o-list-bare">
    {findTitles(content).map(menuItem => (
      <li key={randomKey()} className={getClassName(menuItem)}>
        <a href={`#${slugify(menuItem.title, { lower: true })}`}>{menuItem.title}</a>
      </li>
    ))}
  </ul>
);

export default ArticleContents;
