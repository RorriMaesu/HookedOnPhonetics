import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import bktService from '../../services/bktService';
import './SkillTree.css';

/**
 * SkillTree component displays a hexagonal grid of skills with their mastery levels
 */
const SkillTree = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextSkill, setNextSkill] = useState(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        
        // Fetch skills from Firestore (this would be implemented in a real app)
        // For now, we'll use mock data
        const mockSkills = [
          {
            id: 'phoneme_awareness',
            name: 'Phoneme Awareness',
            description: 'Recognize and manipulate individual sounds in words',
            difficulty: 1,
            mastery: 0.9,
            prerequisites: [],
            category: 'phonology',
          },
          {
            id: 'letter_sound_correspondence',
            name: 'Letter-Sound Correspondence',
            description: 'Connect letters to their sounds',
            difficulty: 1,
            mastery: 0.8,
            prerequisites: ['phoneme_awareness'],
            category: 'phonics',
          },
          {
            id: 'blending',
            name: 'Blending',
            description: 'Combine sounds to form words',
            difficulty: 2,
            mastery: 0.7,
            prerequisites: ['letter_sound_correspondence'],
            category: 'phonics',
          },
          {
            id: 'segmenting',
            name: 'Segmenting',
            description: 'Break words into individual sounds',
            difficulty: 2,
            mastery: 0.6,
            prerequisites: ['letter_sound_correspondence'],
            category: 'phonics',
          },
          {
            id: 'syllable_types',
            name: 'Syllable Types',
            description: 'Recognize and read different syllable patterns',
            difficulty: 3,
            mastery: 0.4,
            prerequisites: ['blending', 'segmenting'],
            category: 'syllables',
          },
          {
            id: 'morphology',
            name: 'Morphology',
            description: 'Understand word parts and their meanings',
            difficulty: 4,
            mastery: 0.2,
            prerequisites: ['syllable_types'],
            category: 'morphology',
          },
          {
            id: 'fluency',
            name: 'Fluency',
            description: 'Read with accuracy, speed, and expression',
            difficulty: 5,
            mastery: 0.1,
            prerequisites: ['syllable_types'],
            category: 'fluency',
          },
        ];
        
        setSkills(mockSkills);
        
        // Get the next recommended skill
        const next = await bktService.getNextSkill();
        setNextSkill(next);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, [user]);
  
  const handleSkillClick = (skill) => {
    // Navigate to the skill page
    navigate(`/skills/${skill.id}`);
  };
  
  const getMasteryColor = (mastery) => {
    if (mastery >= 0.95) return '#4CAF50'; // Green (mastered)
    if (mastery >= 0.7) return '#8BC34A';  // Light green
    if (mastery >= 0.5) return '#FFEB3B';  // Yellow
    if (mastery >= 0.3) return '#FFC107';  // Amber
    return '#F44336';                      // Red (not mastered)
  };
  
  if (loading) {
    return <div className="skill-tree-loading">Loading skill tree...</div>;
  }
  
  if (error) {
    return <div className="skill-tree-error">{error}</div>;
  }
  
  return (
    <div className="skill-tree-container">
      <h2 className="skill-tree-title">Skill Tree</h2>
      
      {nextSkill && (
        <div className="next-skill-container">
          <h3>Recommended Next Skill</h3>
          <div 
            className="next-skill-card"
            onClick={() => handleSkillClick(nextSkill)}
          >
            <h4>{nextSkill.name}</h4>
            <p>{nextSkill.description}</p>
            <button className="start-skill-button">Start Learning</button>
          </div>
        </div>
      )}
      
      <div className="skill-tree-grid">
        {skills.map((skill) => (
          <div 
            key={skill.id}
            className={`skill-hex ${skill.mastery >= 0.95 ? 'mastered' : ''}`}
            onClick={() => handleSkillClick(skill)}
            style={{
              '--mastery-color': getMasteryColor(skill.mastery),
              '--mastery-percent': `${skill.mastery * 100}%`,
            }}
          >
            <div className="skill-hex-content">
              <h3>{skill.name}</h3>
              <div className="mastery-bar">
                <div 
                  className="mastery-progress"
                  style={{ width: `${skill.mastery * 100}%` }}
                ></div>
              </div>
              <span className="mastery-text">{Math.round(skill.mastery * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="skill-categories">
        <div className="category">
          <div className="category-color phonology"></div>
          <span>Phonology</span>
        </div>
        <div className="category">
          <div className="category-color phonics"></div>
          <span>Phonics</span>
        </div>
        <div className="category">
          <div className="category-color syllables"></div>
          <span>Syllables</span>
        </div>
        <div className="category">
          <div className="category-color morphology"></div>
          <span>Morphology</span>
        </div>
        <div className="category">
          <div className="category-color fluency"></div>
          <span>Fluency</span>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
