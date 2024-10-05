const { GenerativeModel } = require('@google/generative-ai');
require('dotenv').config();

const model = new GenerativeModel({
  model: 'gemini-1.5-flash',
  projectId: process.env.GENERATIVE_AI_PROJECT_ID,
  location: process.env.GENERATIVE_AI_LOCATION,
});

module.exports = model;