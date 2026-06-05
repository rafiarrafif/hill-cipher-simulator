import { gcd } from "./gcd";
import { mod } from "./mod";
import { modInverse } from "./modInverse";
import { char, modValue } from "../../configs";

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
    return console.log(
      `Key tidak valid, tidak memiliki invers modulo ${modValue}`,
    );

  const cipherTextInNumber = cipherText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const pAll = [];
  for (let iterate = 0; iterate < cipherTextInNumber.length; iterate += 3) {
    const c1 = cipherTextInNumber[iterate];
    const c2 = cipherTextInNumber[iterate + 1];
    const c3 = cipherTextInNumber[iterate + 2];

    const p1 = mod(
      c1 * keyInverse[0][0] + c2 * keyInverse[0][1] + c3 * keyInverse[0][2],
    );
    const p2 = mod(
      c1 * keyInverse[1][0] + c2 * keyInverse[1][1] + c3 * keyInverse[1][2],
    );
    const p3 = mod(
      c1 * keyInverse[2][0] + c2 * keyInverse[2][1] + c3 * keyInverse[2][2],
    );
    pAll.push(p1, p2, p3);
  }

  const decryptedString = pAll.map((num) => char[num]).join("");
  return decryptedString;
};
