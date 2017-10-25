import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import BEMHelper from 'react-bem-helper';
import { ArrowRight } from '../components/icons';

const classes = BEMHelper({
  name: 'link-list',
  prefix: 'c-',
});

const LinkList = ({ title, content, otherClasses = null }) => (
  <ul {...classes(null, null, otherClasses)}>
    {title && <span>{title}</span>}
    { content.map(item =>
      (<li {...classes('item')}>
        <Link to={item.link}>
          <a {...classes('link')}>
            {item.title} <ArrowRight {...classes('icon')} />
          </a>
        </Link>
      </li>),
    )}
  </ul>
);

export default LinkList;