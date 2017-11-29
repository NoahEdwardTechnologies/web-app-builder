/* eslint-disable*/
import React from 'react';
import styles from './Landing.css';
import TextWithVideo from 'components/Shared/TextWithVideo';

export class Landing extends React.Component {

  render () {
    return (
      <div className={styles.landing}>
        
        <div className={styles.header}>
          <TextWithVideo text='NETECH'/>
          <h2><a href='#' contentEditable="true">Hire Us</a></h2>
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
        </div>

        <h3 className={styles.footer}> Investors </h3>
      </div>
    );
  }
}

export default Landing;
