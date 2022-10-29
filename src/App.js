import React, { useEffect, useState } from 'react';
import Home from './components/home';
import Tasks from './components/tasks';
import Capacity from './components/capacity';
import Preview from './components/print';
import Notes from './components/notes';
import { Titlefield, Textfield } from './components/dependencies';
import { constants, initialResult } from './constants';
import './App.css';

const App = () => {
  const [totalHrs, setTotalHrs] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [submitClick, setSubmitClick] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [tasks, setTasks] = useState([constants.initialTask]);
  const [notes, setNotes] = useState([constants.initialNote]);
  const [results, setResults] = useState(initialResult);
  const [capacities, setCapacities] = useState([constants.initialCapacity]);
  const [sprintDetails, setSprintDetails] = useState(constants.initialDetails);

  const handlePreview = () => {
    const tempArr = [...capacities].map((item) => {
      return {
        name: item.name,
        available_hours: item.days * 6,
        assigned_hours: [...tasks].filter(e => e.assignee === item.name).reduce((acc, e) => acc + e.hrs, 0)
      }
    }).concat([
      {
        name: 'Total',
        available_hours: [...capacities].reduce((acc, e) => acc + e.days * 6, 0),
        assigned_hours: [...tasks].reduce((acc, e) => acc + e.hrs, 0)
      }
    ])
    const tempObj = {
      tasks,
      capacities: tempArr,
      details: sprintDetails,
      notes
    }
    setResults(tempObj);
    setPreviewMode((e) => !e)
  };

  const handleNotes = () => setShowNotes((e) => !e);

  useEffect(() => {
    const assignees = [...capacities].map(e => e.name).filter(e => e !== "");
    setAssignees(assignees);
    const totalHrs = [...capacities].reduce((acc, item) => acc + item.days, 0) * 6;
    setTotalHrs(totalHrs);
    const assignedHrs = [...tasks].reduce((acc, item) => acc + item.hrs, 0);
    setRemainingHours(totalHrs - assignedHrs);
  }, [capacities, tasks]);

  return (
    <>
      {
        !submitClick && <div>
          <Home sprintDetails={sprintDetails} updateSprintDetails={setSprintDetails} setSubmitClick={setSubmitClick} />
        </div>
      }
      {
        submitClick && !previewMode && <>
          <div className="container-fluid row p-4 m-0 bg_color text-white text-center">
            <div className='col-sm-3 mt-3'>
              <Titlefield className={'text-center'} text={"Total hours : " + totalHrs} />
              <Titlefield className={'text-center'} text={"Available hours : " + remainingHours} />
            </div>
            <div className='col-sm-6'>
              <Titlefield className={'text-center'} text={sprintDetails.team_name} />
              <Titlefield className={'text-center'} text={sprintDetails.sprint_name} />
              <Textfield className={'text-center m-2'} text={'( ' + sprintDetails.start_date + ' - ' + sprintDetails.end_date + ' )'} />
            </div>
            <div className='col-sm-3 mt-4'>
              <button className="btn preview_btn mx-5" onClick={handlePreview}><b>Preview</b></button>
              <button className="btn preview_btn" onClick={handleNotes}><b>Add Notes</b></button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-1"></div>
            <div className="col-sm-5"><Tasks tasks={tasks} updateTasks={setTasks} assignees={assignees} /></div>
            <div className="col-sm-1"></div>
            <div className="col-sm-5"><Capacity capacity={capacities} updateCapacity={setCapacities} /></div>
          </div>
          {
            showNotes && <div className="row mt-5">
              <div className="col-sm-1"></div>
              <div className="col-sm-5"><Notes notes={notes} updateNotes={setNotes} /></div>
              <div className="col-sm-1"></div>
            </div>
          }
        </>
      }
      {
        submitClick && previewMode && <Preview data={results} handlePreview={handlePreview} />
      }
    </>
  );
}

export default App;
