/* eslint-disable */
import React from 'react';
import styles from './index.css';

export class TextWithVideo extends React.Component {
  static defaultProps = {
    mp4: "http://thenewcode.com/assets/videos/ocean-small.mp4",
    videoPoster: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/oceanshot.jpg",
    viewBox: "0 0 285 80",
    webm: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ocean-small.webm",
  }

  componentDidMount () {
    const video = document.querySelector(`.${styles.textWithVideo}`);
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  render() {
    return (
      <div className={styles.textWithVideo}>
        <video autoPlay="true" playsInline muted loop preload="true" poster={this.props.videoPoster}>
            <source src={this.props.webm} />
            <source src={this.props.mp4} />
          </video>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox={this.props.viewBox} preserveAspectRatio="xMidYMid slice">
            <defs>
            <mask id="mask" x="0" y="0" width="100%" height="100%" >
              <rect x="0" y="0" width="100%" height="100%" />
              <text x="0"  y="70">{this.props.text}</text>
              </mask>
          </defs>
         <rect x="0" y="0" width="100%" height="100%" />
          </svg>
      </div>
    )
  }
}

export default TextWithVideo
