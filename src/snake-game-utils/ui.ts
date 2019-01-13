import $ from 'jquery';
import {CELL_WIDTH} from '../config';
import {Point, SnakeCells} from '../types';
import {GameState} from '../types';

type Args = {
  seed: Point,
  snakeCells: SnakeCells;
};

export function drawSnake(appRoot, {snakeCells, seed, gameOver}: GameState) {
  board(appRoot).toggleClass('game-over', gameOver);
  board(appRoot).find('.snake-cell').remove();
  snakeCells.map(cell => {
    applyPositionStyles($('<span class="snake-cell" />'), cell).appendTo(board(appRoot));
  });
  let $seed = board(appRoot).find('.seed');
  if ($seed.length === 0) {
    $seed = $('<span class="seed"/>');
  }
  if ($seed.data('point') !== seed) {
    $seed.remove();
    applyPositionStyles($seed, seed).data('point', seed).appendTo(board(appRoot));
  }
}


function applyPositionStyles(elem: JQuery, point: Point): JQuery {
  return elem.css({left: point[0] * CELL_WIDTH, top: point[1] * CELL_WIDTH});
}


function board(appRoot: JQuery) {
  return appRoot.find('.board');
}
