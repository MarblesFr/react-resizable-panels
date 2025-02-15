import { Link } from "react-router-dom";
import Container from "../../components/Container";

import Logo from "../../components/Logo";

import styles from "./styles.module.css";

const LINKS = [
  { path: "horizontal", title: "Horizontal layouts" },
  { path: "vertical", title: "Vertical layouts" },
  { path: "persistence", title: "Persistent layouts" },
  { path: "collapsible", title: "Collapsible panels" },
  { path: "external-persistence", title: "External persistence" },
];

export default function HomeRoute() {
  return (
    <Container className={styles.Container}>
      <div className={styles.TopRow}>
        <HeaderPanel />
      </div>
      <div className={styles.BottomRow}>
        <ExamplesPanel />
        <InstallationPanel />
      </div>
    </Container>
  );
}

function ExampleLink({
  index,
  path,
  title,
}: {
  index: number;
  path: string;
  title: string;
}) {
  return (
    <li className={styles.ExamplesListItem}>
      <div className={styles.ListItemNumber}>{index + 1}</div>
      <Link className={styles.ExampleLink} to={`/examples/${path}`}>
        {title}
      </Link>
    </li>
  );
}

function ExamplesPanel() {
  return (
    <div className={styles.ExamplesPanel}>
      <h2 className={styles.SubHeader}>Examples</h2>
      <ul className={styles.ExamplesList}>
        {LINKS.map((link, index) => (
          <ExampleLink
            index={index}
            key={index}
            path={link.path}
            title={link.title}
          />
        ))}
      </ul>
    </div>
  );
}

function HeaderPanel() {
  return (
    <a
      className={styles.HeaderLink}
      href="https://github.com/MarblesFr/react-resizable-panels"
    >
      <span className={styles.Header}>
        <span className={styles.HeaderRow}>
          <Logo className={styles.HeaderLogo} />
          <span className={styles.HeaderTexts}>
            <span className={styles.HeaderText}>react</span>
            <span className={styles.HeaderText}>resizable</span>
            <span className={styles.HeaderText}>panels</span>
          </span>
        </span>
        <p className={styles.HeaderTagLine}>
          React components for resizable panels
        </p>
      </span>
    </a>
  );
}

function InstallationPanel() {
  return (
    <div className={styles.InstallationPanel}>
      <h2 className={styles.SubHeader}>Installation</h2>
      <div className={styles.Code}>
        <span className="tok-comment"># npm</span>
        <br />
        <span className="tok-operator">npm install </span>
        <span className="tok-variableName">react-px-resizable-panels</span>
        <br />
        <br />
        <span className="tok-comment"># yarn</span>
        <br />
        <span className="tok-operator">yarn add </span>
        <span className="tok-variableName">react-px-resizable-panels</span>
      </div>
    </div>
  );
}
