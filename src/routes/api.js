const express = require('express');

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.json({ content: 'Hello there!' });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({ content: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` });
});

module.exports = router;
