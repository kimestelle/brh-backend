const client = require('../middlewares/geminiClient');

async function generateImageContent(prompt, imageBase64) {
  try {
    const response = await client.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: 'image/png',
        },
      },
    ]);

    return response;
  } catch (error) {
    console.error('Error generating image content:', error);
    throw new Error('Failed to generate image content');
  }
}

module.exports = { generateImageContent };
