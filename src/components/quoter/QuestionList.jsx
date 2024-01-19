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

  // const [choice, setChoice] = useState(
  //   questionAnswered ? sectionAnswers[questionAnswered] : []);

  console.log("CHOICE");
  console.log(choice);

  console.log("QUESTION ANSWERED");
  console.log(questionAnswered);

  console.log("Section Answers:");
  console.log(sectionAnswers);

  useEffect(() => {
    console.log("using QL effect");
    // console.log("choice:");
    // console.log(choice);
    // console.log("Q:");
    // console.log(questionAnswered);
    // console.log("section:");
    // console.log(sectionAnswers);
    if (questionAnswered !== null && choice.length > 0) {
      setSectionAnswers({
        ...sectionAnswers,
        [questionAnswered]: choice,
      });

      // saveSurvey(sectionAnswers);
      // console.log("saved Survey Question List");

      // return () => {
      //   setQuestionAnswered(null);
      //   setChoice([]);
      // };
    }
  }, [questionAnswered, choice]);

  useEffect(() => {
    console.log("useeffect section answers");
    saveSurvey(sectionAnswers);
    return () => {
      setQuestionAnswered(null);
      setChoice([]);
    };
  }, [sectionAnswers]);

  return (
    (questionList && sectionAnswers && (
      <>
        <div className="questionList flex grow flex-col gap-6 overflow-y-auto ">
          {questionList.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              setChoice={setChoice}
              setQuestionAnswered={setQuestionAnswered}
              sectionAnswers={sectionAnswers}
            />
          ))}
        </div>
      </>
    )) || <h1>Loading questions...</h1>
  );
}
