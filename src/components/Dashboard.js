import React, { useEffect, useState } from "react";

import { faAtom, faCheck,faTrash,faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../images/Hurray its weekend.jpg";
import Calendar from "./Calender";
export default function Dashboard() {
  const [currentDayTimetable, setCurrentDayTimetable] = useState([]);
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const target = 75;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetchTimetable();
    fetchSubjects();
    
  }, [currentDay]);
  useEffect(() => {
    checkattendance();
  });
  // console.log(currentDayTimetable)

  const checkattendance = async () => {
    if(currentDayTimetable.length>0){
    await Promise.all(
      currentDayTimetable.map(async (item) => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/attendance/${item.timetableId}`
        );
        if (response.status === 200) {
          const result = await response.json();
          
          if (result.attendanceAlreadyMarked === false) {
            localStorage.setItem(
              item.timetableId,
              JSON.stringify({
                attendanceAlreadyMarked: result.attendanceAlreadyMarked,
              })
            );
          } else {
            localStorage.setItem(
              item.timetableId,
              JSON.stringify({
                attendanceAlreadyMarked: result.attendanceAlreadyMarked,
                isPresent: result.isPresent,
              })
            );
          }
        }
      })
    );}
  };

  const fetchTimetable = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/timetable/${studentId}/${daysOfWeek[currentDay]}`
      );
      if (response.ok) {
        const timetableData = await response.json();

        setCurrentDayTimetable(timetableData);
        
      } else {
        console.error("Failed to fetch timetable data");
      }
    } catch (error) {
      console.error("Error fetching timetable data:", error)
    }
  };

  const fetchSubjects = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/subjects/${studentId}`
      );
      if (response.ok) {
        const subjectsData = await response.json();
        setSubjects(subjectsData);
      } else {
        console.error("Failed to fetch subjects data");
      }
    } catch (error) {
      console.error("Error fetching subjects data:", error);
    }
  };
  
  const handleSubmit = async () => {
    const studentId = JSON.parse(localStorage.getItem("user"))._id;
    if(attendedClasses>totalClasses){
      alert("Is it even possible")
      return
    }
    let result = await fetch(`${process.env.REACT_APP_API_URL}/subjects`, {
      method: "post",
      body: JSON.stringify({
        studentId,
        subjectName,
        totalClasses,
        attendedClasses,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    // localStorage.setItem("subjects", JSON.stringify(result));
    setSubjectName("");
    setTotalClasses("");
    setAttendedClasses("");
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    handleRefresh()
  };

  const attendancestatusToday = async (item, isPresent) => {
    const timetableId=item.timetableId
    const subjectId=item.subjectId
    const studentId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${process.env.REACT_APP_API_URL}/attendance/${studentId}/${timetableId}`, {
      method: "post",
      body: JSON.stringify({
        
        isPresent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
console.log(result,'hey')
    localStorage.setItem(
      timetableId,
      JSON.stringify({
        attendanceAlreadyMarked: true,
        isPresent: result.isPresent,
      })
    );
    if (isPresent === true) {
      let updation = await fetch(`${process.env.REACT_APP_API_URL}/present/${subjectId}`, {
        method: "put",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updation = await updation.json();

      setCurrentDayTimetable(updation);
    } else {
      let updation = await fetch(`${process.env.REACT_APP_API_URL}/absent/${subjectId}`, {
        method: "put",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updation = await updation.json();

      setCurrentDayTimetable(updation);
    }
    fetchSubjects();
    fetchTimetable();
  };

  const attendanceAllsubjects = async (item, isPresent) => {
    const subjectId=item.subjectId
    const studentId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${process.env.REACT_APP_API_URL}/attendance/${studentId}/${subjectId}`, {
      method: "post",
      body: JSON.stringify({
        subjectId,
        isPresent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (isPresent === false) {
      let updation = await fetch(`${process.env.REACT_APP_API_URL}/absent/${subjectId}`, {
        method: "put",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updation = await updation.json();

      setCurrentDayTimetable(updation);
    } else {
      let updation = await fetch(`${process.env.REACT_APP_API_URL}/present/${subjectId}`, {
        method: "put",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updation = await updation.json();

      setCurrentDayTimetable(updation);
    }
    fetchSubjects();
    fetchTimetable();
  };
  const resetAttendance=async(item)=>{
    const subjectId=item.subjectId
    const subjectName=item.subjectName
    const studentId = JSON.parse(localStorage.getItem("user"))._id;
    let response =await fetch(`${process.env.REACT_APP_API_URL}/reset/${subjectName}/${studentId}`)
    response=await response.json()
    console.log(response)
      if(response.error){
        alert('No records mister')
      }
         
       else{   console.log(`${process.env.REACT_APP_API_URL}/undo/${subjectId}/${response}`)
         let updation = await fetch(`${process.env.REACT_APP_API_URL}/undo/${subjectId}/${response}`, {
        method: "put",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updation = await updation.json();

      setCurrentDayTimetable(updation);
    
    fetchSubjects();
    fetchTimetable();
  }
  }

  const [refreshChild, setRefreshChild] = useState(false);

  const handleRefresh = () => {
    setRefreshChild(!refreshChild);
  };

  const deleteSubject=async(subjectName)=>{
   
    const studentId = JSON.parse(localStorage.getItem("user"))._id;
    let response=await fetch(`${process.env.REACT_APP_API_URL}/subjectDelete/${subjectName}/${studentId}`)
    fetchSubjects()
    fetchTimetable()
  }

  return (
    <>
      
        <div className="Container-1">
          <div className="Todays-timetable">
            <div className="Todays-timetable-heading">
              <div className="greetings">{daysOfWeek[currentDay]}</div>
            </div>

            {currentDayTimetable.length > 0 ? (
              <div className="Classes">
                {currentDayTimetable.map((item) => (
                  <div class="timeline" key={item.timetableId}>
                    <div class="timeline-item">
                      <div class="timeline-item-content">
                        <div style={{ display: "flex", width: "300px" }}>
                          {item.subjectName}
                          <div>
                            ({item.startTime}-{item.endTime})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="NoSubjectsToday">
                <img src={image} alt="No classes" />
                <p className="text">No classes today</p>
              </div>
            )}
          </div>

          <form class="form">
            <div class="subtitle">Let's add subjects!</div>
            <div class="input-container ic1">
              <input
                id="Subject Name"
                class="input"
                type="text"
                required
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Subject Name"
              />

              <label for="Sunject Name" class="placeholder"></label>
            </div>
            <div class="input-container ic2">
              <input
                id="Total Classes"
                class="input"
                type="text"
                value={totalClasses}
                required
                onChange={(e) => setTotalClasses(e.target.value)}
                placeholder="Total Classes "
              />

              <label for="Total Classes" class="placeholder"></label>
            </div>
            <div class="input-container ic2">
              <input
                id="Attended Classes"
                class="input"
                type="text"
                value={attendedClasses}
                required
                onChange={(e) => setAttendedClasses(e.target.value)}
                placeholder="Attended Classes "
              />

              <label for="Attended Classes" class="placeholder"></label>
            </div>
            <button type="text" onClick={handleSubmit} class="submit">
              submit
            </button>
          </form>

          <div className="form mydetails">
            {selectedSubject && <p className="info-info">{selectedSubject.subjectName}</p>}
            {selectedSubject ? (
              <>
                {selectedSubject.totalClasses ? (
                  (
                    (selectedSubject.attendedclasses /
                      selectedSubject.totalClasses) *
                    100
                  ).toFixed(1) >= 75 ? (
                    (-(target * 0.01 * selectedSubject.totalClasses) +
                      selectedSubject.attendedclasses) /
                      (target * 0.01) <
                    1 ? (
                      <div className="info">You need to attend next class to stay on track</div>
                    ) : (
                      <div  className="info">
                        You can skip next{" "}
                        {Math.floor(
                          (-(target * 0.01 * selectedSubject.totalClasses) +
                            selectedSubject.attendedclasses) /
                            (target * 0.01)
                        )}{" "}
                        classes{" "}
                      </div>
                    )
                  ) : (
                    <div  className="info">
                      You need to attend next{" "}
                      {Math.ceil(
                        (target * 0.01 * selectedSubject.totalClasses -
                          selectedSubject.attendedclasses) /
                          (1 - target * 0.01)
                      )}{" "}
                      classes to get back on track
                    </div>
                  )
                ) : (
                  <div  className="info">You cannot skip any class</div>
                )}
              </>
            ) : (
              <p>Click on the subject to get details</p>
            )}
          {selectedSubject &&  <Calendar key={refreshChild} subjectName={selectedSubject.subjectName}></Calendar>}
          </div>
        </div>

        <h1 className="heading-input">Mark attendance please</h1>
        <div className="Container-2">

        <div className="Subjects-Name">
          {currentDayTimetable.length > 0 ? (
            <>
              {currentDayTimetable.map((item) => (
                <div
                className="subject-details"
                onClick={() => handleSubjectClick(item)}
                key={item.subjectName}
                >
                  <div className="subject-logo">
                    <FontAwesomeIcon className="img" icon={faAtom} size="1x" />
                  </div>

                  <div className="name">{item.subjectName}</div>
                  <div className="attendance">
                    {item.attendedclasses}/ {item.totalClasses}
                  </div>
                  <div
                    className="progress-bar"
                    data-progress={`${
                      item.totalClasses
                      ? (
                        (item.attendedclasses / item.totalClasses) *
                        100
                        ).toFixed(1)
                        : "0"
                      }%`}
                      >
                    <progress
                      value={
                        item.totalClasses
                        ? (
                          (item.attendedclasses / item.totalClasses) *
                          100
                          ).toFixed(1)
                          : "0"
                        }
                        min="0"
                        max="100"
                        style={{
                          visibility: "hidden",
                          height: "0",
                          width: "0",
                        }}
                        ></progress>
                  </div>
                  <div>
                    <div className="attendance-updating">
                      <div
                        className={`attendance-update1 attendance-container1 ${
                          JSON.parse(localStorage.getItem(item.timetableId)) &&
                          JSON.parse(localStorage.getItem(item.timetableId))
                          .attendanceAlreadyMarked &&
                          !JSON.parse(localStorage.getItem(item.timetableId))
                          .isPresent
                          ? "disable"
                          : ""
                        }
                        ${
                          JSON.parse(
                            localStorage.getItem(
                              item.timetableId
                              )
                              ) &&
                              JSON.parse(
                                localStorage.getItem(
                                  item.timetableId
                                  )
                                  ).attendanceAlreadyMarked
                                  ? "noEvents"
                                  : ""
                                }
                                `}
                                onClick={() =>
                                  attendancestatusToday(item, true)
                                }
                                >
                        <FontAwesomeIcon
                          className="changeAttendance1"
                          icon={faCheck}
                          ></FontAwesomeIcon>
                      </div>
                      <div className={`reset attendance-container1 ${
                        JSON.parse(localStorage.getItem(item.timetableId)) &&
                        !JSON.parse(localStorage.getItem(item.timetableId))
                        .attendanceAlreadyMarked 
                        ? "disable"
                        : ""}`}>
                        <FontAwesomeIcon className="resetattendance " onClick={() =>
                          resetAttendance(item)
                        }  icon={faUndo}></FontAwesomeIcon></div>
                      <div
                        className={`attendance-update2 attendance-container1 ${
                          JSON.parse(localStorage.getItem(item.timetableId)) &&
                          JSON.parse(localStorage.getItem(item.timetableId))
                          .attendanceAlreadyMarked &&
                          JSON.parse(localStorage.getItem(item.timetableId))
                          .isPresent
                          ? "disable"
                          : ""
                        }
                        ${
                          JSON.parse(localStorage.getItem(item.timetableId)) &&
                          JSON.parse(localStorage.getItem(item.timetableId))
                          .attendanceAlreadyMarked
                          ? "noEvents"
                          : ""
                        }
                        
                        `}
                        >
                        <div
                          className="changeAttendance2"
                          onClick={() =>
                            attendancestatusToday(item, false)
                          }
                          >
                          <strong>X</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p  className="info-info">No classes today</p>
            )}
        </div>

            </div>
        <h1 className="heading-input">All subjects</h1>
        <div className="Container-3">

        <div className="Subjects-Name">
          {subjects.length > 0 ? (
            <>
              {subjects.map((item) => (
                <div
                className="subject-details"
                onClick={() => handleSubjectClick(item)}
                key={item.subjectName}
                >
                  <div className="subject-logo">
                    <FontAwesomeIcon className="img" icon={faAtom} size="1x" />
                  </div>

                  <div className="name">{item.subjectName}</div>
                  <div className="attendance">
                    {item.attendedclasses}/ {item.totalClasses}
                  </div>
                  <div
                    className="progress-bar"
                    data-progress={`${
                      item.totalClasses
                      ? (
                        (item.attendedclasses / item.totalClasses) *
                        100
                        ).toFixed(1)
                        : "0"
                      }%`}
                      >
                    <progress
                      value={
                        item.totalClasses
                        ? (
                          (item.attendedclasses / item.totalClasses) *
                          100
                          ).toFixed(1)
                          : "0"
                        }
                        min="0"
                        max="100"
                        style={{ visibility: "hidden", height: "0", width: "0" }}
                        ></progress>
                  </div>
                  <div>
                    <div className="attendance-updating">
                      <div
                        className="attendance-update1 attendance-container"
                        onClick={() =>
                          attendanceAllsubjects(item, true)
                        }
                        >
                        <FontAwesomeIcon
                          className="changeAttendance1"
                          icon={faCheck}
                          ></FontAwesomeIcon>
                      </div>
                      <div className={`reset attendance-container ${
                        JSON.parse(localStorage.getItem(item.timetableId)) &&
                          !JSON.parse(localStorage.getItem(item.timetableId))
                          .attendanceAlreadyMarked 
                          ? "disable"
                          : ""}`}>
                        <FontAwesomeIcon className="resetattendance" onClick={() =>
                          resetAttendance(item)
                        }  icon={faUndo}></FontAwesomeIcon></div>
                      <div/>
                      <div className="deleteSubject attendance-container">
                        <FontAwesomeIcon className="delete" onClick={() =>
                          deleteSubject(item.subjectName)
                        }  icon={faTrash}></FontAwesomeIcon></div>
                      <div/>
                      <div className="attendance-update2 attendance-container">
                        <div
                          className="changeAttendance2"
                          onClick={() =>
                            attendanceAllsubjects(item, false)
                          }
                        >
                          <strong>X</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="info-info">No subjects available</p>
          )}
        </div>
            </div>
      
    </>
  );
}
