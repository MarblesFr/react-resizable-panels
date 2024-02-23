import { Panel, PanelGroup } from "react-px-resizable-panels";

import { ResizeHandle } from "../../components/ResizeHandle";

import Example from "./Example";
import styles from "./shared.module.css";

export default function VerticalRoute() {
  return (
    <Example
      code={CODE}
      exampleNode={<Content />}
      headerNode={
        <>
          <p>
            This example is a 3-row vertical <code>PanelGroup</code>.
            Click/touch the empty space between the panels and drag to resize.
          </p>
          <p>
            These panels use the <code>maxSize</code> property to prevent them
            from being resized larger than a maximal number of pixels.
          </p>
        </>
      }
      title="Vertical layouts"
    />
  );
}

function Content() {
  return (
    <div className={styles.PanelGroupWrapper}>
      <PanelGroup className={styles.PanelGroup} direction="vertical">
        <Panel
          className={styles.PanelColumn}
          defaultSize={50}
          maxSize={75}
          minSize={30}
        >
          <div className={styles.Centered}>top</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelRow} defaultSize="*" minSize={50}>
          <div className={styles.Centered}>middle</div>
        </Panel>
        <ResizeHandle className={styles.ResizeHandle} />
        <Panel className={styles.PanelColumn} defaultSize={50} maxSize={75} minSize={30}>
          <div className={styles.Centered}>bottom</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

const CODE = `
<PanelGroup direction="vertical">
  <Panel defaultSize={50} maxSize={75} minSize={30}>
    <div>top</div>
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize="*" minSize={50}>
    <div>middle</div>
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize={50} maxSize={75} minSize={30}>
    <div>bottom</div>
  </Panel>
</PanelGroup>
`;
