/* eslint-disable */
import { Button, TimePicker } from 'antd';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import React from 'react'
import ReactCountdownClock from 'react-countdown-clock';

export class CountdownTimer extends React.Component {
  state = {
    startTime: null,
    endTime: null,
    duration: 0,
  }

  onChange = (time, key) =>
    this.setState({ [key]: time })

  displayError = (error) => console.log(error)

  confirmDuration = () => this.state.startTime && this.state.endTime
    ? this.setState({ duration: moment.duration(this.state.endTime.diff(this.state.startTime)).seconds() || 0 })
    : this.displayError('endtime must be greater than starttime')

  render () {
    console.log('duration', this.state.duration)
    return (
      <div>
        <div>Start Time
          <TimePicker
            value={this.state.startTime}
            onChange={(time) => this.onChange(time, 'startTime')}
            onOpenChange={this.confirmDuration}
            allowEmpty

          /></div>
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
