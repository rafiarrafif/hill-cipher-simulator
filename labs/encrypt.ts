export const encrypt = () => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const mod = (a: number, MOD: number = 26) => {
    return ((a % MOD) + MOD) % MOD;
  };

  const key = [
    [12, 11, 5],
    [21, 18, 21],
    [21, 5, 19],
  ];
  const [[a, b, c], [d, e, f], [g, h, i]] = key;
  const determinantKey = mod(
    a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g),
  );
  if (gcd(determinantKey, 26) !== 1)
    return console.log("Key tidak valid, tidak memiliki invers modulo 26");

  const plainText = "HIDUPJOKOWII";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const plainTextInNumber = plainText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const cAll = [];
  for (let iterate = 0; iterate < plainTextInNumber.length; iterate += 3) {
    const p1 = plainTextInNumber[iterate];
    const p2 = plainTextInNumber[iterate + 1];
    const p3 = plainTextInNumber[iterate + 2];

    const c1 = mod(a * p1 + b * p2 + c * p3);
    const c2 = mod(d * p1 + e * p2 + f * p3);
    const c3 = mod(g * p1 + h * p2 + i * p3);
    cAll.push(c1, c2, c3);
  }

  const encryptedString = cAll.map((num) => char[num]).join("");
  console.log("Encrypted String:", encryptedString);
  return encryptedString;
};

encrypt();
