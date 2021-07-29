import { useState } from "react";

export default () => {
  
  let flowArray = [];

  let [flowState, appendInner] = useState([]);

  let [isInProgress, inProgress] = useState(false);

  const append = (msg) => {
    flowArray = [...flowArray, msg]
    appendInner(flowArray)
  }

  const p0 = new Promise((succ, err) => {
    setTimeout(() => {
      succ();
    }, 5000);
  });
  const p1 = new Promise((succ, err) => {
    setTimeout(() => {
      succ();
    }, 2000);
  });
  const p2 = new Promise((succ, err) => {
    setTimeout(() => {
      succ();
    }, 1000);
  });
  const p3 = new Promise((succ, err) => {
    setTimeout(() => {
      succ();
    }, 100);
  });

  const p4 = new Promise(
    resolveCallable => setTimeout(
      (args) => resolveCallable('p4' + (args?args:'')), 10  
    )
  );

  const normalFlow = () => {
    p0.then(() => {
      append("p0 - normalFlow");
    });
    p1.then(() => {
      append("p1 - normalFlow");
    });
    p2.then(() => {
      append("p2 - normalFlow");
    });
    p3.then(() => {
      append("p3 - normalFlow");
    });
  };

  const asyncFlow = async() => {
    await p0.then(() => {
      append("p0 - asyncFlow");
    });
    await p1.then(() => {
      append("p1 - asyncFlow");
    });
    await p2.then(() => {
      append("p2 - asyncFlow");
    });
    await p3.then(() => {
      append("p3 - asyncFlow");
    });
  };

  const asyncTwoFlow = () => {
    (async() => {
      await p0.then(() => {
        append("p0 - async1");
      });
      await p1.then(() => {
        append("p1 - async1");
      });
      await p2.then(() => {
        append("p2 - async1");
      });
      await p3.then(() => {
        append("p3 - async1");
      });
    })();

    (async() => {
      await p1.then(() => {
        append("p1 - async2");
      });
    })();
  };

  const asyncThenFlow = () => {
    p0.then(() => {
      append("p0 - asyncThenFlow");
    }).then(()=>{
      p1.then(()=>{append("p1 - asyncThenFlow")})
    }).then(()=>{
      p2.then(()=>{append("p2 - asyncThenFlow")})
    }).then(()=>{
      p3.then(()=>{append("p3 - asyncThenFlow")})
    });
  };

  const test5 = async () => {
    Promise.all([p4]).then(append);
  };

  const run = async (callable) => {
    await inProgress(true)
    await callable()
    inProgress(false)
  }

  const flowAsString = flowState.map((msg) => <li>{msg}</li>);

  return (<div>
    {flowAsString}
    <hr/>
    <button onClick={()=>{ run(normalFlow) }} disabled={isInProgress}>normalFlow</button>
    <button onClick={()=>{ run(asyncFlow) }} disabled={isInProgress}>asyncFlow</button>
    <button onClick={()=>{ run(asyncTwoFlow) }} disabled={isInProgress}>asyncTwoFlow</button>
    <button onClick={()=>{ run(asyncThenFlow) }} disabled={isInProgress}>asyncThenFlow</button>
    <button onClick={()=>{ run(test5) }} disabled={isInProgress}>test5</button>
  </div>);
};
