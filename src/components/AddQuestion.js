import React from 'react'
import { useState } from 'react'
function AddQuestion() {
    const [questionTitle, setQuestionTitle] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [rightAnswer, setRightAnswer] = useState('')

    // default difficulty is easy
    const [difficultyLevel, setDifficultyLevel] = useState('Easy')

    const [category, setCategory] = useState('')

    const addQuestion = async () => {
        await fetch('https://surely-grand-prawn.ngrok-free.app/question/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionTitle: questionTitle,
                option1: answer1,
                option2: answer2,
                option3: answer3,
                option4: answer4,
                rightAnswer: rightAnswer,
                difficultyLevel: difficultyLevel,
                category: category
            })
        })
    }

    const onSubmit = (e) => {
        if(!questionTitle || !answer1 || !answer2 || !answer3 || !answer4 || !category) {
            alert(`Please fill out all fields ${questionTitle} ${answer1} ${answer2} ${answer3} ${answer4} ${rightAnswer} ${difficultyLevel} ${category}`)
            return
        }
        console.log(`Fields: ${questionTitle} ${answer1} ${answer2} ${answer3} ${answer4} ${rightAnswer} ${difficultyLevel} ${category}`)
        e.preventDefault()
        addQuestion()
    }

  return (
    <div>
        <form className='add-form'>
            <div>
                <label>Question Title </label>
                <input type='text' placeholder='Enter question title' value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)}/>
            </div>
            <div>
                <label>Answer 1 </label>
                <input type='text' placeholder='Enter answer 1' value={answer1} onChange={
                    (e) =>  {
                        setAnswer1(e.target.value)
                        // set the default right answer to the first option
                        setRightAnswer(e.target.value)
                    }
                        }/>
            </div>
            <div>
                <label>Answer 2 </label>
                <input type='text' placeholder='Enter answer 2' value={answer2} onChange={(e) => setAnswer2(e.target.value)}/>
            </div>
            <div>
                <label>Answer 3 </label>
                <input type='text' placeholder='Enter answer 3' value={answer3} onChange={(e) => setAnswer3(e.target.value)}/>
            </div>
            <div>
                <label>Answer 4 </label>
                <input type='text' placeholder='Enter answer 4' value={answer4} onChange={(e) => setAnswer4(e.target.value)}/>
            </div>
            <div>
                <label>Right Answer </label>
                <select name='Right Answer' onChange={(e) => setRightAnswer(e.target.value)}
                disabled={!answer1 || !answer2 || !answer3 || !answer4}>
                    <option value = {answer1}>Option 1</option>
                    <option value = {answer2}>Option 2</option>
                    <option value = {answer3}>Option 3</option>
                    <option value = {answer4}>Option 4</option>
                </select>
            </div>
            <div>
                <label>Difficulty </label>
                <select name='Difficulty' onChange={(e) => setDifficultyLevel(e.target.value)}>
                    <option value = 'Easy'>Easy</option>
                    <option value = 'Medium'>Medium</option>
                    <option value = 'Hard'>Hard</option>
                </select>
            </div>
            <div>
                <label>Category </label>
                <input type='text' placeholder='Enter question category' onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div>
                <input type='submit' value='Add Question' className='submit-button' onClick={onSubmit}/>
            </div>
        </form>
    </div>
  )
}

export default AddQuestion