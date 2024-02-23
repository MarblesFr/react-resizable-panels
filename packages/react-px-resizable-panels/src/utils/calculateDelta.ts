import {DragState, ResizeEvent} from "../PanelGroupContext";
import {Direction} from "../types";
import {calculateDragOffset} from "./calculateDragOffset";

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
export function calculateDelta(
  event: ResizeEvent,
  direction: Direction,
  initialDragState: DragState | null,
): number {
  if (initialDragState == null) {
    return 0;
  }

  return calculateDragOffset(
    event,
    direction,
    initialDragState,
  );
}
