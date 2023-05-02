import {useState, useEffect} from 'react';
import LandingPage from './LandingPage';

const ScoreBoard = ({ score, timeLeft, result, playAgain, lives }) => {
      return (
        <div className='p-4 bg-gray-100 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4'>Score: {score}</h2>
          <h2 className='text-2xl font-bold mb-4'>Time left: {timeLeft}</h2>
          <h2 className='text-2xl font-bold mb-4'>Lives: {lives}</h2>

          {timeLeft === 0 | lives === 0 && (
            <div className='flex flex-col items-center'>
              <p className='text-2xl font-bold mb-4'>{result}</p>
                <button className='bg-blue-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50' onClick={playAgain}>
                  Try again
                </button>
            </div>
          )}
        </div>
      )
    }
    
export default ScoreBoard;