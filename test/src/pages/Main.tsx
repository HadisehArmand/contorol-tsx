import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import useAuthStore from "../refresh";

const Main: React.FC = () => {
  const { isLogin, setIsLogin } = useAuthStore();
  const [loginPage, setLoginPage] = useState<boolean>(!isLogin);

  const logout = () => {
    setIsLogin(false);
    setLoginPage(!isLogin);
  };

  return (
    <div>
      {isLogin && (
        <div className="body">
          <div className="container ">
            <div className="row">
              <h1 className="header">User Management</h1>
            </div>
            <div className="row">
              <div className=" d-grid justify-content-center col-6 ">
                <Link className="disable-link" to="/view">
                  <input
                    className="btn-index header-btn-index btn-primary"
                    type="button"
                    defaultValue="view"
                  />
                </Link>
              </div>
              <div className=" d-grid justify-content-center col-6">
                <Link className="disable-link" to="/add">
                  <input
                    className="btn-index header-btn-index btn-primary"
                    type="button"
                    defaultValue="Add/Edit"
                  />
                </Link>
              </div>
            </div>
            <div className="row">
              <div className=" d-grid justify-content-center col-6 ">
                <Link className="disable-link" to="/log">
                  <input
                    className="btn-index header-btn-index btn-primary"
                    type="button"
                    defaultValue="Log"
                    id="demo"
                  />
                </Link>
              </div>
              <div className=" d-grid justify-content-center col-6 ">
                <input
                  className="btn-index header-btn-index btn-primary"
                  type="button"
                  defaultValue="Logout"
                  onClick={logout}
                  id="demo"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {loginPage && <Login />}
    </div>
  );
};

export default Main;
