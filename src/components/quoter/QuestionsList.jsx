import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function QuestionList({ questionsList, questionCount }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  //   const [questionAnswered, setQuestionAnswered] = useState(false);
  const hasNext = index < questionCount - 1;
  const hasBack = index > 0;
  const [choice, setChoice] = useState(null);


  function handleNext() {
    if (hasNext) {
      setIndex(index + 1);
      handleNav(index);
    } else {
      alert("you've reached the end");
    }
  }
  function handleBack() {
    if (hasBack) {
      setIndex(index - 1);
      handleNav(index);
  
    //   if (answers[index]) {
    //     console.log("sucess back");
    //   }

    }
  }
  function handleNav(index) {
    if (choice) {
      setAnswers({
        ...answers,
        [index]: choice,
      });
    }
    setChoice(null);
  }
  function answered(index) {
    if (answers[index]) {
      console.log(answers[index]);
      console.log("success index");
      return true;
    } else {
      return undefined;
    }
  }

  //   console.log(answers);
  function navigate() {}
  function Buttons() {
    if (hasBack && hasNext) {
      return (
        <div className="flex w-full justify-between gap-2">
          <button onClick={handleBack} className="back-btn">
            Back
          </button>
          <button onClick={handleNext} className="next-btn">
            Next
          </button>
        </div>
      );
    } else if (!hasNext) {
      return (
        <div className="flex w-full justify-between gap-2">
          <button onClick={handleBack} className="back-btn w-full">
            Back
          </button>
          <button onClick={handleNext} className="next-btn w-full">
            Submit
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={handleNext} className="next-btn w-full">
          Next
        </button>
      );
    }
  }

  return (
    (questionsList && (
      <>
        <Question
                //   key={questionsList[index]}
          question={questionsList[index]}
          setChoice={setChoice}
          answer={answers ? answers[index] : null}
        />
        <Buttons />
        <p>
          ({index + 1} of {questionsList.length})
        </p>
      </>
    )) || <h1>Loading questions...</h1>
  );
}
