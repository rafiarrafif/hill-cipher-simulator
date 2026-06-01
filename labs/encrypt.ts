export const encrypt = () => {
  function modInverse(a: number, m: number) {
    let m0 = m;
    let y = 0,
      x = 1;

    if (m === 1) return null;

    while (a > 1) {
      if (a === 0) return null;
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }

    if (x < 0) {
      x = x + m0;
    }

    return x;
  }

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  function mod(a: number, MOD: number = 26) {
    return ((a % MOD) + MOD) % MOD;
  }

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

  const plainText = "MCD";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const plainTextInNumber = plainText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);

  const [p1, p2, p3] = plainTextInNumber;
  const c1 = mod(a * p1 + b * p2 + c * p3);
  const c2 = mod(d * p1 + e * p2 + f * p3);
  const c3 = mod(g * p1 + h * p2 + i * p3);

  console.log(`Mentahan: ${p1}, ${p2}, ${p3}`);
  const encryptedString = char[c1] + char[c2] + char[c3];
  console.log(`${JSON.stringify(encryptedString)}`);
};

encrypt();
