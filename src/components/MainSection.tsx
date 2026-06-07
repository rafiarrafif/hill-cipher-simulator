"use client";

import React from "react";
import KeyInput from "./KeyInput";
import ValueInput from "./ValueInput";
import ValueInputDisable from "./ValueInput.disable";

const MainSection = () => {
  const [keyValue, setKeyValue] = React.useState<number[][]>([]);
  const [isAllowedToFillInput, setIsAllowedToFillInput] = React.useState(false);

  return (
    <div className="my-4 mx-2 pb-6">
      <KeyInput
        setKeyValue={setKeyValue}
        setIsAllowedToFillInput={setIsAllowedToFillInput}
      />
      <div className="w-full h-fit border border-neutral-200 rounded-xl px-2 py-2 mt-4">
        {isAllowedToFillInput ? (
          <ValueInput keyValue={keyValue} />
        ) : (
          <ValueInputDisable />
        )}
      </div>
    </div>
  );
};

export default MainSection;
