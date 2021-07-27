import React from "react";
import Fetch from "react-fetch";

function Fetch3rd() {
  const handleError = (error) => console.log(error);
  const handleSuccess = (data) => console.log(data);

  return (
    <Fetch
      url="http://httpbin.org/headers"
      onSuccess={handleSuccess}
      onError={handleError}
    >
      <UserAgent />
    </Fetch>
  );
}

function UserAgent(props) {
  return (
    <div>
      {props.headers ? (
        <div>Your User-Agent: {props.headers["User-Agent"]}</div>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export default Fetch3rd;