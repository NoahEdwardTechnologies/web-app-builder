/* eslint-disable */
import { Button, TimePicker, InputNumber } from 'antd';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import React from 'react'
import ReactCountdownClock from 'react-countdown-clock';

export class CountdownTimer extends React.Component {
  state = {
    startTime: '00:00:00',
    endTime: null,
    duration: 0,
  }

  onChange = (time, key) =>
    this.setState({ [key]: time })

  displayError = (error) => console.log(error)

  confirmDuration = () => this.state.startTime && this.state.endTime
    ? this.setState({ duration: moment.duration(this.state.endTime.diff(this.state.startTime)).seconds() || 0 })
    : this.displayError('endtime must be greater than starttime')

  formatTime = (value) => {
    console.log('blah',value,!/(?:[0-9]){2,3}(?:\:)?/g.test(value))
    if (!/(?:[0-9]){2,3}(?:\:)?/g.test(value)) {
      console.log('made it in')
      this.input.selectionStart = this.input.selectionStart;
      return false;
    }
    let item = this.input.selectionStart;

    console.log('ofset',this.input.value,  value, this.state.startTime )
    let blah = '';
    const colon = value[this.input.selectionStart - 1] == ':'
    let change = 1;
    if ([3,6].includes(this.input.selectionStart)) {
      item += 1;
      blah = colon ? ':0' : ':' +  value[this.input.selectionStart - 1]
    }

    const newValue = this.input.value.length < this.state.startTime.length
      ? '0'
      : value[this.input.selectionStart - change];

    const newby = this.state.startTime.slice(0, this.input.selectionStart- change || 0) + (blah ? (blah) : newValue ) + this.state.startTime.slice(blah ? (1 + this.input.selectionStart) : this.input.selectionStart)

    // console.log(value, this.state.startTime
    // ,moment.duration('10:10:10', 'seconds').format('hh:mm:ss'), moment.duration(value, 'hours').format('hh:mm:ss'))
    console.log('newby', newby)
    return value
      ? this.setState({ startTime: newby }, () => {
        this.input.selectionStart = item;
        this.input.selectionEnd = item;
      })
      : ''
  }
  render () {
    console.log('duration', this.state.duration)
    return (
      <div>
        <div>Start Time
          <input
            type='text'
            value={this.state.startTime}
            ref={(input) => (this.input = input)}
            onKeyDown={e => [8, 46].includes((e.keyCode || e.charCode))}
            onChange={e => this.formatTime(e.target.value)}
          />
        </div>
        <div>End Time
          <TimePicker
            value={this.state.endTime}
            onChange={(time) => this.onChange(time, 'endTime')}
            onOpenChange={this.confirmDuration}
            disabled={!this.state.startTime}
            allowEmpty
          />
        </div>
        <div>
          <ReactCountdownClock
           seconds={this.state.duration}
           color="#21B"
           alpha={0.9}
           size={300}
           onComplete={() => this.setState({ duration: 0 })} />

       </div>

        <Button
          type='primary'
          disabled={!this.state.duration}
          onClick={() => this.props.sagaAction('COUNTDOWN_TIMER_START')}>
          Start Countdown
        </Button>

        <div>

        </div>
      </div>
    )
  }
}

export default CountdownTimer
