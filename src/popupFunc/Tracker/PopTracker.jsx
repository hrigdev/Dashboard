import React, { useState, useEffect } from "react";
import Chart from "./Chart";

const TrackerDisplay = () => {
  const [info, setInfo] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchInfoData = () => {
      chrome.storage.local.get(["info"], (data) => {
        if (data.info) {
          setInfo(data.info);

          const firstKey = Object.keys(data.info)[0];
          if (firstKey) {
            setCurrentDate(firstKey);
          }
        }
      });
    };

    fetchInfoData();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && changes.info) {
        setInfo(changes.info.newValue);
      }
    });
  }, []);

  function incDate() {
    let date = currentDate;
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    newDate = newDate.toDateString();
    setCurrentDate(newDate);
  }

  function decDate() {
    let date = currentDate;
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    newDate = newDate.toDateString();
    setCurrentDate(newDate);
  }

  let currentinfo = info[currentDate] || {};

  return (
    <div>
      <h1>Web Usage Tracker</h1>
      <div className="tracker-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Site</th>
              <th>Time Spent (mins)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(currentinfo).length > 0 ? (
              Object.entries(currentinfo).map(([url, time]) => {if(url!="null"){return(
                <tr key={`${currentDate}-${url}`}>
                  <td>{currentDate}</td>
                  <td>{url}</td>
                  <td>{(time / 60000).toFixed(2)}</td>
                </tr>
              )}})
            ) : (
              <tr>
                <td colSpan="3">No data present</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={decDate}>left</button>
        <button onClick={incDate} disabled={currentDate === Object.keys(info)[0]}>
          right
        </button>
        <div className="chart-container">
          <Chart info={info[currentDate]} /> 
        </div>
      </div>
    </div>
  );
};

export default TrackerDisplay;
