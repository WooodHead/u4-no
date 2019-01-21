const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { extractText } = require('./elastic-extract-text');
const htmlToText = require('html-to-text');

/**
 * Purpose: Find corresponding pdf file and load its contents
 */
let files = null;
function findLegacyPdfContent({ document }) {
  if (_.isEmpty(document.legacypdf)) {
    return null;
  }
  const fileFolderPath = path.join(__dirname, 'sanity-export/files');
  if (!files) {
    files = fs.readdirSync(fileFolderPath);
  }
  try {
    const { _sanityAsset = '' } = document.legacypdf;
    // first try getting asset from _sanityAsset, then try fileId
    let fileId = _sanityAsset.replace('file@file://./files/', '');
    // fallback to try and get file from .asset
    fileId = fileId || /file-(.*)/gi.exec(document.legacypdf.asset._ref)[1];
    let foundFile = files.find(fileName => fileName.indexOf(fileId) !== -1);
    if (!foundFile.endsWith('.pdf')) {
      fs.copyFileSync(
        path.join(fileFolderPath, foundFile),
        path.join(fileFolderPath, `${foundFile}.pdf`),
      );
      foundFile = `${foundFile}.pdf`;
    }
    if (foundFile) {
      return extractText(path.join(fileFolderPath, foundFile));
    }
    return null;
  } catch (err) {
    console.log('Failed to load legacy pdf data from:', document.legacypdf, err);
    return null;
  }
}

// make sanity publication ready to be ingested by elasticsearch.
async function processPublication({ document: doc, allDocuments }) {
  const expand = initExpand(allDocuments);
  const legacyPDFContent = await findLegacyPdfContent({ document: doc });
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...doc,
    // then we override some of those fields with processed data.
    content: legacyPDFContent || blocksToText(doc.content || []),
    abbreviations: blocksToText(doc.abbreviations || []),
    methodology: blocksToText(doc.methodology || []),
    ...(doc.abstract ? { abstract: htmlToText.fromString(doc.abstract, { wordwrap: false }) } : {}),
    authors: expand({
      references: doc.authors,
      process: ({ _key, firstName, surname }) => ({
        _key,
        name: `${firstName} ${surname}`,
      }),
    }),
    editors: expand({
      references: doc.editors,
      process: ({ _key, firstName, surname }) => ({
        _key,
        name: `${firstName} ${surname}`,
      }),
    }),
    publicationType: expand({
      reference: doc.publicationType,
    }),
    keywords: expand({
      references: doc.keywords || [],
      process: ({ keyword, _id, language }) => ({ keyword, _id, language }),
    }),
  };
}

async function processTerm({ document: doc }) {
  const { term, definition = [], ...restOfDoc } = doc;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    termTitle: term,
    termContent: blocksToText(definition),
  };
}

async function processTopic({ document: doc }) {
  const {
    agenda = [],
    explainerText,
    introduction: basicGuide = [],
    resources,
    ...restOfDoc
  } = doc;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    content: explainerText,
    basicGuide: blocksToText(basicGuide),
    agenda: blocksToText(agenda),
  };
}

async function processDocument({ document, allDocuments }) {
  if (document._type === 'publication') {
    return processPublication({ document, allDocuments });
  } else if (document._type === 'term') {
    return processTerm({ document, allDocuments });
  } else if (document._type === 'topics') {
    return processTopic({ document, allDocuments });
  }
  return document;
}

function loadSanityDataFile(folderPath = 'sanity-export') {
  if (!folderPath) {
    throw new Error('loadSanityDataFile: Please provide a path.');
  }
  const documents = parseNDJSON(fs.readFileSync(path.join(__dirname, folderPath, 'data.ndjson'), { encoding: 'UTF-8' }));
  const assets = parseNDJSON(fs.readFileSync(path.join(__dirname, folderPath, 'assets.json'), { encoding: 'UTF-8' }));
  return { documents, assets };
}

function parseNDJSON(str) {
  return str
    .split('\n')
    .filter(str => str)
    .map(JSON.parse);
}

function getIndexName({ language = 'en_US' }) {
  return `u4-${language}`.toLowerCase().replace(/_/gi, '-');
}

/**
 * Expand Sanity references into the referenced documents.
 * Can optionally process document after being expanded
 *
 * Call initExpand with all Sanity documents, so that it can search for refences
 * there. It will return a function which you can use to expand references.
 */
function initExpand(allDocuments = []) {
  // returns a function ready to do work.
  return function expand({ reference, references = [], process = doc => doc }) {
    const expandAndProcessReference = ({ _key, _ref = '' }) => {
      const foundDoc = allDocuments.find(({ _id }) => _id === _ref);
      if (foundDoc) {
        return process({ ...foundDoc, ...(_key ? { _key } : {}) });
      }
      return null;
    };
    if (reference) {
      return expandAndProcessReference(reference);
    }
    return references.map(expandAndProcessReference);
  };
}

// Convert Sanity's portable text into plain string.
function blocksToText(blocks, opts = {}) {
  const defaults = {};
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }
      return block.children.map(child => child.text).join('');
    })
    .join(' ');
}

module.exports = {
  processPublication,
  initExpand,
  loadSanityDataFile,
  parseNDJSON,
  processDocument,
  getIndexName,
  findLegacyPdfContent,
  blocksToText,
};
