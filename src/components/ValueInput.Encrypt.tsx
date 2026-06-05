import { Button, Input, Label } from "@heroui/react";
import { Lock } from "lucide-react";
import { encrypt } from "../helpers/encrypt";
import React from "react";

const ValueInputEncrypt = ({ keyValue }: { keyValue: number[][] }) => {
  const [plainText, setPlainText] = React.useState<string | null>(null);
  const [encryptedText, setEncryptedText] = React.useState<string>("");

  const startEncrypt = () => {
    if (!plainText) return;
    const encrypted = encrypt(plainText, keyValue);

    encrypted.success
      ? setEncryptedText(encrypted.message)
      : setEncryptedText(`Error: ${encrypted.message}`);
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cipher-text">Plain Text</Label>
        <Input
          id="cipher-text"
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
      <div className="border border-neutral-200 rounded-xl px-2 py-1 mt-8">
        {encryptedText ? (
          <p className="text-base text-neutral-700 break-all">
            {encryptedText}
          </p>
        ) : (
          <p className="text-sm text-neutral-400">
            Teks yang dienkripsi akan muncul di sini
          </p>
        )}
      </div>
    </div>
  );
};

export default ValueInputEncrypt;
