const express = require('express');
const app = express();
const port = 3000;
const db = require('./services/firebaseAdmin')

const { calculateCompatibility } = require('./utils/Compare');

const Item = require('./models/itemModel.js');

app.get('/', (req, res) => {
  const item1 = new Item(100, 100, 100, 0.5, 0.5, 111, 'street');
  const item2 = new Item(100, 100, 100, 0.5, 0.5, 111, 'street');
  res.sendStatus(calculateCompatibility(item1, item2))
  res.sendStatus('Hello World!');
});

app.post('/', async(req, res) => {
  try {
    res.sendStatus('posted');
  } catch (error) {
    res.status(500).sendStatus(error.message);
  }
})

//gemini image processing
app.post('/generate-content', async (req, res) => {
  const { prompt, imageBase64 } = req.body; // Expect prompt and image in base64 format
  
  if (!prompt || !imageBase64) {
    return res.status(400).send('Missing prompt or image');
  }

  try {
    // Call the function from geminiImage.js
    const response = await generateImageContent(prompt, imageBase64);
    
    res.status(200).json({ result: response });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send('Error generating content');
  }
});

app.post('/', async (req, res) => {
  try {
    res.send('posted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});