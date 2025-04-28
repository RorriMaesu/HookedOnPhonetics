import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MASTERY_THRESHOLD } from '../../config/constants';
import './SkillTree.css';

/**
 * SkillTree component displays a hexagonal grid of skills with their mastery levels
 * 
 * @param {Object} props - Component props
 * @param {Array} props.skills - Array of skill objects
 * @param {Object} props.userSkills - Object mapping skill IDs to user skill data
 * @param {Object} props.nextSkill - Next recommended skill
 */
const SkillTree = ({ skills = [], userSkills = {}, nextSkill = null }) => {
  const navigate = useNavigate();
  
  // Combine skills with user mastery data
  const skillsWithMastery = skills.map(skill => {
    const userSkill = userSkills[skill.id] || {};
    return {
      ...skill,
      mastery: userSkill.mastery || 0,
    };
  });

  const handleSkillClick = (skill) => {
    // Navigate to the skill page
    navigate(`/skills/${skill.id}`);
  };
  
  const getMasteryColor = (mastery) => {
    if (mastery >= MASTERY_THRESHOLD) {
      return '#4CAF50'; // Green (mastered)
    }
    if (mastery >= 0.7) {
      return '#8BC34A';  // Light green
    }
    if (mastery >= 0.5) {
      return '#FFEB3B';  // Yellow
    }
    if (mastery >= 0.3) {
      return '#FFC107';  // Amber
    }
    return '#F44336';    // Red (not mastered)
  };
  
  return (
    <div className="skill-tree-container">
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
        {skillsWithMastery.map((skill) => (
          <div 
            key={skill.id}
            className={`skill-hex ${skill.mastery >= MASTERY_THRESHOLD ? 'mastered' : ''} ${skill.category}`}
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
