import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import { k as countUsers } from "./UserList";
import QuestionGallery from "./DataProvider";
// import { countUsers as countUsers } from "./UserList";

// import { UserList } from "./UserList";

export default function Tool() {
  const [answers, setAnswers] = useState([]);

  return (
    <div className=" tool flex flex-col justify-between gap-2">
      <h2>Question space</h2>
      <QuestionGallery />
    </div>
  );
}
