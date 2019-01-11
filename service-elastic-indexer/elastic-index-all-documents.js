require('dotenv').config();
const elasticsearch = require('elasticsearch');
const axios = require('axios');
const _ = require('lodash');
const {
  loadSanityDataFile,
  parseNDJSON,
  processDocument,
  getIndexName,
} = require('./elastic-indexer.lib');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

const prepareElasticSearchBulkInsert = (documents = []) =>
  _.flatten(documents.map((doc) => {
    const { _type, _id, ...restOfDoc } = doc;
    const metadata = { _index: getIndexName(doc), _type, _id };
    return [{ index: metadata }, { ...restOfDoc, language }];
  }));

const insertElasticSearchData = (documents = []) =>
  client.bulk({
    body: prepareElasticSearchBulkInsert(documents),
  });

const doBatchInsert = async (documents = []) => {
  const batchSize = 1000;
  const batches = _.chunk(documents, batchSize);
  for (const batch of batches) {
    try {
      const result = await insertElasticSearchData(batch);
      console.log('batch insert result:', {
        ...result,
        items: result.items.length,
      });
      if (result.errors) {
        console.log(
          'batch insert, additional error information:',
          JSON.stringify(result.items.filter(({ index }) => index.status !== 200), null, 2),
        );
      }
    } catch (e) {
      console.error('Failed to insert documents', e);
    }
  }
};

// filter out types we do not want to be searchable in elasticsearch
const shouldIndex = ({ _type = '' }) => {
  const typesToIgnore = ['sanity.fileAsset', 'sanity.imageAsset', 'frontpage'];
  return !typesToIgnore.find(type => type === _type);
};

async function main() {
  console.log('starting work');

  // Uncomment if want to quickly index a local file.
  // const allDocuments = loadSanityDataFile('./test-data.ndjson');

  const { data } = await axios
    .get('https://1f1lcoov.api.sanity.io/v1/data/export/production')
    .catch((err) => {
      console.log('Failed to get dataset', err);
      process.exit(-1);
    });

  const allDocuments = parseNDJSON(data);

  const types = {};
  allDocuments.forEach(({ _type }) => (types[_type] = true));
  console.log('Document types to process:\n', Object.keys(types), '\n');

  const languages = {};
  allDocuments
    .filter(({ language }) => language)
    .forEach(({ language }) => (languages[language] = true));
  console.log('Document languages to process:\n', Object.keys(languages), '\n');

  const processedDocuments = allDocuments
    .map(document => processDocument({ document, allDocuments }))
    .filter(shouldIndex);

  console.log('How many documents to index:', processedDocuments.length);
  await doBatchInsert(processedDocuments);
  console.log('Done with work');
}

main();