import {eventCode2Direction, getInitGameState, isArrowEvent, move} from './snake-game-utils/logic';
import {drawSnake} from './snake-game-utils/ui';
import {Direction, GameState} from './types';

export function bootstrapSnakeApp(appRoot: JQuery) {
  let state: GameState = {
    gameOver: false,
    seed: null,
    snakeCells: []
  };
  let direction: Direction;
  let timer;

  appRoot[0].addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      start();
    }
  });

  appRoot[0].addEventListener('keydown', (event) => {
    if (isArrowEvent(event)) {
      direction = eventCode2Direction[event.code];
    }
    event.preventDefault();
  });

  function tick() {
    state = move(state.snakeCells, state.seed, direction);
    drawSnake(appRoot, state);
    if (state.gameOver) {
      cleanup();
    }
  }

  function start() {
    cleanup();
    state = getInitGameState();
    direction = Direction.Right;
    timer = setInterval(tick, 100);
  }

  function cleanup() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

}
