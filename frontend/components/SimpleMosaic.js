import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Pin, ArrowRight } from './icons';

const classes = BEMHelper({
  name: 'simple-mosaic',
  prefix: 'c-',
});

const SimpleMosaic = ({ resources = [], cta = '' }) => (
  <div {...classes()}>
    {resources.map(item =>
      (
        <div {...classes('item')}>
          <Link to={item.link} >
            <a>
              <div {...classes('title')}>
                {item.title}
              </div>
              <div>
                {item.lead && item.lead.split('\n').map(i => <p>{i}</p>) }
              </div>
              { cta &&
              <div {...classes('cta')}>
                {cta} &nbsp; <ArrowRight />
              </div>
              }
            </a>
          </Link>
        </div>
      ),
    )}
  </div>
);

export default SimpleMosaic;