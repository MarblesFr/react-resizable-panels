import {PanelConstraints} from "../Panel";
import {resizePanel} from "./resizePanel";

// All units must be in percentages; pixel values should be pre-converted
export function validatePanelGroupLayout({
  layout: prevLayout,
  panelConstraints,
}: {
  layout: number[];
  panelConstraints: PanelConstraints[];
}): number[] {
  const nextLayout = [...prevLayout];

  // Validate layout expectations
  if (nextLayout.length !== panelConstraints.length) {
    throw Error(
      `Invalid ${panelConstraints.length} panel layout: ${nextLayout
        .map((size) => `${size}%`)
        .join(", ")}`
    );
  }

  // First pass: Validate the proposed layout given each panel's constraints
  for (let index = 0; index < panelConstraints.length; index++) {
    const unsafeSize = nextLayout[index];

    if (unsafeSize) {
      const safeSize = resizePanel({
        panelConstraints,
        panelIndex: index,
        size: unsafeSize,
      });

      if (unsafeSize != safeSize) {
        nextLayout[index] = safeSize;
      }
    }
  }

  return nextLayout;
}
