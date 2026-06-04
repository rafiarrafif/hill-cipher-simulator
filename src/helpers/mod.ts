export const mod = (a: number, MOD: number = 26) => {
  return ((a % MOD) + MOD) % MOD;
};
