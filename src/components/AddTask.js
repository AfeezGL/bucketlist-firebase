import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import db, { auth, timestamp } from "../firebase";

const AddTask = () => {
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const user = auth.currentUser;

  //update the text state when input changes
  const updateText = (e) => {
    setText(e.target.value);
  };

  //function for creating new task
  const submitForm = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user.uid)
      .collection("targets")
      .add({
        task: text,
        completed: false,
        timestamp: timestamp(),
      })
      .then(() => {
        setText("");
        setShowAlert(!showAlert);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      });
  };

  return (
    <>
      <header>
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Add New</h2>
      </header>
      <form onSubmit={submitForm}>
        <label htmlFor="text">Task</label>
        <input
          type="text"
          name="text"
          id="text"
          required
          value={text}
          onChange={updateText}
        />
        <input type="submit" value="add" className="btn-submit" />
        {showAlert && <p>Task Added</p>}
      </form>
    </>
  );
};

export default AddTask;
