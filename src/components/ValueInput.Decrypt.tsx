import { Button, Input, Label } from "@heroui/react";
import { KeyRound } from "lucide-react";
import React from "react";
import { decrypt } from "../helpers/decrypt";

const ValueInputDecrypt = ({ keyValue }: { keyValue: number[][] }) => {
  const [encryptedText, setEncryptedText] = React.useState<string | null>(null);
  const [decryptedText, setDecryptedText] = React.useState<string>("");

  const startDecrypt = () => {
    if (!encryptedText) return;
    const decrypted = decrypt(encryptedText, keyValue);

    setDecryptedText(
      decrypted.success ? decrypted.message : `Error: ${decrypted.message}`,
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cipher-text">Cipher Text</Label>
        <Input
          id="cipher-text"
          onChange={(val) => setEncryptedText(val.target.value)}
          min={0}
          placeholder="Masukan teks yang ingin didekripsi"
          className="border border-neutral-200"
          type="text"
          variant="primary"
        />
      </div>
      <Button className="w-full mt-2" onClick={startDecrypt}>
        <KeyRound />
        Decrypt
      </Button>
      <div className="border border-neutral-200 rounded-xl px-2 py-1 mt-8">
        {decryptedText ? (
          <p className="text-base text-neutral-700 break-all">
            {decryptedText}
          </p>
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
