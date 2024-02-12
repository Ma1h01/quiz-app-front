import React from 'react'
import { useState } from 'react'
function MakeQuiz() {
    const [quizTitle, setQuizTitle] = useState('')
    const [numQuestions, setNumQuestions] = useState(0)
    const [category, setCategory] = useState('')

    const makeQuiz = async () => {
        let link = category === '' ? `https://surely-grand-prawn.ngrok-free.app/quiz/create?numQ=${numQuestions}&title=${quizTitle}` : 
        `https://surely-grand-prawn.ngrok-free.app/quiz/create?category=${category}&numQ=${numQuestions}&title=${quizTitle}`
        await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!quizTitle || !numQuestions) {
            alert('Please fill out both Quiz Title and Number of Questions field fields')
            return
        } 
        makeQuiz()
    }

  return (
    <div>
        <form className='make-form'>
            <div>
                <label>Quiz Title </label>
                <input type='text' placeholder='Enter quiz title' value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)}/>
            </div>
            <div>
                <label>Number of Questions </label>
                <input type='number' placeholder='Enter number of questions' value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}/>
            </div>
            <div>
                <label>Category </label>
                <input type='text' placeholder='Enter quiz category, or leave it blank if no preference' value={category} onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div>
                <input type='submit' value='Create Quiz' className='submit-button' onClick={onSubmit}/>
            </div>
        </form>
    </div>
  )
}

export default MakeQuiz