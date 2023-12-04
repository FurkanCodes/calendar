import { SyntheticEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Calendar } from "primereact/calendar";
import { FormEvent, Nullable } from "primereact/ts-helpers";

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setDates } from "./slice/dateSlice";

const UTCDate = (date: string | number | Date) => {
  console.log("Original Date:", date);
  const parsedDate = new Date(date);
  const _utcDate = new Date(parsedDate.toISOString());
  const gmtOffset = _utcDate.getTimezoneOffset();
  const hours = Math.floor(gmtOffset / 60);

  _utcDate.setHours(_utcDate.getHours() - hours, _utcDate.getMinutes(), 0, 0);

  console.log("Converted UTC Date:", _utcDate);
  return _utcDate;
};

const utcToLocal = (utcDate: string | number | Date) => {
  const date = new Date(utcDate);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

const localToUTC = (localDate: string | number | Date) => {
  const parsedDate = new Date(localDate);
  const _utcDate = new Date(parsedDate.toISOString());
  const gmtOffset = _utcDate.getTimezoneOffset();
  const hours = Math.floor(gmtOffset / 60);

  _utcDate.setHours(_utcDate.getHours() - hours, _utcDate.getMinutes(), 0, 0);
  console.log("Converted UTC Date:", _utcDate);
  return _utcDate;
};

function App() {
  const dispatch = useAppDispatch();
  const { dates } = useAppSelector((state: any) => state.date);

  useEffect(() => {
    console.log("Current dates in state (as strings):", dates);
  }, [dates]);

  const handleInput = (e: any) => {
    const selectedDate = e.value; // Assuming e.value is a Date object
    dispatch(setDates({ startDate: localToUTC(selectedDate) }));
  };
  // Ensure the Calendar component gets a Date object
  const calendarValue =
    dates && dates.startDate ? utcToLocal(dates.startDate) : null;

  return (
    <div className="card flex justify-content-center">
      <Calendar showTime value={calendarValue} onChange={handleInput} />
    </div>
  );
}

export default App;