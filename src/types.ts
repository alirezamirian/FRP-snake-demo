export enum Direction{
  Left = 'Left',
  Right = 'Right',
  Down = 'Down',
  Up = 'Up'
}

export type Point = [number, number];
export type SnakeCells = Array<Point>;

export interface GameState {
  gameOver: boolean;
  snakeCells: SnakeCells;
  seed: Point;
}