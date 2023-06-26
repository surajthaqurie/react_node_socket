import React, { useState } from "react";
import axios from "axios";

const LoginComponent = ({ socket }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/admin/login",
        loginData
      );

      if (data.status) {
        localStorage.setItem("token", data.data.authorization_token);
      }
    } catch (error) {
      console.log(error);
    }

    setLoginData({ email: "", password: "" });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="container">
      <div className="form-group">
        <label>Email</label>
        <input
          value={loginData.email}
          className="form-control"
          onChange={(e) => handleChange(e)}
          name="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={loginData.password}
          className="form-control"
          onChange={(e) => handleChange(e)}
          name="password"
        />
      </div>
      <button className="btn btn-primary mt-2">Submit</button>
    </form>
  );
};

export default LoginComponent;
