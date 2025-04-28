import { useState } from 'react';

function StoryMapBuilder() {
  const [storyElements, setStoryElements] = useState({
    title: '',
    setting: {
      place: '',
      time: '',
    },
    characters: {
      protagonist: '',
      antagonist: '',
      others: '',
    },
    plot: {
      problem: '',
      events: '',
      resolution: '',
    },
    theme: '',
  });
  
  const handleInputChange = (category, field, value) => {
    if (field) {
      setStoryElements({
        ...storyElements,
        [category]: {
          ...storyElements[category],
          [field]: value,
        },
      });
    } else {
      setStoryElements({
        ...storyElements,
        [category]: value,
      });
    }
  };
  
  const saveStoryMap = () => {
    // In a real implementation, this would save the story map to a database
    alert('Story map saved successfully!');
  };
  
  const clearStoryMap = () => {
    setStoryElements({
      title: '',
      setting: {
        place: '',
        time: '',
      },
      characters: {
        protagonist: '',
        antagonist: '',
        others: '',
      },
      plot: {
        problem: '',
        events: '',
        resolution: '',
      },
      theme: '',
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Story Map Builder</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 mb-2">Story Title:</label>
          <input
            type="text"
            id="title"
            value={storyElements.title}
            onChange={(e) => handleInputChange('title', null, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your story..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-600">Setting</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="setting-place" className="block text-gray-700 mb-1">Place:</label>
                <input
                  type="text"
                  id="setting-place"
                  value={storyElements.setting.place}
                  onChange={(e) => handleInputChange('setting', 'place', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Where does the story take place?"
                />
              </div>
              
              <div>
                <label htmlFor="setting-time" className="block text-gray-700 mb-1">Time:</label>
                <input
                  type="text"
                  id="setting-time"
                  value={storyElements.setting.time}
                  onChange={(e) => handleInputChange('setting', 'time', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="When does the story take place?"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-600">Characters</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="character-protagonist" className="block text-gray-700 mb-1">Protagonist (Main Character):</label>
                <input
                  type="text"
                  id="character-protagonist"
                  value={storyElements.characters.protagonist}
                  onChange={(e) => handleInputChange('characters', 'protagonist', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Who is the main character?"
                />
              </div>
              
              <div>
                <label htmlFor="character-antagonist" className="block text-gray-700 mb-1">Antagonist (Opposing Force):</label>
                <input
                  type="text"
                  id="character-antagonist"
                  value={storyElements.characters.antagonist}
                  onChange={(e) => handleInputChange('characters', 'antagonist', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Who or what opposes the main character?"
                />
              </div>
              
              <div>
                <label htmlFor="character-others" className="block text-gray-700 mb-1">Other Characters:</label>
                <input
                  type="text"
                  id="character-others"
                  value={storyElements.characters.others}
                  onChange={(e) => handleInputChange('characters', 'others', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Who else is in the story?"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-purple-600">Plot</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="plot-problem" className="block text-gray-700 mb-1">Problem/Conflict:</label>
              <textarea
                id="plot-problem"
                value={storyElements.plot.problem}
                onChange={(e) => handleInputChange('plot', 'problem', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="What problem does the main character face?"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="plot-events" className="block text-gray-700 mb-1">Key Events:</label>
              <textarea
                id="plot-events"
                value={storyElements.plot.events}
                onChange={(e) => handleInputChange('plot', 'events', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="What important events happen in the story?"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="plot-resolution" className="block text-gray-700 mb-1">Resolution:</label>
              <textarea
                id="plot-resolution"
                value={storyElements.plot.resolution}
                onChange={(e) => handleInputChange('plot', 'resolution', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="How is the problem resolved?"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="theme" className="block text-gray-700 mb-2">Theme/Message:</label>
          <textarea
            id="theme"
            value={storyElements.theme}
            onChange={(e) => handleInputChange('theme', null, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="What is the main message or lesson of the story?"
          ></textarea>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={saveStoryMap}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Story Map
          </button>
          <button
            onClick={clearStoryMap}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryMapBuilder;
