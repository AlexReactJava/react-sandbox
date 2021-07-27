import React from "react";
import Bla from './context.jsx';
import PropTypes from 'prop-types'

class x extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { date: new Date(), counter: 0 };
  }
  componentDidMount() {
    if (this.props.auto) {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  }
  componentWillUnmount() {
    if (this.props.auto) {
      clearInterval(this.timerID);
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  tick() {
    this.setState({
      date: new Date(),
      counter: this.state.counter+1
    });
  }
  render(children) {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{'Something went wrong.'}</h1>
    }
    return (
      <div>
        <pre>
        Class2 START:
        Name: {this.props.name};
        {this.state.date.toLocaleTimeString()}
        <button onClick={()=>{this.tick()}}>setState ({this.state.counter})</button>
        Total: {this.state.counter}
        {JSON.stringify(this.contextType)}
        END
        </pre>
        {children}
        <Bla.Consumer>
          {color => <p style={{ color: color }}>----</p>}
        </Bla.Consumer>
      </div>      
    );
  }
}

export default x;
