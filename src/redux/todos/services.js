import { createAsyncThunk } from "@reduxjs/toolkit";
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
