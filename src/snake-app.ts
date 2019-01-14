import {eventCode2Direction, getInitGameState, isArrowEvent, move} from './snake-game-utils/logic';
import {drawSnake} from './snake-game-utils/ui';
import {Direction, GameState} from './types';

export function bootstrapSnakeApp(appRoot: JQuery) {

  let state: GameState;
  let direction: Direction = Direction.Right;
  let intervalId;

  appRoot[0].addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      start();
    }
  });

  appRoot[0].addEventListener('keydown', (event) => {
    if (isArrowEvent(event)) {
      direction = eventCode2Direction[event.code];
    }
  });


  function tick(){
    state = move(state.snakeCells, state.seed, direction);
    drawSnake(appRoot, state);
    if(state.gameOver){
      clear();
    }
  }

  function  start(){
    clear();
    state = getInitGameState();
    direction = Direction.Right;
    intervalId = setInterval(tick, 100);
  }

  function clear(){
    if(intervalId){
      clearInterval(intervalId);
    }
  }
}
