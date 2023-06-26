import React, { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/jwtDecoder.js";

const HomeComponent = ({ socket }) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  return (
    <div>
      <button
        className="position-absolute bottom-0 end-0 btn-lg m-5"
        onClick={handleClick}
      >
        <i className="fas fa-comments fa-2xl"></i>
      </button>
      {isShown && <Box socket={socket} />}
    </div>
  );
};

const Box = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  useEffect(() => {
    socket.on("quick_chat:new_message", (data) => {
      setAllMessage([...allMessage, data.description]);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const userInfo = decodeJwt(localStorage.getItem("token"));

    // setAllMessage([...allMessage, message]);
    socket.emit("quick_chat:new_message", {
      socketId: socket.id,
      message,
      userInfo: {
        userId: userInfo.user,
        role: userInfo.role,
      },
    });
    setMessage("");
  };
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="card">
        <h4 className="card-title">Quick chat</h4>
        <div className="card-body">
          {allMessage.map((msg, index) => {
            return <p key={index}>{msg}</p>;
          })}
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
