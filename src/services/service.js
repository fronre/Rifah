require('dotenv').config();
const axios = require('axios');

const ollamaApiKey = process.env.OLLAMA_API_KEY;
const ollamaApiUrl = 'http://localhost:11434/api/generate';

async function getLlama3Response(prompt) {
    try {
        const response = await axios.post(ollamaApiUrl, {
            prompt: prompt
        }, {
            headers: {
                'Authorization': `Bearer ${ollamaApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching response from Ollama:', error);
        throw error;
    }
}

module.exports = {
    getLlama3Response
};
