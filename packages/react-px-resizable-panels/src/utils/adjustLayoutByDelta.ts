import {PanelConstraints} from "../Panel";
import {assert} from "./assert";
import {fuzzyNumbersEqual} from "./numbers/fuzzyNumbersEqual";
import {resizePanel} from "./resizePanel";
import {Direction} from "../types";

// All units must be in percentages; pixel values should be pre-converted
export function adjustLayoutByDelta({
  delta,
  layout: prevLayout,
  panelConstraints: panelConstraintsArray,
  pivotIndices,
  panelGroupElement,
  direction,
}: {
  delta: number;
  layout: number[];
  panelConstraints: PanelConstraints[];
  pivotIndices: number[];
  panelGroupElement: ParentNode;
  direction: Direction;
}): number[] {
  if (fuzzyNumbersEqual(delta, 0)) {
    return prevLayout;
  }

  const nextLayout = [...prevLayout];

  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  assert(firstPivotIndex != null);
  assert(secondPivotIndex != null);

  let flexIndex;
  for (let i = 0; i < prevLayout.length; i++) {
    if (prevLayout[i] == undefined) {
      flexIndex = i;
      break;
    }
  }
  assert(flexIndex);

  const left = firstPivotIndex < flexIndex;

  const pivotIndex = left ? firstPivotIndex : secondPivotIndex;

  const isHorizontal = direction === "horizontal";

  const panelList = panelGroupElement.querySelectorAll("div[data-panel]");


  if (!left) {
    delta *= -1;
  }

  let appliedDelta = delta;

  // console.log(prevLayout[pivotIndex]);

  if (delta > 0) {
    const flexSize = isHorizontal ? panelList[flexIndex]?.clientWidth ?? 0 : panelList[flexIndex]?.clientHeight ?? 0;

    let flexMinDelta = (panelConstraintsArray[flexIndex]?.minSize ?? 0) - flexSize;

    const frameDiff = delta - ((isHorizontal ? panelList[pivotIndex]?.clientWidth ?? 0 : panelList[pivotIndex]?.clientHeight ?? 0) - (prevLayout[pivotIndex] ?? 0));

    if (frameDiff > 0) {
      if (flexMinDelta + frameDiff > 0) {
        appliedDelta -= frameDiff;
      }
    }

  //   appliedDelta = delta - deltaDiff;
  }

  const prevSize = prevLayout[pivotIndex];

  if (prevSize) {
    const unsafeSize = prevSize + appliedDelta;
    const safeSize = resizePanel({
      panelConstraints: panelConstraintsArray,
      panelIndex: pivotIndex,
      size: unsafeSize,
    });

    nextLayout[pivotIndex] = safeSize;

    // Edge case where expanding or contracting one panel caused another one to change collapsed state
    // if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
    //   let deltaRemaining = unsafeSize - safeSize;
    //
    //   const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    //   let index = pivotIndex;
    //   while (index >= 0 && index < panelConstraintsArray.length) {
    //     const prevSize = nextLayout[index];
    //     assert(prevSize != null);
    //
    //     const unsafeSize = prevSize + deltaRemaining;
    //     const safeSize = resizePanel({
    //       panelConstraints: panelConstraintsArray,
    //       panelIndex: index,
    //       size: unsafeSize,
    //     });
    //
    //     if (!fuzzyNumbersEqual(prevSize, safeSize)) {
    //       deltaRemaining -= safeSize - prevSize;
    //
    //       nextLayout[index] = safeSize;
    //     }
    //
    //     if (fuzzyNumbersEqual(deltaRemaining, 0)) {
    //       break;
    //     }
    //
    //     if (delta > 0) {
    //       index--;
    //     } else {
    //       index++;
    //     }
    //   }
    // }
  }
  //DEBUG.push(`after 2: ${nextLayout.join(", ")}`);
  //DEBUG.push(`  deltaApplied: ${deltaApplied}`);
  //DEBUG.push("");

  return nextLayout;
}
