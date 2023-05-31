import React, { useState } from "react";
import axios from "axios";

const AddComment = ({ postId }) => {
  const API_URL = process.env.REACT_APP_API_URL + "/comment/" + postId;
  const [comment, setComment] = useState({ content: "" });

  const handleChange = (event) => {
    setComment({ content: event.target.value });
  };

  const postComment = () => {
    axios
      .post(API_URL, {
        ...comment,
        user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
        // user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf58",
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div
      className="card-footer py-3 border-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <label className="form-label">Comment</label>
      <div className="d-flex flex-start w-100">
        <div className="form-outline w-100">
          <textarea
            className="form-control"
            id="textAreaExample"
            rows="4"
            style={{ background: "#fff" }}
            onChange={handleChange}
            value={comment.content}
          ></textarea>
        </div>
      </div>
      <div className="float-end mt-2 pt-1">
        <button
          type="button"
          onClick={postComment}
          className="btn btn-primary btn-sm"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
