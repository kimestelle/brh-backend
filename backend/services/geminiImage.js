const fs = require('fs');
// const model = require('../middlewares/geminiClient');

// Function to describe an image
async function analyzeImage(imagePath) {
  try {
    // Read the image file and convert to base64
    const imageBytes = fs.readFileSync(imagePath);
    const imageBase64 = imageBytes.toString('base64');

    // Send the image to the Gemini API
    const response = await model.generateContent({
      prompt: {
        text: 'Describe the image.', // Prompt asking for description
      },
      images: [
        {
          mimeType: 'image/jpeg', // Ensure the MIME type is correct based on your image type
          data: imageBase64,
        },
      ],
    });

    // If the response is structured as expected, return the text description
    return response.prompt.text || 'No description found';
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}

module.exports = { analyzeImage };
