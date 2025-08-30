import React from 'react';
import styles from './styles.module.css';

export default function VideoHero() {
  return (
    <section className={styles.videoHero}>
      <div className="container">
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/2zhO-xbRp6U"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
