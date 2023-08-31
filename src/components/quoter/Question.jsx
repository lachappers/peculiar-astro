import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far, fab, fas);

export default function Question({
  question,
  setChoice,
  setQuestionAnswered,
  sectionAnswers,
}) {
  function handleSelector(e) {
    if (sectionAnswers[question.id] !== e.target.value) {
      setChoice(e.target.value);
      setQuestionAnswered(question.id);
    }
  }

  function Option({ option, isChecked }) {
    if (option.icon) {
      return (
        <li key={option.id} className="option flex flex-col items-center gap-2">
          <input
            id={`option-${option.id}`}
            type="radio"
            value={option.id}
            // name="options"
            onChange={handleSelector}
            className="relative left-[1em] top-[3.5em] h-[1em] w-[1em]"
            checked={isChecked || option.isSelected}
          />

          <label
            htmlFor={`option-${option.id}`}
            className="flex flex-col items-center justify-center gap-1"
          >
            {option.icon ? (
              <FontAwesomeIcon icon={option.icon} size="2x" />
            ) : (
              ""
            )}
            <h4 className="capitalize">{option.name}</h4>
            {option.description ? (
              <div className="max-w-[30ch] text-center text-sm italic">
                {option.description}
              </div>
            ) : (
              ""
            )}
          </label>
        </li>
      );
    } else {
      return (
        <li
          key={option.id}
          className="option flex items-center justify-center gap-2"
        >
          <label
            htmlFor={`option-${option.id}`}
            className="flex flex-col items-center justify-center gap-1"
          >
            <input
              id={`option-${option.id}`}
              type="radio"
              value={option.id}
              // name="options"
              onChange={handleSelector}
              className="relative left-8 "
              checked={isChecked || option.isSelected}
            />
            <h4 className="capitalize">{option.name}</h4>
          </label>
        </li>
      );
    }
  }
  const optionList = question.options?.map((option) => (
    <Option
      option={option}
      isChecked={option.id == sectionAnswers[question.id]}
      key={option.id}
    />
  ));

  return (
    (question && (
      <div className="quotey" key={question.id}>
        <h2 id={`question-${question.id}`} className="col-span-full w-full">
          {question.name}
        </h2>
        <p className="mb-4 text-sm italic">{question.description}</p>
        <ul
          className="options "
          role="list"
          aria-labelledby={`question_${question.id}`}
        >
          {optionList}
        </ul>
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
