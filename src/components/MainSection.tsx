"use client";

import React from "react";
import KeyInput from "./KeyInput";
import ValueInput from "./ValueInput";

const MainSection = () => {
  const [keyValue, setKeyValue] = React.useState<number[][]>([]);

  return (
    <div className="my-4 mx-2">
      <KeyInput setKeyValue={setKeyValue} />
      <ValueInput keyValue={keyValue} />
    </div>
  );
};

export default MainSection;
