import React, { useState, useEffect } from "react";
import Main from "./Main";
import "./login.css";
import useAuthStore from "../refresh";
import useLogStore from "../addlogsys";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { adminUsername, adminPassword, isLogin, setIsLogin } = useAuthStore();
  const {addLog} = useLogStore()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [main, setMain] = useState<boolean>(isLogin);
  const admin_username = adminUsername;
  const admin_password = adminPassword;
  const checkuser = () => {
    if (email !== "" && password !== "") {
      if (email === admin_username && password === admin_password) {
        alert("login success !");
        setIsLogin(true);
        setMain(true);
        addLog("login user","ok")
      }
    } else {
      alert("complete field");
      addLog("login user","false")
    }
  };

  return (
    <div>
      {!isLogin && (
        <div className="container-fluid d-flex justify-content-center mt-5">
          <div className="row main-login">
            <div className="row d-flex justify-content-center">
              <h1 className="text-center">Login</h1>
              <div className="input-group mb-3  d-flex justify-content-center">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  P
                </span>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6  d-flex justify-content-evenly">
                <input
                  className="btn-bt btn"
                  type="button"
                  value="Login"
                  onClick={checkuser}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {main && <Main />}
    </div>
  );
};
export default Login;
