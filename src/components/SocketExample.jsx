import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function Socket() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // socket.on("position", data => {
    //   setResponse(data);
    // });
    socket.emit("position", "Hello world");
  }, []);


  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default Socket