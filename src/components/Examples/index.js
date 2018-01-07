/* eslint-disable */
import { connect } from 'react-redux';
import Counter from 'components/Counter';
import React from 'react';


export class Examples extends React.Component {
  CounterSaga = () => (
    <Counter
      onDecrement={() => this.props.sagaAction('DECREMENT')}
      onIncrement={() => this.props.sagaAction('INCREMENT')}
      onIncrementAsync={() => this.props.sagaAction('INCREMENT_ASYNC')}
      value={this.props.counter}
    />
  )

  render () {
    return (
      <div>
        <h1>Counter</h1>
        {this.CounterSaga()}
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
