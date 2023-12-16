import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../redux/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => dispatch(toggle(item.id))}
              checked={item.completed}
            />
            <label>{item.title}</label>
            <button className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
