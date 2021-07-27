import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class CounterComp extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    if(this.timer){
      clearTimeout(this.timer)
      this.timer = null
    }else{
      this.timer = setInterval(this.props.onIncrement, 1000)
    }
  }

  render() {
    const { value, onIncrement, onDecrement, onRandom } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={onRandom}>
          random
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async {this.timer ? 'on' : 'off'}
        </button>
      </p>
    )
  }
}

CounterComp.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default connect(state => ({ value: state.counter.value }))(CounterComp)

