import { gcd } from "./gcd";
import { mod } from "./mod";
import { modInverse } from "./modInverse";
import { char, modValue } from "../../configs";
import { callback } from "./callback";

export type DecryptBlockProcess = {
  cipherBlock: string[];
  cipherBlockInNumber: number[];
  multiplication: string[];
  modulo: string[];
  plaintextBlock: number[];
  plaintextChars: string[];
};

export const decrypt = (cipherText: string, key: number[][]) => {
  const [[a, b, c], [d, e, f], [g, h, i]] = key;
  const determinantKey = mod(
    a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g),
  );
  const adjointKey: number[][] = [
    [e * i - f * h, c * h - b * i, b * f - c * e],
    [f * g - d * i, a * i - c * g, c * d - a * f],
    [d * h - e * g, b * g - a * h, a * e - b * d],
  ];
  const adjoinKeyMod = adjointKey.map((row) => row.map((col) => mod(col)));
  const determinantKeyInverse = modInverse(determinantKey, modValue);
  const keyInverse = adjoinKeyMod.map((row) =>
    row.map((col) => mod(col * determinantKeyInverse!)),
  );

  if (gcd(determinantKey, modValue) !== 1)
    return callback(false, {
      result: "Key tidak valid, tidak memiliki invers modulo 71",
    });

  const [cipherTextLength, cipherTextCore] = cipherText.split(":");
  const cipherTextInNumber = cipherTextCore
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const pAll = [];
  const blocks: DecryptBlockProcess[] = [];
  for (let iterate = 0; iterate < cipherTextInNumber.length; iterate += 3) {
    const c1 = cipherTextInNumber[iterate];
    const c2 = cipherTextInNumber[iterate + 1];
    const c3 = cipherTextInNumber[iterate + 2];

    const rawP1 =
      c1 * keyInverse[0][0] + c2 * keyInverse[0][1] + c3 * keyInverse[0][2];
    const rawP2 =
      c1 * keyInverse[1][0] + c2 * keyInverse[1][1] + c3 * keyInverse[1][2];
    const rawP3 =
      c1 * keyInverse[2][0] + c2 * keyInverse[2][1] + c3 * keyInverse[2][2];

    const p1 = mod(rawP1);
    const p2 = mod(rawP2);
    const p3 = mod(rawP3);

    pAll.push(p1, p2, p3);

    blocks.push({
      cipherBlock: [char[c1], char[c2], char[c3]],
      cipherBlockInNumber: [c1, c2, c3],
      multiplication: [
        `${c1}×${keyInverse[0][0]} + ${c2}×${keyInverse[0][1]} + ${c3}×${keyInverse[0][2]} = ${rawP1}`,
        `${c1}×${keyInverse[1][0]} + ${c2}×${keyInverse[1][1]} + ${c3}×${keyInverse[1][2]} = ${rawP2}`,
        `${c1}×${keyInverse[2][0]} + ${c2}×${keyInverse[2][1]} + ${c3}×${keyInverse[2][2]} = ${rawP3}`,
      ],
      modulo: [
        `${rawP1} mod ${modValue} = ${p1}`,
        `${rawP2} mod ${modValue} = ${p2}`,
        `${rawP3} mod ${modValue} = ${p3}`,
      ],
      plaintextBlock: [p1, p2, p3],
      plaintextChars: [char[p1], char[p2], char[p3]],
    });
  }

  const decryptedString = pAll
    .map((num) => char[num])
    .join("")
    .slice(0, Number(cipherTextLength));

  return callback(true, {
    result: decryptedString,
    process: {
      determinant: {
        value: determinantKey,
        formula: `${a}(${e}×${i}-${f}×${h}) - ${b}(${d}×${i}-${f}×${g}) + ${c}(${d}×${h}-${e}×${g})`,
      },
      determinantInverse: determinantKeyInverse,
      adjointMatrix: adjointKey,
      adjointModulo: adjoinKeyMod,
      inverseKeyMatrix: keyInverse,
      blocks,
    },
  });
};
