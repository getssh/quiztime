import React from "react";
import { useState, useEffect } from "react";
import {nanoid} from 'nanoid'
import Question from './Components/Question/Question'
import './App.css'
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

function App() {
  const [start, setStart] = useState(false)
  const [custum, setCustum] = useState({
    amount: 10,
    catagory: "",
    difficulty: "",
  })
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [checkAnswer, setCheckAnswer] = useState(false)

  useEffect(() => {
    const fetchLink = `https://opentdb.com/api.php?amount=${custum.amount}&category=${custum.catagory}&difficulty=${custum.difficulty}&type=multiple`
    fetch(fetchLink)
      .then(res => res.json())
      .then(data => {
        const answers = data.results.map(que => {
          return {
            ...que,
            answers: [
              {
                answerText: que.correct_answer,
                isHeld: false,
                id: nanoid(),
                isCorrect: true,
              },
              {
                answerText: que.incorrect_answers[0],
                isHeld: false,
                id: nanoid(),
                isCorrect: false,
              },
              {
                answerText: que.incorrect_answers[1],
                isHeld: false,
                id: nanoid(),
                isCorrect: false,
              },
              {
                answerText: que.incorrect_answers[2],
                isHeld: false,
                id: nanoid(),
                isCorrect: false,
              },
            ].sort(() => Math.random() - 0.5)
          }
        })
        setQuestion(data.results)
        setAnswer(answers)
      })
  }, [custum])
  
  function handelHeld(idNum, answ) {
    setAnswer(oldAns => oldAns.map(an => {
      const allAns = an.answers.map(ans => {
        return idNum === ans.id ?
        {
          ...ans,
          isHeld: !ans.isHeld,
        } :
        ans
      })

      return {
        ...an,
        answers: allAns,
        }
      }
    ))

    setScore(oldScore => answ === question[questionNumber].correct_answer ?
        (checkAnswer ? oldScore : oldScore += 1) :
        oldScore
      )
    setCheckAnswer(true)
  }
  
  function prevQuestion() {
    setQuestionNumber(oldNum => oldNum -= 1)
  }

  function nextQuestion() {
    setQuestionNumber(oldNum => oldNum += 1)
    setCheckAnswer(false)
  }

  function reloadPage() {
    window.location.reload()
  }

  function handelStart() {
    setStart(prevStart => !prevStart)
  }

  function handelChange(event) {
    const {name, value} = event.target

    setCustum(prevCustum => ({
      ...prevCustum,
      [name]: value
    }))
  }
  return (
      start ?
    (
      question.length > 0 ?
        questionNumber >= question.length ?
        <div className="quiz game-over">
          <Header />
          <h3>Game Over</h3>
          <h2>Your Score is {score} / {question.length}</h2>
          <button onClick={reloadPage}>Play Again</button>
        </div>
        :
        <div className="quiz">
            <Header
            questionNumber={questionNumber}
            questionLength={question.length}
            catagory={question[questionNumber].category}
            />
            <Question
            question={question[questionNumber].question}
            answer={answer[questionNumber].answers}
            handelHeld={handelHeld}
            showAnswer={checkAnswer}
            />
          <button onClick={nextQuestion}>Next</button>
          <h3 className="score">Score: {score}</h3>
        </div>
       :
      <div className="quiz">
        <h3></h3>
      </div>
    )
      :
    <Home
    handelStart={handelStart}
    handelChange={handelChange}
    custumize={custum}
    />

  )
}

export default App

//Below code needs to be rewriten
//   const [question, setQuestion] = useState([])
//   const [answer, setAnswer] = useState([])
//   const [questionNumber, setQuestionNumber] = useState(0)

//   useEffect(() => {
//     fetch('https://opentdb.com/api.php?amount=10&type=multiple')
//       .then(res => res.json())
//       .then(data => {
//         const questions = data.results.map(quest => {
//           return {
//             ...quest,
//             answers: [quest.correct_answer, ...quest.incorrect_answers].sort(() => Math.random() - 0.5)
//           }
//         })
//         setQuestion(questions)

//         const answers = data.results.map(an => {
//           return {
//             ...an,
//             answers: {
//               question: an.question,
//               ansText: [an.correct_answer, ...an.incorrect_answers],
//               correctAnswer: an.correct_answer,
//               id: nanoid(),
//               isHeld: false,
//             }
//           }
//         })
//         setAnswer(answers)
//       }
//     )
//   }, [])

//   function handelHeld(idNum) {
//     setAnswer(oldAnswer => ({
//       answers: oldAnswer.answers.map((ans, ind) => {
//         return idNum === ans.id ? {...ans, isHeld: !ans.isHeld} :
//         ans
//       })
//     }))
//   }

//   const quest = question.map((qu, ind) => <Question
//   question={answer[ind].answers[0].question}
//   answer={answer[ind].answers}
//   held={answer[ind].answers}
//   handelHeld={handelHeld}
//   />)

//   return (
//     <div className="quiz">
//       {question.length > 0 ? quest : "...Loading"}
//     </div>
//   )
// }

// export default App