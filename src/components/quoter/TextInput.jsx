import React, { useEffect, useState } from "react";

export default function TextInput({
  question,
  sectionAnswers,
  setChoice,
  setQuestionAnswered,
  name,
  //   className,
  type,
  setQuestionComplete,
}) {
  //   console.log("textinput");
  //   console.log(sectionAnswers);
  //   const [responseState, setResponseState] = useState(
  //     sectionAnswers[question.id] ? sectionAnswers[question.id] : []
  //   );
  const [response, setResponse] = useState(
    sectionAnswers[question.id] ? sectionAnswers[question.id] : ""
  );
  const isRequired = question.required;

  console.log(isRequired);

  isRequired ? setQuestionComplete(false) : setQuestionComplete(true);

  //   console.log("response state:");
  //   console.log(responseState);
  //   console.log(responseState.length);
  //   console.log(question.id);
  //   console.log("response");
  //   console.log(response);

  //   useEffect(() => {
  //     //   console.log(response);
  //     setChoice(response);
  //     console.log("post-handling textinput");
  //     return () => {
  //       setQuestionAnswered(null);
  //       setChoice([]);
  //     };
  //   }, [response]);

  function handleEntry(e) {
    console.log("handling typing");
    // e.preventDefault();
    // console.log("handling typing");
    console.log(e.target.value);

    // if (responseState) {
    setQuestionAnswered(question.id);
    setResponse(e.target.value);
    setChoice(e.target.value);

    responseValid(e.target.value);
    // setResponseState([...responseState, response]);
    // }
  }
  function responseValid(response) {
    setQuestionComplete(true);
  }

  return (
    // response && (
    <label className="flex flex-col items-center justify-center gap-1">
      {type == "text" ? (
        <input
          name={name}
          className="form-input rounded-lg"
          type={type}
          onChange={handleEntry}
          defaultValue={response}
          maxLength={50}
        />
      ) : (
        <textarea
          name={name}
          className="form-textarea rounded-lg"
          type={type}
          rows={4}
          onChange={handleEntry}
          defaultValue={response}
          maxLength={1000}
        />
      )}
    </label>
    // )
  );
}
