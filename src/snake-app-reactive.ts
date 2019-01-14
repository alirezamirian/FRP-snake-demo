import {fromEvent, interval} from 'rxjs';
import {watch} from 'rxjs-watcher';
import {filter, map, scan, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import {takeWhile} from './rxjs-utils';
import {eventCode2Direction, getInitGameState, isArrowEvent, move} from './snake-game-utils/logic';
import {drawSnake} from './snake-game-utils/ui';
import {Direction, GameState} from './types';

export function bootstrapReactiveSnakeApp(appRoot: JQuery) {


  const keyEvent$ = fromEvent<KeyboardEvent>(appRoot[0], 'keydown');

  const start$ = keyEvent$.pipe(filter(event => event.code === 'Enter'));

  const tick$ = interval(100);

  const direction$ = keyEvent$.pipe(
    filter(isArrowEvent),
    map(event => eventCode2Direction[event.code]),
    startWith(Direction.Right),
  );

  const movement$ = tick$.pipe(
    withLatestFrom(direction$),
    map(([tick, direction]) => direction)
  );

  const state$ = start$.pipe(
    switchMap(() => {
      return movement$.pipe(
        scan((state: GameState, direction: Direction) =>
          move(state.snakeCells, state.seed, direction), getInitGameState()
        ),
        takeWhile((state => !state.gameOver), true)
      );
    })
  );

  state$.subscribe((state) => {
    drawSnake(appRoot, state);
  });

}
