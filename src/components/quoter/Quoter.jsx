import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar.jsx";
import Greeting from "./Greeting.jsx";
import Tool from "./Tool.jsx";

export default function Quoter() {
  return (
    <>
      <div className="w-1/3 min-w-max flex flex-col gap-2 justify-center items-center">
        <Sidebar />
      </div>
      <div className="tool max-w-screen-sm lg:max-w-screen-lg rounded-md border-2 border-solid p-8 ">
        <Tool />
      </div>
    </>
  );
}
