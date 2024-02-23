import { PanelData } from "../Panel";
import { assert } from "./assert";

export function calculateUnsafeDefaultLayout({
  panelDataArray,
}: {
  panelDataArray: PanelData[];
}): number[] {
  const layout = Array<number>(panelDataArray.length);

  const panelConstraintsArray = panelDataArray.map(
    (panelData) => panelData.constraints
  );

  let numPanelsWithSizes = 0;

  // Distribute default sizes first
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (defaultSize != null && defaultSize != '*') {
      numPanelsWithSizes++;
      layout[index] = defaultSize;
    }
  }

  // Remaining size should be distributed evenly between panels without default sizes
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints);
    const { defaultSize } = panelConstraints;

    if (defaultSize != null) {
      continue;
    }

    numPanelsWithSizes++;
    layout[index] = 1;
  }

  return layout;
}
