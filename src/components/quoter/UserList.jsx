import React, { useEffect, useState } from "react";
// import { UsersList } from "./DataProvider";

function getUserList() {
  const [userList, setUserList] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
        console.log(response);
      })
      .then((data) => {
        setUserList(data);
        // console.log(data.length);
        setUserCount(data.length);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { userList, userCount, error, loading };
}

const getUser = (userList, index) => {
  let user = userList[index];

  return { user };
};

function UserList({ index, setCount }) {
  console.log(index);

  const { userList, userCount, error, loading } = getUserList();

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;
  const { user } = getUser(userList, index);
  setCount(userList.length);

  return (
    (userList && (
      <div className="quotey">
        {/* {console.log(userCount)} */}
        {console.log("Hello from the inside!")}
        {/* <p>{index}</p> */}
        <p key={user.id}>Hello! {user.name}</p>
        {/* <div className="flex justify-between">
        <Buttons index={index} />
      </div> */}
        <p>
          ({index + 1} of {userList.length})
        </p>
      </div>
    )) || <h1>Loading...</h1>
  );
}

const k = 10;
export { UserList, k };
