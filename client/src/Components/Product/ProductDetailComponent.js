import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import AddComment from "../Comment/AddCommentComponent";
import { socket } from "../../App";

function PostDetailsComponent() {
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL + "/post/" + id;
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({ content: "" });

  const handleChange = (event) => {
    setComment({ content: event.target.value });
  };

  const handleNewComment = () => {
    socket.emit("sendComment:new", {
      postId: post.id,
      ...comment,
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
    });

    setComment({ content: "" });
  };

  useEffect(() => {
    axios.get(API_URL).then(({ data }) => {
      setPost(data.data);

      socket.on("new-comment", (receivedData) => {
        console.log("Received comments:", receivedData);

        // Update the comments state with the received comments
        data.data.Comment.push(receivedData);
        setPost({ ...data.data });
      });

      // Clean up the socket connection on component unmount
      // return () => {
      //   socket.disconnect();
      // };
    });
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: " #eee" }}>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center">
                    <h6 className="fw-bold text-primary mb-1">{post.title}</h6>
                    <p className="text-muted small mb-0">
                      <b> {post.User && post.User.name}</b>&nbsp;-&nbsp;
                      {post.createdAt}
                    </p>
                  </div>
                  <p className="mt-3 mb-1 pb-2">{post.content}</p>
                </div>
                {post &&
                  post.Comment &&
                  post.Comment.map((comment) => {
                    return (
                      <div className="d-flex flex-start mt-4" key={comment.id}>
                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">
                                {comment.User.name}
                                <span className="small">
                                  &nbsp;-&nbsp;{" "}
                                  {new Date(comment.createdAt).getMinutes()} min
                                  ago..
                                </span>
                              </p>
                            </div>
                            <p className="small mb-0">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* <AddComment postId={post.id} /> */}
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
                      onClick={handleNewComment}
                      className="btn btn-primary btn-sm"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default PostDetailsComponent;
