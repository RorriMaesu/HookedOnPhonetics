/**
 * Bayesian Knowledge Tracing (BKT) Model
 * 
 * This module implements the BKT algorithm for tracking student knowledge mastery.
 * BKT uses four parameters:
 * - p(L0): Initial probability of mastery
 * - p(T): Probability of learning a skill after an opportunity
 * - p(G): Probability of guessing correctly when skill is not mastered
 * - p(S): Probability of making a mistake when skill is mastered
 */

/**
 * Calculate the updated mastery probability after an attempt
 * 
 * @param {Object} params - BKT parameters
 * @param {number} params.pL0 - Initial probability of mastery
 * @param {number} params.pT - Probability of learning a skill after an opportunity
 * @param {number} params.pG - Probability of guessing correctly when skill is not mastered
 * @param {number} params.pS - Probability of making a mistake when skill is mastered
 * @param {number} pLn - Current probability of mastery
 * @param {boolean} correct - Whether the attempt was correct
 * @returns {number} - Updated probability of mastery
 */
export function updateMastery(params, pLn, correct) {
  const { pL0, pT, pG, pS } = params;
  
  // Step 1: Update based on the student's response (Evidence)
  let pLnGivenEvidence;
  
  if (correct) {
    // P(L_n | correct) = P(L_n) * (1 - P(S)) / [P(L_n) * (1 - P(S)) + (1 - P(L_n)) * P(G)]
    pLnGivenEvidence = (pLn * (1 - pS)) / (pLn * (1 - pS) + (1 - pLn) * pG);
  } else {
    // P(L_n | incorrect) = P(L_n) * P(S) / [P(L_n) * P(S) + (1 - P(L_n)) * (1 - P(G))]
    pLnGivenEvidence = (pLn * pS) / (pLn * pS + (1 - pLn) * (1 - pG));
  }
  
  // Step 2: Update based on the opportunity to learn (Transition)
  // P(L_{n+1}) = P(L_n | evidence) + (1 - P(L_n | evidence)) * P(T)
  const pLnPlus1 = pLnGivenEvidence + (1 - pLnGivenEvidence) * pT;
  
  return pLnPlus1;
}

/**
 * Initialize BKT parameters for a new skill
 * 
 * @param {Object} options - Optional parameter overrides
 * @returns {Object} - BKT parameters
 */
export function initializeParameters(options = {}) {
  return {
    pL0: options.pL0 !== undefined ? options.pL0 : 0.3,  // Initial mastery probability
    pT: options.pT !== undefined ? options.pT : 0.1,     // Learning probability
    pG: options.pG !== undefined ? options.pG : 0.2,     // Guess probability
    pS: options.pS !== undefined ? options.pS : 0.1,     // Slip probability
  };
}

/**
 * Predict the probability of a correct response
 * 
 * @param {Object} params - BKT parameters
 * @param {number} pLn - Current probability of mastery
 * @returns {number} - Probability of a correct response
 */
export function predictCorrect(params, pLn) {
  const { pG, pS } = params;
  return pLn * (1 - pS) + (1 - pLn) * pG;
}

/**
 * Determine if a skill is mastered based on a threshold
 * 
 * @param {number} pLn - Current probability of mastery
 * @param {number} threshold - Mastery threshold (default: 0.95)
 * @returns {boolean} - Whether the skill is mastered
 */
export function isSkillMastered(pLn, threshold = 0.95) {
  return pLn >= threshold;
}

export default {
  updateMastery,
  initializeParameters,
  predictCorrect,
  isSkillMastered,
};
