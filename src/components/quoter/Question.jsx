import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import OptionList from "./OptionList";
library.add(far, fab, fas);

export default function Question({
  question,
  setChoice,
  setQuestionAnswered,
  sectionAnswers,
}) {
  console.log(question);

  // const optionList = question.options?.map((option) => (
  //   <ul
  //     className="options grid-cols-2 grid-rows-2"
  //     role="list"
  //     aria-labelledby={`question_${question.id}`}
  //   >
  //     <Option
  //       option={option}
  //       isChecked={option.id == sectionAnswers[question.id]}
  //       key={option.id}
  //     />
  //   </ul>
  // ));

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
        {/* {optionList} */}
        <OptionList
          question={question}
          sectionAnswers={sectionAnswers}
          setChoice={setChoice}
          setQuestionAnswered={setQuestionAnswered}
        />
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
