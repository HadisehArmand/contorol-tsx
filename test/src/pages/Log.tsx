import React, { useEffect } from "react";
import useLogStore from "../addlogsys";

interface LogItem {
  Action: string;
  Date: string;
  Time: string;
  Success: string;
}


const Log: React.FC = () => {
  const {logs} = useLogStore()

  const renderLog = () => {
    return logs.map(({ Action, Date, Time, Success }, index) => (
      <tr key={index}>
        <td>{Action}</td>
        <td>{Date}</td>
        <td>{Time}</td>
        <td>{Success}</td>
      </tr>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="main">
        <div className="table">
          <table className="table caption-top">
            <caption>List of Actions</caption>
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Success</th>
              </tr>
            </thead>
            <tbody>{renderLog()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Log;
