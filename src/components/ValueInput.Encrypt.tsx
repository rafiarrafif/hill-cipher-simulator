import { Button, Card, Input, Label, Separator } from "@heroui/react";
import { Copy, Lock } from "lucide-react";
import { encrypt } from "../helpers/encrypt";
import React from "react";

type EncryptProcess = {
  plaintextBlock: string[];
  plaintextBlockInNumber: number[];
  matrixMultiplication: string[];
  modulo: string[];
  ciphertextBlockInNumber: number[];
  ciphertextBlock: string[];
};

const ValueInputEncrypt = ({ keyValue }: { keyValue: number[][] }) => {
  const [plainText, setPlainText] = React.useState<string | null>(null);
  const [encryptedText, setEncryptedText] = React.useState<string>("");
  const [process, setProcess] = React.useState<EncryptProcess[] | null>(null);

  const startEncrypt = () => {
    if (!plainText) return;
    const encrypted = encrypt(plainText, keyValue);

    setEncryptedText(
      encrypted.success
        ? encrypted.data.result
        : `Error: ${encrypted.data.result}`,
    );
    setProcess(encrypted.data.process || []);
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
      {process && (
        <div className="pt-6 px-2">
          <h1 className="text-neutral-500 text-lg font-semibold">
            Proses Enkripsi
          </h1>
          <Separator className="mt-1" />
          <div className="flex flex-col gap-2 mt-4">
            {process.map((log, index) => (
              <Card
                tabIndex={index}
                className="border border-neutral-200 bg-neutral-50"
              >
                <Card.Header>
                  <Card.Title className="text-xs font-bold text-accent uppercase">
                    Step {index + 1}
                  </Card.Title>
                  <Card.Description className="text-neutral-900 flex flex-col gap-1">
                    <div>
                      Plaintext Chunk: {JSON.stringify(log.plaintextBlock)}
                    </div>
                    <div>
                      Plaintext Chunk (Number):{" "}
                      {JSON.stringify(log.plaintextBlockInNumber)}
                    </div>
                    <div>
                      Matrix Multiplication:
                      <ul className="list-disc list-inside">
                        {log.matrixMultiplication.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      Modulo Operation:
                      <ul className="list-disc list-inside">
                        {log.modulo.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      Ciphertext Chunk (Number):{" "}
                      {JSON.stringify(log.ciphertextBlockInNumber)}
                    </div>
                    <div>
                      Ciphertext Chunk: {JSON.stringify(log.ciphertextBlock)}
                    </div>
                  </Card.Description>
                </Card.Header>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueInputEncrypt;
