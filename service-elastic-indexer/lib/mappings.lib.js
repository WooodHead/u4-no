const { getIndexName } = require('./indexer.lib');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '7.2',
});

// setup mappings for each language and each type
const setupMappings = async ({ types = [], languages = [] }) => {
  const indexes = languages
    .map(language => getIndexName({ language }))
    .filter(indexName => !/\s/.test(indexName));
  console.log('Create indexes with mappings for\n', indexes);
  const version = process.env.ES_ENV || 'staging';
  const analyzers = {
    [`u4-${version}-en-us`]: 'english',
    [`u4-${version}-en-en`]: 'english',
    [`u4-${version}-fr-fr`]: 'french',
    [`u4-${version}-pt-pt`]: 'portuguese',
    [`u4-${version}-ru-ru`]: 'russian',
    [`u4-${version}-es-es`]: 'spanish',
    [`u4-${version}-uk-ua`]: 'russian',
  };
  for (const index of indexes) {
    try {
      const indexExists = await client.indices.exists({ index });
      if (indexExists) {
        continue; // skip iteration
      }
      const analyzer = analyzers[index];
      const result = await client.indices.create({
        index,
        body: {
          settings: {
            analysis: {
              analyzer: {
                standard_exact: {
                  tokenizer: 'standard',
                  filter: ['lowercase'],
                },
              },
            },
          },
          mappings: {
            'u4-searchable': {
              properties: {
                title: {
                  type: 'text',
                  analyzer,
                  fields: {
                    exact: {
                      type: 'text',
                      analyzer: 'standard_exact',
                    },
                  },
                },
                content: {
                  type: 'text',
                  analyzer,
                },
                // Topics can add articles and publications as resources.
                filedUnderTopicIds: {
                  type: 'keyword',
                },
                filedUnderTopicNames: {
                  type: 'keyword',
                },
                // publication
                legacyPdfContent: {
                  type: 'text',
                  analyzer,
                },
                content: {
                  type: 'text',
                  analyzer,
                },

                relatedPersons: {
                  type: 'keyword',
                },
                publicationTypeTitle: {
                  type: 'keyword',
                },
                // publications can be filed under multiple topic titles.
                topicTitles: {
                  type: 'keyword',
                },
                languageName: {
                  type: 'keyword',
                },
                lead: {
                  type: 'text',
                  analyzer,
                },
                mainPoints: {
                  type: 'text',
                  analyzer,
                },
                methodology: {
                  type: 'text',
                  analyzer,
                },
                // publication end

                // topic specific
                topicTitle: {
                  type: 'text',
                  analyzer,
                  fields: {
                    exact: {
                      type: 'text',
                      analyzer: 'standard_exact',
                    },
                  },
                },
                topicContent: {
                  type: 'text',
                  analyzer,
                },
                basicGuide: {
                  type: 'text',
                  analyzer,
                },
                agenda: {
                  type: 'text',
                  analyzer,
                },
                // topic specific, end

                // term specific
                termTitle: {
                  type: 'text',
                  analyzer,
                  fields: {
                    exact: {
                      type: 'text',
                      analyzer: 'standard_exact',
                    },
                  },
                },
                termContent: {
                  type: 'text',
                  analyzer,
                },
                // term specific, end
              },
            },
          },
        },
      });
      console.log('Created index:', result);
    } catch (e) {
      console.error('Failed to create index', e);
    }
  }
};

module.exports = {
  setupMappings,
};
