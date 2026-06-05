export const modInverse = (a: number, m: number) => {
  const m0 = m;
  let y = 0,
    x = 1;

  if (m === 1) return null;

  while (a > 1) {
    if (a === 0) return null;
    const q = Math.floor(a / m);
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
