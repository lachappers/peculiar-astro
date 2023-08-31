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
  const [choice, setChoice] = useState(null);
  // const getSectionAnswers = (questionAnswered, choice) => {
  const [sectionAnswers, setSectionAnswers] = useState({});
  //   if (questionAnswered !== null && choice !== null) {
  //     // return console.log("question answered");
  //     setSectionAnswers({
  //       ...sectionAnswers,
  //       [questionAnswered]: choice,
  //     });

  //     setQuestionAnswered(null);
  //     setChoice(null);
  //   }

  //   return { sectionAnswers };
  // };

  // const { sectionAnswers } = getSectionAnswers(questionAnswered, choice);
  useEffect(() => {
    if (questionAnswered !== null && choice !== null) {
      setSectionAnswers({
        ...sectionAnswers,
        [questionAnswered]: choice,
      });
      return () => {
        setQuestionAnswered(null);
        setChoice(null);
      };
    }
  }, [questionAnswered, choice]);

  useEffect(() => {
    saveSurvey(sectionAnswers);
  }, [sectionAnswers]);

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
