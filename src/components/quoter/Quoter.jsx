import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar.jsx";
import Greeting from "./Greeting.jsx";
import Tool from "./Tool.jsx";

export default function Quoter() {
  return (
    <>
      <div className="flex w-1/3 min-w-max flex-col items-center justify-center gap-2">
        <Sidebar />
      </div>
      <div className="tool max-w-screen-sm rounded-md border-2 border-solid p-8 lg:max-w-screen-lg ">
        <Tool />
      </div>
    </>
  );
}
