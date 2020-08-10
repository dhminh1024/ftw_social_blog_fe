import * as types from "../constants/blog.constants";

const initialState = {
  blogs: [],
  selectedBlog: {},
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BLOG_REQUEST:
    case types.GET_SINGLE_BLOG_REQUEST:
    case types.CREATE_BLOG_REQUEST:
    case types.UPDATE_BLOG_REQUEST:
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.BLOG_REQUEST_SUCCESS:
      return { ...state, blogs: payload, loading: false };

    case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
      return { ...state, selectedBlog: payload, loading: false };

    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
        redirectTo: "__GO_BACK__",
      };

    case types.BLOG_REQUEST_FAILURE:
    case types.GET_SINGLE_BLOG_REQUEST_FAILURE:
    case types.CREATE_BLOG_FAILURE:
    case types.UPDATE_BLOG_FAILURE:
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_BLOG_SUCCESS:
      return { ...state, loading: false, redirectTo: "/" };

    case types.DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: {}, redirectTo: "/" };

    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitReviewLoading: true };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitReviewLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };

    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitReviewLoading: false };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
};

export default blogReducer;
