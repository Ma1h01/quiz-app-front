import React from 'react'
import { Link } from 'react-router-dom'
import AddQuestion from './AddQuestion'
import MakeQuiz from './MakeQuiz'
import { useState } from 'react'
const ModeSelection = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [isMakingQuiz, setIsMakingQuiz] = useState(false)
  return (
    <div className='mode-selection-div'>
      <div className='add-question-btn-div'>
      <button className='add-make-button' onClick={() => setIsAdding(!isAdding)}> {isAdding ? 'Close' : 'Add Question'} </button>
      <button  className='add-make-button' onClick={() => setIsMakingQuiz(!isMakingQuiz)}> {isMakingQuiz ? 'Close' : 'Make Quiz'} </button>
      </div>
      
      <div className='add-make-form'>
      {isAdding && <AddQuestion/>}
      {isMakingQuiz && <MakeQuiz/>}
      </div>

      <div className='link-btn-div'>
        <Link to='/quiz/easy'>
          <button className='link-button'>
            Easy
          </button>
        </Link>
        
        <Link to='/quiz/normal'>
        <button className='link-button'>Normal</button>
        </Link>

        <Link to='/quiz/hard'>
        <button className='link-button'>Hard</button>
        </Link>                
      </div>
    </div>
  )
}


export default ModeSelection