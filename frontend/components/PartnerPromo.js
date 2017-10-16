import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Person } from './';
import { ArrowRight, Helpdesk, OnlineTraining, Workshops } from '../components/icons';

const classes = BEMHelper({
  name: 'partner-promo',
  prefix: 'c-',
});

const PartnerPromo = ({
  title = { __html: '<span>Are you U4 partner staff?<br />Take advantage of exclusive U4 services.</span>' },
}) => (
  <section {...classes('')}>
    <h2 {...classes('title')} dangerouslySetInnerHTML={title} />

    <section className="c-boxOnImage c-boxOnImage--smaller u-margin-bottom-huge">
      <div className="c-boxOnImage__body c-boxOnImage__body--smaller">
        <div {...classes('statement')}>
          <OnlineTraining {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Online training</h3>
            <p {...classes('statement-body')}>Be confident with anti-corruption initiatives in your work. We offer dynamic and time-efficient online courses.</p>
          </div>
        </div>
        <div {...classes('statement')}>
          <Workshops {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Workshops and events</h3>
            <p {...classes('statement-body')}>Our team can help bring momentum to processes. We gather different actors for informed discussions.</p>
          </div>
        </div>
        <div {...classes('statement')}>
          <Helpdesk {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Helpdesk for partners</h3>
            <p {...classes('statement-body')}>Send in your corruption-related questions about development programmes, sectors, or countries. A free research service.</p>
          </div>
        </div>
      </div>
      <figure className="c-boxOnImage__figure c-boxOnImage__figure--smaller">
        <img src="/static/services_partners.jpg?w=1600&amp;h=400&amp;fit=crop&amp;crop=focalpoint" />
      </figure>

    </section>

    <h2 {...classes('cta')}><a href="#">See all our partners &nbsp;<ArrowRight /></a></h2>
  </section>
);

export default PartnerPromo;

