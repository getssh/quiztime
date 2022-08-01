import React from 'react'
import './Question.css'
import Answer from '../Answer/Answer'

export default function Question(props) {
    
    const answ = props.answer.map(ans => <Answer
    answerText={ans.answerText}
    isHeld={ans.isHeld}
    id={ans.id}
    isCorrect={ans.isCorrect}
    held={() => props.handelHeld(ans.id, ans.answerText)}
    showAnswer={props.showAnswer}
    />)

    return (
        <div className='quiz__question'>
            <h3
            dangerouslySetInnerHTML={{__html:props.question}}
            className="question"
            >
            </h3>
            <div>
                {answ}
            </div>
        </div>
    )
}


//Below code needs to be rewriten
// export default function Question(props) {

//     const checker = "true"

//     const style1 = {backgroundColor:  props.held ? "#ffff00" : "transparent"}

//     //const finalStyle = {backgroundColor:  true ? "#ffff00" : "transparent"}

//     const answers = props.answer.map((answer, ind) => <Answer
//     answerText={answer.ansText}
//     answerId={answer.id}
//     answerIsHeld={answer.isHeld}
//     question={props.question}
//     handelHeld={() => props.handelHeld(answer.id)}
//     />)
//     return (
//         <div className='quiz__question'>
//             <h3
//             dangerouslySetInnerHTML={{__html: props.question}}
//             >
//             </h3>
//             <div className='answer'>
//                 {answers}
//             </div>
//         </div>
//     )
// }

// {/* <p style={style}>{props.answer[0].ansText}</p>
// <p style={style}>{props.answer[1].ansText}</p>
// <p style={style}>{props.answer[2].ansText}</p>
// <p style={style}>{props.answer[3].ansText}</p> */}