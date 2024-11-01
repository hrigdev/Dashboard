import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const TrackerDisplay = ({
  setMostUsedToday,
  setMostUsedThisWeek,
  setMostUsedThisMonth,
}) => {
  const [info, setInfo] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  const [totalTimeToday, setTotalTimeToday] = useState(0);
  const [totalTimeThisWeek, setTotalTimeThisWeek] = useState(0);
  const [totalTimeThisMonth, setTotalTimeThisMonth] = useState(0);

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
          calculateUsageData(sortedInfo);
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
        calculateUsageData(sortedNewInfo);
      }
    });
  }, []);

  const calculateUsageData = (infoData) => {
    let todayTotal = 0;
    let weekTotal = 0;
    let monthTotal = 0;
    let todaySites = {};
    let weekSites = {};
    let monthSites = {};

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month

    Object.entries(infoData).forEach(([date, sites]) => {
      const dateObj = new Date(date);
      Object.entries(sites).forEach(([url, time]) => {
        if (url !== "null") {
          if (isSameDay(dateObj, today)) {
            todayTotal += time;
            todaySites[url] = (todaySites[url] || 0) + time;
          }
          if (dateObj >= startOfWeek && dateObj <= today) {
            weekTotal += time;
            weekSites[url] = (weekSites[url] || 0) + time;
          }
          if (dateObj >= startOfMonth && dateObj <= today) {
            monthTotal += time;
            monthSites[url] = (monthSites[url] || 0) + time;
          }
        }
      });
    });

    const findMostUsed = (siteData) => {
      return Object.entries(siteData).reduce(
        (a, b) => (a[1] > b[1] ? a : b),
        ["No data", 0]
      )[0];
    };

    setMostUsedToday(findMostUsed(todaySites));
    setMostUsedThisWeek(findMostUsed(weekSites));
    setMostUsedThisMonth(findMostUsed(monthSites));
    setTotalTimeToday((todayTotal / 60000).toFixed(2));
    setTotalTimeThisWeek((weekTotal / 60000).toFixed(2));
    setTotalTimeThisMonth((monthTotal / 60000).toFixed(2));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

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
        {/* <div className="usage-summary">
          <div>MOST USED TODAY: {mostUsedToday || "No data"}</div>
          <div>MOST USED THIS WEEK: {mostUsedThisWeek || "No data"}</div>
          <div>MOST USED THIS MONTH: {mostUsedThisMonth || "No data"}</div>
          <div>TOTAL TIME TODAY: {totalTimeToday} mins</div>
          <div>TOTAL TIME THIS WEEK: {totalTimeThisWeek} mins</div>
          <div>TOTAL TIME THIS MONTH: {totalTimeThisMonth} mins</div>
        </div> */}
        <div className="chart-container">
          <Chart info={info[currentDate]} />
        </div>
        <div className="button-wrapper">
          <button
            className="chart-button"
            onClick={decDate}
            disabled={currentDate === Object.keys(info)[0]}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="chart-button"
            onClick={incDate}
            disabled={
              currentDate === Object.keys(info)[Object.keys(info).length - 1]
            }
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackerDisplay;
