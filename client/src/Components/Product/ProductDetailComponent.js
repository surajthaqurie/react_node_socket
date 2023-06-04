import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddComment from "../Comment/AddCommentComponent";
import { socket } from "../../App";

function PostDetailsComponent() {
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL + "/post/" + id;
  const [post, setPost] = useState({});
  const getPostDetails = async () => {
    const { data } = await axios.get(API_URL);
    setPost(data.data);
    socket.on(data.data.id + ":comment-receive", (receivedData) => {
      setPost(receivedData);
    });
  };
  useEffect(() => {
    (async () => {
      await getPostDetails();
    })();

    // socket.on(post.id + ":comment-receive", (receivedData) => {
    //   // post.Comment.push(receivedData);
    //   // setPost({ ...post });
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, [post?.Comment?.length]);

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
                  post?.Comment?.length > 0 &&
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
                <AddComment postId={post.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default PostDetailsComponent;
