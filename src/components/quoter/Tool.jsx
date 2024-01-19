import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
// import { Redirect } from "react-router-dom";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";

import DraftQuote from "./Quote";
import Survey from "./Survey";

library.add(far, fab, fas);

export default function Tool() {
  const [isComplete, setIsComplete] = useState(false);
  // const [surveyAnswers, setSurveyAnswers] = useState({});
  // const { questionsList, questionCount, error, loading } = getQuestionsList();
  // if (error) return <p>A network error was encountered</p>;
  // if (loading) return <p>Loading data...</p>;
  // const navigate = useNavigate();

  if (isComplete) {
    // <Route path="http://localhost:3001/users/sign_in" />;
    // navigate("http://localhost:3001/users/sign_in");
    // console.log(surveyAnswers);
    // submitData(e);

    return (
      <div className="tool flex flex-col justify-between gap-4">
        Completed wooo
        {/* <DraftQuote /> */}
      </div>
    );
  }
  return (
    <div className=" tool flex flex-col justify-between gap-4">
      {/* <FontAwesomeIcon icon="fa-regular fa-user" size="sm" /> */}
      {/* <FontAwesomeIcon icon={["fas", "coffee"]} /> */}

      {/* <h2>Section Heading</h2>
      <p>Section Description</p> */}
      {/* <QuestionsList
        questionsList={questionsList}
        questionCount={questionCount}
      /> */}
      {/* <DraftQuote /> */}
      <Survey
        setIsComplete={setIsComplete}
        // setSurveyAnswers={setSurveyAnswers}
      />
    </div>
  );
}
