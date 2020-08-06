import * as types from "../constants/blog.constants";
import api from "../api";
import history from "../../utils/history";
import { alertActions } from "./alert.actions";
import axios from "axios";

const blogsRequest = () => async (dispatch) => {
  dispatch({ type: types.BLOG_REQUEST, payload: null });
  try {
    const res = await api.get("/blogs");
    dispatch({ type: types.BLOG_REQUEST_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
  }
};

const getSingleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.GET_SINGLE_BLOG_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_REQUEST_FAILURE, payload: error });
  }
};

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/blogs/${blogId}/reviews`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const createNewBlog = (title, content) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    console.log(title, content);
    const formData = new FormData();
    formData.append("title", "My first blog");
    formData.append("content", "This is my blog");
    // const res = await api.post(`/blogs`, { title, content });
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    const res = await fetch("https://social-api-cs.great.dev/blogs", {
      method: "POST",
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjJhNWMwZDJiMTg0MjQ5MjU0Y2M1NDYiLCJpYXQiOjE1OTY2MzY2MjEsImV4cCI6MTU5NjcyMzAyMX0.pu868lTc8NROcI4q8LE_BLhQ3XSehMFfKBjGyghNjp8`,
      },
      body: formData,
    });
    const dt = await res.json();
    console.log(dt);

    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("New blog has been created!", "success"));
    history.goBack();
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    // console.log(title, content);
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/blogs/${blogId}`, { title, content });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The blog has been updated!", "success"));
    history.goBack();
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`/blogs/${blogId}`);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
    history.push("/");
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

export const blogActions = {
  blogsRequest,
  getSingleBlog,
  createReview,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
