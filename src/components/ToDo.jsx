import React, { useEffect, useState } from 'react'
import { v4 as uuid } from "uuid";

const ToDo = () => {

    const [Tasks, setTasks] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("task") && localStorage.getItem("task") !== "undefined"){
            setTasks(JSON.parse(localStorage.getItem("task")))
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("task",JSON.stringify(Tasks))
    },[Tasks])


    const handleSubmit = async (event) => {
        event.preventDefault();
        await setTasks((prev) => [...prev, {id: uuid(), task : event.target[0].value, completed: false}]);
        event.target[0].value = "";
    }

    const handleCompleted = (id) => {
        let newTask = Tasks.map(task =>{if(task.id === id){ task.completed = !task.completed} return task})
        setTasks([...newTask]);
    }

    const handleDelete = (id) => {
        if(window.confirm( "Are you sure" )){
            let newTask = Tasks.filter(task => (task.id !== id));
            setTasks([...newTask]);
        }
    }   
    

  return (
    <div className='todo-container'>
        <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" placeholder="create Task" className='todo-input' required/>
            <button className='submit-button'>submit</button>
        </form>
        <hr />
        {Tasks && Tasks.map(task => {
            return(
                <div key={task.id} className={task.completed ? "cross tasks" : "not-cross tasks"}>
                    <p className= {task.completed ? "cross" : "not-cross"}>{task.task}</p>
                    <div>
                    <input type="checkbox" onClick={() => handleCompleted(task.id)} className="btn checkbox" />
                    <button onClick={() => handleDelete(task.id)} className="btn">Delete</button> 
                    </div>
                </div>
            );
        })}

    </div>
  )
}

export default ToDo