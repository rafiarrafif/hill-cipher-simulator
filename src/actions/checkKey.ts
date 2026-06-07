import { modValue } from "../../configs";
import { callback } from "../helpers/callback";
import { gcd } from "../helpers/gcd";
import { mod } from "../helpers/mod";

export const checkKey = (key: number[][]) => {
  const [[a, b, c], [d, e, f], [g, h, i]] = key;
  const determinantKey = mod(
    a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g),
  );

  if (gcd(determinantKey, modValue) !== 1)
    return callback(false, {
      result: "Key tidak valid, tidak memiliki invers modulo 71",
    });

  return callback(true, {
    result: "Kunci valid, dapat digunakan untuk enkripsi dan dekripsi",
  });
};
