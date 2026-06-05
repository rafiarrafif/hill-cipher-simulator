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
    return callback(
      false,
      `Key tidak valid, tidak memiliki invers modulo ${modValue}`,
    );

  return callback(true, "Key valid!");
};
