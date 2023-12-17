import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_API_BASE_ENDPOINT || "http://localhost:7000";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios.get(baseUrl + "/todos");
    return res.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (data) => {
    const res = await axios.post(baseUrl + "/toos", data);
    return res.data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: { get: false, add: false },
    error: { get: null, add: null },
    activeFilter: "all",
  },
  reducers: {
    toggle: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);

      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state) => {
      state.isLoading.get = true;
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading.get = false;
    });
    builder.addCase(getTodosAsync.rejected, (state, action) => {
      state.error.get = action.error.message;
      state.isLoading.get = false;
    });
    builder.addCase(addTodoAsync.pending, (state) => {
      state.isLoading.add = true;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isLoading.add = false;
    });
    builder.addCase(addTodoAsync.rejected, (state, action) => {
      state.isLoading.add = false;
      state.error.add = action.error.message;
    });
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  const { activeFilter, items } = state.todos;
  if (activeFilter === "all") {
    return items;
  }
  return items.filter((todo) =>
    activeFilter === "active" ? !todo.completed : todo.completed
  );
};

export const { toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
