import { DragState, ResizeEvent } from "../PanelGroupContext";
import { Direction } from "../types";
import { getResizeEventCursorPosition } from "./events/getResizeEventCursorPosition";

export function calculateDragOffset(
  event: ResizeEvent,
  direction: Direction,
  initialDragState: DragState
): number {
  let { initialCursorPosition } = initialDragState;

  const cursorPosition = getResizeEventCursorPosition(direction, event);

  const offsetPixels = cursorPosition - initialCursorPosition;

  return offsetPixels;
}
