/**
 * Replicate SDXL client
 * This module provides a client for interacting with the Replicate API for SDXL image generation.
 */

import dotenv from 'dotenv';

dotenv.config();

// Check if API token is available
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!REPLICATE_API_TOKEN) {
  console.warn('REPLICATE_API_TOKEN is not set in environment variables');
}

/**
 * Generate an image using Replicate's SDXL model
 * @param {string} prompt - The prompt to generate an image from
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - URL of the generated image
 */
export async function generateImage(prompt, options = {}) {
  try {
    // Create a prediction
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b', // SDXL v1.0
        input: {
          prompt: prompt,
          negative_prompt: options.negativePrompt || '',
          width: options.width || 1024,
          height: options.height || 1024,
          num_outputs: options.numOutputs || 1,
          guidance_scale: options.guidanceScale || 7.5,
          num_inference_steps: options.numInferenceSteps || 50,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status} ${response.statusText}`);
    }

    const prediction = await response.json();
    
    // Poll for the prediction result
    const pollInterval = 1000; // 1 second
    const maxAttempts = 60; // 1 minute max
    
    let attempts = 0;
    let result;
    
    while (attempts < maxAttempts) {
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!statusResponse.ok) {
        throw new Error(`Replicate API status error: ${statusResponse.status} ${statusResponse.statusText}`);
      }
      
      result = await statusResponse.json();
      
      if (result.status === 'succeeded') {
        return result.output[0]; // Return the URL of the first generated image
      } else if (result.status === 'failed') {
        throw new Error(`Image generation failed: ${result.error}`);
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      attempts++;
    }
    
    throw new Error('Image generation timed out');
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    throw error;
  }
}

/**
 * Generate an educational image for literacy learning
 * @param {string} concept - The educational concept to visualize
 * @param {string} style - The visual style for the image
 * @returns {Promise<string>} - URL of the generated educational image
 */
export async function generateEducationalImage(concept, style = 'colorful, child-friendly, educational') {
  const prompt = `Educational illustration of ${concept}. ${style} style, clear and engaging for children.`;
  return generateImage(prompt, { guidanceScale: 8.0 });
}

export default {
  generateImage,
  generateEducationalImage,
};
