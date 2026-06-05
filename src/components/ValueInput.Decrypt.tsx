import { Button, Input, Label } from "@heroui/react";
import { KeyRound } from "lucide-react";
import React from "react";

const ValueInputDecrypt = () => {
  const [decryptedText, setDecryptedText] = React.useState<string>("");

  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cipher-text">Cipher Text</Label>
        <Input
          id="cipher-text"
          min={0}
          placeholder="Masukan teks yang ingin didekripsi"
          className="border border-neutral-200"
          type="text"
          variant="primary"
        />
      </div>
      <Button className="w-full mt-2">
        <KeyRound />
        Decrypt
      </Button>
      <div className="border border-neutral-200 rounded-xl px-2 py-1 mt-8">
        {decryptedText ? (
          <p className="text-base text-neutral-700">{decryptedText}</p>
        ) : (
          <p className="text-sm text-neutral-400">
            Teks yang didekripsi akan muncul di sini
          </p>
        )}
      </div>
    </div>
  );
};

export default ValueInputDecrypt;
