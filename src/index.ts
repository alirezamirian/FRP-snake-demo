import $ from "jquery";
import { bootstrapSnakeApp } from "./snake-app";
import { bootstrapReactiveSnakeApp } from "./snake-app-reactive";
import { setCssVariableValue, BOARD_SIZE, CELL_WIDTH } from "./config";

$(() => {
  setCssVariableValue("--board-size", BOARD_SIZE);
  setCssVariableValue("--cell-width", `${CELL_WIDTH}px`);
  bootstrapReactiveSnakeApp($("#reactive"));
  bootstrapSnakeApp($("#nonReactive"));
});
