/* eslint-disable*/
import React from 'react';
import styles from './Landing.css';
import TextWithVideo from 'components/Shared/TextWithVideo';
import DropdownMenu from 'components/Shared/DropdownMenu';
import ContactForm from 'components/Shared/Forms/ContactForm';

export class Landing extends React.Component {
  render () {
    return (
      <div className={styles.landing}>
        <div className={styles.header}>
          <TextWithVideo text='NETECH'/>
          <DropdownMenu
            content={ContactForm}
            contentProps={{
              mailto: true,
              mailtoString: 'mailto:noah@noahedward.com?subject=We want to partner with NETECH'
            }}
            linkText='Contact'
          />
        </div>

        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.lead}>
              <h2>Building the future<br />Together</h2>
            </div>
            <p className={styles.copy}>Living at the intersection of science and magic, I aspire to create something beautiful and novel; learning with peers, working with industry leaders, mentoring those following our footsteps.
            </p>
            <p className={styles.copy}>
             Ensuring our partners meet their goal is our lifeline, what's yours?
            </p>
            <h3 className={styles.name}>Noah Edward Hall</h3>
            <h4 className={styles.title}>Founder</h4>
          </div>
        </div>

        <h3 className={styles.footer}>Investors</h3>
      </div>
    );
  }
}

export default Landing;
