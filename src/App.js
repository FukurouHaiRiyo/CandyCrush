import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LevelPage from './components/LevelPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;