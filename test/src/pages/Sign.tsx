import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import "./login.css";
import useLogStore from "../addlogsys";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
}

const Login: React.FC = (props) => {
  const {addLog} = useLogStore()
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const reset = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setAvatar("");
  };

  const submitUser = () => {
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      avatar !== ""
    ) {
      const user: User = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        avatar: avatar,
      };

      axios
        .post(
          `https://64b53279f3dbab5a95c6e9e2.mockapi.io/api/v1/user/`,
          user,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          alert(JSON.stringify(res.data) + "\nCreated !");
          addLog(`"Signin with id ${res.data.id}"`, "ok");
          window.location.href = "/view";
        })
        .catch((error) => {
          alert("An error occurred while creating the user.");
          addLog("Signin", "False");
        });
    } else {
      alert("Please complete the form !");
      addLog("Signin", "False");
    }
  };

  const updateInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value;
    const idV = evt.target.id;

    switch (idV) {
      case "firstname":
        setFirstname(val);
        break;
      case "lastname":
        setLastname(val);
        break;
      case "email":
        setEmail(val);
        break;
      case "password":
        setPassword(val);
        break;
      case "avatar":
        setAvatar(val);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="row main-sign-log">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center">Sign Up</h1>
          <div className="input-group mb-3  d-flex justify-content-center">
            <span className="input-group-text" id="basic-addon1">
              F
            </span>
            <input
              id="firstname"
              type="text"
              className="form-control"
              placeholder="FirstName"
              aria-label="FirstName"
              aria-describedby="basic-addon1"
              onChange={(evt) => updateInputValue(evt)}
              value={firstname}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              L
            </span>
            <input
              id="lastname"
              type="text"
              className="form-control"
              placeholder="LastName"
              aria-label="LastName"
              aria-describedby="basic-addon1"
              onChange={(evt) => updateInputValue(evt)}
              value={lastname}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="input-group mb-3">
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
              onChange={(evt) => updateInputValue(evt)}
              value={email}
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
              onChange={(evt) => updateInputValue(evt)}
              value={password}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              A
            </span>
            <input
              id="avatar"
              type="text"
              className="form-control"
              placeholder="Avatar"
              aria-label="Avatar"
              aria-describedby="basic-addon1"
              onChange={(evt) => updateInputValue(evt)}
              value={avatar}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6  d-flex justify-content-evenly">
            <input
              className="btn"
              type="button"
              value="SignUp"
              onClick={submitUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
