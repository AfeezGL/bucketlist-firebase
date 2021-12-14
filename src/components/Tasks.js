import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db, { auth } from "../firebase";

const Tasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const user = auth.currentUser;

  const logout = () => {
    auth.signOut();
  };

  //function to set a task as completed
  const completeTask = (e) => {
    try {
      db.collection("users")
        .doc(user.uid)
        .collection("targets")
        .doc(e.id)
        .update({ completed: true });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    try {
      db.collection("users")
        .doc(user.uid)
        .collection("targets")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          if (mounted) {
            setAllTasks(docs);
          }
        });
    } catch (error) {
      alert(error.message);
    }

    return () => {
      mounted = false;
    };
  }, [user.uid]);

  return (
    <>
      <header className="main-header">
        <h2>Targets</h2>
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </header>
      <main>
        <section className="tasks">
          {/* uncompleted tasks */}
          {allTasks.map(
            (task) =>
              !task.data.completed && (
                <Task task={task} key={task.id} clickFunction={completeTask} />
              )
          )}
        </section>
        <section className="completed">
          {/* completed tasks */}
          {allTasks.map(
            (task) =>
              task.data.completed && <p key={task.id}>{task.data.task}</p>
          )}
        </section>
        {allTasks < 1 && "No Tasks"}
      </main>
      <footer>
        <Link to="/add">
          <div>
            <h4>
              <i class="fas fa-plus"></i> Add new
            </h4>
          </div>
        </Link>
      </footer>
    </>
  );
};

export default Tasks;
