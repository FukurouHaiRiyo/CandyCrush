import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import bg_image from '../images/bg_image.png';

const LEVELS = [
      {id: 1, name: 'Level 1', unlockedScore: 0},
      {id: 2, name: 'Level 2', unlockedScore: 1000},
      {id: 3, name: 'Level 3', unlockedScore: 2000},
      {id: 4, name: 'Level 4', unlockedScore: 3000},
      {id: 5, name: 'Level 5', unlockedScore: 4000},
      {id: 6, name: 'Level 6', unlockedScore: 5000},
      {id: 7, name: 'Level 7', unlockedScore: 6000},
      {id: 8, name: 'Level 8', unlockedScore: 7000},
      {id: 9, name: 'Level 9', unlockedScore: 8000},
      {id: 10, name: 'Level 10', unlockedScore: 9000},
]
const LandingPage = ({unlockedLevels}) => {
      unlockedLevels = [1];
      
      return (
            <div className='h-screen bg-center bg-cover' style={{backgroundImage: `url(${bg_image})`}}>
                  <div className='flex flex-col items-center justify-center h-full bg-gray-900 bg-opacity-50'>
                        <h1 className='text-4xl font-bold mb-8'>Candy Crush Remake</h1>

                        <p className='text-lg mb-2'>Select your level to start: </p>
                        <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                              {LEVELS.map((level) => (
                                    <li key={level.id}>
                                          <Link to={`/level/${level.id}`}>
                                                <button
                                                      className={`w-full rounded-lg p-4 text-lg font-bold ${
                                                      unlockedLevels.includes(level.id)
                                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                                            : 'bg-gray-500 cursor-not-allowed text-gray-300'
                                                      }`}

                                                      disabled={!unlockedLevels.includes(level.id)}
                                                >
                                                      {level.name}
                                                </button>
                                          </Link>
                                    </li>
                              ))}
                        </ul>
                  </div>
            </div>
      )
}

export default LandingPage;