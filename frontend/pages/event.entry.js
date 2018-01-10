import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';

import { BoxOnBox, Footer, Layout, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, LinkList, Person } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import {
  Basics,
  Picture,
  Publication,
  Resources,
  ResearchAgenda,
  ArrowRight,
} from '../components/icons';

const EventPage = ({ event = {}, url = {} }) => {
  const {
    title = '',
    eventType = '',
    location = '',
    startDate = {},
    endDate = {},
    organiser = '',
    featuredImage = {},
    leadText = '',
    content = [],
    eventLink = {},
    contact = [],
    relatedContent = [],
    topics = [],
    keywords = [],
  } = event;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: leadText,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `beta.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
          <div>
            {eventType === 'incountryworkshop' && (
              <p className="c-longform-grid__standard">In-country workshop</p>
            )}
            {eventType === 'hqworkshop' && <p className="c-longform-grid__standard">HQ workshop</p>}
            <h2 className="c-longform-grid__standard">{title}</h2>
            {location && <p className="c-longform-grid__standard">{location}</p>}
            {startDate.utc && (
              <p className="c-longform-grid__standard">
                {startDate.utc.split('T')[0]} {endDate.utc && `${endDate.utc.split('T')[0]}`}
              </p>
            )}
            {organiser && <p className="c-longform-grid__standard">Organiser: {organiser}</p>}
            {leadText && <p className="c-longform-grid__standard">{leadText}</p>}
          </div>
          {content ? <ServiceArticle blocks={content} /> : null}

          {topics.length > 0 && (
            <p className="c-longform-grid__standard">
              {topics.map(({ _ref = '', target = {} }) => (
                <Link
                  key={_ref}
                  route="topic.entry"
                  params={{ slug: target.slug ? target.slug.current : '' }}
                >
                  <a className="c-article-header__link-item">{target.title}</a>
                </Link>
              ))}
            </p>
          )}
        </div>
      </div>
      {contact.length > 0 &&
        contact.map(person => (
          <Person light person={person.target ? person.target : person} linkLabel="" />
        ))}

      <Newsletter />
      <Footer />
    </Layout>
  );
};

export default DataLoader(EventPage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "event": *[_type=="event" && slug.current == $slug][0]{title, eventType, location, startDate, endDate, organiser, leadText, content, slug, eventLink, contact, relatedContent, topics, keywords,  _id, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 5,
});
