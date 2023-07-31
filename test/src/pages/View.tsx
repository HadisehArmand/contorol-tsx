import React, { useEffect } from 'react';
import axios from 'axios';
import { useUserStore, User } from '../userStore'; // Import the Zustand hook and User interface
import './login.css';
import useLogStore from '../addlogsys';

const View: React.FC = () => {
  const {addLog,logs} = useLogStore()
  const {
    users,
    setUsers,
  } = useUserStore();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>(
        "https://64b53279f3dbab5a95c6e9e2.mockapi.io/api/v1/user"
      );
      setUsers(response.data);
    };
    fetchUsers();
    addLog("view user","ok")
  }, [setUsers]);

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
        </tr>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="main">
        <div className="table">
          <table className="table caption-top">
            <caption className="cap">View the list of users</caption>
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Avatar</th>
              </tr>
            </thead>
            <tbody>{renderUser()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;