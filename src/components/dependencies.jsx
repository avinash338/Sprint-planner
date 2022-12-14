import React from 'react';

export const InputBox = (props) => (
  <div className={props.className}>
    <input
      className="form-control"
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
      min={props.min}
    />
  </div>
);

export const Button = (props) => (
  <div className={props.className}>
    <button
      className="btn bg_color"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  </div>
);

export const TableComponent = (props) => (
  <table className="table table-bordered table-sm text-center">
    <thead>
      <tr className='bg_color'>
        {
          (props.title) &&
          <th colSpan={Object.keys(props?.data[0]).length}>
            <Titlefield text={props.title} />
          </th>
        }
      </tr>
      <tr>
        {
          props?.data?.length > 0 &&
          Object.keys(props?.data[0]).map((item) => {
            if (item === 'class') return null
            return <th key={item}>{item.toUpperCase()}</th>
          })
        }
      </tr>
    </thead>
    <tbody>
      {
        props?.data?.length > 0 &&
        props?.data?.map((item, index) => {
          return <tr key={index}>
            {
              (item) && Object.keys(item).map((e, i) => {
                if (e === 'class') return null
                return <td
                  key={i}
                  style={{
                    backgroundColor: e === 'assigned_hours'
                      ? item.assigned_hours <= item.available_hours
                        ? '#ccffcc'
                        : '#ffe6e6'
                      : ''
                  }}
                >
                  {item[e]}
                </td>
              })
            }
          </tr>
        })
      }
    </tbody>
  </table>
)

export const ListComponent = (props) => (
  <>
    {
      (props?.data && props?.data.length > 0) &&
      <ul>
        {
          props.data.map((item, index) => {
            if (item.note === '') return null
            return <li key={index}> {item.note}</li>
          })
        }
      </ul>
    }
  </>
)

export const SelectBox = (props) => (
  <div className={props.className}>
    <select
      name={props.name}
      onChange={props.onChange}
      className={"form-control"}
      placeholder={props.placeholder}
      value={props.value}
    >
      <option value=''>{props.placeholder}</option>
      {
        (props.options.length > 0) &&
        props.options.map((item, index) => <option key={index} value={item}>{item}</option>)
      }
    </select>
  </div>
);

export const Titlefield = (props) => <h4 className={props?.className || "text-center"} >{props.text}</h4>;

export const Textfield = (props) => <p className={props?.className}>{props.text}</p>;
