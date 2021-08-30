import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

//saving items in browser storage. Allows refreshing of page w/o data loss.
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

console.log(initialExpenses);
//import useState()
//function returns [] with two values
//the actual value of the state
//function for updates/control
//default value

function App() {
  // ****************************** state values **********************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  //alert
  const [alert, setAlert] = useState({ show: false });

  //edit items within expense list
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // ****************************** useEffect **********************

  //saving data in browser to allow refreshing w/o data loss
  useEffect(() => {
    console.log("we called useEffect");
    //changing expense array data to string. Allows us to refresh page w/ saved data
    localStorage.setItem("expenses", JSON.stringify(expenses));
  });

  // ****************************** functionality **********************

  //handle charge to change text in input bar if keys are pressed
  const handleCharge = (e) => {
    console.log(`charge :  ${e.target.value}`);
    setCharge(e.target.value);
  };

  //handle amount to change text in input bar if keys are pressed
  const handleAmount = (e) => {
    console.log(`amount $ : ${e.target.value}`);
    setAmount(e.target.value);
  };
  // handle alert messages for various types. Alerts will show for 3 seconds and disappear

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //clear all items with the Clear Expenses button
  const clearItems = () => {
    console.log(`items deleted from expense list`);
    //expense list is set to an empty array
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  //the delete button logic to remove items from expense list
  const handleDelete = (id) => {
    console.log(`item deleted : ${id}`);
    //if the items do not match the deleted items id, filter it out / keep them in the array.
    let tempExpenses = expenses.filter((item) => item.id !== id);
    console.log(tempExpenses);

    //shows the change in expense list state
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  //edit button available per item. Allows item info to be changed and saved.
  const handleEdit = (id) => {
    //if the item id matches this item, this will be the item edited in the expense array
    let expense = expenses.find((item) => item.id === id);
    //destructuring the charge & amount var to display in respective input fields
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log(expense);
  };

  //handle submit of form bar text
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      //if the input bars are empty
      if (edit) {
        //if the input bars have data to be edited
        let tempExpenses = expenses.map((item) => {
          //find the particular item
          //if the item's id matches, override the item state. Otherwise keep it the same
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses); //then change the expenses state to tempExpenses
        setEdit(false); //change submit button state back to original form.
        handleAlert({ type: "success", text: "item edited" });
      } else {
        //otherwise ...
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge(""); //resets the charge type input bar after item added
      setAmount(""); // resets the expense amount input bar after item is added
    } else {
      //handle alert called for empty fields
      handleAlert({
        type: "danger",
        text: `fill expense and amount field`,
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Travel Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
