import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([{id: 1, task: "my first task", status: 0 }]);
  const [filter, setFilter] = useState("all"); // State to manage the filter selection

  function handleSubmit(event) {
    event.preventDefault();
    let task = event.target.elements.task.value;
    if (!task) {
      alert("Please provide a valid task");
      return;
    }
    setTodos([...todos, {id:todos.length+1, task: task, status: 0 }]);
    event.target.reset();
  }

  function changeTaskStatus(index) {
    let newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function deleteTask(id) {
    setTodos((prevTodos => {
      const restITems =  prevTodos.filter(todo => todo.id !== id);
      console.log('restITems', restITems);
      return restITems
    }));
  }

  function handleFilterChange(id, status) {
    setTodos((prevState) => {
      return prevState.map(task => {
         if(id === task?.id){
          task.status = parseInt(status)
          return task
         }
         return task;
      })
    })

  }
  // Filtered todos based on the selected filter
  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  const statuses = [
    { value: 0, label: "pending" },
    { value: 1, label: "in progress" },
    { value: 2, label: "completed" },
  ];

  console.log('todo', todos)
  return (
    <div className="Container my-5">
      <div
        className="mx-auto rounded border p-4"
        style={{ width: "600px", backgroundColor: "#034A92" }}
      >
        <h2 className="text-center text-white mb-5">My Todo List</h2>

        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            placeholder="New task"
            name="task"
          />
          <button className="btn btn-outline-light" type="submit">
            Add
          </button>
        </form>

        {/* Displaying filtered todos */}
        {filteredTodos?.map((todo, index) => (
          <div
            key={index}
            className="rounded mt-4 p-2 d-flex"
            // style={{
            //   backgroundColor: todo.completed ? "#87FC68" : "lightgray",
            // }}
          >
            <div className="me-auto">{todo?.task}</div>
            <div>
              {/* Select panel for filtering */}
              <select
                className="form-select mt-4"
                onChange={(e) => handleFilterChange(todo?.id, e.target.value)}
              >
                {statuses.map((status, index) => {
                  return (
                    <option value={status.value} key={index} selected={todo.status == status.value}>
                      {status.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <i
                className="bi bi-trash3 text-danger h5"
                style={{ cursor: "pointer" }}
                onClick={() => deleteTask(todo.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
