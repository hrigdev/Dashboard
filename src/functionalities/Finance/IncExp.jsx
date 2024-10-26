import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';

function IncExp({ onFinalAmountUpdate }) {
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
  function calculateFinalAmount(entries) {
    let amount = 0;
    entries.forEach((entry) => {
      const entryAmount = entry?.amount ? Number(entry.amount) : 0;
      amount += entry?.status === 'income' ? entryAmount : -entryAmount;
    });
    return amount;
  }

  useEffect(() => {
    const amount = calculateFinalAmount(entries);
    onFinalAmountUpdate(amount);  // Pass updated amount to App
  }, [entries, onFinalAmountUpdate]);

  useEffect(()=>{
    let obj= [
      {id: 'ad46f490-7261-4d33-8352-db6fb97ec6d5', date: 'Fri Oct 25 2024 18:37:44 GMT+0530 (India Standard Time)', amount: '10000', status: 'income'},
      {id: '12112852-8837-47c1-976d-1b090f880d37', date: 'Fri Oct 25 2024 18:31:25 GMT+0530 (India Standard Time)', amount: '8000', status: 'expense'},
      {id: 'a4e1c1a1-7394-493c-81ef-03286de57fb0', date: 'Fri Oct 25 2024 18:31:27 GMT+0530 (India Standard Time)', amount: '92000', status: 'income'}, 
      {id: 'b451a484-1c9b-4ff0-a986-a645cd1dcaff', date: 'Fri Oct 25 2024 18:31:29 GMT+0530 (India Standard Time)', amount: '20000', status: 'expense'},
      {id: '0751a7ff-a51f-4480-8b25-46480912cd02', date: 'Fri Oct 25 2024 18:31:31 GMT+0530 (India Standard Time)', amount: '50000', status: 'income'},   
      {id: 'e7b5ecd3-e607-48fd-b916-1708d465625b', date: 'Fri Oct 25 2024 18:37:39 GMT+0530 (India Standard Time)', amount: '30000', status: 'expense'},
     ]
    setEntries(obj)
  },[])
  
  useEffect(() => {
    console.log(entries);
  }, [entries]);

  // function logger(event){
  //   console.log(event);
  // }

  return (
    <>
        <Chart entries={entries} />
      {/* <form onSubmit={submitEntry}>
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
        <Select options={options}   onChange={logger}    styles={customStyles}  isMulti />
        <button type="submit">Add/Subs</button>
      </form> */}

      {/* <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.date} - {entry.amount} ({entry.status})
            <button onClick={()=>deleteEntry(entry.id)}>delete</button>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default IncExp;