import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';

function IncExp() {
  const [value, setValue] = useState({
    id: null,
    date: null,
    amount: '',
    status: 'income', 
  });
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  const [entries, setEntries] = useState([]);
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '400px', // Set your desired width here
    }),
    control: (provided) => ({
      ...provided,
      width: '100%', // Control width
    }),
    menu: (provided) => ({
      ...provided,
      width: '400px', // Menu width
    })
  };

  function handleChange(event) {
    const { type, value: inputValue, checked, name } = event.target;
    const currentDate = new Date();
    const dateString = currentDate.toString();

    setValue((prevValue) => ({
      ...prevValue,
      id: uuidv4(),
      date: dateString,
      amount: type === "number" ? inputValue : prevValue.amount,
      status: type === "radio" && checked ? inputValue : prevValue.status,
    }));
  }

  function submitEntry(event) {
    event.preventDefault();
    console.log(event.target);
    if(value.amount==='') 
      {console.log("null value not accepted");
      return;}
    setEntries((prevEntries) => [...prevEntries, value]);

    setValue({
      id: null,
      date: null,
      amount: '',
      status: 'income',
    });
  }

  function deleteEntry(id){
    setEntries((prevValue)=>prevValue.filter((entry)=>entry.id!=id))
  }

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  // function logger(event){
  //   console.log(event);
  // }

  return (
    <>
        <Chart entries={entries} />
      <form onSubmit={submitEntry}>
        <input
          onChange={handleChange}
          value={value.amount}
          type="number"
          placeholder="Amount"
        />
        <input
          onChange={handleChange}
          type="radio"
          id="contactChoice1"
          name="status"
          value="income"
          checked={value.status === "income"}
        />
        <label htmlFor="contactChoice1">Income</label>

        <input
          onChange={handleChange}
          type="radio"
          id="contactChoice2"
          name="status"
          value="expense"
          checked={value.status === "expense"}
        />
        <label htmlFor="contactChoice2">Expense</label>
        {/* <Select options={options}   onChange={logger}    styles={customStyles}  isMulti /> */}
        <button type="submit">Add/Subs</button>
      </form>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.date} - {entry.amount} ({entry.status})
            <button onClick={()=>deleteEntry(entry.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default IncExp;
