import { Button, Card, Input, Label, Separator } from "@heroui/react";
import { Copy, KeyRound } from "lucide-react";
import React from "react";
import { decrypt, type DecryptBlockProcess } from "../helpers/decrypt";

type DecryptProcess = {
  determinant: {
    value: number;
    formula: string;
  };
  determinantInverse: number | null;
  adjointMatrix: number[][];
  adjointModulo: number[][];
  inverseKeyMatrix: number[][];
  blocks: DecryptBlockProcess[];
};

const ValueInputDecrypt = ({ keyValue }: { keyValue: number[][] }) => {
  const [encryptedText, setEncryptedText] = React.useState<string | null>(null);
  const [decryptedText, setDecryptedText] = React.useState<string>("");
  const [process, setProcess] = React.useState<DecryptProcess | null>(null);

  const startDecrypt = () => {
    if (!encryptedText) return;
    const decrypted = decrypt(encryptedText, keyValue);

    setDecryptedText(
      decrypted.success
        ? decrypted.data.result
        : `Error: ${decrypted.data.result}`,
    );
    setProcess(decrypted.data.process ? decrypted.data.process : null);
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
      {process?.blocks && (
        <div className="pt-6 px-2">
          <h1 className="text-neutral-500 text-lg font-semibold">
            Proses Enkripsi
          </h1>
          <Separator className="mt-1" />
          <div className="flex flex-col gap-2 mt-4">
            <Card className="border border-neutral-200 bg-neutral-50">
              <Card.Header>
                <Card.Title className="text-xs font-bold text-accent uppercase">
                  Step Preparation
                </Card.Title>
                <Card.Description className="text-neutral-900 flex flex-col gap-1">
                  <div>
                    Determinan: {process.determinant.value} (
                    {process.determinant.formula})
                  </div>
                  <div>
                    Invers Determinan:{" "}
                    {process.determinantInverse !== null
                      ? process.determinantInverse
                      : "Tidak ada invers, kunci tidak valid"}
                  </div>
                  <div>
                    Matriks Adjoin: {JSON.stringify(process.adjointMatrix)}
                  </div>
                  <div>
                    Matriks Adjoin Modulo:{" "}
                    {JSON.stringify(process.adjointModulo)}
                  </div>
                  <div>
                    Matriks Kunci Invers:{" "}
                    {JSON.stringify(process.inverseKeyMatrix)}
                  </div>
                </Card.Description>
              </Card.Header>
            </Card>
            {process.blocks.map((log, index) => (
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
                      Plaintext Chunk: {JSON.stringify(log.cipherBlock)}
                    </div>
                    <div>
                      Plaintext Chunk (Number):{" "}
                      {JSON.stringify(log.cipherBlockInNumber)}
                    </div>
                    <div>
                      Matrix Multiplication:
                      <ul className="list-disc list-inside">
                        {log.multiplication.map((step, idx) => (
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
                      Plaintext Chunk (Number):{" "}
                      {JSON.stringify(log.plaintextBlock)}
                    </div>
                    <div>
                      Plaintext Chunk: {JSON.stringify(log.plaintextChars)}
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

export default ValueInputDecrypt;
