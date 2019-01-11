import { fromEvent, interval, of } from "rxjs";
import {
  filter,
  map,
  scan,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { takeWhile } from "./rxjs-utils";
import {
  eventCode2Direction,
  GameState,
  getInitGameState,
  isArrowEvent,
  move
} from "./snake-game-utils/logic";
import { drawSnake } from "./snake-game-utils/ui";
import { Direction } from "./types";

export function bootstrapReactiveSnakeApp(appRoot: JQuery) {}
