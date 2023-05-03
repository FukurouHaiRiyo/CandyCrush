import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LevelPage from './components/LevelPage';

const App = () => {
  return (
    <BrowserRouter>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:py-3 sm:px-6 md:py-4 md:px-8 lg:py-5 lg:px-10'>
        <Link to="/landing-page">Start playing</Link>
      </button>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;