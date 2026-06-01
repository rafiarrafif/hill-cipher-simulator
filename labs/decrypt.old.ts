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

export const decrypt = () => {
  const key = [
    [17, 17, 5],
    [21, 18, 21],
    [2, 5, 19],
  ];
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
  const determinantKeyInverse = modInverse(determinantKey, 26);
  const keyInverse = adjoinKeyMod.map((row) =>
    row.map((col) => mod(col * determinantKeyInverse!)),
  );

  if (gcd(determinantKey, 26) !== 1)
    return console.log("Key tidak valid, tidak memiliki invers modulo 26");

  const cipherText = "QQA";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cipherTextInNumber = cipherText
    .split("")
    .map((c) => char.indexOf(c))
    .filter((num) => num !== -1);
  const [c1, c2, c3] = cipherTextInNumber;

  const p1 = mod(
    c1 * keyInverse[0][0] + c2 * keyInverse[0][1] + c3 * keyInverse[0][2],
  );
  const p2 = mod(
    c1 * keyInverse[1][0] + c2 * keyInverse[1][1] + c3 * keyInverse[1][2],
  );
  const p3 = mod(
    c1 * keyInverse[2][0] + c2 * keyInverse[2][1] + c3 * keyInverse[2][2],
  );
  const decryptedString = char[p1] + char[p2] + char[p3];
  console.log(`Decrypted String: ${JSON.stringify(decryptedString)}`);
};

decrypt();
