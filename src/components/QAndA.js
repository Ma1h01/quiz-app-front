import React from 'react'
import CountDownTimer from './CountDownTimer'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const QAndA = () => {
  const [questions, setQuestions] = useState([])
  const [currIndex, setCurrIndex] = useState(0)
  const [responses, setResponses] = useState([])
  const [quizId, setQuizId] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(12)
  const submitFlag = useRef(false) // mutable object that won't cause re-rendering when updated

  const {mode} = useParams()

  const fetchQuestions = async () => {
    const res = await fetch('https://surely-grand-prawn.ngrok-free.app/quiz/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
    setQuizId(data[0].quizId)
    return data
  }


  // the useEffect hook is only called once when the component is first rendered
  // or when the dependencies in the array change
  useEffect(() => {
    if (mode === 'easy') {
      setTimeRemaining(120)
    } else if (mode === 'normal') {
      setTimeRemaining(100)
    } else {
      setTimeRemaining(90)
    }
    const getQuestions = async () => {
      const questions = await fetchQuestions()
      setQuestions(questions)
    }

    getQuestions()
  }, [mode])



  const submitResponses = async (id, allResponses) => {
    const res = await fetch(`https://surely-grand-prawn.ngrok-free.app/quiz/submit/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allResponses)
    })

    const score = await res.json()
    return score
  }

  useEffect(() => {
    if (currIndex !== 0 && currIndex === questions.length) {
      submitFlag.current = true
    }
    if (submitFlag.current && currIndex  === questions.length) {
      console.log(`loop: ${submitFlag.current}`)
      submitResponses(quizId, responses).then((score) => {
        alert(`Your score is ${score}`)
      }) 
    }
    console.log(submitFlag.current)
    console.log(currIndex)
  }, [responses, currIndex, questions.length, quizId])


  // When the user clicks on an option, the response is added to the responses array, which will be sent to the server for grading.
  const buttonClick = (event) => {
    // the setState function will run twice because once the state is updated, it re-render the component
    setResponses((prevResponses) => {
     const tempResponses = [...prevResponses, {questionId: questions[currIndex].questionId, response: event.target.value}] 
      return tempResponses
    })
    setCurrIndex((prevIndex) => (prevIndex + 1))
  }

  if (questions.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
        <Link to='/'>
          <button className='back-btn'>Back</button>
        </Link>
      </div>
    )
  }

  if (currIndex === questions.length) {
    return (
      <Link to='/'>
          <button className='back-btn'>Back</button>
      </Link>
    )
  }

  return (
    <div className='q-n-a-div'>
      <div className='timer'>
        <CountDownTimer timeRemaining={timeRemaining} 
        decreaseTimer={() => setTimeRemaining((prevTime) => prevTime - 1)}
        submitFlag={submitFlag}/>
      </div>
      {currIndex !== questions.length && 
        <>
        <h1>{currIndex + 1}. {questions[currIndex].questionTitle} </h1>
        <button value={questions[currIndex].option1} onClick={buttonClick}>A. {questions[currIndex].option1}</button>
        <button value={questions[currIndex].option2} onClick={buttonClick}>B. {questions[currIndex].option2}</button>
        <button value={questions[currIndex].option3} onClick={buttonClick}>C. {questions[currIndex].option3}</button>
        <button value={questions[currIndex].option4} onClick={buttonClick}>D. {questions[currIndex].option4}</button>
        </>
      }
    </div>
  )
}

export default QAndA
