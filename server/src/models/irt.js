/**
 * Item Response Theory (IRT) Model
 * 
 * This module implements a 1-parameter IRT model (Rasch model) for adaptive assessment.
 * The model uses item difficulty parameters to estimate student ability.
 */

/**
 * Calculate the probability of a correct response using the 1PL (Rasch) model
 * 
 * @param {number} theta - Student ability parameter
 * @param {number} b - Item difficulty parameter
 * @returns {number} - Probability of a correct response
 */
export function calculateProbability(theta, b) {
  // P(correct) = 1 / (1 + e^(b - theta))
  return 1 / (1 + Math.exp(b - theta));
}

/**
 * Estimate student ability (theta) using maximum likelihood estimation
 * 
 * @param {Array<Object>} responses - Array of student responses
 * @param {boolean} responses[].correct - Whether the response was correct
 * @param {number} responses[].difficulty - Item difficulty parameter
 * @param {number} initialTheta - Initial ability estimate (default: 0)
 * @param {number} iterations - Number of iterations for estimation (default: 10)
 * @returns {number} - Estimated student ability
 */
export function estimateAbility(responses, initialTheta = 0, iterations = 10) {
  let theta = initialTheta;
  
  for (let i = 0; i < iterations; i++) {
    let numerator = 0;
    let denominator = 0;
    
    for (const response of responses) {
      const { correct, difficulty } = response;
      const p = calculateProbability(theta, difficulty);
      
      if (correct) {
        numerator += 1 - p;
      } else {
        numerator -= p;
      }
      
      denominator += p * (1 - p);
    }
    
    // Update theta using Newton-Raphson method
    if (denominator !== 0) {
      theta += numerator / denominator;
    }
  }
  
  return theta;
}

/**
 * Select the next item that maximizes information at the current ability estimate
 * 
 * @param {Array<Object>} itemBank - Array of available items
 * @param {number} itemBank[].id - Item identifier
 * @param {number} itemBank[].difficulty - Item difficulty parameter
 * @param {number} theta - Current ability estimate
 * @returns {Object} - Selected item
 */
export function selectNextItem(itemBank, theta) {
  let maxInfo = -Infinity;
  let selectedItem = null;
  
  for (const item of itemBank) {
    const p = calculateProbability(theta, item.difficulty);
    const info = p * (1 - p); // Item information function for 1PL model
    
    if (info > maxInfo) {
      maxInfo = info;
      selectedItem = item;
    }
  }
  
  return selectedItem;
}

/**
 * Calculate the standard error of measurement for an ability estimate
 * 
 * @param {Array<Object>} responses - Array of student responses
 * @param {number} responses[].difficulty - Item difficulty parameter
 * @param {number} theta - Current ability estimate
 * @returns {number} - Standard error of measurement
 */
export function calculateStandardError(responses, theta) {
  let informationSum = 0;
  
  for (const response of responses) {
    const p = calculateProbability(theta, response.difficulty);
    informationSum += p * (1 - p);
  }
  
  return informationSum > 0 ? 1 / Math.sqrt(informationSum) : Infinity;
}

export default {
  calculateProbability,
  estimateAbility,
  selectNextItem,
  calculateStandardError,
};
