import { useState, useEffect, useRef, useReducer, useMemo } from 'react'

const reducer = (state,action)=>{
    return ++state;
}

export default ()=>{
    const [v,setv] = useState(0)
    const [state,dispatchR] = useReducer(reducer,0)
    const ref = useRef(0)
    const memo = useMemo(()=>{
        return v**2;
    },[v])
    let a
    useEffect(()=>{
        a = 'xxx loaded'
        console.log(a)
        setv(10)
        return () => {
            a = 'xxx unLoaded'
            console.log(a)
            setv(100)
        }
    },[])

    const toggleTimer = ()=>{
        ref.current++
        setInterval(() => {
            setv((new Date()).getSeconds());
        }, 1000)
    }

    return <b>
            simple function 
            / useState: {v}
            / useEffect: {a}
            / useRef: {ref.current}
            / useReducer: {state} <button onClick={()=>{dispatchR({type:'actionA'})}}>dispatchR</button>
            <button onClick={()=>toggleTimer()}>change</button>
        </b>
}