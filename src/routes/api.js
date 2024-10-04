const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

router.get('/helloJSON', (req, res) => {
  res.json({ content: 'Hello there!' });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({ content: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` });
});

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

// POSTING

router.post('/addHoot', (req, res) => {
  // verify that we got POST data
  const content = req.body && req.body.content
    ? req.body.content
    : 'No req.body or req.body.content found!';

  // create a `hoot` object literal
  const hoot = {
    id: generateNewId(),
    content,
    createdAt: new Date(),
  };

  // add hoot to array
  hoots.push(hoot);

  // send new hoot back to caller
  res.status(201).json(hoot);
});

// DELETING
const getHootById = (id) => hoots.find((h) => h.id === id);

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // res.send('The id you specified for DELETE is ' + res.params.id);
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

// Put (edit)
router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content
      ? req.body.content
      : 'No req.body or req.body.content found!';
    hoot.content = content;
    hoot.updatedAt = new Date();
    res.json(hoot);
  }
});

// View single hoot
router.get('/hoots/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id:'${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

module.exports = router;
