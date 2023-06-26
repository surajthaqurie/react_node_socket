import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function PostComponent() {
  const API_URL = process.env.REACT_APP_API_URL + "/api/v1/post";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(({ data }) => {
      setPosts(data.data);
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
              <NavLink to={`product/${post.id}`} className="btn btn-primary">
                View details
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PostComponent;
