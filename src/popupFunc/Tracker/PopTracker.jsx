import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const TrackerDisplay = () => {
  const [info, setInfo] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchInfoData = () => {
      chrome.storage.local.get(["info"], (data) => {
        if (data.info) {
          const sortedInfo = Object.keys(data.info)
            .sort((a, b) => new Date(a) - new Date(b)) 
            .reduce((acc, key) => {
              acc[key] = data.info[key];
              return acc;
            }, {});
          setInfo(sortedInfo);
          const latestDate = Object.keys(sortedInfo).slice(-1)[0];
          if (latestDate) {
            setCurrentDate(latestDate);
          }
        }
      });
    };

    fetchInfoData();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && changes.info) {
        const sortedNewInfo = Object.keys(changes.info.newValue)
          .sort((a, b) => new Date(a) - new Date(b))
          .reduce((acc, key) => {
            acc[key] = changes.info.newValue[key];
            return acc;
          }, {});
        setInfo(sortedNewInfo);
      }
    });
  }, []);

  function incDate() {
    const dates = Object.keys(info);
    const currentIndex = dates.indexOf(currentDate);
    if (currentIndex < dates.length - 1) {
      setCurrentDate(dates[currentIndex + 1]);
    }
  }

  function decDate() {
    const dates = Object.keys(info);
    const currentIndex = dates.indexOf(currentDate);
    if (currentIndex > 0) {
      setCurrentDate(dates[currentIndex - 1]);
    }
  }

  let currentInfo = info[currentDate] || {};



  return (
    <div>
      <div className="tracker-container">
        {/* <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Site</th>
              <th>Time Spent (mins)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(currentInfo).length > 0 ? (
              Object.entries(currentInfo).map(([url, time]) => {
                if (url !== "null") {
                  return (
                    <tr key={`${currentDate}-${url}`}>
                      <td>{currentDate}</td>
                      <td>{url}</td>
                      <td>{(time / 60000).toFixed(2)}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan="3">No data present</td>
              </tr>
            )}
          </tbody>
        </table> */}
        <div className="chart-container">
          <Chart info={info[currentDate]} />
        </div>
        <div className="button-wrapper">
        <button className="chart-button" onClick={decDate} disabled={currentDate === Object.keys(info)[0]}>
          <ChevronLeftIcon />
        </button>
        <button className="chart-button"
          onClick={incDate}
          disabled={currentDate === Object.keys(info)[Object.keys(info).length - 1]}
        >
          <ChevronRightIcon />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TrackerDisplay;
