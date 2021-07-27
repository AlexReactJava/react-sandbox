import React from 'react';
import Tick from './timer.jsx';
import GMap from './gmap.jsx';
import Fetch3rd from './fetch3rd.jsx';
import Bla from './context.jsx';

const AnyReactComponent = ({ text }) => <div>{text} {(new Date().toLocaleTimeString())}</div>;

const Func1 = function name(...p) {
  return <div>func1 {JSON.stringify(p)}
  <button> btn </button>
  </div>;
}

const Class1 = class extends React.Component{
  render(params){
    return <div>
          Class1 START:
          Params: {JSON.stringify(this.props)}
          <Func1 data={this.props.func1} />
          END
          {this.contextType}
      </div>
  }
}

export default class extends React.Component {
  render() {
    return (
      <div>
        HOME
      </div>
      
    );
  }
}
