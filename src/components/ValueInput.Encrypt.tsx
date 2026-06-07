import { Button, Input, Label } from "@heroui/react";
import { Copy, Lock } from "lucide-react";
import { encrypt } from "../helpers/encrypt";
import React from "react";

const ValueInputEncrypt = ({ keyValue }: { keyValue: number[][] }) => {
  const [plainText, setPlainText] = React.useState<string | null>(null);
  const [encryptedText, setEncryptedText] = React.useState<string>("");

  const startEncrypt = () => {
    if (!plainText) return;
    const encrypted = encrypt(plainText, keyValue);

    setEncryptedText(
      encrypted.success ? encrypted.message : `Error: ${encrypted.message}`,
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="plain-text">Plain Text</Label>
        <Input
          id="plain-text"
          onChange={(val) => setPlainText(val.target.value)}
          min={0}
          placeholder="Masukan teks yang ingin dienkripsi"
          className="border border-neutral-200"
          type="text"
          variant="primary"
        />
      </div>
      <Button className="w-full mt-2" onClick={startEncrypt}>
        <Lock />
        Encrypt
      </Button>
      <div className="border border-neutral-200 rounded-xl px-4 py-2 mt-8">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-500 font-medium">
            HASIL ENKRIPSI
          </span>
          <div
            className="p-2 text-neutral-800 hover:bg-neutral-200 rounded-full cursor-pointer"
            onClick={() => navigator.clipboard.writeText(encryptedText)}
          >
            <Copy size={14} />
          </div>
        </div>
        <p className="text-base text-neutral-700 break-all mt-1">
          {encryptedText}
        </p>
      </div>
    </div>
  );
};

export default ValueInputEncrypt;
