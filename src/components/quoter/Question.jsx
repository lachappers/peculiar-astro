import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import OptionList from "./OptionList";
import TextInput from "./TextInput";
library.add(far, fab, fas);

function setupQuestion(q) {
  const inputType = q.question_type;
  const isRequired = q.required;

  return { inputType, isRequired };
}

export default function Question({
  question,
  setChoice,
  setQuestionAnswered,
  sectionAnswers,
  setSectionComplete,
}) {
  const { inputType, isRequired } = setupQuestion(question);

  const [questionComplete, setQuestionComplete] = useState(false);
  const [questionOutline, setQuestionOutline] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    questionComplete ? setSectionComplete(true) : setSectionComplete(false);
    // setQuestionOutline("invalid");
    return () => {
      // setQuestionOutline("");
      setSectionComplete(false);
    };
  }, [questionComplete]);

  // useEffect(() => {
  //   console.log("changing question complete");
  //   console.log(sectionAnswers);
  //   console.log(Object.keys(sectionAnswers));
  //   let keys = Object.keys(sectionAnswers);
  //   if (keys.includes(question.id)) {
  //     console.log("question included");
  //   } else {
  //     console.log("question missing");
  //   }
  // }, [sectionAnswers]);
  console.log("questioncomplete");
  console.log(questionComplete);

  return (
    (question && (
      <div
        className={`questionBody relative flex flex-col justify-center gap-1 rounded p-2 ${questionOutline}`}
        key={question.id}
      >
        <h2
          id={`question-${question.id}`}
          className="col-span-full w-full text-xl"
        >
          {question.name}
        </h2>

        <p className="mb-4 text-sm italic">{question.description}</p>
        {isRequired && (
          <p className="absolute right-0 top-2 w-max  px-2 text-right text-xs italic">
            (Required)
          </p>
        )}

        {question.options.length > 0 ? (
          <OptionList
            question={question}
            sectionAnswers={sectionAnswers}
            setChoice={setChoice}
            setQuestionAnswered={setQuestionAnswered}
            setQuestionComplete={setQuestionComplete}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <>
            <TextInput
              question={question}
              sectionAnswers={sectionAnswers}
              setChoice={setChoice}
              setQuestionAnswered={setQuestionAnswered}
              name={`response-${question.id}`}
              // className=
              type={inputType}
              setQuestionComplete={setQuestionComplete}
            />
          </>
        )}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold  text-red-500">
            <FontAwesomeIcon icon={"fa-triangle-exclamation"} /> {errorMessage}
          </div>
        )}
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
