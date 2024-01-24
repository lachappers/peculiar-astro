import React, { useEffect, useState } from "react";
import Question from "./Question";

function checkSectionComplete(
  questionList,
  sectionComplete,
  setSectionComplete
) {
  // if (questionList.any.required)
}

export default function QuestionList({
  questionList,
  questionCount,
  saveSurvey,
  sectionComplete,
  setSectionComplete,
  // setSurveyAnswers,
}) {
  // const [questionIndex, setIndex] = useState(0);

  const [questionAnswered, setQuestionAnswered] = useState(null);
  const [choice, setChoice] = useState([]);

  const [sectionAnswers, setSectionAnswers] = useState({});
  // const [sectionOutline, setSectionOutline] = useState("");
  // const [choice, setChoice] = useState(
  //   questionAnswered ? sectionAnswers[questionAnswered] : []);

  // console.log("CHOICE");
  // console.log(choice);

  // console.log("QUESTION ANSWERED");
  // console.log(questionAnswered);

  // console.log("Section Answers:");
  // console.log(sectionAnswers);

  useEffect(() => {
    console.log("using QL effect");

    if (questionAnswered !== null && choice.length > 0) {
      setSectionAnswers({
        ...sectionAnswers,
        [questionAnswered]: choice,
      });
      // if (!sectionComplete) {
      //   setSectionOutline("invalid");
      // }
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
        <div
          className={`questionList flex grow flex-col justify-center gap-6 overflow-y-auto`}
        >
          {questionList.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              setChoice={setChoice}
              setQuestionAnswered={setQuestionAnswered}
              sectionAnswers={sectionAnswers}
              setSectionComplete={setSectionComplete}
            />
          ))}
        </div>
      </>
    )) || <h1>Loading questions...</h1>
  );
}
