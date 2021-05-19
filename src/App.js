import "./App.css";
import Swal from "sweetalert2";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("✏️ Add item... ");
  const [multiple, setMultiple] = useState(false);
  const [edit, setEdit] = useState({
    id: "",
    status: false,
  });
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (todo !== "" && todo !== "✏️ Add item...") {
      setTodos([...todos, { id: Date.now(), text: todo, selected: false }]);
      setTodo("");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please provide an input",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEdit = () => {
    let id = edit.id;
    let newTodos = todos.filter((todo2) => {
      if (todo2.id === id) {
        todo2.text = todo;
      }
      return todo2;
    });

    setTodos(newTodos);
    setEdit({ id: "", status: false });
    setTodo("");
  };

  const handleMultiple = () => {
    let newArr = todos.filter((val) => {
      if (!val.selected) {
        return val;
      }
    });
    console.log(newArr);
    setTodos(newArr);
    setMultiple(false);
  };

  const handleDate = (todo) => {
    var d = new Date(todo.id);

    // Swal.fire(d.toString());
    Swal.fire({
      title: "<i>Todo Info</i>",
      html: " Todo Name:" + todo.text + "<br> Date added: " + d.toString(),
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        {/* <h2>Whoop, it's Wednesday 🌝 ☕ </h2> */}
      </div>
      <div className="input">
        <input
          onChange={handleChange}
          type="text"
          value={todo}
          placeholder="✏️ Add item... "
        />

        {edit.status ? (
          <i onClick={handleEdit} class="far fa-save"></i>
        ) : (
          <i onClick={handleSubmit} className="fas fa-plus-circle"></i>
        )}
      </div>
      <div className="todos">
        {todos.map((todo, key) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  value={todo.selected}
                  onClick={(e) => {
                    let newTodos = todos.filter((todo2) => {
                      if (todo2.id === todo.id) {
                        todo2.selected = e.target.checked;
                      }
                      return todo2;
                    });

                    setTodos(newTodos);
                    console.log(newTodos);

                    let multiple = todos.filter((item) => {
                      if (item.selected) return item;
                    });

                    if (multiple.length > 1) {
                      setMultiple(true);
                    } else {
                      setMultiple(false);
                    }
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{todo.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => handleDate(todo)}
                  class="fas fa-calendar-week"
                ></i>{" "}
                <i
                  onClick={() => {
                    setTodo(todo.text);
                    setEdit({ id: todo.id, status: true });
                  }}
                  class="far fa-edit"
                ></i>{" "}
                <i
                  onClick={(e) => {
                    let newTodos = todos.filter((todo2) => {
                      if (todo2 !== todo) {
                        return todo2;
                      } else {
                        return null;
                      }
                    });

                    setTodos(newTodos);
                  }}
                  className="far fa-trash-alt"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {multiple ? (
        <i onClick={handleMultiple} className="far fa-trash-alt">
          Delete Selected
        </i>
      ) : null}
    </div>
  );
}

export default App;
