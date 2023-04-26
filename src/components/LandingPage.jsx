import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LEVELS = [
      {id: 1, name: 'Level 1'},
      {id: 2, name: 'Level 2'},
      {id: 3, name: 'Level 3'},
      {id: 4, name: 'Level 4'},
      {id: 5, name: 'Level 5'},
      {id: 6, name: 'Level 6'},
]

const LandingPage = () => {
      //at first, only level 1 is unlocked
      const [unlockedLevels, setUnlockedLevels] = useState([1]);

      return (
            <div className='h-screen bg-center bg-cover' style={{backgroundImage: "url('/bg-image.png')"}}>
                  <div className='flex flex-col items-center justify-center h-full bg-gray-900 bg-opacity-50'>
                        <h1 className='text-4xl font-bold mb-8'>Candy Crush Remake</h1>

                        <p className='text-lg mb-2'>Select your level to start: </p>
                        <ul className='grid grid-cols-3 gap-4'>
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