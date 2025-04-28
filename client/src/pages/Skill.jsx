import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useSkillsStore from '../store/skillsStore';
import useUserStore from '../store/userStore';
import { MASTERY_THRESHOLD } from '../config/constants';

/**
 * Skill page component for displaying individual skills
 */
const Skill = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { 
    skills, 
    userSkills, 
    fetchSkills, 
    fetchUserSkills, 
    recordSkillAttempt 
  } = useSkillsStore();
  
  const [skill, setSkill] = useState(null);
  const [userSkill, setUserSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityResult, setActivityResult] = useState(null);
  
  // Fetch skill data
  useEffect(() => {
    const loadSkillData = async () => {
      try {
        setLoading(true);
        
        // Fetch skills if not already loaded
        if (skills.length === 0) {
          await fetchSkills();
        }
        
        // Fetch user skills if not already loaded
        if (user && Object.keys(userSkills).length === 0) {
          await fetchUserSkills(user.uid);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading skill data:', err);
        setError('Failed to load skill data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadSkillData();
  }, [fetchSkills, fetchUserSkills, skills.length, user, userSkills]);
  
  // Set skill and userSkill when data is loaded
  useEffect(() => {
    if (!loading && skills.length > 0) {
      const foundSkill = skills.find(s => s.id === skillId);
      
      if (foundSkill) {
        setSkill(foundSkill);
        setUserSkill(userSkills[skillId] || { mastery: 0 });
      } else {
        setError('Skill not found.');
      }
    }
  }, [loading, skillId, skills, userSkills]);
  
  // Handle activity completion
  const handleActivityComplete = async (correct) => {
    try {
      const result = await recordSkillAttempt(skillId, correct);
      
      setActivityResult({
        correct,
        mastery: result.mastery,
        isMastered: result.mastery >= MASTERY_THRESHOLD,
      });
      
      // Update user skill
      setUserSkill({
        ...userSkill,
        mastery: result.mastery,
      });
    } catch (err) {
      console.error('Error recording activity result:', err);
      setError('Failed to record activity result. Please try again later.');
    }
  };
  
  // Get mastery color
  const getMasteryColor = (mastery) => {
    if (mastery >= MASTERY_THRESHOLD) return 'bg-green-500';
    if (mastery >= 0.7) return 'bg-green-300';
    if (mastery >= 0.5) return 'bg-yellow-300';
    if (mastery >= 0.3) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'phonology': return 'bg-red-100 text-red-800 border-red-200';
      case 'phonics': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'syllables': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'morphology': return 'bg-green-100 text-green-800 border-green-200';
      case 'fluency': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vocabulary': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'comprehension': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'writing': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
        <p>{error}</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline mt-2 inline-block">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }
  
  if (!skill) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
        <p>Skill not found.</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline mt-2 inline-block">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <span 
          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(skill.category)}`}
        >
          {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
        </span>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
        <p className="text-gray-600 mb-4">{skill.description}</p>
        
        <div className="flex items-center mb-6">
          <div className="mr-2 font-semibold">Mastery:</div>
          <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
            <div 
              className={`h-4 rounded-full ${getMasteryColor(userSkill.mastery)}`}
              style={{ width: `${userSkill.mastery * 100}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium">{Math.round(userSkill.mastery * 100)}%</div>
        </div>
        
        {activityResult && (
          <div className={`p-4 rounded-lg mb-6 ${activityResult.correct ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold">
              {activityResult.correct ? 'Great job!' : 'Keep practicing!'}
            </h3>
            <p>
              {activityResult.correct 
                ? 'You completed the activity successfully.' 
                : 'You can try again to improve your mastery.'}
            </p>
            <p className="mt-2">
              Your mastery is now {Math.round(activityResult.mastery * 100)}%.
              {activityResult.isMastered && ' You have mastered this skill!'}
            </p>
          </div>
        )}
        
        <h2 className="text-xl font-bold mb-4">Activities</h2>
        
        {skill.activities && skill.activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skill.activities.map((activity) => (
              <div 
                key={activity.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold mb-2">{activity.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                
                <div className="flex justify-between">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // In a real app, this would navigate to the activity
                      // For now, we'll simulate completing the activity
                      const correct = Math.random() > 0.3; // 70% chance of success
                      handleActivityComplete(correct);
                    }}
                  >
                    Start Activity
                  </button>
                  
                  {skill.category === 'fluency' && (
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      onClick={() => navigate(`/fluency/${activity.id}`)}
                    >
                      Fluency Studio
                    </button>
                  )}
                  
                  {skill.category === 'morphology' && (
                    <button 
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      onClick={() => navigate(`/morphology/${activity.id}`)}
                    >
                      Morphology Lab
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No activities available for this skill.</p>
        )}
        
        {skill.prerequisites && skill.prerequisites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
            <div className="flex flex-wrap gap-2">
              {skill.prerequisites.map((prereqId) => {
                const prereq = skills.find(s => s.id === prereqId);
                return prereq ? (
                  <Link 
                    key={prereqId}
                    to={`/skills/${prereqId}`}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {prereq.name}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skill;
