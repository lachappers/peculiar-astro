import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far, fab, fas);

export default function OptionList({
  question,
  sectionAnswers,
  setChoice,
  setQuestionAnswered,
}) {
  const [checkedState, setCheckedState] = useState([
    new Array(question.options.length).fill(false),
  ]);
  const multiple = question.question_type == "multiple_choice";
  //   console.log(sectionAnswers[question.id]);
  console.log(checkedState);

  function setInputType() {
    if (multiple) {
      return "checkbox";
    } else {
      return "radio";
    }
  }

  //   console.log(question.question_type);
  //   console.log(multiple);

  function handleSelector(e) {
    if (sectionAnswers[question.id] && !multiple) {
      console.log("Answers single");
      if (sectionAnswers[question.id] !== e.target.value) {
        setChoice(e.target.value);
        setQuestionAnswered(question.id);
      }
    } else if (sectionAnswers[question.id] && multiple) {
      console.log("Answers multi");

      if (sectionAnswers[question.id] !== checkedState) {
        setChoice(e.target.value);
        setQuestionAnswered(question.id);
      }
    } else {
      console.log("Not answered");
    }
    // if (sectionAnswers[question.id] !== e.target.value) {
    //   setChoice(e.target.value);
    //   setQuestionAnswered(question.id);
    // }
  }

  function Option({ option, isChecked, input_type, index }) {
    if (option.icon) {
      return (
        <li key={option.id} className="option flex flex-col items-center gap-2">
          <input
            id={`option-${option.id}`}
            type={input_type}
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
            <h4 className="text-lg capitalize">{option.name}</h4>
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
              type={input_type}
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

  return (
    question.options && (
      <ul
        className="options grid-cols-2 grid-rows-2"
        role="list"
        aria-labelledby={`question_${question.id}`}
      >
        {question.options.map((option, index) => (
          <Option
            option={option}
            isChecked={option.id == sectionAnswers[question.id]}
            key={option.id}
            input_type={setInputType()}
            index={index}
          />
        ))}
      </ul>
    )
  );
}
