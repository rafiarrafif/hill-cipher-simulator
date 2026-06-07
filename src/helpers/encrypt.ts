import { callback } from "./callback";
import { gcd } from "./gcd";
import { mod } from "./mod";

export const encrypt = (plainText: string, key: number[][]) => {
  const [[a, b, c], [d, e, f], [g, h, i]] = key;
  const determinantKey = mod(
    a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g),
  );
  if (gcd(determinantKey, 71) !== 1)
    return callback(false, {
      result: "Key tidak valid, tidak memiliki invers modulo 71",
    });

  const char =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890.,!?-_()";
  const plainTextInNumber = plainText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const cAll = [];
  const process = [];
  const randomFiller = Math.floor(Math.random() * 10);
  for (let iterate = 0; iterate < plainTextInNumber.length; iterate += 3) {
    const [p1, p2 = randomFiller, p3 = randomFiller] = plainTextInNumber.slice(
      iterate,
      iterate + 3,
    );

    const rawC1 = a * p1 + b * p2 + c * p3;
    const rawC2 = d * p1 + e * p2 + f * p3;
    const rawC3 = g * p1 + h * p2 + i * p3;

    const c1 = mod(a * p1 + b * p2 + c * p3);
    const c2 = mod(d * p1 + e * p2 + f * p3);
    const c3 = mod(g * p1 + h * p2 + i * p3);

    process.push({
      plaintextBlock: [char[p1], char[p2], char[p3]],
      plaintextBlockInNumber: [p1, p2, p3],
      matrixMultiplication: [
        `${a}×${p1} + ${b}×${p2} + ${c}×${p3} = ${rawC1}`,
        `${d}×${p1} + ${e}×${p2} + ${f}×${p3} = ${rawC2}`,
        `${g}×${p1} + ${h}×${p2} + ${i}×${p3} = ${rawC3}`,
      ],
      modulo: [
        `${rawC1} mod 71 = ${c1}`,
        `${rawC2} mod 71 = ${c2}`,
        `${rawC3} mod 71 = ${c3}`,
      ],
      ciphertextBlockInNumber: [c1, c2, c3],
      ciphertextBlock: [char[c1], char[c2], char[c3]],
    });

    cAll.push(c1, c2, c3);
  }

  const originLength = plainTextInNumber.length;
  const encryptedString = `${originLength}:${cAll.map((num) => char[num]).join("")}`;
  console.log("Encrypted String:", encryptedString);
  return callback(true, {
    result: encryptedString,
    process,
  });
};
