const express = require('express');

const port = 3000;
const path = require('path');

const filePath404Page = path.resolve(__dirname, '../client/404.html');
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const apiRouter = require('./routes/api.js');

console.log("pe");
const app = express();

app.use(express.static('client'));
app.use('/', indexRouter);
app.use('/quotes', quotesRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).sendFile(filePath404Page);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
