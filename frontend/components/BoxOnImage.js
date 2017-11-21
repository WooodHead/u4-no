import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from '../routes';
import { PartnerLogo8 } from './icons/';

const classes = BEMHelper({
  name: 'boxOnImage',
  prefix: 'c-',
});

const BoxOnImage = ({
  text = '', image, wide = false, helpdesk = false, personsLeft = [], personsRight = [],
}) => (
  <div {...classes()}>
    <figure {...classes('figure')}>
      { image && <img alt="" src={image.asset.url} /> }
    </figure>
    <div {...classes('body', wide ? 'wide' : null)}>
      <BlockContent blocks={text} />
      { helpdesk ?
        <div className="c-columns">
          <div className="c-columns__item c-columns--two__item c-columns__item--narrow">
            <h3 className="c-columns__title">U4 helpdesk coordinator in Bergen</h3>
            {
              personsLeft &&
              personsLeft.map(person =>
                (
                  <Link to={`/the-team/${person.target.slug.current}`}>
                    <a>
                      {person.target.firstName} {person.target.surname}<br />
                      {person.target.position}<br />
                      {person.target.email}
                    </a>
                  </Link>
                ),)
            }
          </div>
          <div className="c-columns__item c-columns--two__item c-columns__item--narrow">
            <h3 className="c-columns__title">U4 helpdesk at Transparency International</h3>
            {
              personsRight &&
              personsRight.map(person =>
                (<p><Link to={`/the-team/${person.target.slug.current}`}>
                  <a>
                    {person.target.firstName} {person.target.surname}
                  </a>
                    </Link>
                 </p>),)
            }
            <br /><br />
            <div className="c-logo">
              <PartnerLogo8 />
            </div>
          </div>
        </div>
        : null}
    </div>
  </div>
);

export default BoxOnImage;
