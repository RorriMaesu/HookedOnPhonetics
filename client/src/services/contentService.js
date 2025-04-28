/**
 * Content Service
 * 
 * This service provides access to educational content such as fluency passages,
 * morphology lessons, and other learning materials.
 */

import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { mockPassages, getPassageById } from '../data/mockPassages';
import { mockMorphologyLessons, getLessonById } from '../data/mockLessons';

/**
 * Get all fluency passages
 * 
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category
 * @param {string} options.difficulty - Filter by difficulty
 * @param {number} options.limit - Limit the number of results
 * @returns {Promise<Array>} - Array of passage objects
 */
export const getFluencyPassages = async (options = {}) => {
  try {
    // Try to fetch from Firestore
    const passagesRef = collection(db, 'passages');
    let passagesQuery = passagesRef;
    
    if (options.category) {
      passagesQuery = query(passagesQuery, where('category', '==', options.category));
    }
    
    if (options.difficulty) {
      passagesQuery = query(passagesQuery, where('difficulty', '==', options.difficulty));
    }
    
    passagesQuery = query(passagesQuery, orderBy('difficulty'));
    
    if (options.limit) {
      passagesQuery = query(passagesQuery, limit(options.limit));
    }
    
    try {
      const snapshot = await getDocs(passagesQuery);
      
      if (snapshot.empty) {
        console.log('No passages found in Firestore, using mock data');
        return filterMockPassages(options);
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.log('Error fetching passages from Firestore, using mock data:', error);
      return filterMockPassages(options);
    }
  } catch (error) {
    console.error('Error in getFluencyPassages:', error);
    return filterMockPassages(options);
  }
};

/**
 * Get a fluency passage by ID
 * 
 * @param {string} passageId - Passage ID
 * @returns {Promise<Object|null>} - Passage object or null if not found
 */
export const getFluencyPassage = async (passageId) => {
  try {
    // Try to fetch from Firestore
    const passageRef = doc(db, 'passages', passageId);
    
    try {
      const passageDoc = await getDoc(passageRef);
      
      if (passageDoc.exists()) {
        return {
          id: passageDoc.id,
          ...passageDoc.data()
        };
      } else {
        console.log(`Passage ${passageId} not found in Firestore, using mock data`);
        return getPassageById(passageId);
      }
    } catch (error) {
      console.log('Error fetching passage from Firestore, using mock data:', error);
      return getPassageById(passageId);
    }
  } catch (error) {
    console.error('Error in getFluencyPassage:', error);
    return getPassageById(passageId);
  }
};

/**
 * Get all morphology lessons
 * 
 * @param {Object} options - Query options
 * @param {string} options.skillId - Filter by skill ID
 * @param {string} options.difficulty - Filter by difficulty
 * @param {number} options.limit - Limit the number of results
 * @returns {Promise<Array>} - Array of lesson objects
 */
export const getMorphologyLessons = async (options = {}) => {
  try {
    // Try to fetch from Firestore
    const lessonsRef = collection(db, 'lessons');
    let lessonsQuery = lessonsRef;
    
    if (options.skillId) {
      lessonsQuery = query(lessonsQuery, where('skillId', '==', options.skillId));
    }
    
    if (options.difficulty) {
      lessonsQuery = query(lessonsQuery, where('difficulty', '==', options.difficulty));
    }
    
    lessonsQuery = query(lessonsQuery, orderBy('difficulty'));
    
    if (options.limit) {
      lessonsQuery = query(lessonsQuery, limit(options.limit));
    }
    
    try {
      const snapshot = await getDocs(lessonsQuery);
      
      if (snapshot.empty) {
        console.log('No lessons found in Firestore, using mock data');
        return filterMockLessons(options);
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.log('Error fetching lessons from Firestore, using mock data:', error);
      return filterMockLessons(options);
    }
  } catch (error) {
    console.error('Error in getMorphologyLessons:', error);
    return filterMockLessons(options);
  }
};

/**
 * Get a morphology lesson by ID
 * 
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object|null>} - Lesson object or null if not found
 */
export const getMorphologyLesson = async (lessonId) => {
  try {
    // Try to fetch from Firestore
    const lessonRef = doc(db, 'lessons', lessonId);
    
    try {
      const lessonDoc = await getDoc(lessonRef);
      
      if (lessonDoc.exists()) {
        return {
          id: lessonDoc.id,
          ...lessonDoc.data()
        };
      } else {
        console.log(`Lesson ${lessonId} not found in Firestore, using mock data`);
        return getLessonById(lessonId);
      }
    } catch (error) {
      console.log('Error fetching lesson from Firestore, using mock data:', error);
      return getLessonById(lessonId);
    }
  } catch (error) {
    console.error('Error in getMorphologyLesson:', error);
    return getLessonById(lessonId);
  }
};

/**
 * Filter mock passages based on options
 * 
 * @param {Object} options - Filter options
 * @returns {Array} - Filtered passages
 */
const filterMockPassages = (options = {}) => {
  let filteredPassages = [...mockPassages];
  
  if (options.category) {
    filteredPassages = filteredPassages.filter(passage => 
      passage.category === options.category
    );
  }
  
  if (options.difficulty) {
    filteredPassages = filteredPassages.filter(passage => 
      passage.difficulty === options.difficulty
    );
  }
  
  if (options.limit && options.limit > 0) {
    filteredPassages = filteredPassages.slice(0, options.limit);
  }
  
  return filteredPassages;
};

/**
 * Filter mock lessons based on options
 * 
 * @param {Object} options - Filter options
 * @returns {Array} - Filtered lessons
 */
const filterMockLessons = (options = {}) => {
  let filteredLessons = [...mockMorphologyLessons];
  
  if (options.skillId) {
    filteredLessons = filteredLessons.filter(lesson => 
      lesson.skillId === options.skillId
    );
  }
  
  if (options.difficulty) {
    filteredLessons = filteredLessons.filter(lesson => 
      lesson.difficulty === options.difficulty
    );
  }
  
  if (options.limit && options.limit > 0) {
    filteredLessons = filteredLessons.slice(0, options.limit);
  }
  
  return filteredLessons;
};

export default {
  getFluencyPassages,
  getFluencyPassage,
  getMorphologyLessons,
  getMorphologyLesson,
};
