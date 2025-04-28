/**
 * Gemini Flash 2.5 API wrapper
 * This module provides a client for interacting with the Gemini Flash 2.5 API.
 */

import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set in environment variables');
}

/**
 * Generate text using Gemini Flash 2.5 API
 * @param {string} prompt - The prompt to send to the model
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - The generated text
 */
export async function generateText(prompt, options = {}) {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.5:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: options.temperature || 0.7,
          topK: options.topK || 40,
          topP: options.topP || 0.95,
          maxOutputTokens: options.maxTokens || 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * Generate educational content for literacy learning
 * @param {string} topic - The educational topic
 * @param {string} gradeLevel - The target grade level
 * @param {string} contentType - The type of content to generate
 * @returns {Promise<string>} - The generated educational content
 */
export async function generateEducationalContent(topic, gradeLevel, contentType) {
  const prompt = `
    Create educational content about "${topic}" for ${gradeLevel} grade level.
    The content should be in the format of a ${contentType}.
    Make it engaging, accurate, and appropriate for the grade level.
    Include clear explanations and examples.
  `;
  
  return generateText(prompt, { temperature: 0.5 });
}

export default {
  generateText,
  generateEducationalContent,
};
