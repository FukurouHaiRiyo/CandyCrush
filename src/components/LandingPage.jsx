import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import bg_image from '../images/bg_image.png';

const LandingPage = ({score}) => {
      const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const unlockedLevels = Math.floor(score / 1000);
      console.log(score)

      return (
            <div className='h-screen bg-center bg-cover' style={{backgroundImage: `url(${bg_image})`}}>
                  <div className='flex flex-col items-center justify-center h-full bg-gray-900 bg-opacity-50'>
                        <h1 className='text-4xl font-bold mb-8'>Candy Crush Remake</h1>

                        <p className='text-lg mb-2'>Select your level to start: </p>
                        <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                              {levels.map((level, index) => (
                                    <li key={index}>  
                                          <Link to={`/level/${level}`} key={index}>
                                                <button
                                                      className={`w-full rounded-lg p-4 text-lg font-bold ${
                                                            index <= unlockedLevels
                                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                                            : 'bg-gray-500 text-gray-300'
                                                      }`}
                                                >
                                                      {level}
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