const express = require('express');
const db = require('../db.js');

const router = express.Router();

const data = db.getAllQuotes();

router.get('/', (req, res) => {
  const { id } = req.query; // note: ESLint `airbnb/base` insists on object destructuring syntax!
  if (id === undefined) res.json(data);
  else res.json(db.getQuoteById(id));
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

router.get('/:id', (req, res) => { // Note the colon, which matches anything after '/' and assigns it to the `id` variable
  const { id } = req.params; // NEW!
  if (id === undefined) res.json(data);
  else res.json(db.getQuoteById(id));
});

module.exports = router;
