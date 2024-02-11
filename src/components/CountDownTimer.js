import React from 'react'
import { useEffect } from 'react'

const CountDownTimer = ({timeRemaining, decreaseTimer, submitFlag}) => {
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (submitFlag.current) {
                clearInterval(intervalId)
            }
            else if (timeRemaining <= 0) {
                clearInterval(intervalId)
                alert('Time is up!')
            } else {
                // decreases the time remaining by 1 second
                // setTimeRemaining((prevTime) => prevTime - 1);
                decreaseTimer()
            }
        }, 1000)

        // optinal cleanup function
        return () => {
            clearInterval(intervalId)
        }
    }, [timeRemaining, decreaseTimer, submitFlag])

    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
  return (
    <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </p>
  )
}

export default CountDownTimer