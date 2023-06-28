import React, { useState,useEffect } from 'react';


const Calendar = (props) => {
    const subjectName=props.subjectName
    
  const [attendance, setAttendance] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Get the current month (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Get the current year

  

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
   useEffect(() => {
        attendanceMarker(subjectName);
      },[]);
const attendanceMarker=async(subjectName)=>{
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        
       console.log(`${process.env.REACT_APP_API_URL}/attendanceMarkerIdfetcher/${subjectName}/${userId}`)
        const response=await fetch(`${process.env.REACT_APP_API_URL}/attendanceMarkerIdfetcher/${subjectName}/${userId}`)
        if(response.ok){
          const result=await response.json()
          setAttendance(result)
        }
    }
  // Generate the calendar grid
  const renderCalendarGrid = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get the day of the week (0-6) for the first day of the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the number of days in the current month

    // Generate an array of dates for the month
    const dates = [...Array(daysInMonth).keys()].map((day) => day + 1);

    // Fill the preceding days of the first week with empty slots
    const precedingDays = [...Array(firstDayOfMonth).keys()].map(() => null);
    
    
      const isAttendanceMarked = (date) => {
        const formattedDate = new Date(currentYear, currentMonth, date).toDateString();
        const matchingDates = attendance.filter((dateStr) => new Date(dateStr).toDateString() === formattedDate);
        
      return matchingDates.length ;
      };
      
    // Render the calendar grid with dates and attendance dots
    return [...precedingDays, ...dates].map((date, index) => {
      const isDateValid = date !== null;
      const dayClassName = isDateValid ? 'day' : 'day empty';
      const formattedDate = isDateValid ? ('0' + date).slice(-2) : '';
      const attendanceCount = isAttendanceMarked(date);
       console.log(attendanceCount)
      const attendanceDots = Array.from({ length: attendanceCount }, (_, i) => (
        <div key={i} className="dot" />
      ));
      
      
      
      return (
        <div
          key={index}
          className={`${dayClassName} ${isAttendanceMarked(date) ? 'attended' : ''}`}
          
        >
          {formattedDate}
          <div className='dot-container'>

          {attendanceDots}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="calendar">
      <div className="header">
        <button className='calender-button' onClick={goToPreviousMonth}>&lt;</button>
        <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button className='calender-button' onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">S</div>
        <div className="day">M</div>
        <div className="day">T</div>
        <div className="day">W</div>
        <div className="day">T</div>
        <div className="day">F</div>
        <div className="day">S</div>
      </div>
      <div className="grid">{renderCalendarGrid()}</div>
    </div>
  );
};

export default Calendar;
