import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Image(props: { src: string; alt: string }) {
  const { siteConfig } = useDocusaurusContext();
  const ci = siteConfig.customFields.ci;
  return <img {...props} loading={ci ? 'eager' : 'lazy'} />;
}
