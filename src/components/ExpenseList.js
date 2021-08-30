import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        //once the button is clicked all the items in the expense list will be removed.
        //variable logic made in the App.js file
        <button className="btn" onClick={clearItems}>
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
