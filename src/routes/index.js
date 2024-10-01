const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world!');
});

router.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

module.exports = router;
