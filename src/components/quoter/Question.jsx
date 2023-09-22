import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import OptionList from "./OptionList";
library.add(far, fab, fas);

function setupQuestion() {
  const [inputType, setInputType] = useState(null);
}

export default function Question({
  question,
  setChoice,
  setQuestionAnswered,
  sectionAnswers,
}) {
  // console.log(question);

  // function ShortText() {}
  // function LongText() {}
  // function isChoice() {
  //   if (
  //     question.question_type == "multiple_choice" ||
  //     question.question_type == "single_choice"
  //   ) {
  //     console.log("choice");
  //     return true;
  //   } else {
  //     console.log("not choice");
  //     return false;
  //   }
  // }

  return (
    (question && (
      <div className="quotey" key={question.id}>
        <h2
          id={`question-${question.id}`}
          className="col-span-full w-full text-xl"
        >
          {question.name}
        </h2>
        <p className="mb-4 text-sm italic">{question.description}</p>
        {question.required && (
          <p className="-mt-2 mb-4 text-right text-xs italic">(Required)</p>
        )}
        {/* {isChoice ? ( */}
        <OptionList
          question={question}
          sectionAnswers={sectionAnswers}
          setChoice={setChoice}
          setQuestionAnswered={setQuestionAnswered}
        />
        {/* ) : (
          <>
            <label className="flex flex-col items-center justify-center gap-1">
              <input
                name={`response-${question.id}`}
                className="form-input"
                type={inputType}
              />
            </label>
          </>
        )} */}
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
