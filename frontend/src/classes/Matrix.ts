export class Matrix {
  public width;
  public height;
  public state: number[][];

  constructor(width: number, height: number, m?: number[][]) {
    this.width = width;
    this.height = height;
    this.state = new Array(height).fill(0).map(() => new Array(width).fill(0));

    if (!m) return;
    if (m.length !== height)
      throw new Error('Matrix initializer has different height');
    if (m[0].length !== width)
      throw new Error('Matrix initializer has different width');

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.state[i][j] = m[i][j];
      }
    }
  }

  public static multiply(m1: Matrix, m2: Matrix): Matrix {
    const res = new Matrix(m1.height, m2.width);
    for (let i = 0; i < m1.height; i++) {
      for (let j = 0; j < m2.width; j++) {
        for (let k = 0; k < m2.height; k++) {
          res.state[i][j] += m1.state[i][k] * m2.state[k][j];
        }
      }
    }
    return res;
  }

  public toString(): string {
    return JSON.stringify(this.state);
  }
}
