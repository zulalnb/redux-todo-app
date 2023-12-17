import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  const handleSubmit = async (e) => {
    if (!title.trim()) return;

    e.preventDefault();

    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading.add}
      />
      {isLoading.add && <Loading />}
      {error.add && <Error message={error.add} />}
    </form>
  );
};

export default Form;
