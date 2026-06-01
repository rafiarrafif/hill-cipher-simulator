import nj from "numjs";

const key = nj.array([
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 2],
]);

const plainText = "HIDUP JOKOWI";
const textInNumber = plainText.split("").map((c) => c.charCodeAt(0));
const matrix = nj.array(textInNumber).reshape(-1, 3);
const multiplied = nj.dot(
  matrix as unknown as number[][],
  key as unknown as number[][],
);
const encryptedMatrix = multiplied
  .tolist()
  .map((row) => row.map((num) => num % 128));
const encryptedArray: number[] = encryptedMatrix.flat();
const encryptedString = encryptedArray
  .map((num) => String.fromCharCode(num))
  .join("")
  .trim();
console.log(`${JSON.stringify(encryptedString)}`);
