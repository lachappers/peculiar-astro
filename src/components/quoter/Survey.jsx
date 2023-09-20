import React, { useEffect, useState } from "react";
import Section from "./Section";
import QuestionList from "./QuestionList";

function getSurvey() {
  const [survey, setSurvey] = useState([]);
  //   const [sectionCount, setSectionCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [surveyAnswers, setSurveyAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    fetch(
      "survey.json",
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
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.sections);
        setSurvey(data);
        //   setSuestionCount(data.length);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { survey, error, loading };
}

function Buttons({ setSectionIndex, hasBack, hasNext, setIsComplete }) {
  function handleNext() {
    if (hasNext) {
      setSectionIndex((i) => i + 1);
    } else {
      setIsComplete(true);
      //   alert("you've reached the end");
    }
  }
  function handleBack() {
    if (hasBack) {
      setSectionIndex((i) => i - 1);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsComplete(true);
  }
  function handleNav(sectionIndex) {}
  if (hasBack && hasNext) {
    return (
      <div className="flex w-full justify-between gap-2">
        <button onClick={handleBack} className="back-btn" type="button">
          Back<span className="sr-only"> Question</span>
        </button>
        <button onClick={handleNext} className="next-btn" type="button">
          Next<span className="sr-only"> Question</span>
        </button>
      </div>
    );
  } else if (!hasNext) {
    return (
      <div className="flex w-full justify-between gap-2">
        <button onClick={handleBack} className="back-btn w-full" type="button">
          Back<span className="sr-only"> Question</span>
        </button>
        {/* <button
          onClick={handleSubmit}
          className="next-btn w-full"
          type="submit"
        >
          Submit<span className="sr-only"> Response</span>
        </button> */}
        <button onClick={handleNext} className="next-btn w-full" type="button">
          Submit<span className="sr-only"> Response</span>
        </button>
      </div>
    );
  } else {
    return (
      <button onClick={handleNext} className="next-btn w-full" type="button">
        Next<span className="sr-only"> Question</span>
      </button>
    );
  }
}

const ProgressBar = ({ sectionCount, sectionIndex }) => {
  const completed = (((sectionIndex + 1) / sectionCount) * 100).toFixed(2);
  let completedStyle = {
    width: `${completed}%`,
  };
  return (
    <>
      <div className="progress w-full">
        <span className="flex" style={completedStyle}>
          {`${sectionIndex + 1} of ${sectionCount}`}
        </span>
      </div>
    </>
  );
};

export default function Survey({ setIsComplete, setSurveyAnswers }) {
  const { survey, error, loading } = getSurvey();
  const [sectionIndex, setSectionIndex] = useState(0);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading data...</p>;

  function saveSurvey(sectionAnswers) {
    setSurveyAnswers(sectionAnswers);
  }

  return (
    survey && (
      <form className=" flex flex-col justify-between gap-4">
        {/* Move this to sidebar? */}
        {sectionIndex == 0 && (
          <>
            <h2>{survey.name}</h2>
            <p>{survey.description}</p>
          </>
        )}
        <Section sectionList={survey.sections} sectionIndex={sectionIndex} />
        <QuestionList
          questionList={survey.sections[sectionIndex].questions}
          questionCount={survey.sections[sectionIndex].questions.length}
          saveSurvey={saveSurvey}
        />
        <Buttons
          setSectionIndex={setSectionIndex}
          hasBack={sectionIndex > 0}
          hasNext={sectionIndex < survey.sections.length - 1}
          setIsComplete={setIsComplete}
        />
        {/* <p>
            ({sectionIndex + 1} of {survey.sections.length})
            </p> */}
        <ProgressBar
          sectionCount={survey.sections.length}
          sectionIndex={sectionIndex}
        />
      </form>
    )
  );
}
