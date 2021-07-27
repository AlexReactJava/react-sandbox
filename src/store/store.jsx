import { createStore, applyMiddleware } from 'redux'
import counter from './reducers/counter.js' 
import api from './middleware/api.js'

const apiMidddleware = store => next => action => {
    let result = next(action)
    if(action.row==='NOTE_ADD'){
        api.add({
            id: (store.getState().notes.length + 1),
            name: action.text
        });
    }
    return result
  }

let data = {counter:{value:0},notes:[{id:1,text:"xx",completed:true}]};

const feched = api.fetch();
feched.then(fetchedData=>{
    fetchedData = fetchedData.map(r=>{
        return {
            id: r.id,
            text: r.name,
            completed: false
        };
    });
    data.notes = fetchedData
})

export default createStore( counter, data, applyMiddleware(apiMidddleware) )

