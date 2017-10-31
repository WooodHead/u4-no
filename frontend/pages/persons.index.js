import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer, Team } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Persons = ({
  frontpage,
  persons = [],
  url,
}) => (
  <Layout>
    <h1 className="c-article__title">{frontpage.title}</h1>
    <BreadCrumb url={url} />
    <div className="c-article__lead">
      {frontpage.lead}
    </div>
    <div className="c-topic-section--lightblue">
      <div className="o-wrapper c-article">
        <div id="advisors">
          {console.log(persons)}
          <Team
            light
            members={persons.sort((a, b) => {
              const firstNameA = a.firstName.toUpperCase();
              const firstNameB = b.firstName.toUpperCase();
              if (firstNameA < firstNameB) {
                return -1;
              }
              if (firstNameA > firstNameB) {
                return 1;
              }
              // names must be equal
              return 0;
            })}
          />
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0], "persons": *[_type == "person"][0..1000]{..., "image": image.asset->url[0] , "affiliations": affiliations[]->name} }',
  }),
  materializeDepth: 2,
});
