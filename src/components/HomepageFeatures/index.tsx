import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  src: string;
  description: JSX.Element;
  type: 'png' | 'webm';
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Compare Changes Over Time',
    src: '/img/screenshots/ui-tour-project-dashboard.png',
    type: 'png',
    description: (
      <>
        Webshot Archive lets you view the screenshots and diffs over time.
        Integration with Github so you can view commits and their associated
        diffs. Imagine all the benefits of having screenshots of each commit!
      </>
    ),
  },
  {
    title: 'Github Actions Integration',
    src: '/img/screenshots/gha-screenshot-compare.png',
    description: (
      <>
        Integrates with Github Actions to upload screenshots to the Webshot
        Archive API and leave a comment on the PR with the diffs.
      </>
    ),
    type: 'png',
  },

  {
    title: 'Share Clips With Your Team',
    src: 'https://api.webshotarchive.com/api/video/id/5e29bf66-3b15-4f4e-a13d-46e348218dc5.webm',
    type: 'webm',
    description: (
      <>
        Capture changes and share clips with your team. Share to discord, slack,
        email or via a link. Clips help catch changes, bugs, and features
        earlier in the development cycle.
      </>
    ),
  },
];

function Feature({ title, src, description, type }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.heroFeature)}>
      <div className="text--center">
        {type === 'png' ? (
          <img src={src} className={styles.featureSvg} role="img" />
        ) : (
          <video
            src={src}
            className={styles.featureSvg}
            role="img"
            controls
            autoPlay
            muted
            loop
            playsInline
          />
        )}
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
