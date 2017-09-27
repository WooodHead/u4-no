import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey'

const PublicationArticleHeader = ({
  title = 'no title',
  subtitle = 'no subtitle',
  lead = 'no lead',
  topics = [],
  className = '',
}) => (
  <header className={`${className} c-article-header`}>
    {/* Wrap in standard grid width until we know better */}
    <div className="c-article-header__meta">
      <a href>U4 Brief</a> |{' '}
      {topics.map(({ title = '', _id = '' }) => (
        <a href key={_id}>
          {title}
        </a>
      ))}
    </div>
    <div>
      <h1 className="c-article-header__title">{title}</h1>
    </div>
    <div>
      <p className="c-article-header__subtitle">{subtitle}</p>
      <div className="c-article-header__meta">
        By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman </a>
        | Bergen: Chr. Michelsen Institute (U4 Issue 2017:3) <br />
        Photography by <a href="#">Dani Deahl</a>
      </div>
      <div className="c-article-header__summary-for-busy-people">
        <Link route="/">
          <a>Read our summary for busy people →</a>
        </Link>
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;