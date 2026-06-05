export const encrypt = () => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const mod = (a: number, MOD: number = 71) => {
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
  if (gcd(determinantKey, 71) !== 1)
    return console.log("Key tidak valid, tidak memiliki invers modulo 71");

  const plainText = "HIDUP BU ESTI!";
  const char =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890.,!?-_()";
  const plainTextInNumber = plainText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const cAll = [];
  const randomFiller = Math.floor(Math.random() * 71);
  for (let iterate = 0; iterate < plainTextInNumber.length; iterate += 3) {
    const [p1, p2 = randomFiller, p3 = randomFiller] = plainTextInNumber.slice(
      iterate,
      iterate + 3,
    );

    const c1 = mod(a * p1 + b * p2 + c * p3);
    const c2 = mod(d * p1 + e * p2 + f * p3);
    const c3 = mod(g * p1 + h * p2 + i * p3);
    cAll.push(c1, c2, c3);
  }

  const originLength = plainTextInNumber.length;
  const encryptedString = `${originLength}:${cAll.map((num) => char[num]).join("")}`;
  console.log("Encrypted String:", encryptedString);
  return encryptedString;
};

encrypt();
