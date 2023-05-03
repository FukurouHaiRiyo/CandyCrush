import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LevelPage from './components/LevelPage';

const App = () => {
  return (
    <BrowserRouter>
        <Link to="/landing-page">
          <button className='w-full rounded-lg p-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white'>
              Start playing
          </button>
        </Link>
      
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;