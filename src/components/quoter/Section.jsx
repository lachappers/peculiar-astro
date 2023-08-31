import React, { useEffect, useState } from "react";

// import Question from "./Question";
// import QuestionList from "./QuestionList";

export default function Section({ sectionList, sectionIndex }) {
  return (
    (sectionList && (
      <>
        <h3>{sectionList[sectionIndex].name}</h3>
        <p>{sectionList[sectionIndex].description}</p>
      </>
    )) || <h1>Loading section...</h1>
  );
}
