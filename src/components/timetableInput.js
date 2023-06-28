import React, { useState, useEffect } from 'react';

import { faAnglesLeft, faAnglesRight, faTrash} from '@fortawesome/free-solid-svg-icons'
import image from '../images/Hurray its weekend.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function TimetableInput() {
  const [currentDay, setCurrentDay] = useState(1);
  const [isSubjectAddition, setIsSubjectAddition] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [start_time, setStart_time] = useState('');
  const [end_time, setEnd_Time] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subjectsName, setSubjectsName] = useState([]);

  useEffect(() => {
    getSubjects();
    fetchSubjects();
  }, [currentDay]);

  const getSubjects = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem('user'))._id;
      

      const dayOfWeek = daysOfWeek[currentDay];
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timetable/${studentId}/${dayOfWeek}`);
      if (response.ok) {
        const result = await response.json();
        setSubjects(result);
      } else {
        console.error('Failed to fetch timetable:', response.status);
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => (prevDay === 0 ? 6 : prevDay - 1));
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => (prevDay === 6 ? 0 : prevDay + 1));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day_of_week = daysOfWeek[currentDay];

  

  const handleSubmit = async (e) => {
    e.preventDefault();
   if(start_time>end_time){
    alert("Is it even possible")
    return
   }
   
   if (!(subjects.result) &&(subjects.some((subject) => (
    (subject.startTime <= start_time && subject.endTime > start_time) ||  // Case 1: Existing slot overlaps the start time
    (subject.startTime < end_time && subject.endTime > end_time) ||      // Case 2: Existing slot overlaps the end time
    (subject.startTime >= start_time && subject.endTime < end_time)       // Case 3: Existing slot is fully within the new slot
  )))) {
    alert("That slot is already filled");
    return;
  }
  
    try {
      const studentId = JSON.parse(localStorage.getItem('user'))._id;

    
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timetable-input`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, subjectName, start_time, end_time, day_of_week }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        localStorage.setItem('timetable', JSON.stringify(result));
        getSubjects();
      } else {
        console.error('Failed to submit timetable');
      }
    } catch (error) {
      console.error('Error submitting timetable:', error);
    }

    // Reset the form after submission
    setSubjectName('');
    setEnd_Time('');
    setStart_time('');
    setIsSubjectAddition(false); // Close the modal after submission
  };

  const fetchSubjects = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem('user'))._id;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subjectsName/${studentId}`);
      if (response.ok) {
        const timetableData = await response.json();
        setSubjectsName(timetableData);
      } else {
        console.error('Failed to fetch timetable data');
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };
  
  const DeleteTimetable=(async timetableId=>{
    await fetch(`${process.env.REACT_APP_API_URL}/timetableDelete/${timetableId}`)
    fetchSubjects()
    getSubjects()

  })

  return (
    <>
      <div className="timetable-input-container">
       
        <div className="day-container">
          <button className="arrow-button" onClick={handlePrevDay}>
           <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          </button>
          <h3 className="daysname">{daysOfWeek[currentDay]}</h3>
          <button className="arrow-button" onClick={handleNextDay}>
           <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
          </button>
        </div>
        <div className='container'>
        {subjects.length > 0 ? (
          <div className="subjectList">
            <div className="header1">
              <div className="rows">Subject</div>
              <div className="rows">Start Time</div>
              <div className="rows">End Time</div>
              <div className="rows">Delete</div>
            </div>
            {subjects.map((item, index) => (
              <div className="header1" key={index}>
                <div className="rows">{item.subjectName}</div>
                <div className="rows">{item.startTime}</div>
                <div className="rows">{item.endTime}</div>
                <div className="rows">
            
                <FontAwesomeIcon className='delete' onClick={()=>DeleteTimetable(item.timetableId)} icon={faTrash}></FontAwesomeIcon>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='NoSubjects'>
          <img src={image}></img>
          <p className='text'>No classes today</p>
          </div>
        )}
        

      <form class="form-2">
      
      <div class="subtitle">Let's add subjects!</div>
      <div class="input-container ic1">
      <select
            type="text"
            id="class_name"
            name="class_name"
            required
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            >
            <option value="" disabled>
              Select a subject 
            </option>
            {subjectsName.length > 0 ? (
        subjectsName.map((item) => (
          <option key={item.subjectName} value={item.subjectName}>
            {item.subjectName}
          </option>
        ))
      ) : (
        <option>Add subjects in the dashboard</option>
      )}
          
          </select>
        <label for="Sunject Name" class="placeholder" ></label>
      </div>
      <div class="input-container ic2">
      <label htmlFor="start_time">Start Time:</label>
          <div className="time-picker">
            <input
              type="time"
              className="myTimePicker"
              required
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)} 
              />
          </div>
          </div>
      <div class="input-container ic2">
      <label htmlFor="end_time">End Time:</label>
          <div className="time-picker">
            <input
              type="time"
              className="myTimePicker"
              value={end_time}
              required
              onChange={(e) => setEnd_Time(e.target.value)}
              />
          </div>
      </div>
      <button type="text" onClick={handleSubmit} class="submit">submit</button>
    </form>
    </div>

      
        </div>
    </>
  );
}
