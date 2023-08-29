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
        <p className="font-sm mb-4 italic">{q.description}</p>
        <div className="choices ">
          {q.choices.map((choice) => (
                <div key={choice.id}  className="choice flex gap-2">
                
                    <input
                        key={choice.id} 
                        id={choice.id}
                        type="radio"
                        value={choice.id}
                        name="choices"
                        onChange={handleSelector}
                        className=""
                        checked={choice.id == answer || choice.isSelected}
                        />
                    <label htmlFor={choice.id} >
                        {choice.name}
                    </label>
                </div>
            
        ))}
        </div>
      </div>
    )) || <h1>Loading choices...</h1>
  );
}
