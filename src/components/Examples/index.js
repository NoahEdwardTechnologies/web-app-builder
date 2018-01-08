/* eslint-disable */
import { connect } from 'react-redux';
import CountdownTimer from 'components/Shared/CountdownTimer';
import Counter from 'components/Shared/Counter';
import React from 'react';

export class Examples extends React.Component {

  render () {
    return (
      <div>
        <h1>Various Examples</h1>
        <article>
          <h2>Counter</h2>
          <Counter
            sagaAction={this.props.sagaAction}
            value={this.props.counter}
          />
        </article>
        <article>
          <h2>Countdown Timer</h2>
          <CountdownTimer
            sagaAction={this.props.sagaAction}
            value={this.props.counter}
          />
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => ({ counter: state.counterSaga });

const mapDispatchToProps = dispatch => ({
  sagaAction (type) {
    return dispatch({type});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Examples);
