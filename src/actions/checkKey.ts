import { gcd } from "../helpers/gcd";
import { mod } from "../helpers/mod";

export const checkKey = (key: number[][]) => {
  const [[a, b, c], [d, e, f], [g, h, i]] = key;
  const determinantKey = mod(
    a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g),
  );

  if (gcd(determinantKey, 26) !== 1)
    return console.log("Key tidak valid, tidak memiliki invers modulo 26");
};
