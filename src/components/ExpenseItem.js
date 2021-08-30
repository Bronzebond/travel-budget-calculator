import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

//expense item component that allows for items in expense list
//the props in the expenseItem component below allow for the items to be changed and deleted
const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  //each variable below represents part of the item
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount"> ${amount}</span>
      </div>
      <button
        className="edit-btn"
        aria-label="edit button"
        onClick={() => handleEdit(id)}
      >
        <MdEdit />
      </button>
      <button
        className="clear-btn"
        aria-label="clear button"
        onClick={() => handleDelete(id)}
      >
        <MdDelete />
      </button>
    </li>
  );
};

export default ExpenseItem;
