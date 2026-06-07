import { useState } from "react";
import KeyInputNumber from "./KeyInput.Number";
import { Alert, Button } from "@heroui/react";
import { checkKey } from "../actions/checkKey";
import { Lock, SquarePen } from "lucide-react";

const KeyInput = ({
  setKeyValue,
  setIsAllowedToFillInput,
}: {
  setKeyValue: React.Dispatch<React.SetStateAction<number[][]>>;
  setIsAllowedToFillInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input1, setInput1] = useState<number | null>(null);
  const [input2, setInput2] = useState<number | null>(null);
  const [input3, setInput3] = useState<number | null>(null);
  const [input4, setInput4] = useState<number | null>(null);
  const [input5, setInput5] = useState<number | null>(null);
  const [input6, setInput6] = useState<number | null>(null);
  const [input7, setInput7] = useState<number | null>(null);
  const [input8, setInput8] = useState<number | null>(null);
  const [input9, setInput9] = useState<number | null>(null);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(
    "Kunci belum divalidasi",
  );

  const [editable, setEditable] = useState(true);
  const resetStatus = () => {
    setIsValid(false);
    setStatusText("Kunci belum divalidasi");
    setEditable(true);
    setIsAllowedToFillInput(false);
  };

  const submitKey = () => {
    const status = checkKey([
      [input1 ?? 0, input2 ?? 0, input3 ?? 0],
      [input4 ?? 0, input5 ?? 0, input6 ?? 0],
      [input7 ?? 0, input8 ?? 0, input9 ?? 0],
    ]);

    if (status.success) {
      setIsValid(true);
      setStatusText(status.data.result);
      setEditable(false);
      setIsAllowedToFillInput(true);
      setKeyValue([
        [input1 ?? 0, input2 ?? 0, input3 ?? 0],
        [input4 ?? 0, input5 ?? 0, input6 ?? 0],
        [input7 ?? 0, input8 ?? 0, input9 ?? 0],
      ]);
    } else {
      setIsAllowedToFillInput(false);
      setIsValid(false);
      setStatusText(status.data.result);
    }
  };

  const [isDefaultKeyUsed, setIsDefaultKeyUsed] = useState(false);
  const useDefaultKey = () => {
    setInput1(12);
    setInput2(11);
    setInput3(5);
    setInput4(21);
    setInput5(18);
    setInput6(21);
    setInput7(21);
    setInput8(5);
    setInput9(19);
    setIsDefaultKeyUsed(true);
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
          <KeyInputNumber
            value={input1}
            storeVar={setInput1}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input2}
            storeVar={setInput2}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input3}
            storeVar={setInput3}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input4}
            storeVar={setInput4}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input5}
            storeVar={setInput5}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input6}
            storeVar={setInput6}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input7}
            storeVar={setInput7}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input8}
            storeVar={setInput8}
            lockStatus={editable}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <KeyInputNumber
            value={input9}
            storeVar={setInput9}
            lockStatus={editable}
          />
        </div>
      </div>
      {editable ? (
        <Button className="mt-4 w-full" onClick={submitKey}>
          <Lock />
          Validasi Kunci
        </Button>
      ) : (
        <Button className="mt-4 w-full" onClick={resetStatus} variant="outline">
          <SquarePen />
          Edit Kunci
        </Button>
      )}
      {!isDefaultKeyUsed && (
        <Button
          className="mt-1 w-full text-neutral-600"
          variant="ghost"
          onClick={useDefaultKey}
        >
          Gunakan Kunci Default
        </Button>
      )}
    </div>
  );
};

export default KeyInput;
