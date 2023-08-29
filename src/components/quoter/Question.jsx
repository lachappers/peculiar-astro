import React, { useEffect, useState } from "react";
export default function Question({
  question,
 setChoice,
  answer,
}) {

  function handleSelector(e){
    if ( answer !== e.target.id){
        setChoice(e.target.id)
    }
  }


  let q = question;


  return (
    (question && (
      <div className="quotey" key={question.id}>
        <h2 className="col-span-full w-full">{q.name}</h2>
        <div className="choices flex flex-col">
          {q.choices.map((choice) => (
            
                <label htmlFor={choice.id} key={choice.id} >
                    <input
                    id={choice.id}
                    type="radio"
                    value={choice.id}
                    name="choices"
                    onChange={handleSelector}
                    className="choice"
                    checked={choice.id == answer || choice.isSelected}
                    />
                    {choice.name}
                </label>
            
        ))}
        </div>
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
