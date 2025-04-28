import { getFirestore } from 'firebase-admin/firestore';

/**
 * Update BKT parameters for a skill based on student response
 * 
 * @param {string} userId - User ID
 * @param {string} skillId - Skill ID
 * @param {boolean} correct - Whether the response was correct
 * @returns {Promise<Object>} - Updated BKT state
 */
export async function updateBktState(userId, skillId, correct) {
  const db = getFirestore();
  
  // Get the current BKT state for the user and skill
  const userSkillRef = db.collection('users').doc(userId).collection('skills').doc(skillId);
  const userSkillDoc = await userSkillRef.get();
  
  // Get the skill parameters
  const skillRef = db.collection('skills').doc(skillId);
  const skillDoc = await skillRef.get();
  
  if (!skillDoc.exists) {
    throw new Error(`Skill ${skillId} not found`);
  }
  
  const skillData = skillDoc.data();
  
  // BKT parameters
  const params = {
    pL0: skillData.bkt?.pL0 ?? 0.3,
    pT: skillData.bkt?.pT ?? 0.1,
    pG: skillData.bkt?.pG ?? 0.2,
    pS: skillData.bkt?.pS ?? 0.1,
  };
  
  // Current mastery probability
  let pLn = params.pL0;
  let attempts = [];
  
  if (userSkillDoc.exists) {
    const userData = userSkillDoc.data();
    pLn = userData.mastery ?? params.pL0;
    attempts = userData.attempts ?? [];
  }
  
  // Update mastery probability using BKT
  const pLnPlus1 = updateMastery(params, pLn, correct);
  
  // Record the attempt
  const attempt = {
    timestamp: new Date().toISOString(),
    correct,
    masteryBefore: pLn,
    masteryAfter: pLnPlus1,
  };
  
  attempts.push(attempt);
  
  // Keep only the last 20 attempts to avoid document size issues
  if (attempts.length > 20) {
    attempts = attempts.slice(-20);
  }
  
  // Update the user's skill document
  await userSkillRef.set({
    mastery: pLnPlus1,
    attempts,
    lastUpdated: new Date().toISOString(),
  }, { merge: true });
  
  // Return the updated state
  return {
    skillId,
    mastery: pLnPlus1,
    isMastered: pLnPlus1 >= 0.95,
    attempt,
  };
}

/**
 * Calculate the updated mastery probability after an attempt
 * 
 * @param {Object} params - BKT parameters
 * @param {number} pLn - Current probability of mastery
 * @param {boolean} correct - Whether the attempt was correct
 * @returns {number} - Updated probability of mastery
 */
function updateMastery(params, pLn, correct) {
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
 * Get the next recommended skill for a user
 * 
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Next skill recommendation
 */
export async function getNextSkill(userId) {
  const db = getFirestore();
  
  // Get the user's current skills
  const userSkillsRef = db.collection('users').doc(userId).collection('skills');
  const userSkillsSnapshot = await userSkillsRef.get();
  
  // Map of skill IDs to mastery probabilities
  const skillMasteryMap = {};
  userSkillsSnapshot.forEach(doc => {
    skillMasteryMap[doc.id] = doc.data().mastery ?? 0;
  });
  
  // Get all skills
  const skillsRef = db.collection('skills');
  const skillsSnapshot = await skillsRef.get();
  
  // Filter skills by prerequisites and find the best next skill
  const candidateSkills = [];
  
  skillsSnapshot.forEach(doc => {
    const skill = { id: doc.id, ...doc.data() };
    
    // Check if the skill has prerequisites
    const prerequisites = skill.prerequisites ?? [];
    const allPrerequisitesMet = prerequisites.every(prereqId => {
      const mastery = skillMasteryMap[prereqId] ?? 0;
      return mastery >= 0.95; // Prerequisite is considered met if mastery >= 95%
    });
    
    // If all prerequisites are met and the skill is not already mastered
    if (allPrerequisitesMet && (skillMasteryMap[skill.id] ?? 0) < 0.95) {
      candidateSkills.push(skill);
    }
  });
  
  if (candidateSkills.length === 0) {
    return null; // No suitable next skill found
  }
  
  // Sort candidate skills by difficulty (if available) or ID
  candidateSkills.sort((a, b) => {
    if (a.difficulty !== undefined && b.difficulty !== undefined) {
      return a.difficulty - b.difficulty;
    }
    return a.id.localeCompare(b.id);
  });
  
  // Return the first candidate skill
  return candidateSkills[0];
}

export default {
  updateBktState,
  getNextSkill,
};
