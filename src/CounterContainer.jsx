import React, { Component } from 'react';
import store from './store/store.jsx'
import CounterComp from './CounterComp.jsx'
import Notes from "./store/comps/notes.js";
import Add from "./store/comps/add.jsx";

class CounterContainer extends Component{    
    componentDidMount(){
      store.subscribe(()=>{
        this.render()
      });
    }

    render() {
        return (
          <div>
        <CounterComp
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        onRandom={() => store.dispatch({ type: 'RANDOM' })}
      />
      <Notes />
      <Add />
      </div>
        )
    }
}

export default CounterContainer
