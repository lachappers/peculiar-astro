import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function QuestionList({
  questionList,
  questionCount,
  saveSurvey,
  // setSurveyAnswers,
}) {
  // const [questionIndex, setIndex] = useState(0);

  const [questionAnswered, setQuestionAnswered] = useState(null);
  const [choice, setChoice] = useState([]);

  const [sectionAnswers, setSectionAnswers] = useState({});

  useEffect(() => {
    // console.log("choice:");
    // console.log(choice);
    // console.log("Q:");
    // console.log(questionAnswered);
    // console.log("section:");
    console.log(sectionAnswers);
    if (questionAnswered !== null && choice.length > 0) {
      setSectionAnswers({
        ...sectionAnswers,
        [questionAnswered]: choice,
      });
      return () => {
        setQuestionAnswered(null);
        setChoice([]);
      };
    }
  }, [questionAnswered, choice]);

  // useEffect(() => {
  //   console.log("choice:");
  //   console.log(choice);
  //   console.log("Q:");
  //   console.log(questionAnswered);
  //   console.log("section:");
  //   console.log(sectionAnswers);
  //   if (choice.length > 0) {
  //     setSectionAnswers({
  //       ...sectionAnswers,
  //       [questionAnswered]: choice,
  //     });

  //   }
  // }, [questionAnswered, choice]);

  useEffect(() => {
    saveSurvey(sectionAnswers);
    // return () => {
    //   setQuestionAnswered(null);
    //   setChoice([]);
    // };
  }, [sectionAnswers]);

  // function updateChoice(update) {
  //   setChoice([...choice, update])
  // }

  return (
    (questionList && sectionAnswers && (
      <>
        {questionList.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            setChoice={setChoice}
            setQuestionAnswered={setQuestionAnswered}
            sectionAnswers={sectionAnswers}
          />
        ))}
      </>
    )) || <h1>Loading questions...</h1>
  );
}
