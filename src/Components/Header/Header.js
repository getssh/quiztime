import React from 'react'
import Quiz from '../../images/quizzz.png'
import './Header.css'

export default function Header(props) {
    return (
        <div className='head'>
            <div className='head__img'>
                <img src={Quiz} alt="quiz-log" />
            </div>
            {
                props.questionNumber < props.questionLength ?
                <div className='question-info'>
                    <div className='question-number'>
                        <h4>Question</h4>
                        <h5>{props.questionNumber + 1}/{props.questionLength}</h5>
                    </div>
                    <div className='question-catagory'>
                        <h4>Catagory</h4>
                        <h5>{props.catagory}</h5>
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}