import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Image(props: { src: string; alt: string }) {
  const { siteConfig } = useDocusaurusContext();
  const eagerLoadImg = siteConfig.customFields.eagerLoadImg;
  return <img {...props} loading={eagerLoadImg ? 'eager' : 'lazy'} />;
}
