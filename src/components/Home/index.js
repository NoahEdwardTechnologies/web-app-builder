/* eslint-disable */
import { connect } from 'react-redux'
import blah from 'store/api/blah/action.js';
import Landing from './Landing';
import React from 'react';
import styles from './index.css';

export class Home extends React.Component {
  handleBlah = () => this.props.doBlah(Math.random())

  render() {
    console.log('props.blah are', this.props.blah)
    return (
      <div className={styles.home}>
        <Landing />
        {/* <button onClick={this.handleBlah}>Clicsk to do five</button> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({ blah: state.blah });

const mapDispatchToProps = dispatch => {
  return {
    doBlah(data) {
      return dispatch(blah(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
