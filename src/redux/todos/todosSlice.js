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
    const res = await axios.post(baseUrl + "/todos", data);
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async ({ id, data }) => {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, data);
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(`${baseUrl}/todos/${id}`);
    return id;
  }
);
export const removeCompletedTodosAsync = createAsyncThunk(
  "todos/removeCompletedTodosAsync",
  async () => {
    const res = await axios.delete(`${baseUrl}/todos/completed`);
    return res.data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: {
      get: false,
      add: false,
      toggle: false,
      remove: false,
      removeComp: false,
    },
    error: {
      get: null,
      add: null,
      toggle: null,
      remove: null,
      removeComp: null,
    },
    activeFilter: localStorage.getItem("activeFilter") || "all",
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
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
    builder.addCase(toggleTodoAsync.pending, (state) => {
      state.isLoading.toggle = true;
    });
    builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
      state.isLoading.toggle = false;
    });
    builder.addCase(toggleTodoAsync.rejected, (state, action) => {
      state.isLoading.toggle = false;
      state.error.toggle = action.error.message;
    });
    builder.addCase(removeTodoAsync.pending, (state) => {
      state.isLoading.toggle = true;
    });
    builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);

      state.items.splice(index, 1);
      state.isLoading.toggle = false;
    });
    builder.addCase(removeTodoAsync.rejected, (state, action) => {
      state.isLoading.toggle = false;
      state.error.toggle = action.error.message;
    });
    builder.addCase(removeCompletedTodosAsync.pending, (state) => {
      state.isLoading.removeComp = true;
    });
    builder.addCase(removeCompletedTodosAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading.removeComp = false;
    });
    builder.addCase(removeCompletedTodosAsync.rejected, (state, action) => {
      state.isLoading.removeComp = false;
      state.error.removeComp = action.error.message;
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

export const { changeActiveFilter } = todosSlice.actions;
export default todosSlice.reducer;
