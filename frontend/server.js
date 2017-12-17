require('dotenv').config({ path: './.env' });
const next = require('next');
const routes = require('./routes');
const forceSsl = require('force-ssl-heroku');
const { pdfHandler } = require('../publication-pdf-builder/pdf-server-handler');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl);
  }
  server.get('/pdf', pdfHandler);
  server.use(handler).listen(process.env.PORT || 3000);
});
