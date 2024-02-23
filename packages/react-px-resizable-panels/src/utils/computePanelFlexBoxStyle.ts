// This method returns a number between 1 and 100 representing

import {PanelData} from "../Panel";
import {DragState} from "../PanelGroupContext";
import {CSSProperties} from "react";
import {Direction} from '../types';

// the % of the group's overall space this panel should occupy.
export function computePanelFlexBoxStyle({
  defaultSize,
  dragState,
  layout,
  panelData,
  panelIndex,
  direction,
  precision = 3,
}: {
  defaultSize: number | undefined | "*";
  layout: number[];
  dragState: DragState | null;
  panelData: PanelData[];
  panelIndex: number;
  direction: Direction;
  precision?: number;
}): CSSProperties {
  const layoutSize = layout[panelIndex];

  let flexGrow;
  let size;
  if (panelData.length === 1) {
    // Special case: Single panel group should always fill full width/height
    flexGrow = "1";
    size = "auto";
  }
  else {
    if (defaultSize == "*") {
      flexGrow = "1";
      size = "auto";
    }
    else {
      flexGrow = "0";
      if (layoutSize == null) {
        // Initial render (before panels have registered themselves)
        // In order to support server rendering, fall back to default size if provided
        size =
            defaultSize != undefined ? `${defaultSize.toPrecision(precision)}px` : "50px";
      } else {
        size = `${layoutSize.toPrecision(precision)}px`;
      }
    }
  }

  let sizeStyle;

  if (size === 'auto') {
    sizeStyle =
     {
      flexBasis: 0,
      flexGrow,
      flexShrink: 1,
    };

    const minSize = panelData[panelIndex]?.constraints.minSize;

    if (minSize) {
      sizeStyle = {
        ...sizeStyle,
        [direction == 'horizontal' ? 'min-width' : 'min-height']: `${minSize}px`,
      }
    }
  } else {
    sizeStyle = {
      [direction == 'horizontal' ? 'width' : 'height']: size,
    };
  }

  return {
    ...sizeStyle,

    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",

    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: dragState !== null ? "none" : undefined,
  };
}
