/* eslint-disable*/
import React from 'react';
import styles from './Landing.css';

export class Landing extends React.Component {

  render () {
    return (
      <div className={styles.landing}>
        <div className={`${styles.header} theheader`}>
          <h1>NETECH</h1>
          <h2><a href='#'>Hire Us</a></h2>
        </div>

        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.animation}>animation</div>
            <div className={styles.lead}>
              <h2>Something Great</h2>
              <span className={styles.cta}>CTA</span>
            </div>
            <p className={styles.copy}>Even more awesomeness about our awesomeness that you should WOW about at happy hour that you know something awesome about us.
            </p>
            <h3 className={styles.name}>Noah Edward Hall</h3>
            <h4 className={styles.title}>Founder</h4>
          </div>
          <div className={styles.bigImage}> big image </div>
        </div>

        <div className={styles.footer}> Investors </div>
      </div>
    );
  }
}

export default Landing;
