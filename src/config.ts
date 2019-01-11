export const CELL_WIDTH = 25;
export const BOARD_SIZE = 20;

function getCssVariableValue(
  variable: string,
  elem: HTMLElement = document.documentElement!
) {
  return getComputedStyle(elem).getPropertyValue(variable);
}

export function setCssVariableValue(
  variable: string,
  value: Primitive,
  elem: HTMLElement = document.documentElement!
) {
  elem.style.setProperty(variable, "" + value);
}

type Primitive = string | number | boolean;
