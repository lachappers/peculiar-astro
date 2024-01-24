import React, { useEffect, useState, useRef } from "react";
import Section from "./Section";
import QuestionList from "./QuestionList";

function getSurvey() {
  const [survey, setSurvey] = useState([]);
  //   const [sectionCount, setSectionCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [surveyComplete, setSurveyComplete] = useState(false);

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

function Buttons({
  setSectionIndex,
  hasBack,
  hasNext,
  setSurveyComplete,
  sectionComplete,
}) {
  function handleNext() {
    if (sectionComplete) {
      if (hasNext) {
        setSectionIndex((i) => i + 1);
      }
    }
  }
  function handleBack() {
    if (hasBack) {
      // saveSurvey(sectionAnswers);
      setSectionIndex((i) => i - 1);
    }
  }

  return (
    <div className="navButtons flex h-max w-full justify-between gap-2">
      {hasBack && (
        <button onClick={handleBack} className="back-btn w-full" type="button">
          Back<span className="sr-only"> Question</span>
        </button>
      )}
      {hasNext && (
        <button
          onClick={handleNext}
          className="next-btn w-full font-bold"
          type="button"
        >
          Next<span className="sr-only"> Question</span>
        </button>
      )}
      {!hasNext && (
        <button className="next-btn w-full font-bold" type="submit">
          Submit<span className="sr-only"> Response</span>
        </button>
      )}
    </div>
  );
}

const ProgressBar = ({ sectionCount, sectionIndex }) => {
  const completed = (((sectionIndex + 1) / sectionCount) * 100).toFixed(2);
  let completedStyle = {
    width: `${completed}%`,
  };
  return (
    <>
      <div className="progress h-4 w-full">
        <span className="flex h-4" style={completedStyle}>
          {/* {`${sectionIndex + 1} of ${sectionCount}`} */}
        </span>
      </div>
    </>
  );
};

export default function Survey({ setsurveyComplete }) {
  const { survey, error, loading } = getSurvey();
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);

  const formRef = useRef(null);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading data...</p>;

  function saveSurvey(sectionAnswers) {
    setSurveyAnswers(sectionAnswers);
  }

  // console.log("Survey answers:");
  // console.log(surveyAnswers);
  // console.log(formRef.current);

  function submitData(e) {
    e.preventDefault();
    console.log("submitting");
    const formData = new FormData(formRef.current);

    fetch(
      "https://script.google.com/macros/s/AKfycbwb0RIW1gpCMop7qA7j_Vi_Rnl7Tv8LCjF24t3rOMWT9CzCo4eqQPHO0LVKmr0eshxdFg/exec",
      {
        method: "POST",
        body: formData,
        mode: "cors",
      }
    )
      .then((res) => {
        console.log(res);
        console.log("submitted");
        setsurveyComplete(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("there was an error");
      });
  }

  return (
    survey &&
    surveyAnswers && (
      <form
        id="quoter"
        name="quoterForm"
        className=" flex h-full flex-col justify-between gap-4"
        method="post"
        ref={formRef}
        onSubmit={submitData}
      >
        <input
          type="hidden"
          name="responses"
          value={JSON.stringify(surveyAnswers)}
          // value={surveyAnswers}
        />
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
          setSectionComplete={setSectionComplete}
        />
        <Buttons
          setSectionIndex={setSectionIndex}
          hasBack={sectionIndex > 0}
          hasNext={sectionIndex < survey.sections.length - 1}
          sectionComplete={sectionComplete}
          setsurveyComplete={setsurveyComplete}
          sectionComplete={sectionComplete}
        />

        <ProgressBar
          sectionCount={survey.sections.length}
          sectionIndex={sectionIndex}
        />
      </form>
    )
  );
}
