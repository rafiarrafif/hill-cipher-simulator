"use client";

import React from "react";
import KeyInput from "./KeyInput";
import ValueInput from "./ValueInput";
import ValueInputDisable from "./ValueInput.disable";

const MainSection = () => {
  const [keyValue, setKeyValue] = React.useState<number[][]>([]);
  const [isAllowedToFillInput, setIsAllowedToFillInput] = React.useState(false);

  return (
    <div className="my-4 mx-2">
      <KeyInput
        setKeyValue={setKeyValue}
        setIsAllowedToFillInput={setIsAllowedToFillInput}
      />
      {isAllowedToFillInput ? (
        <ValueInput keyValue={keyValue} />
      ) : (
        <ValueInputDisable />
      )}
    </div>
  );
};

export default MainSection;
