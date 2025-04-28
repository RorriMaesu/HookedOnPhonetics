import { useState } from 'react';

function DiscourseDrills() {
  const [selectedPassage, setSelectedPassage] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const passages = [
    {
      type: 'Narrative',
      text: `Sarah woke up late on Monday morning. Her alarm hadn't gone off, and now she was running behind schedule. She quickly got dressed and grabbed her backpack. Sarah rushed out the door without eating breakfast. When she arrived at school, she realized she had forgotten her science project at home. Sarah called her mom, who agreed to bring the project to school. Sarah felt relieved but promised herself to be more organized in the future.`,
      questions: [
        {
          id: 'n1',
          text: 'What was the main problem in this story?',
          options: [
            'Sarah didn\'t like school.',
            'Sarah woke up late and forgot her science project.',
            'Sarah\'s mom was angry with her.',
            'Sarah didn\'t have any friends at school.'
          ],
          correctAnswer: 1,
        },
        {
          id: 'n2',
          text: 'How was the problem resolved?',
          options: [
            'Sarah skipped school that day.',
            'Sarah\'s teacher gave her an extension.',
            'Sarah\'s mom brought the project to school.',
            'Sarah made a new project at school.'
          ],
          correctAnswer: 2,
        },
        {
          id: 'n3',
          text: 'What can you infer about Sarah from this story?',
          options: [
            'She is usually very organized.',
            'She doesn\'t care about her schoolwork.',
            'She has a supportive parent.',
            'She enjoys science class the most.'
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      type: 'Expository',
      text: `Photosynthesis is the process by which plants make their own food. Plants need sunlight, water, and carbon dioxide for photosynthesis to occur. The sunlight is absorbed by chlorophyll, a green pigment found in plant cells. The plant uses the energy from sunlight to convert water and carbon dioxide into glucose (sugar) and oxygen. The glucose provides energy for the plant to grow, while the oxygen is released into the air. Without photosynthesis, plants would not be able to survive, and animals, including humans, would not have oxygen to breathe.`,
      questions: [
        {
          id: 'e1',
          text: 'What is the main topic of this passage?',
          options: [
            'How plants grow',
            'The importance of sunlight',
            'The process of photosynthesis',
            'Why oxygen is important'
          ],
          correctAnswer: 2,
        },
        {
          id: 'e2',
          text: 'What three things do plants need for photosynthesis?',
          options: [
            'Sunlight, water, and soil',
            'Sunlight, water, and carbon dioxide',
            'Chlorophyll, glucose, and oxygen',
            'Energy, sugar, and air'
          ],
          correctAnswer: 1,
        },
        {
          id: 'e3',
          text: 'According to the passage, why is photosynthesis important for humans?',
          options: [
            'It provides us with food directly.',
            'It helps plants grow, which we can eat.',
            'It produces oxygen, which we need to breathe.',
            'It removes harmful carbon dioxide from the air.'
          ],
          correctAnswer: 2,
        },
      ],
    },
  ];
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex,
    });
  };
  
  const checkAnswers = () => {
    setShowResults(true);
  };
  
  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };
  
  const calculateScore = () => {
    const currentPassage = passages[selectedPassage];
    let correct = 0;
    
    currentPassage.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: currentPassage.questions.length,
      percentage: Math.round((correct / currentPassage.questions.length) * 100),
    };
  };
  
  const currentPassage = passages[selectedPassage];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Discourse Drills</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex space-x-4 border-b mb-6">
          {passages.map((passage, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${selectedPassage === index ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => {
                setSelectedPassage(index);
                setUserAnswers({});
                setShowResults(false);
              }}
            >
              {passage.type}
            </button>
          ))}
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">{currentPassage.type} Passage</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="leading-relaxed">{currentPassage.text}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Comprehension Questions</h3>
          
          {currentPassage.questions.map((question, qIndex) => (
            <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-blue-50 p-3 border-b border-gray-200">
                <h4 className="font-semibold">Question {qIndex + 1}: {question.text}</h4>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-start">
                      <input
                        type="radio"
                        id={`${question.id}-${oIndex}`}
                        name={question.id}
                        checked={userAnswers[question.id] === oIndex}
                        onChange={() => handleAnswerSelect(question.id, oIndex)}
                        className="mt-1 mr-2"
                        disabled={showResults}
                      />
                      <label 
                        htmlFor={`${question.id}-${oIndex}`}
                        className={`flex-grow ${
                          showResults 
                            ? oIndex === question.correctAnswer 
                              ? 'text-green-600 font-semibold' 
                              : userAnswers[question.id] === oIndex 
                                ? 'text-red-600 line-through' 
                                : ''
                            : ''
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                
                {showResults && (
                  <div className={`mt-3 p-2 rounded-lg ${
                    userAnswers[question.id] === question.correctAnswer 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`${
                      userAnswers[question.id] === question.correctAnswer 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {userAnswers[question.id] === question.correctAnswer 
                        ? 'Correct!' 
                        : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex space-x-4">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={currentPassage.questions.length !== Object.keys(userAnswers).length}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
        
        {showResults && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold mb-2">Results</h3>
            <p>
              You got {calculateScore().correct} out of {calculateScore().total} questions correct ({calculateScore().percentage}%).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscourseDrills;
