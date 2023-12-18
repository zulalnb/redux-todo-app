import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

const TodoList = () => {
  const dispatch = useDispatch();
  const filteredItems = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(removeTodoAsync(id));
    }
  };

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  if (isLoading.get) {
    return <Loading />;
  }

  if (error.get) {
    return <Error message={error.get} />;
  }

  return (
    <ul className="todo-list">
      {filteredItems.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => handleToggle(item.id, !item.completed)}
              checked={item.completed}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
