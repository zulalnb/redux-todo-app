import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
} from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectTodos);
  const activeItems = items.filter((item) => !item.completed);
  const completedItems = items.filter((item) => item.completed);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const itemsCount =
    activeFilter === "all"
      ? items.length
      : activeFilter === "active"
      ? activeItems.length
      : completedItems.length;

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsCount}</strong> item{itemsCount > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => {
              if (activeFilter !== "all") dispatch(changeActiveFilter("all"));
            }}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => {
              if (activeFilter !== "active")
                dispatch(changeActiveFilter("active"));
            }}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => {
              if (activeFilter !== "completed")
                dispatch(changeActiveFilter("completed"));
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => {
          if (completedItems.length) dispatch(clearCompleted());
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
