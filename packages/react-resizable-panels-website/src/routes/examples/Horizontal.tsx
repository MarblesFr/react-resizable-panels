import { Panel, PanelGroup } from "react-resizable-panels";

import { ResizeHandle } from "../../components/ResizeHandle";

import Example from "./Example";
import styles from "./shared.module.css";

export default function HorizontalRoute() {
  return (
    <Example
      code={CODE}
      exampleNode={<Content />}
      headerNode={
        <>
          <p>
            This example is a 5-column horizontal <code>PanelGroup</code>.
            Click/touch the empty space between the panels and drag to resize.
          </p>
          <p>
            These panels use the <code>minSize</code> property to prevent them
            from being resized smaller than a minimal number of pixels.
          </p>
        </>
      }
      title="Horizontal layouts"
    />
  );
}

function Content() {
  return (
    <div className={styles.PanelGroupWrapper}>
      <PanelGroup className={styles.PanelGroup} direction="horizontal">
        <Panel className={styles.PanelRow} defaultSize={150} minSize={50}>
          <div className={styles.Centered}>left</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelRow} defaultSize={300} minSize={50}>
          <div className={styles.Centered}>left</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelRow} defaultSize="*" minSize={50}>
          <div className={styles.Centered}>middle</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelRow} defaultSize={100} minSize={50}>
          <div className={styles.Centered}>right</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelRow} defaultSize={100} minSize={50}>
          <div className={styles.Centered}>right</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

const CODE = `
<PanelGroup direction="horizontal">
  <Panel defaultSize={150} minSize={50}>
    left
  </Panel>
  <Panel defaultSize={300} minSize={50}>
    left
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize="*" minSize={50}>
    middle
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize={100} minSize={50}>
    right
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize={100} minSize={50}>
    right
  </Panel>
</PanelGroup>
`;
