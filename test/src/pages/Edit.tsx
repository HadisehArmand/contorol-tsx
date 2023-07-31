import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useUserStore, User } from "../userStore";
// Import the Zustand hook and User interface
import "./login.css";
import useLogStore from "../addlogsys";

interface EditProps {
  id: number;
}

const Edit: React.FC<EditProps> = (props) => {
  const {addLog} = useLogStore()
  const users = useUserStore((state) => state.users); // Access the users state from Zustand
  const currentUser = users.find((user) => user.id === props.id); // Find the current user in the users state

  const [firstname, setFirstname] = useState<string>(
    currentUser ? currentUser.firstname : ""
  );
  const [lastname, setLastname] = useState<string>(
    currentUser ? currentUser.lastname : ""
  );
  const [email, setEmail] = useState<string>(
    currentUser ? currentUser.email : ""
  );
  const [password, setPassword] = useState<string>(
    currentUser ? currentUser.password : ""
  );
  const [avatar, setAvatar] = useState<string>(
    currentUser ? currentUser.avatar : ""
  );

  const updateUser = () => {
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      avatar !== ""
    ) {
      const updatedUser: User = {
        id: props.id,
        firstname,
        lastname,
        email,
        password,
        avatar,
      };

      axios
        .put(
          `https://64b53279f3dbab5a95c6e9e2.mockapi.io/api/v1/user/${props.id}`,
          updatedUser
        )
        .then((res) => {
          alert(JSON.stringify(res.data) + "\nEdited !");
          addLog(`"Edit login with id ${props.id}"`, "ok");
          window.location.href = "/view";
        })
        .catch((error) => {
          addLog(`"Edit login with id ${props.id}"`, "False");
          console.error("Error editing user: ", error);
        });
    } else {
      alert("Please complete the form !");
      addLog(`"Edit login with id ${props.id}"`, "False");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="row main-sign-log">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center">Edit</h1>
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
              value={firstname}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setFirstname(evt.target.value)
              }
            />
          </div>
          <div className="input-group mb-3  d-flex justify-content-center">
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
              value={lastname}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setLastname(evt.target.value)
              }
            />
          </div>
          <div className="input-group mb-3  d-flex justify-content-center">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="email"
              aria-label="email"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setEmail(evt.target.value)
              }
            />
          </div>
          <div className="input-group mb-3  d-flex justify-content-center">
            <span className="input-group-text" id="basic-addon1">
              P
            </span>
            <input
              id="password"
              type="text"
              className="form-control"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              value={password}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setPassword(evt.target.value)
              }
            />
          </div>
          <div className="input-group mb-3  d-flex justify-content-center">
            <span className="input-group-text" id="basic-addon1">
              A
            </span>
            <input
              id="avatar"
              type="text"
              className="form-control"
              placeholder="avatar"
              aria-label="avatar"
              aria-describedby="basic-addon1"
              value={avatar}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setAvatar(evt.target.value)
              }
            />
          </div>
        </div>
        {/* ... and the rest of the inputs ... */}
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex justify-content-evenly">
            <input
              className="btn"
              type="button"
              value="Edit"
              onClick={updateUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
