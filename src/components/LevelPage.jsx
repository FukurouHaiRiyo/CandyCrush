import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import blue from '../images/blue-candy.png';
import green from '../images/green-candy.png';
import orange from '../images/orange-candy.png';
import purple from '../images/purple-candy.png';
import red from '../images/red-candy.png';
import yellow from '../images/yellow-candy.png';
import blank from '../images/blank.png';
import ScoreBoard from './ScoreBoard';

const width = 8
const candyColors = [
  blue,
  orange,
  purple,
  red,
  yellow,
  green
]

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

const LevelPage = () => {
      const { id } = useParams([]);
      const level = LEVELS.find((l) => l.id === parseInt(id));
      const nextLevel = LEVELS.find((l) => l.id === parseInt(id) + 1);

      const [timeLeft, setTimeLeft] = useState(60);
      const [result, setResult] = useState(null);
      const [currentColor, setCurrentColor] = useState([]);
      const [squareDragged, setSquareDragged] = useState(null);
      const [squareReplaced, setSquareReplaced] = useState(null);
      const [scoreDisplay, setScoreDisplay] = useState(0);
      const [lives, setLives] = useState(3);
      const [unlockedLevels, setUnlockedLevels] = useState([1]);

      const Level = () => {
            if (scoreDisplay >= LEVELS.unlockedScore && !unlockedLevels.includes(nextLevel.id)) {
                  setUnlockedLevels((prevLevels) => [...prevLevels, nextLevel.id]);
            }
      }
      //check for when the time ends
      useEffect(() => {
            if(timeLeft === 0 && lives >= 1){
                  if(scoreDisplay >= 1000){
                        setResult('You won');
                        Level();
                  } else {
                        setResult('You lost');
                        setLives(lives-1);
                  }
            }
      }, [timeLeft, scoreDisplay]);

      //countdown
      useEffect(() => {
            const interval = setInterval(() => {
                  const pause = true;
                  if(timeLeft > 0){
                        setTimeLeft(timeLeft - 1);
                  } else {
                        clearInterval(interval);
                  }
            }, 1000);

            return () => clearInterval(interval);
      }, [timeLeft]);

      //for reseting score and time
      const tryAgain = () => {
            setScoreDisplay(0);
            setTimeLeft(60);
            setResult(0);
            if(lives <= 0){
                  setLives(3);
            }
            createBoard();
      }

      //checks for a column of four squares with the same color
      const checkColumnOfFour = () => {
            for (let i = 0; i <= 39; i++) {
                  const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
                  const decidedColor = currentColor[i]
                  const isBlank = currentColor[i] === blank
            
                  if (columnOfFour.every(square => currentColor[square] === decidedColor && !isBlank)) {
                        setScoreDisplay((score) => score + 40)
                        columnOfFour.forEach(square => currentColor[square] = blank)
                        return true
                  }
            }
      }
  
      //checks for a row of four squares with the same color
      const checkRowOfFour = () => {
            for (let i = 0; i < 64; i++) {
                  const rowOfFour = [i, i + 1, i + 2, i + 3]
                  const decidedColor = currentColor[i]
                  const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
                  const isBlank = currentColor[i] === blank
      
            if (notValid.includes(i)) continue
      
            if (rowOfFour.every(square => currentColor[square] === decidedColor && !isBlank)) {
                        setScoreDisplay((score) => score + 40)
                        rowOfFour.forEach(square => currentColor[square] = blank)
                        return true
                  }
            }
      }
  
    //checks for a column of 3 squares with the same color
    const checkColumnOfThree = () => {
      for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColor[i]
            const isBlank = currentColor[i] === blank
      
            if (columnOfThree.every(square => currentColor[square] === decidedColor && !isBlank)) {
                  setScoreDisplay((score) => score + 40)
                  columnOfThree.forEach(square => currentColor[square] = blank)
                  return true
            }
      }
    }
  
    //checks for a row of 3 squares with the same color
    const checkRowOfThree = () => {
      for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColor[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColor[i] === blank
      
            if (notValid.includes(i)) continue
      
            if (rowOfThree.every(square => currentColor[square] === decidedColor && !isBlank)) {
                        setScoreDisplay((score) => score + 40)
                        rowOfThree.forEach(square => currentColor[square] = blank)
                        return true
                  }
            }
      }
  
      //function to fill the empty spaces
      const moveInEmptySpaces = () => {
            for (let i = 0; i <= 55; i++) {
                  const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                  const isFirstRow = firstRow.includes(i)
            
                  if (isFirstRow && currentColor[i] === blank) {
                        let randomNumber = Math.floor(Math.random() * candyColors.length)
                        currentColor[i] = candyColors[randomNumber]
                  }
                  
                  if ((currentColor[i + width]) === blank) {
                              currentColor[i + width] = currentColor[i]
                              currentColor[i] = blank
                  }
            }
      }
      
      //functions to handle the dragging of the elements
      const dragStart = (e) => {
            setSquareDragged(e.target)
      }
    
      const dragDrop = (e) => {
            setSquareReplaced(e.target)
      }
  
      const dragEnd = () => {
            const squareBeingDraggedId = parseInt(squareDragged.getAttribute('data-id'))
            const squareBeingReplacedId = parseInt(squareReplaced.getAttribute('data-id'))
      
            currentColor[squareBeingReplacedId] = squareDragged.getAttribute('src')
            currentColor[squareBeingDraggedId] = squareReplaced.getAttribute('src')
      
            const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
            ]
      
            const validMove = validMoves.includes(squareBeingReplacedId)
      
            const isAColumnOfFour = checkColumnOfFour()
            const isARowOfFour = checkRowOfFour()
            const isAColumnOfThree = checkColumnOfThree()
            const isARowOfThree = checkRowOfThree()
      
            if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
                  setSquareDragged(null)
                  setSquareReplaced(null)
            } else {
                  currentColor[squareBeingReplacedId] = squareReplaced.getAttribute('src')
                  currentColor[squareBeingDraggedId] = squareDragged.getAttribute('src')
                  setCurrentColor([...currentColor])
            }
      }
  
      //creating the board
      const createBoard = () => {
            const randomColorArrangement = []
            for (let i = 0; i < width * width; i++) {
                  const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
                  randomColorArrangement.push(randomColor)
            }
            setCurrentColor(randomColorArrangement)
      }
      
    useEffect(() => {
        createBoard()
    }, [])
  
    useEffect(() => {
        const timer = setInterval(() => {
            checkColumnOfFour()
            checkRowOfFour()
            checkColumnOfThree()
            checkRowOfThree()
            moveInEmptySpaces()
            setCurrentColor([...currentColor])
        }, 100)
        return () => clearInterval(timer)
    }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, moveInEmptySpaces, currentColor])
  


      return (
            <div className="app">
                  <div className="game">
                        {currentColor.map((candyColor, index) => (
                              <img
                                    key={index}
                                    src={candyColor}
                                    alt={candyColor}
                                    data-id={index}
                                    draggable={true}
                                    onDragStart={dragStart}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    onDragLeave={(e) => e.preventDefault()}
                                    onDrop={dragDrop}
                                    onDragEnd={dragEnd}
                              />
                        ))}
                  </div>
            <ScoreBoard score={scoreDisplay} timeLeft={timeLeft} result={result} playAgain={tryAgain} lives={lives}/>
        </div>
      )
}

export default LevelPage;