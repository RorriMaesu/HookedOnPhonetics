import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Phonics from './pages/Phonics';
import Speech from './pages/Speech';
import Writing from './pages/Writing';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Skill from './pages/Skill';
import useUserStore from './store/userStore';
import FluencyStudio from './components/FluencyStudio/FluencyStudio';
import MorphologyLab from './components/MorphologyLab/MorphologyLab';

function App() {
  const initAuth = useUserStore(state => state.init);

  useEffect(() => {
    // Initialize Firebase auth state listener
    const unsubscribe = initAuth();

    // Clean up on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initAuth]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="phonics" element={<Phonics />} />
        <Route path="speech" element={<Speech />} />
        <Route path="writing" element={<Writing />} />
        <Route path="settings" element={<Settings />} />

        {/* Skill routes */}
        <Route path="skills/:skillId" element={<Skill />} />

        {/* Module routes */}
        <Route path="fluency/:passageId" element={<FluencyStudio />} />
        <Route path="morphology/:lessonId" element={<MorphologyLab />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
