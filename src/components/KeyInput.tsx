import { useState } from "react";
import KeyInputNumber from "./KeyInput.Number";
import { Alert, Button } from "@heroui/react";

const KeyInput = () => {
  const [input1, setInput1] = useState<number | null>(null);
  const [input2, setInput2] = useState<number | null>(null);
  const [input3, setInput3] = useState<number | null>(null);
  const [input4, setInput4] = useState<number | null>(null);
  const [input5, setInput5] = useState<number | null>(null);
  const [input6, setInput6] = useState<number | null>(null);
  const [input7, setInput7] = useState<number | null>(null);
  const [input8, setInput8] = useState<number | null>(null);
  const [input9, setInput9] = useState<number | null>(null);

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [statusText, setStatusText] = useState<string>(
    "Kunci belum divalidasi",
  );

  const submitKey = () => {
    setIsValid(true);
    setStatusText("Kunci telah valid!");
    console.log("Submitted key:", [
      [input1, input2, input3],
      [input4, input5, input6],
      [input7, input8, input9],
    ]);
  };

  return (
    <div className="w-full border border-neutral-200 rounded-xl p-4">
      <Alert className="mb-4" status={isValid ? "success" : "danger"}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{statusText}</Alert.Title>
        </Alert.Content>
      </Alert>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput1} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput2} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput3} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput4} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput5} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput6} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput7} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput8} />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber storeVar={setInput9} />
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={submitKey}>
        Validasi Kunci
      </Button>
    </div>
  );
};

export default KeyInput;
