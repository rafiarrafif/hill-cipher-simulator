import { Button, Input, Label } from "@heroui/react";
import { Copy, KeyRound } from "lucide-react";
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
      <div className="border border-neutral-200 rounded-xl px-4 py-2 mt-8">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-500 font-medium">
            HASIL ENKRIPSI
          </span>
          <div
            className="p-2 text-neutral-800 hover:bg-neutral-200 rounded-full cursor-pointer"
            onClick={() => navigator.clipboard.writeText(decryptedText)}
          >
            <Copy size={14} />
          </div>
        </div>
        <p className="text-base text-neutral-700 break-all mt-1">
          {decryptedText}
        </p>
      </div>
    </div>
  );
};

export default ValueInputDecrypt;
