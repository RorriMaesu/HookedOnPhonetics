import { useState } from 'react';
import WritingWorkshop from '../components/WritingWorkshop';
import SentenceCombiner from '../components/SentenceCombiner';
import StoryMapBuilder from '../components/StoryMapBuilder';
import ContextClueDetective from '../components/ContextClueDetective';
import DiscourseDrills from '../components/DiscourseDrills';
import useProgressStore from '../store/progressStore';

function Writing() {
  const [activeModule, setActiveModule] = useState('workshop');
  const { writingProgress } = useProgressStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Writing Workshop</h1>
      <p className="text-gray-600">
        Develop your writing skills with guided exercises and feedback.
      </p>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'workshop'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('workshop')}
          >
            Writing Workshop
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'sentences'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('sentences')}
          >
            Sentence Combiner
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'storymap'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('storymap')}
          >
            Story Map
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'context'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('context')}
          >
            Context Clues
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'discourse'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('discourse')}
          >
            Discourse Drills
          </button>
        </div>

        <div className="p-6">
          {activeModule === 'workshop' && <WritingWorkshop />}
          {activeModule === 'sentences' && <SentenceCombiner />}
          {activeModule === 'storymap' && <StoryMapBuilder />}
          {activeModule === 'context' && <ContextClueDetective />}
          {activeModule === 'discourse' && <DiscourseDrills />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Writing Progress</h2>
        <p className="text-gray-600">Track your progress in developing writing skills.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Planning</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${writingProgress.planning}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">{writingProgress.planning}%</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Organizing</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${writingProgress.organizing}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">{writingProgress.organizing}%</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Drafting</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${writingProgress.drafting}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">{writingProgress.drafting}%</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Revising</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${writingProgress.revising}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">{writingProgress.revising}%</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Overall</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${writingProgress.overall}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">{writingProgress.overall}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Writing Prompts</h2>
        <p className="text-gray-600 mb-4">Need inspiration? Try one of these writing prompts:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Describe your favorite place and why it's special to you.</li>
          <li>Write a story about a character who discovers a hidden talent.</li>
          <li>Explain how to make your favorite meal or snack.</li>
          <li>Write a letter to your future self.</li>
          <li>Compare and contrast two different characters from a book you've read.</li>
          <li>Write a persuasive essay about why people should recycle.</li>
        </ul>
      </div>
    </div>
  );
}

export default Writing;
