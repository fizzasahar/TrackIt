import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Routing ke liye

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  // Format month
  const getFormattedDate = () => {
    return currentDate.toLocaleDateString(undefined, { year: "numeric", month: "long" });
  };

  // Generate days
  const getDaysInMonth = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, () => null);
    return [...emptyDays, ...days];
  };

  // Change Month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Navigate to Task Page with Date
  const handleDateClick = (day) => {
    if (day) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        .toISOString()
        .split("T")[0];
      navigate(`/tasks?date=${selectedDate}`);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 pb-10">
        <button onClick={() => changeMonth(-1)} className="text-orange-500 hover:text-white transition duration-300">
          <FaChevronLeft size={40} />
        </button>
        <span className="text-2xl font-bold tracking-wide px-20">{getFormattedDate()}</span>
        <button onClick={() => changeMonth(1)} className="text-orange-500 hover:text-white transition duration-300">
          <FaChevronRight size={40} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid text-2xl grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xl font-medium pb-10 text-gray-400">{day}</div>
        ))}

        {getDaysInMonth().map((day, index) => (
          <div
            key={index}
            className={`h-12 w-12 flex items-center justify-center rounded-lg text-lg font-semibold cursor-pointer transition duration-300
              ${day ? "bg-gray-900 text-white hover:bg-orange-500" : "bg-transparent"}
              ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? "border-2 border-orange-500 shadow-lg scale-105" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
