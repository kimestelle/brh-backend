const express = require('express');
const app = express();
const port = 3000;
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
app.use(express.static('public'));
app.get('/', async (req, res) => {
  const newUser = new User('john_doe', 'john@example.com');

  // Add 1 top item
  const top1 = new Item('top', 100, 150, 180, 0.6, 0.5, 130, 'preppy', "top1");
  newUser.addItem(top1);

  // Add 10 bottom items
  const bottom1 = new Item('bottom', 120, 180, 210, 0.6, 0.7, 90, 'preppy', "bottom1");
  const bottom2 = new Item('bottom', 255, 200, 150, 0.8, 0.4, 75, 'fancy', "bottom2");
  const bottom3 = new Item('bottom', 90, 130, 160, 0.3, 0.6, 105, 'street', "bottom3");
  const bottom4 = new Item('bottom', 200, 170, 145, 0.5, 0.5, 60, 'vintage', "bottom4");
  const bottom5 = new Item('bottom', 60, 100, 120, 0.4, 0.3, 95, 'minimal', "bottom5");
  const bottom6 = new Item('bottom', 220, 140, 175, 0.7, 0.5, 85, 'fancy', "bottom6");
  const bottom7 = new Item('bottom', 180, 160, 190, 0.6, 0.7, 80, 'preppy', "bottom7");
  const bottom8 = new Item('bottom', 110, 120, 130, 0.4, 0.6, 110, 'street', "bottom8");
  const bottom9 = new Item('bottom', 240, 150, 160, 0.5, 0.5, 65, 'vintage', "bottom9");
  const bottom10 = new Item('bottom', 50, 80, 90, 0.3, 0.4, 70, 'minimal', "bottom10");

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
  array = newUser.getRankings(top1, 'bottom');

  console.log("------------------------");

  let listRes = await Pin.listPinnedItems();
  console.log(listRes);
  console.log("------------------------");
  console.log(listRes[0].getName());

  res.status(200).send({ array, listRes });
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