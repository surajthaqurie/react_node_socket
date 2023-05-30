import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPost] = useState([]);

  const API_URL = "http://localhost:4001/api/v1/post";

  useEffect(() => {
    axios.get(API_URL).then(({ data }) => {
      console.log(data);
      setPost(data.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="row"></div>
      {posts.map((post) => (
        <div key={post.id} className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
