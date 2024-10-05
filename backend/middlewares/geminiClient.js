const { GenerativeAiClient } = require('@google/generative-ai');
require('dotenv').config();

const client = new GenerativeAiClient({
  projectId: process.env.GENERATIVE_AI_PROJECT_ID,
  location: process.env.GENERATIVE_AI_LOCATION,
  credentials: {
    api_key: process.env.GENERATIVE_AI_API_KEY,
    api_key_secret: process.env.GENERATIVE_AI_API_KEY_SECRET,
  },
});

module.exports = client;
