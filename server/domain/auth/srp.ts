import crypto from 'crypto';

// パスワードからxを計算する
const calculate_x = (s: string, I: string, P: string): string => {
  const hash1 = crypto.createHash('sha256');
  hash1.update(`${I}:${P}`);
  const x = hash1.digest('hex');

  const hash2 = crypto.createHash('sha256');
  hash2.update(s + x);
  return hash2.digest('hex');
};

// パスワード検証子vを計算する
const calculate_v = (g: number, N: number, x: string): number => {
  console.log('g', g);
  console.log('N', N);
  console.log('x', x);
  return Math.pow(g, parseInt(x, 16)) % N;
};

// サーバーが送信する公開鍵Bを計算する
const calculate_B = (g: number, N: number, b: number, v: string): number => {
  return (Math.pow(g, parseInt(b, 16)) + v) % N;
};

// サーバーが共有する秘密鍵Sを計算する
const calculate_S = (A: number, v: number, u: string, b: string, N: number): number => {
  return Math.pow(A * Math.pow(v, parseInt(u, 16)), parseInt(b, 16)) % N;
};

// サーバーが共有する鍵Kを計算する
const calculate_K = (S: number): string => {
  const hash = crypto.createHash('sha256');
  hash.update(S.toString());
  return hash.digest('hex');
};

// 秘密鍵bを生成する
const generate_b = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export { calculate_B, calculate_K, calculate_S, calculate_v, calculate_x, generate_b };
