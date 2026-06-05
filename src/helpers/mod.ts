import { modValue } from "../../configs";

export const mod = (a: number, MOD: number = modValue) => {
  return ((a % MOD) + MOD) % MOD;
};
