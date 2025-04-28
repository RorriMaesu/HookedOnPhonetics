import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Phonics from './pages/Phonics';
import Speech from './pages/Speech';
import Writing from './pages/Writing';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import useUserStore from './store/userStore';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
