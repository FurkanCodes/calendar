import { useEffect } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setDates } from "./slice/dateSlice";
import ReusableCalendar from "./ReusableCalendar";

function App() {
  return (
    <div className="card flex justify-content-center">
      <ReusableCalendar />
    </div>
  );
}

export default App;
