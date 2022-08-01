import React from "react";
import './Answer.css'

export default function Answer(props) {

    const mys = {backgroundColor: props.isHeld ? "red" : "#899878"}
    const clsName = props.showAnswer ? !props.isCorrect ? "red-bg" : "green-bg"
    : ""
    const myStyle = {backgroundColor: props.showAnswer ? !props.isCorrect ? "red-bg" : "green-bg"
    : ""}
    return (
        <div className="answer" onClick={props.held}>
            <p
            className={`${clsName}`}
            dangerouslySetInnerHTML={{__html:props.answerText}}>
            </p>
        </div>
    )
}