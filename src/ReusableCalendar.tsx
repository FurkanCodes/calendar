import { Calendar } from "primereact/calendar";
import React, { useEffect } from "react";
import { setDates } from "./slice/dateSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

const convertTime = (date: string | number | Date, toUtc = true) => {
  const parsedDate = new Date(date);
  if (toUtc) {
    const _utcDate = new Date(parsedDate.toISOString());
    const gmtOffset = _utcDate.getTimezoneOffset();
    const hours = Math.floor(gmtOffset / 60);
    _utcDate.setHours(_utcDate.getHours() - hours, _utcDate.getMinutes(), 0, 0);
    console.log("Converted UTC Date:", _utcDate);
    return _utcDate;
  } else {
    const localDate = new Date(
      parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000
    );
    console.log("Converted Local Date:", localDate);
    return localDate;
  }
};

function ReusableCalendar() {
  const dispatch = useAppDispatch();
  const { dates } = useAppSelector((state: any) => state.date);

  useEffect(() => {
    console.log("State'deki dateler:", dates);
  }, [dates]);

  const handleInput = (e: any, isStartDate: boolean) => {
    const selectedDate = e.value;
    const convertedDate = convertTime(selectedDate, true);
    const actionType = isStartDate ? "setStartDate" : "setEndDate";

    dispatch(setDates({ [actionType]: convertedDate }));
  };

  const startCalendarValue =
    dates && dates.startDate ? convertTime(dates.startDate, false) : null;
  const endCalendarValue =
    dates && dates.endDate ? convertTime(dates.endDate, false) : null;

  return (
    <div className="card flex justify-content-center">
      <Calendar
        showTime
        value={startCalendarValue}
        onChange={(e) => handleInput(e, true)}
      />
      <Calendar
        showTime
        value={endCalendarValue}
        onChange={(e) => handleInput(e, false)}
      />
    </div>
  );
}

export default ReusableCalendar;
