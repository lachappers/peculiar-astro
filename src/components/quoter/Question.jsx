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

  return { inputType };
}

export default function Question({
  question,
  setChoice,
  setQuestionAnswered,
  sectionAnswers,
}) {
  const { inputType } = setupQuestion(question);

  return (
    (question && (
      <div
        className="questionBody relative flex h-full grow flex-col justify-center gap-1 "
        key={question.id}
      >
        <h2
          id={`question-${question.id}`}
          className="col-span-full w-full text-xl"
        >
          {question.name}
        </h2>

        <p className="mb-4 text-sm italic">{question.description}</p>
        {question.required && (
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
            />
          </>
        )}
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
