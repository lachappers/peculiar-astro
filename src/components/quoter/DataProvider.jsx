import React, { useEffect, useState } from "react";
import Question from "./Question";

function getQuestionsList() {
  console.log("hola qs");
  const [questionsList, setQuestionsList] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "questions.json",
      { mode: "cors" },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestionsList(data);
        setQuestionCount(data.length);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { questionsList, questionCount, error, loading };
}

export default function QuestionGallery() {
  const [index, setIndex] = useState(0);
  const { questionsList, questionCount, error, loading } = getQuestionsList();
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading data...</p>;
  const hasNext = index < questionCount - 1;
  const hasBack = index > 0;
  //   const [answers, setAnswers] = useState([]);

  function handleNext() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }
  function handleBack() {
    if (hasBack) {
      setIndex(index - 1);
    }
  }
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
        <button onClick={handleBack} className="back-btn w-full">
          Back
        </button>
      );
    } else {
      return (
        <button onClick={handleNext} className="next-btn w-full">
          Next
        </button>
      );
    }
  }

  //   let question = questionsList[index];
  //   console.log(question);

  return (
    // (questionsList && (
    <>
      <Question question={questionsList[index]} />
      <Buttons />
      <p>
        ({index + 1} of {questionsList.length})
      </p>
    </>
    // )) || <h1>Loading questions...</h1>
  );
}
