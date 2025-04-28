import { useState } from 'react';

function WritingWorkshop() {
  const [activeTab, setActiveTab] = useState('plan');
  const [planningData, setPlanningData] = useState({
    topic: '',
    audience: '',
    purpose: '',
    mainIdeas: '',
  });
  const [organizingData, setOrganizingData] = useState({
    introduction: '',
    bodyPoints: ['', '', ''],
    conclusion: '',
  });
  const [draftContent, setDraftContent] = useState('');
  const [revisionChecklist, setRevisionChecklist] = useState({
    ideas: false,
    organization: false,
    voice: false,
    wordChoice: false,
    sentenceFluency: false,
    conventions: false,
  });
  const [feedback, setFeedback] = useState('');
  
  const handlePlanningChange = (field, value) => {
    setPlanningData({
      ...planningData,
      [field]: value,
    });
  };
  
  const handleOrganizingChange = (field, value, index) => {
    if (field === 'bodyPoints') {
      const newBodyPoints = [...organizingData.bodyPoints];
      newBodyPoints[index] = value;
      
      setOrganizingData({
        ...organizingData,
        bodyPoints: newBodyPoints,
      });
    } else {
      setOrganizingData({
        ...organizingData,
        [field]: value,
      });
    }
  };
  
  const handleRevisionChecklistChange = (field) => {
    setRevisionChecklist({
      ...revisionChecklist,
      [field]: !revisionChecklist[field],
    });
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const generateFeedback = () => {
    // In a real implementation, this would call the Gemini API
    // For now, we'll use a placeholder
    const feedbackText = `
      Your writing shows good organization and clear main ideas. 
      
      Strengths:
      - Clear topic and purpose
      - Good paragraph structure
      - Effective conclusion
      
      Areas for improvement:
      - Consider adding more specific details to support your main points
      - Vary your sentence structure for more engaging reading
      - Check for consistent verb tense throughout
      
      Overall, this is a solid draft that effectively communicates your ideas.
    `;
    
    setFeedback(feedbackText);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Writing Workshop</h2>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'plan' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('plan')}
          >
            Plan
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'organize' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('organize')}
          >
            Organize
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'draft' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('draft')}
          >
            Draft
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'revise' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => handleTabChange('revise')}
          >
            Revise
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'plan' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Plan Your Writing</h3>
              <p className="text-gray-600 mb-6">Start by identifying your topic, audience, purpose, and main ideas.</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-gray-700 mb-2">Topic:</label>
                  <input
                    type="text"
                    id="topic"
                    value={planningData.topic}
                    onChange={(e) => handlePlanningChange('topic', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What are you writing about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="audience" className="block text-gray-700 mb-2">Audience:</label>
                  <input
                    type="text"
                    id="audience"
                    value={planningData.audience}
                    onChange={(e) => handlePlanningChange('audience', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Who will read your writing?"
                  />
                </div>
                
                <div>
                  <label htmlFor="purpose" className="block text-gray-700 mb-2">Purpose:</label>
                  <select
                    id="purpose"
                    value={planningData.purpose}
                    onChange={(e) => handlePlanningChange('purpose', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a purpose...</option>
                    <option value="inform">To inform</option>
                    <option value="persuade">To persuade</option>
                    <option value="entertain">To entertain</option>
                    <option value="explain">To explain</option>
                    <option value="describe">To describe</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mainIdeas" className="block text-gray-700 mb-2">Main Ideas:</label>
                  <textarea
                    id="mainIdeas"
                    value={planningData.mainIdeas}
                    onChange={(e) => handlePlanningChange('mainIdeas', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="List your main ideas here..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleTabChange('organize')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: Organize
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'organize' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Organize Your Ideas</h3>
              <p className="text-gray-600 mb-6">Arrange your ideas into a structured outline.</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="introduction" className="block text-gray-700 mb-2">Introduction:</label>
                  <textarea
                    id="introduction"
                    value={organizingData.introduction}
                    onChange={(e) => handleOrganizingChange('introduction', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="How will you introduce your topic?"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Body Points:</label>
                  {organizingData.bodyPoints.map((point, index) => (
                    <div key={index} className="mb-2">
                      <label htmlFor={`bodyPoint${index + 1}`} className="block text-gray-700 mb-1">Point {index + 1}:</label>
                      <textarea
                        id={`bodyPoint${index + 1}`}
                        value={point}
                        onChange={(e) => handleOrganizingChange('bodyPoints', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                        placeholder={`Main point ${index + 1} and supporting details...`}
                      ></textarea>
                    </div>
                  ))}
                </div>
                
                <div>
                  <label htmlFor="conclusion" className="block text-gray-700 mb-2">Conclusion:</label>
                  <textarea
                    id="conclusion"
                    value={organizingData.conclusion}
                    onChange={(e) => handleOrganizingChange('conclusion', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="How will you conclude your writing?"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleTabChange('plan')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back: Plan
                </button>
                <button
                  onClick={() => handleTabChange('draft')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: Draft
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'draft' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Write Your Draft</h3>
              <p className="text-gray-600 mb-6">Write your first draft based on your plan and outline.</p>
              
              <div>
                <label htmlFor="draftContent" className="block text-gray-700 mb-2">Draft:</label>
                <textarea
                  id="draftContent"
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="12"
                  placeholder="Start writing your draft here..."
                ></textarea>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleTabChange('organize')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back: Organize
                </button>
                <button
                  onClick={() => handleTabChange('revise')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: Revise
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'revise' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Revise and Edit</h3>
              <p className="text-gray-600 mb-6">Review and improve your writing.</p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Revision Checklist:</h4>
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="ideas"
                      checked={revisionChecklist.ideas}
                      onChange={() => handleRevisionChecklistChange('ideas')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="ideas" className="flex-grow">
                      <span className="font-semibold">Ideas:</span> My writing has a clear main idea and supporting details.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="organization"
                      checked={revisionChecklist.organization}
                      onChange={() => handleRevisionChecklistChange('organization')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="organization" className="flex-grow">
                      <span className="font-semibold">Organization:</span> My writing has a clear beginning, middle, and end.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="voice"
                      checked={revisionChecklist.voice}
                      onChange={() => handleRevisionChecklistChange('voice')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="voice" className="flex-grow">
                      <span className="font-semibold">Voice:</span> My writing sounds like me and engages the reader.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="wordChoice"
                      checked={revisionChecklist.wordChoice}
                      onChange={() => handleRevisionChecklistChange('wordChoice')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="wordChoice" className="flex-grow">
                      <span className="font-semibold">Word Choice:</span> I used specific and interesting words.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="sentenceFluency"
                      checked={revisionChecklist.sentenceFluency}
                      onChange={() => handleRevisionChecklistChange('sentenceFluency')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="sentenceFluency" className="flex-grow">
                      <span className="font-semibold">Sentence Fluency:</span> My sentences vary in length and structure.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="conventions"
                      checked={revisionChecklist.conventions}
                      onChange={() => handleRevisionChecklistChange('conventions')}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="conventions" className="flex-grow">
                      <span className="font-semibold">Conventions:</span> I checked for correct spelling, punctuation, and grammar.
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <button
                  onClick={generateFeedback}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get AI Feedback
                </button>
              </div>
              
              {feedback && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2">Feedback:</h4>
                  <div className="whitespace-pre-line">{feedback}</div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleTabChange('draft')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back: Draft
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Finalize Writing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WritingWorkshop;
