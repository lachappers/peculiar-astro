// import React, { useEffect, useState } from "react";
// import Question from "./Question";

// function getQuestionsList() {
//   console.log("hola qs");
//   const [questionsList, setQuestionsList] = useState([]);
//   const [questionCount, setQuestionCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(
//       "questions.json",
//       { mode: "cors" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     )
//       .then((response) => {
//         if (response.status >= 400) {
//           throw new Error("server error");
//         }
//         console.log(response);
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setQuestionsList(data);
//         setQuestionCount(data.length);
//       })
//       .catch((error) => setError(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return { questionsList, questionCount, error, loading };
// }
