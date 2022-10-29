import React from "react";
import { InputBox, Button, Titlefield } from './dependencies';

const Notes = ({ notes, updateNotes }) => {

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...notes];
    list[index][name] = value;
    updateNotes(list);
  }

  const deleteRow = index => {
    const list = [...notes];
    list.splice(index, 1);
    updateNotes(list);
  }

  const addRow = () => updateNotes([...notes, { note: '' }]);

  return (
    <>
      <Titlefield className={'text-center'} text={'Notes'} />
      {
        notes && notes.length > 0 && notes.map((item, index) => {
          return (
            <div className="row mb-1" key={index}>
              {
                notes.length - 1 === index
                  ? <Button
                    className={"form-group col-sm-1"}
                    name={"+"}
                    onClick={addRow}
                  />
                  : <div className="form-group col-sm-1"></div>
              }
              <InputBox
                type={"text"}
                name={"note"}
                className={"form-group col-sm-10"}
                placeholder={'Note'}
                value={item.note}
                onChange={e => handleInputChange(e, index)}
              />
              {
                notes.length !== 1 &&
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
export default Notes;
