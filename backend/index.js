const express = require('express');
const app = express();
const port = 3000;
const db = require('./services/firebaseAdmin')

const compare = require('./utils/Compare').default;

const Item = require('./models/itemModel.js').default;

app.get('/', (req, res) => {
  const item1 = new Item([100, 100, 100], 0.5, 0.5, 'street');
  const item2 = new Item([100, 100, 100], 0.5, 0.5, 'street');
  res.sendStatus(compare.calculateCompatibility(item1, item2))
  res.sendStatus('Hello World!');
});

app.post('/', async(req, res) => {
  try {
    res.sendStatus('posted');
  } catch (error) {
    res.status(500).sendStatus(error.message);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});