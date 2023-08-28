import React, { useEffect, useState } from "react";
import User from "./User";

const getUsersList = () => {
  const [usersList, setUsersList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        setUsersList(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { usersList, error, loading };
};

const getUser = (usersList, index) => {
  let user = usersList[index];

  return { user };
};

function Greeting() {
  const { usersList, error, loading } = getUsersList();

  const [index, setIndex] = useState(0);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading greeting...</p>;

  function handleClick() {
    setIndex(index + 1);
  }
  function handleBack() {
    setIndex(index - 1);
  }

  function Buttons() {
    if (index > 0 && index < usersList.length - 1) {
      return (
        <>
          <button onClick={handleBack} className="back-btn">
            Back
          </button>
          <button onClick={handleClick} className="next-btn">
            Next
          </button>
        </>
      );
    } else if (index >= usersList.length - 1) {
      return (
        <button onClick={handleBack} className="back-btn w-full">
          Back
        </button>
      );
    } else {
      return (
        <button onClick={handleClick} className="next-btn w-full">
          Next
        </button>
      );
    }
  }

  const { user } = getUser(usersList, index);

  return (
    (usersList && (
      <div className="quotey">
        {/* <p>{index}</p> */}
        <p key={user.id}>Hello! {user.name}</p>
        <div className="flex justify-between">
          <Buttons index={index} />
        </div>
        <p>
          ({index + 1} of {usersList.length})
        </p>
      </div>
    )) || <h1>Loading...</h1>
  );
}

export default Greeting;

//   const fetchUserData = () => {
//     fetch("https://jsonplaceholder.typicode.com/users", { mode: "cors" })
//       .then((response) => {
//         if (response.status >= 400) {
//           throw new Error("server error");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUsersList(data);
//       })
//       .catch((error) => setError(error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const [index, setIndex] = useState(0);
//   function handleClick() {
//     setIndex(index + 1);
//   }
//   let user = {};
//   user = usersList[index];

//   console.log(user.toLocaleString());

//   console.log(user);
//   console.log(usersList);

//   console.log(usersList[1]);
//   console.log(usersList[0]);

//   console.log({ usersList });
