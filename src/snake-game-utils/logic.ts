import {BOARD_SIZE} from '../config';
import {Direction, Point, SnakeCells} from '../types';

let isInBoundaries = function (x: any, y: any) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
};

export function causesGameOver([x, y], snakeCells: SnakeCells) {
  return isInBoundaries(x, y) && !snakeCells.some(cell => isEqual(cell, [x, y]));
}

export interface GameState {
  gameOver: boolean;
  snakeCells: SnakeCells;
  seed: Point;
};

export function move(snakeCells: SnakeCells, seed: Point, direction: Direction): GameState {
  direction = getEffectiveDirection(snakeCells, direction);
  const newHead = getMovedhead(snakeCells[snakeCells.length - 1], direction);
  let gameOver = !causesGameOver(newHead, snakeCells);
  let hit = isEqual(newHead, seed);
  return {
    gameOver,
    seed: hit ? getNewSeed(snakeCells) : seed,
    snakeCells: gameOver ? snakeCells : [...(hit ? snakeCells : snakeCells.slice(1)), newHead]
  };
}

export function getEffectiveDirection(snakeCells: SnakeCells, direction: Direction): Direction {
  let previousDirection = getPreviousDirection(snakeCells);
  if (previousDirection !== undefined && isOpposite(previousDirection, direction)) {
    return previousDirection;
  }
  return direction;
}

function getMovedhead([x, y]: Point, direction: Direction): Point {
  switch (direction) {
    case Direction.Down:
      return [x, y + 1];
    case Direction.Up:
      return [x, y - 1];
    case Direction.Left:
      return [x - 1, y];
    case Direction.Right:
      return [x + 1, y];
  }
}

export const eventCode2Direction = {
  ArrowDown: Direction.Down,
  ArrowUp: Direction.Up,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
};

  export function isArrowEvent(event: KeyboardEvent) {
  return !!eventCode2Direction[event.code];
}

export function getNewDirection(direction: Direction, event: KeyboardEvent) {
  const newDirection = eventCode2Direction[event.code];
  return newDirection !== undefined ? newDirection : direction;
}


export function getNewSeed(snakeCells: SnakeCells) {
  while (true) {
    const point: Point = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
    // check if point is not on snake cells
    if (snakeCells.every(snakePoint => !isEqual(point, snakePoint))) {
      return point;
    }
  }

}

export function getInitGameState(): GameState {
  const snakeCells: SnakeCells = [[0, 0], [1, 0], [2, 0]];
  return {
    gameOver: false,
    snakeCells: snakeCells,
    seed: getNewSeed(snakeCells)
  };
}

export function isEqual(point1: Point, point2: Point) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}


function isOpposite(direction1, direction2) {
  return direction1 === Direction.Up && direction2 === Direction.Down ||
    direction1 === Direction.Down && direction2 === Direction.Up ||
    direction1 === Direction.Right && direction2 === Direction.Left ||
    direction1 === Direction.Left && direction2 === Direction.Right;
}

function getPreviousDirection(snakeCells: SnakeCells): Direction | undefined {
  let [x, y] = snakeCells[snakeCells.length - 1];
  let [prevX, prevY] = snakeCells[snakeCells.length - 2];
  if (x === prevX) {
    // if horizontal
    if (y === prevY + 1) {
      return Direction.Down;
    }
    if (y === prevY - 1) {
      return Direction.Up;
    }
  }
  if (y === prevY) {
    // if horizontal
    if (x === prevX + 1) {
      return Direction.Right;
    }
    if (x === prevX - 1) {
      return Direction.Left;
    }
  }
}
