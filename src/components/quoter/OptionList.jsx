import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far, fab, fas);

function Option({ option, isChecked, input_type, handleSelector }) {
  //   console.log(isChecked);
  if (option.icon) {
    return (
      <li key={option.id} className="option flex flex-col items-center gap-2">
        <label
          htmlFor={`option-${option.id}`}
          className="flex flex-col items-center justify-center gap-1"
        >
          <input
            id={`option-${option.id}`}
            type={input_type}
            value={option.id}
            // name="options"
            checked={isChecked}
            onChange={handleSelector}
            // className="relative left-[1em] top-[3.5em] h-[1em] w-[1em]"
          />
          {option.icon ? <FontAwesomeIcon icon={option.icon} size="2x" /> : ""}
          <h4 className="text-base capitalize">{option.name}</h4>
          {option.description ? (
            <div className="max-w-[45ch] text-center text-sm italic">
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
      <li key={option.id} className="option ">
        <label
          htmlFor={`option-${option.id}`}
          className="flex flex-col items-center justify-center gap-1"
        >
          <input
            id={`option-${option.id}`}
            type={input_type}
            value={option.id}
            // name="options"
            checked={isChecked}
            onChange={handleSelector}
            // className="relative left-8 "
          />
          <h4 className="text-base capitalize">{option.name}</h4>
          {option.description ? (
            <div className="max-w-[45ch] text-center text-sm italic">
              {option.description}
            </div>
          ) : (
            ""
          )}
        </label>
      </li>
    );
  }
}

export default function OptionList({
  question,
  sectionAnswers,
  setChoice,
  setQuestionAnswered,
  setQuestionComplete,
}) {
  // console.log("option");
  // console.log(sectionAnswers);

  const multiple = question.question_type == "multiple_choice";

  // console.log(question.required);

  function setInputType() {
    if (multiple) {
      return "checkbox";
    } else {
      return "radio";
    }
  }

  const [checkedState, setCheckedState] = useState(
    sectionAnswers[question.id] ? sectionAnswers[question.id] : []
  );

  function GridCols() {
    if (question.options.length % 3 == 0 || question.options.length % 5 == 0) {
      return "grid-cols-3";
    } else {
      return "grid-cols-2 xl:grid-cols-4";
    }
  }

  useEffect(() => {
    console.log("setting choice at option list");

    setChoice(checkedState);
  }, [checkedState]);

  function handleSelector(e) {
    console.log("handling optionlist");
    // console.log(sectionAnswers);
    // console.log(checkedState);
    // console.log(parseInt(e.target.value));
    const intValue = parseInt(e.target.value);
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);
    if (multiple && checkedState.includes(intValue)) {
      // setQuestionAnswered(parseInt(question.id));
      setQuestionAnswered(question.id);
      setCheckedState(checkedState.filter((v) => v !== intValue));
    } else if (multiple) {
      setQuestionAnswered(question.id);
      setCheckedState([...checkedState, intValue]);
    } else {
      setQuestionAnswered(question.id);
      setCheckedState([intValue]);
    }
    setQuestionComplete(true);
  }

  function checkChecked(target) {
    return checkedState.includes(target);
  }

  return (
    question.options &&
    checkedState && (
      <ul
        className={`options content-stretch ${GridCols()}`}
        role="list"
        aria-labelledby={`question_${question.id}`}
      >
        {question.options.map((option, index) => (
          <Option
            key={option.id}
            option={option}
            isChecked={checkChecked(option.id)}
            input_type={setInputType()}
            handleSelector={handleSelector}
          />
        ))}
      </ul>
    )
  );
}
