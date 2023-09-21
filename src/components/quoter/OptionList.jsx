import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far, fab, fas);

function Option({ option, isChecked, input_type, handleSelector }) {
  console.log(isChecked);
  if (option.icon) {
    return (
      <li key={option.id} className="option flex flex-col items-center gap-2">
        <input
          id={`option-${option.id}`}
          type={input_type}
          value={option.id}
          // name="options"
          checked={isChecked || option.isSelected}
          onChange={handleSelector}
          className="relative left-[1em] top-[3.5em] h-[1em] w-[1em]"
        />

        <label
          htmlFor={`option-${option.id}`}
          className="flex flex-col items-center justify-center gap-1"
        >
          {option.icon ? <FontAwesomeIcon icon={option.icon} size="2x" /> : ""}
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

export default function OptionList({
  question,
  sectionAnswers,
  setChoice,
  setQuestionAnswered,
}) {
  //   console.log(sectionAnswers[question.id]);

  const multiple = question.question_type == "multiple_choice";
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

  useEffect(() => {
    // console.log("usefeecting");
    setChoice(checkedState);
  }, [checkedState]);

  function handleSelector(e) {
    console.log(checkedState);
    // console.log(parseInt(e.target.value));
    const intValue = parseInt(e.target.value);
    const { value, checked } = e.target;
    if (checkedState.includes(intValue)) {
      setCheckedState(checkedState.filter((v) => v !== intValue));
      setQuestionAnswered(question.id);
    } else {
      setCheckedState([...checkedState, intValue]);
      setQuestionAnswered(question.id);
    }
  }

  function checkChecked(target) {
    return checkedState.includes(target.id);
  }

  return (
    question.options &&
    checkedState && (
      <ul
        className="options grid-cols-2 grid-rows-2"
        role="list"
        aria-labelledby={`question_${question.id}`}
      >
        {question.options.map((option, index) => (
          <Option
            key={option.id}
            option={option}
            isChecked={checkChecked(option.id)}
            // isChecked={
            //   option.id == sectionAnswers[question.id] ||
            //   checkedState.includes(option.id)
            // }
            // isChecked={checkedState.includes(option.id)}
            // isChecked={sectionAnswers[question.id].includes(option.id)}

            input_type={setInputType()}
            handleSelector={handleSelector}
            // index = {index}
          />
        ))}
      </ul>
    )
  );
}
