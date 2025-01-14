import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  src: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Github Actions Integration",
    src: "/img/screenshots/gha-screenshot-compare.png",
    description: (
      <>
        Integrates with Github Actions to upload screenshots to the Webshot
        Archive API and leave a comment on the PR with the diffs.
      </>
    ),
  },
  {
    title: "Compare over time",
    src: "/img/screenshots/ui-tour-project-dashboard.png",
    description: (
      <>
        The Webshot Archive UI lets you view the screenshots and diffs over
        time. It also integrates with Github so you can view commits and their
        associated diffs.
      </>
    ),
  },
  {
    title: "Powered by Me",
    src: "/img/rico.jpg",
    description: (
      <>
        I'm a solo software developer building what I think is a useful tool. If
        you have any questions or feedback, please let me know by creating a{" "}
        <a href="https://github.com/toshimoto821/webshot-archive-docs/issues">
          github issue
        </a>
        .
      </>
    ),
  },
];

function Feature({ title, src, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={src} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
