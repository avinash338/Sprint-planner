import React from "react";
import { InputBox, Button, Titlefield, SelectBox } from './dependencies';

const Tasks = ({ tasks, assignees, updateTasks }) => {

  const handleInputChange = (e, index) => {
    const { name, value, type } = e.target;
    const list = [...tasks];
    list[index][name] = type === 'number' ? +value : value;
    updateTasks(list);
  }

  const deleteRow = index => {
    const list = [...tasks];
    list.splice(index, 1);
    updateTasks(list);
  }

  const addRow = () => updateTasks([...tasks, { task: '', assignee: '', hrs: 0 }]);

  return (
    <>
      <Titlefield className={'text-center'} text={'Tasks'} />
      {
        tasks && tasks.length > 0 && tasks.map((item, index) => {
          return (
            <div className="row mt-1 mb-1" key={index}>
              {
                tasks.length - 1 === index
                  ? <Button
                    className={"form-group col-sm-1"}
                    name={"+"}
                    onClick={addRow}
                  />
                  : <div className="form-group col-sm-1"></div>
              }
              <InputBox
                type={"text"}
                name={"task"}
                className={"form-group col-sm-5"}
                placeholder={"Task"}
                value={item.task}
                onChange={e => handleInputChange(e, index)}
              />
              <SelectBox
                className={"form-group col-sm-3"}
                placeholder={'Assignee'}
                name={'assignee'}
                options={assignees}
                value={item.assignee}
                onChange={e => handleInputChange(e, index)}
              />
              <InputBox
                type={"number"}
                name={"hrs"}
                className={"form-group col-sm-2"}
                placeholder={"Hours"}
                min={0}
                value={item.hrs !== 0 && item.hrs}
                onChange={e => handleInputChange(e, index)}
              />
              {
                tasks.length !== 1 &&
                <Button
                  className={"form-group col-sm-1"}
                  name={"-"}
                  onClick={() => deleteRow(index)}
                />
              }
            </div>
          );
        })}
    </>
  );
}
export default Tasks;
