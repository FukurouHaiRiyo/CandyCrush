import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LevelPage from './components/LevelPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/level/:levelId' Component={LevelPage}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;