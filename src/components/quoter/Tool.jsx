import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import { k as countUsers } from "./UserList";
import QuestionsList from "./QuestionsList";
// import { countUsers as countUsers } from "./UserList";

// import { UserList } from "./UserList";

function getQuestionsList() {
  const [questionsList, setQuestionsList] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "questions.json",
      { mode: "cors" },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestionsList(data);
        setQuestionCount(data.length);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { questionsList, questionCount, error, loading };
}

export default function Tool() {
  const { questionsList, questionCount, error, loading } = getQuestionsList();
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading data...</p>;

  return (
    <div className=" tool flex flex-col justify-between gap-2">
      <h2>Question space</h2>
      <QuestionsList
        questionsList={questionsList}
        questionCount={questionCount}
      />
    </div>
  );
}
