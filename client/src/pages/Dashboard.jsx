import { Link } from 'react-router-dom';
import useProgressStore from '../store/progressStore';
import useSettingsStore from '../store/settingsStore';

function Dashboard() {
  const getOverallProgress = useProgressStore(state => state.getOverallProgress);
  const { intensityLevel } = useSettingsStore();

  const overallProgress = getOverallProgress();

  // Get today's date
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="space-y-6">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
        <p className="font-bold">LearnReadWrite Ready</p>
        <p>Welcome to Hooked On Phonetics, your comprehensive literacy platform.</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-gray-600">{formattedDate}</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Overall Progress</h2>
          <div className="text-sm text-gray-600">
            <span
              className={`px-2 py-1 rounded-full ${
                intensityLevel === 'high'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {intensityLevel === 'high' ? 'High Intensity' : 'Maintenance'}
            </span>
          </div>
        </div>

        <div className="h-6 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${Math.round(overallProgress)}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600">{Math.round(overallProgress)}% complete</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800">Today's Schedule</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Phonics Practice - 10:00 AM</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span>Speech Session - 2:00 PM</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span>Writing Workshop - 4:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800">Recent Achievements</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>Completed Phonics Module 1</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>Improved Speech Fluency by 15%</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>Wrote First Complete Story</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-purple-800">Next Goals</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                <span>Complete Sentence Combining Exercise</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                <span>Practice Pronunciation of 'th' Sounds</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                <span>Create a Story Map for Next Writing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Phonics Playground</h2>
          <p className="text-gray-600 mb-4">
            Practice phonics with interactive games and exercises.
          </p>
          <ul className="mb-4 text-sm text-gray-600 space-y-1">
            <li>• Sound-Swap Games</li>
            <li>• Elkonin-Box Tiles</li>
            <li>• Fluency Sprint</li>
            <li>• Morphology Engine</li>
          </ul>
          <Link to="/phonics" className="text-blue-600 hover:underline">
            Start learning &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Speech Practice</h2>
          <p className="text-gray-600 mb-4">Improve pronunciation and speaking skills.</p>
          <ul className="mb-4 text-sm text-gray-600 space-y-1">
            <li>• Speech Recognition</li>
            <li>• Pronunciation Exercises</li>
            <li>• Teletherapy Sessions</li>
            <li>• Confidence Building</li>
          </ul>
          <Link to="/speech" className="text-blue-600 hover:underline">
            Start practicing &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Writing Workshop</h2>
          <p className="text-gray-600 mb-4">Develop writing skills with guided exercises.</p>
          <ul className="mb-4 text-sm text-gray-600 space-y-1">
            <li>• Sentence Combiner</li>
            <li>• Story Map Builder</li>
            <li>• Context Clue Detective</li>
            <li>• Discourse Drills</li>
          </ul>
          <Link to="/writing" className="text-blue-600 hover:underline">
            Start writing &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Educational Videos</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Introduction to Phonics</li>
              <li>Speech Articulation Basics</li>
              <li>Writing Process Overview</li>
              <li>Reading Comprehension Strategies</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Downloadable Materials</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Phonics Flashcards</li>
              <li>Speech Practice Worksheets</li>
              <li>Writing Prompts Collection</li>
              <li>Progress Tracking Templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
