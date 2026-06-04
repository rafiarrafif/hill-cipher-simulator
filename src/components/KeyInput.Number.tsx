import { NumberField } from "@heroui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const KeyInputNumber = ({
  storeVar,
}: {
  storeVar: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <NumberField
      className="w-full"
      minValue={0}
      onChange={(value) => storeVar(value ?? null)}
      aria-label="key-input"
      aria-labelledby="key-input"
    >
      <NumberField.Group className="flex border border-field-placeholder/30 rounded-lg">
        <NumberField.Input className="flex-1" />
        <div className="flex h-full flex-col border-l border-field-placeholder/15">
          <NumberField.IncrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pt-0.5 text-sm">
            <ChevronUp size={12} />
          </NumberField.IncrementButton>
          <NumberField.DecrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pb-0.5 text-sm">
            <ChevronDown size={12} />
          </NumberField.DecrementButton>
        </div>
      </NumberField.Group>
    </NumberField>
  );
};

export default KeyInputNumber;
