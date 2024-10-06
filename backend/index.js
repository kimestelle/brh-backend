const express = require('express');
const app = express();
const port = 2000;
const db = require('./services/firebaseAdmin')
const { analyzeImage } = require('./services/geminiImage');

const multer = require('multer');
const fs = require('fs');
// const calculateCompatibility = require('./utils/Compare');

const upload = multer({ dest: 'uploads/' });
const Item = require('./models/itemModel.js');
const User = require('./models/userModel.js');
const Pin = require('./services/pinata.js');

app.use(express.json({ limit: '10mb' })); 
// app.use(express.static('public'));

const newUser = new User('john_doe', 'john@example.com');

app.get('/', async (req, res) => {
  res.status(200).send('started program');
});

app.get('/getMatch', async (req, res) => {
  try {
    const { item, category } = req.query;
    const rankedItems = newUser.getRankings(item, category);
    
    let imageArray = [];

    for (const i of rankedItems) {
      const imagePath = `path_to_images/${i.cid}.jpg`;
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      imageArray.push(`data:image/jpeg;base64,${base64Image}`);
    }

    res.status(200).json({ images: imageArray });
  } catch (error) {
    console.error('Error generating image array:', error);
    res.status(500).send('Error generating images');
  }
});

app.get('/getPinnedItems', async (req, res) => {
  let listRes = await Pin.listPinnedItems();
  // // const pinRes = [
  // //   Pin.pinItem(top1),
  // //   Pin.pinItem(bottom1),
  // //   Pin.pinItem(bottom2),
  // //   Pin.pinItem(bottom3),
  // //   Pin.pinItem(bottom4),
  // //   Pin.pinItem(bottom5),
  // //   Pin.pinItem(bottom6),
  // //   Pin.pinItem(bottom7),
  // //   Pin.pinItem(bottom8),
  // //   Pin.pinItem(bottom9),
  // //   Pin.pinItem(bottom10),
  // // ];
  array = newUser.getRankings(top1, 'bottom');

  // console.log("------------------------");

  // let listRes = await Pin.listPinnedItems();
  // console.log(listRes);
  // console.log("------------------------");
  // console.log(listRes[0].getName());

  const listedPhotos = Pin.listPhotos();
  // const pinRes = [
  //   Pin.pinItem(top1),
  //   Pin.pinItem(bottom1),
  //   Pin.pinItem(bottom2),
  //   Pin.pinItem(bottom3),
  //   Pin.pinItem(bottom4),
  //   Pin.pinItem(bottom5),
  //   Pin.pinItem(bottom6),
  //   Pin.pinItem(bottom7),
  //   Pin.pinItem(bottom8),
  //   Pin.pinItem(bottom9),
  //   Pin.pinItem(bottom10),
  // ];

  res.status(200).send({ array});
});

app.post('/', async(req, res) => {
  try {
    res.sendStatus('posted');
  } catch (error) {
    res.status(500).sendStatus(error.message);
  }
})

app.get('/analyze-image', (req, res) => {
  res.status(200).send('Image analysis endpoint is running.');
});

// Gemini image processing
app.post('/analyze-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }

  try {
    const imagePath = req.file.path; // Path to uploaded image

    // Analyze the image
    const responseText = await analyzeImage(imagePath);

    res.status(200).json({ description: responseText });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).send('Error analyzing image');
  } finally {
    // Clean up: remove the uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});