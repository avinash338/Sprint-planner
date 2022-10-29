import React from "react";
import { InputBox, Button, Titlefield } from './dependencies';


const Capacity = ({ capacity, updateCapacity }) => {

  const handleInputChange = (e, index) => {
    const { name, value, type } = e.target;
    const list = [...capacity];
    list[index][name] = type === 'number' ? +value : value;
    updateCapacity(list);
  }

  const deleteRow = (index) => {
    const list = [...capacity];
    list.splice(index, 1);
    updateCapacity(list);
  }

  const addRow = () => updateCapacity([...capacity, { name: '', days: 0 }]);

  return (
    <>
      <Titlefield className={'text-center'} text={'Capacity'} />
      {
        capacity && capacity.length > 0 && capacity.map((item, index) => {
          return (
            <div className="row mt-1 mb-1" key={index}>
              <div className="form-group col-sm-2"></div>
              {
                capacity.length - 1 === index
                  ? <Button
                    className={"form-group col-sm-1"}
                    name={"+"}
                    onClick={addRow}
                  />
                  : <div className="form-group col-sm-1"></div>
              }
              <InputBox
                type={"text"}
                name={"name"}
                className={"form-group col-sm-3"}
                placeholder={"Name"}
                onChange={e => handleInputChange(e, index)}
                value={item.name}
              />
              <InputBox
                type={"number"}
                name={"days"}
                className={"form-group col-sm-2"}
                placeholder={"Days"}
                min={0}
                onChange={e => handleInputChange(e, index)}
                value={item.days !== 0 && item.days}
              />
              {
                capacity.length !== 1 &&
                <Button
                  className={"form-group col-sm-1"}
                  name={"-"}
                  onClick={() => deleteRow(index, item)}
                />
              }
              <div className="form-group col-sm-2"></div>
            </div>
          );
        })}
    </>
  );
}
export default Capacity;
