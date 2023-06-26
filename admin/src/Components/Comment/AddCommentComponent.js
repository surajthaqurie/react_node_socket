import React, { useState } from "react";
import { socket } from "../../App";

const AddComment = ({ postId }) => {
  const [comment, setComment] = useState({ content: "" });
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const handleChange = (event) => {
    setComment({ content: event.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewComment();
    }
  };

  const handleNewComment = () => {
    socket.emit("sendComment:new", {
      postId: postId,
      ...comment,
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
      file: {
        file,
        fileName,
      },
    });

    setComment({ content: "" });
  };

  return (
    <div
      className="card-footer py-3 border-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <label className="form-label">Comment</label>
      <div className="d-flex flex-start w-100">
        <div className="form-outline w-100">
          <label>
            Your Image File
            <input
              type="file"
              name="myImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <input
            type="text"
            className="form-control"
            id="textAreaExample"
            rows="4"
            style={{ background: "#fff" }}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={comment.content}
          ></input>
        </div>
      </div>
      <div className="float-end mt-2 pt-1">
        <button
          type="button"
          onClick={handleNewComment}
          className="btn btn-primary btn-sm"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
