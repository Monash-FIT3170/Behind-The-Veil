import React from "react";
import Button from "./Button.jsx";

export const App = () => (
  <div>
    {/* example use case */}
    <div className="flex flex-col gap-5 p-10">
      Example button:
      <Button className="bg-main-blue hover:bg-main-blue-hover ">Example</Button>
    </div>
  </div>
);
