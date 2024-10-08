const express = require('express');
const app = express();
const port = 2000;
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

// app.get('/', async (req, res) => {
//   const top1 = new Item('top', 0.10, 0.15, 0.18, 0.6, 0.5, 130, 'preppy', "top1");
//   array = newUser.getRankings(top1, 2);
//   res.status(200).send({ array });
// });

app.get('/', async (req, res) => {
  const newUser = new User('red bear', 'bear@example.com');

  // Add 1 top item
  const top1 = new Item('top', 0.10, 0.15, 0.18, 0.6, 0.5, 130, 'preppy', "top1");
  newUser.addItem(top1);

  // Add 10 bottom items
  const bottom1 = new Item('bottom', 0.12, 0.18, 0.21, 0.6, 0.7, 90, 'preppy', "bottom1");
  const bottom2 = new Item('bottom', 0.25, 0.20, 0.15, 0.8, 0.4, 75, 'fancy', "bottom2");
  const bottom3 = new Item('bottom', 0.90, 0.13, 0.16, 0.3, 0.6, 105, 'street', "bottom3");
  const bottom4 = new Item('bottom', 0.20, 0.17, 0.14, 0.5, 0.5, 60, 'vintage', "bottom4");
  const bottom5 = new Item('bottom', 0.60, 0.10, 0.12, 0.4, 0.3, 95, 'minimal', "bottom5");
  const bottom6 = new Item('bottom', 0.22, 0.14, 0.17, 0.7, 0.5, 85, 'fancy', "bottom6");
  const bottom7 = new Item('bottom', 0.18, 0.16, 0.19, 0.6, 0.7, 80, 'preppy', "bottom7");
  const bottom8 = new Item('bottom', 0.11, 0.12, 0.13, 0.4, 0.6, 110, 'street', "bottom8");
  const bottom9 = new Item('bottom', 0.24, 0.15, 0.16, 0.5, 0.5, 65, 'vintage', "bottom9");
  const bottom10 = new Item('bottom', 0.50, 0.80, 0.90, 0.3, 0.4, 70, 'minimal', "bottom10");

  // Add all bottom items to the user's closet
  newUser.addItem(bottom1);
  newUser.addItem(bottom2);
  newUser.addItem(bottom3);
  newUser.addItem(bottom4);
  newUser.addItem(bottom5);
  newUser.addItem(bottom6);
  newUser.addItem(bottom7);
  newUser.addItem(bottom8);
  newUser.addItem(bottom9);
  newUser.addItem(bottom10);

  // You can log or further manipulate the user and their items as needed
  console.log(newUser);

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

  res.status(200).send({ array});
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