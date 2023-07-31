import React, { useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { useUserStore, User } from "../userStore";
import "./login.css";
import useLogStore from "../addlogsys";

const Add: React.FC = () => {
  const {addLog} = useLogStore()
  const {
    users,
    setUsers,
    addMode,
    editMode,
    toggleEditMode,
    currentId,
  } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>(
        "https://64b53279f3dbab5a95c6e9e2.mockapi.io/api/v1/user"
      );
      setUsers(response.data);
    };
    fetchUsers();
    addLog("add/edit user","ok")
  }, [setUsers]);

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(
        `https://64b53279f3dbab5a95c6e9e2.mockapi.io/api/v1/user/${id}`
      );
      alert(`User with id ${id} was deleted!`);
      addLog("delete user","ok")
      window.location.href = "/view";
    } catch (error) {
      console.error("Failed to delete user:", error);
      addLog("delete user","false")
    }
  };

  const handleEditUser = (id: number) => {
    toggleEditMode(id);
  };

  const renderUser = () => {
    return users.map(({ id, firstname, lastname, email, password, avatar }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{firstname}</td>
          <td>{lastname}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>
            <img src={avatar} height="50px" alt="pic" />
          </td>
          <td>
            <div className="row">
              <button
                className="col-4 form-control btnDel btn-success"
                onClick={() => handleDeleteUser(id)}
              >
                delete
              </button>
              <button
                className="col-4 form-control btnDel btn-success"
                onClick={() => handleEditUser(id)}
              >
                edit
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {addMode && (
        <div className="container-fluid ">
          <div className="main">
            <div className="main-add">
              <div className="row d-flex justify-content-start mt-1">
                <div className="col-5">
                  <div className="input-group mb-1">
                    <Link className="disable-link" to="/sign">
                      <input
                        type="submit"
                        className="form-control btn btn-success"
                        placeholder="add user"
                        aria-label="add user"
                        value="add user"
                        aria-describedby="basic-addon1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="table">
              <table className="table caption-top">
                <caption>List of users</caption>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{renderUser()}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {editMode && <Edit id={currentId} />}
    </div>
  );
};

export default Add;
