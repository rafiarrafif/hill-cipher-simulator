/**
 * NOTE
 * File ini hanya berisi cuplikan (snippet) dari program simulasi Hill Cipher
 * yang dibuat oleh Kelompok 5. Cuplikan ini mencakup fungsi utama
 * yang digunakan untuk proses enkripsi dan dekripsi menggunakan algoritma
 * Hill Cipher.
 *
 * Pada implementasi program secara lengkap, fungsi-fungsi tersebut ditempatkan pada:
 * - src/helpers/encrypt.ts
 * - src/helpers/decrypt.ts
 *
 * Aplikasi simulasi dapat diakses melalui:
 * https://alin.arrafif.com
 *
 * Source code lengkap (termasuk UI) dapat diakses melalui:
 * Google Drive:
 * https://drive.google.com/file/d/1nAn0_Izt1AHv9m3bpt6SWu2L98YHOPrM/view?usp=sharing
 *
 * GitHub:
 * https://github.com/rafiarrafif/hill-cipher-simulator
 *
 * Cuplikan kode ini disertakan untuk keperluan penilaian tugas dan difokuskan
 * pada implementasi algoritma inti yang digunakan dalam proses enkripsi dan
 * dekripsi Hill Cipher.
 */

// Fungsi helper yang digunakan untuk mencari invers modulo, gcd, dan operasi modulo. (sebagian dibuat menggunakan AI)
const modInverse = (a: number, m: number) => {
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
};
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};
const mod = (a: number, MOD: number = 71) => {
  return ((a % MOD) + MOD) % MOD;
};

// Funsi yang digunakan untuk mendekripsi
export const decrypt = () => {
  const key = [
    [12, 11, 5],
    [21, 18, 21],
    [21, 5, 19],
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
  const determinantKeyInverse = modInverse(determinantKey, 71);
  const keyInverse = adjoinKeyMod.map((row) =>
    row.map((col) => mod(col * determinantKeyInverse!)),
  );

  if (gcd(determinantKey, 71) !== 1)
    return console.log("Key tidak valid, tidak memiliki invers modulo 71");

  const cipherText = "10:wkpn?_?YHK7Z";
  const char =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890.,!?-_()";
  const [cipherTextLength, cipherTextCore] = cipherText.split(":");
  const cipherTextInNumber = cipherTextCore
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

  const decryptedString = pAll
    .map((num) => char[num])
    .join("")
    .slice(0, Number(cipherTextLength));
  console.log("Decrypted String:", decryptedString);
  return decryptedString;
};

// Funsi yang digunakan untuk mengenkripsi
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

  const plainText = "Sains Data";
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
