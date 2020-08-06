# Social Blog app

## Introduction

This week we'll learn to create a social blog application using React, Redux, Redux Thunk, and React Router. The idea is an application that helps user to share their experiences after a trip in a blog post. The other users can leave reviews/comments and give "reaction" (laugh, like, sad, love, angry) to the blog post.

You will be provided a backend API server with Node.js, Express, and MongoDB, which you will learn soon. So let's focus on the front-end side for now. This application is a perfect example of how your final project should look like.

**IMPORTANT**
* [Demo App](https://ftw-w6-demo.netlify.app/)
* [API Documentation](https://documenter.getpostman.com/view/7621298/T1Dv8F6p?version=latest#a071427d-c177-49b5-b7be-50c3456b9aac)

## Implementation

### Project setup

- Create project with `create-react-app`

  ```javascript
  npx create-react-app social-app
  cd social-app
  npm i redux react-redux redux-thunk redux-devtools-extension
  npm i react-router-dom
  npm i bootstrap react-bootstrap
  npm i react-markdown react-spinners moment react-moment
  npm i axios uuid
  ```

  - Delete `/src/logo.svg`. Goto `/src/App.js` remove `import logo from './logo.svg';`
  - Delete `/src/index.css`. Go to `/src/index.js`, remove `import './index.css'`
  - In `/src/App.css`, remove everything
  - Replace the icon and the title of the app:
    - Copy your icon file to `/public/` e.g. `icon.png`, delete `favicon.ico`.
    - Go to `/puclic/index.html` replace `<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />` with `<link rel="icon" href="%PUBLIC_URL%/icon.png" />`
    - In `/puclic/index.html`, change `<title>React App</title>` to `<title>Social Blog</title>`
  - In `App.js`, add `import "bootstrap/dist/css/bootstrap.min.css";` 

### Project Structure

```
|- src\
    |- components\
        |- BlogCard.js
        |- ReviewBlog.js
        |- ReviewList.js
    |- containers\
        |- HomePage\
        |- LoginPage\
        |- DashboardPage\
        |- Routes\
            |- PrivateRoute.js
            |- index.js
    |- images\
    |- redux\
        |- actions\
        |- constants\
        |- reducers\
        |- api.js
        |- configureStore.js
    |- utils\
```

- `src/components/`: folder for simple stateless components
- `src/containers/`: folder for stateful components
- `src/redux/actions`: each file in this folder is related to a set of actions, e.g. `auth.actions.js`
- `src/redux/reducers`: set of reducers that are combined in `index.js`
- `src/redux/constants`: set of types of actions
- `src/redux/store.js`: configuration of the store

### Step 1 - Setup routes and protected routes

- Create `src/containers/Routes/PrivateRoute.js`:
  ```javascript
  const PrivateRoute = ({ isAuthenticated, ...rest }) => {
    if (isAuthenticated) return <Route {...rest} />;
    delete rest.component;
    return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
  };

  export default PrivateRoute;
  ```
- Create `HomePage`, `LoginPage`, `RegisterPage`, and `DashboardPage`: Create according folder in `src/containers`. In each folder, create `index.js`, then use `rface` to create the component. Add a `h1` title in each component.
- Create `src/containers/Routes/index.js`:
  ```javascript
  const Routes = (props) => {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      </Switch>
    );
  };
  export default Routes;
  ```
  Put `isAuthenticated={true}` in `PrivateRoute` to test the `DashboardPage`. 
- Test the routes: in `App.js`:
  ```javascript
  return(
    <Router>
      <Routes />
    </Router>
  )
  ```

### Step 2 - Building the UI first

#### The Login Page

- Setup states and handle event functions for the login form:
  ```javascript
  const LoginPage = ({ isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Handle submit form
    };
    if (isAuthenticated) return <Redirect to="/" />;
  ```

- Implement UI: `<Container>...</Container>`

#### The Register Page

- States and handle event functions:
  ```javascript
  const RegisterPage = ({ isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
      e.preventDefault();
      const { password, password2 } = formData;
      if (password !== password2) {
        setErrors({ ...errors, password2: "Passwords do not match" });
        return;
      }
      // TODO: handle Register
    };
    if (isAuthenticated) return <Redirect to="/" />;
  ```
  - Implement UI: `<Container>...</Container>`
  - (Optional) For convinience, you can add a button that fills in fake data:
  ```javascript
  const fillFakeData = () => {
    setFormData({
      name: "Minh",
      email: "minhdh@cs.vn",
      password: "123",
      password2: "123",
    });
  };
  ...
  <Button
    className="btn-block"
    type="button"
    variant="light"
    onClick={fillFakeData}
  >
    Fake data
  </Button>
  ```

#### The Navbar

- Create `src/containers/PublicNavbar/index.js`:
  ```javascript
  const PublicNavbar = ({ isAuthenticated, loading }) => {
    const handleLogout = () => {
      // TODO: handle Logout
    };
    const authLinks = (
      <Nav>
        <Nav.Link as={Link} to="/dashboard">
          <i className="fas fa-chart-line" /> Dashboard
        </Nav.Link>
        <Nav.Link onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" /> Logout
        </Nav.Link>
      </Nav>
    );
    const publicLinks = (
      <Nav>
        <Nav.Link as={Link} to="/register">
          <i className="fas fa-registered" /> Register
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          <i className="fas fa-sign-in-alt" /> Login
        </Nav.Link>
      </Nav>
    );

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img src={logo} alt="CoderSchool" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  export default PublicNavbar;
  ```
- In `HomePage/index.js`:
  ```javascript
  return (
    <>
      <PublicNavbar />
      <Container>
        <h1>Home Page</h1>
      </Container>
    </>
  );
  ```
- Test the navbar
- Problem: Adding `PublicNavar` to every page is tedius especially when we have to pass `props` to the navbar. How can we define a general layout for those pages where we can use one navbar for all the pages?

#### The layout wrapper

- Create `src/layouts/PublicLayout.js`, cut the public routes from `src/Routes/index.js` and paste them here:
  ```javascript
  const PublicLayout = () => {
    return (
      <>
        <PublicNavbar />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </Container>
      </>
    );
  };

  export default PublicLayout;
  ```
- Put `PublicLayout` in `Routes/index.js`:
  ```javascript
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardPage}/>
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
  ```

#### The NotFoundPage

- Create `src/layouts/NotFoundPage.js`
  ```javascript
  const NotFoundPage = () => {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>404</h1>
            <p>The page you are looking for does not exist.</p>
          </Col>
        </Row>
      </Container>
    );
  };
  export default NotFoundPage;
  ```
- Add it in `PublicLayout`:
  ```javascript
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route component={NotFoundPage} />
  </Switch>
  ```

### The Homepage

- Create a mockup stateless complonent `BlogCard`:
  ```javascript
  const BlogCard = () => {
    return (
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/160x100" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    );
  };

  export default BlogCard;
  ```
- In `HomePage/index.js`:
  ```javascript
  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
      </Jumbotron>
      <CardDeck>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </CardDeck>
    </Container>
  );
  ```

### Step 3 - Redux Configuration

Time to add the logic. Let's connect to the server and get the list of blogs.

#### Redux

- **Redux Store configuaration:**
  - Create `src/redux/store.js`:
  ```javascript
  import { createStore, applyMiddleware } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import rootReducer from "./reducers";

  const initialState = {};
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  export default store;
  ```

  - In `src/index.js`:
  ```javascript
  import store from "./redux/store";
  ...
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  ```

- **Setup constants, actions and reducers for getting blogs from API:**
  - Create `src/redux/reducers/index.js`:
  ```javascript
  import { combineReducers } from "redux";
  import blogReducer from "./blog.reducer";

  export default combineReducers({
    blog: blogReducer,
  });
  ```

  - Create `src/redux/constants/blog.constants.js`:
  ```javascript
  export const BLOG_REQUEST = "BLOG.BLOG_REQUEST";
  export const BLOG_REQUEST_SUCCESS = "BLOG.BLOG_REQUEST_SUCCESS";
  export const BLOG_REQUEST_FAILURE = "BLOG.BLOG_REQUEST_FAILURE";
  ```

  - Create `src/redux/actions/blog.actions.js`:
  ```javascript
  import * as types from "../constants/blog.constants";
  import api from "../api";

  const blogsRequest = () => async (dispatch) => {
    dispatch({ type: types.BLOG_REQUEST, payload: null });
    try {
      const res = await api.get("/blogs");
      dispatch({ type: types.BLOG_REQUEST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
    }
  };

  export const blogActions = {
    blogsRequest,
  };
  ```

  - Create `src/redux/reducers/blog.reducer.js`:
  ```javascript
  import * as types from "../constants/blog.constants";

  const initialState = {
    blogs: [],
    loading: false,
  };

  const blogReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case types.BLOG_REQUEST:
        return { ...state, loading: true };
      case types.BLOG_REQUEST_SUCCESS:
        return { ...state, blogs: payload, loading: false };
      case types.BLOG_REQUEST_FAILURE:
        console.log(payload);
        return { ...state, loading: false };
      default:
        return state;
    }
  };

  export default blogReducer;
  ```

- **API service:** Create `src/redux/api.js`
  ```javascript
  import axios from "axios";
  import store from "./store";

  const api = axios.create({
    baseURL: "https://social-api-cs.great.dev/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  /**
   * console.log all requests and responses
   */
  api.interceptors.request.use(
    (request) => {
      console.log("Starting Request", request);
      return request;
    },
    function (error) {
      console.log("REQUEST ERROR", error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    function (error) {
      error = error.response.data;
      console.log("RESPONSE ERROR", error);
      return Promise.reject(error);
    }
  );

  export default api;
  ```

- Add fetching data in `HomePage/index.js`:
  ```javascript
  import { useSelector, useDispatch } from "react-redux";
  import { blogActions } from "../../redux/actions";
  ...
  const HomePage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.blog.loading);
    const blogs = useSelector((state) => state.blog.blogs);

    useEffect(() => {
      dispatch(blogActions.blogsRequest());
    }, [dispatch]);
    ...
    {loading ? (
      <ClipLoader color="#f86c6b" size={150} loading={loading} />
    ) : (
      <>
        {blogs.length ? (
          <CardDeck>
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </CardDeck>
        ) : (
          <p>There are no blogs.</p>
        )}
      </>
    )}
  ```

- Destructure the prop `blog` in `BlogCard` and fill the data in.

### Step 4 - Authentication

#### Create actions & reducers

- Setup `src/redux/constants/auth.constant.js`:
  ```javascript
  export const REGISTER_REQUEST = "AUTH.REGISTER_REQUEST";
  export const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
  export const REGISTER_FAILURE = "AUTH.REGISTER_FAILURE";

  export const LOGIN_REQUEST = "AUTH.LOGIN_REQUEST";
  export const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
  export const LOGIN_FAILURE = "AUTH.LOGIN_FAILURE";
  ```

- Setup `src/redux/actions/auth.actions.js`:
  ```javascript
  import * as types from "../constants/auth.constants";
  import api from "../api";

  const loginRequest = (email, password) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAILURE, payload: error });
    }
  };

  const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    try {
      const res = await api.post("/users", { name, email, password });
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.REGISTER_FAILURE, payload: error });
    }
  };

  export const authActions = {
    loginRequest,
    register,
  };

  ```

- Setup `src/redux/reducers/auth.reducer.js`:
  ```javascript
  import * as types from "../constants/auth.constants";
  const initialState = {
    user: {},
    isAuthenticated: false,
    loading: false,
  };

  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.LOGIN_REQUEST:
      case types.REGISTER_REQUEST:
        return { ...state, loading: true };
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          user: payload,
          loading: false,
          isAuthenticated: true,
        };
      case types.LOGIN_FAILURE:
      case types.REGISTER_FAILURE:
        return { ...state, loading: false };
      case types.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };

  export default authReducer;
  ```

- In `src/redux/actions/index.js`, add `export * from "./auth.actions";`
- In `src/redux/reducers/index.js`, add `authReducer`

#### Integrate with UI components

- In `RegisterPage/index.js`:
  - Remove the props
  - Import:
  ```javascript
  import { useSelector, useDispatch } from "react-redux";
  import { authActions } from "../../redux/actions";
  ```
  - Connect with the store and dispatch action in `handleSubmit()`:
  ```javascript
  const RegisterPage = () => {
    ...
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    ...
    const handleSubmit = (e) => {
      e.preventDefault();
      const { name, email, password, password2 } = formData;
      if (password !== password2) {
        setErrors({ ...errors, password2: "Passwords do not match" });
        return;
      }
      dispatch(authActions.register(name, email, password));
    };
  }
  ```

- In `LoginPage/index.js`:
  - Remove the props
  - Import:
  ```javascript
  import { useSelector, useDispatch } from "react-redux";
  import { authActions } from "../../redux/actions";
  ```
  - Connect with the store and dispatch action in `handleSubmit()`:
  ```javascript
  const LoginPage = () => {
    ...
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    ...
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate data if needed
      const { email, password } = formData;
      dispatch(authActions.loginRequest(email, password));
    };
  }
  ```

### Step 5 - Error Handling and Showing Messages

#### Create a global store `alert`

This global store contains a list of messages. Each message has an id, content and type (e.g. Error, Success). The id is generate by the library `uuid` to be unique. Each message will be showed for 5 seconds before being removed.

- Create `constants/alert.constants.js`:
  ```javascript
  export const SET_ALERT = "ALERT.SET_ALERT";
  export const REMOVE_ALERT = "ALERT.REMOVE_ALERT";
  ```
- Create `actions/alert.actions.js`:
  ```javascript
  import { v4 as uuidv4 } from "uuid";
  import * as types from "../constants/alert.constants";

  const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: types.SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () => dispatch({ type: types.REMOVE_ALERT, payload: id }),
      timeout
    );
  };

  export const alertActions = {
    setAlert,
  };
  ```
- In `actions/index.js`, insert `export * from "./alert.actions";`
- Create `reducers/alert.reducer.js`:
  ```javascript
  import * as types from "../constants/alert.constants";
  const initialState = [];

  const alertReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.SET_ALERT:
        return [...state, payload];
      case types.REMOVE_ALERT:
        return state.filter((alert) => alert.id !== payload);
      default:
        return state;
    }
  };

  export default alertReducer;
  ```
- In `reducers/index.js`, insert `alertReducer`

#### Creating the Alert component:

- Create `layouts/Alert.js`:
  ```javascript
  import React from "react";
  import { useSelector } from "react-redux";
  import { Alert } from "react-bootstrap";

  const AlertMsg = () => {
    const alerts = useSelector((state) => state.alert);
    return (
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.alertType}>
          {alert.msg}
        </Alert>
      ))
    );
  };

  export default AlertMsg;
  ```
- In `layouts/PublicLayout.js`, add `AlertMsg`:
  ```javascript
  <PublicNavbar />
    <Container>
      <AlertMsg/>
      ...
  ```

#### Dispatch setAlert

Here we will dispatch the error message in `api.js` to capture all of the errors responsed by the server:

- In `src/redux/api.js`:
  - Import:
  ```javascript
  import store from "./store";
  import { alertActions } from "./actions";
  ```
  - In the callback function to handle error, add:
  ```javascript
    console.log("RESPONSE ERROR", error);
    store.dispatch(alertActions.setAlert(error.message, "danger"));
    return Promise.reject(error);
  ```

Another example is dispatch a welcome message when user logged in:

- In `actions/auth.actions.js`:
  - Import `import { alertActions } from "./alert.actions";`
  - After dispatch LOGIN_SUCCESS, add:
  ```javascript
  dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  const name = res.data.data.name;
  dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  ```

### Step 6 - Persist login state on refresh

- Connect the Navbar with the state of user in the store: in `PublicNavbar/index.js`
  ```javascript
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  ```
- **Persist login state**: the idea is storing the accessToken and after browser refreshing, request the user info from the server again.
  - Using `window.localStorage` to store the `accessToken`:
    - In `actions/auth.actions.js`, change `res.data.data` to `res.data`:
    ```javascript
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    ```
    - In `auth.reducer.js`, add `accessToken:localStorage.getItem('accessToken')` to the `initialState`. Then modify the case `LOGIN_SUCCESS` like this
    ```javascript
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken)
      return {
        ...state,
        user: { ...payload.data },
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    ```
    - Open the browser dev tool, in the tab `Application` -> `Locale Storage`, you can find the `accessToken`
  - Define a new action in `auth` to get the current user back:
    - Define the types in `auth.constants.js`:
    ```javascript
    export const GET_CURRENT_USER_REQUEST = "AUTH.GET_CURRENT_USER_REQUEST";
    export const GET_CURRENT_USER_SUCCESS = "AUTH.GET_CURRENT_USER_SUCCESS";
    export const GET_CURRENT_USER_FAILURE = "AUTH.GET_CURRENT_USER_FAILURE";
    ```
    - Define the middleware thunk in `auth.actions.js`. Remember to add it to `export const authActions = {...}`
    ```javascript
    const getCurrentUser = (accessToken) => async (dispatch) => {
      dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
      if (accessToken) {
        const bearerToken = "Bearer " + accessToken;
        api.defaults.headers.common["authorization"] = bearerToken;
      }
      try {
        const res = await api.get("/users/me");
        dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
      } catch (error) {
        dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
      }
    };
    ```
    - In `auth.reducer.js`:
    ```javascript
    switch (type) {
      case types.LOGIN_REQUEST:
      case types.REGISTER_REQUEST:
      case types.GET_CURRENT_USER_REQUEST:
        return { ...state, loading: true };
      ...
      case types.GET_CURRENT_USER_SUCCESS:
        return {
          ...state,
          user: payload,
          loading: false,
          isAuthenticated: true,
        };

      case types.LOGIN_FAILURE:
      case types.REGISTER_FAILURE:
      case types.GET_CURRENT_USER_FAILURE:
        return { ...state, loading: false };
    ```
  - When user refresh the browser, the app will initialize again. So we should put the the request to get current user in `App.js`:
  ```javascript
  function App() {
    const dispatch = useDispatch();
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && accessToken !== "undefined") {
        dispatch(authActions.getCurrentUser(accessToken));
      }
    }, [dispatch]);
  ```

### Step 7 - Logout

We should tell the server that the user want to logout. But keep it simple for bow by removing user info and access token in the frontend side.

- In `auth.constants.js`, add `export const LOGOUT = "AUTH.LOGOUT";`
- In `auth.actions.js`, add
  ```javascript
  const logout = () => (dispatch) => {
    delete api.defaults.headers.common["authorization"];
    localStorage.setItem("accessToken", "");
    dispatch({ type: types.LOGOUT, payload: null });
  };
  export const authActions = {
    ...
    logout,
  };
  ```
- In `auth.reducer.js`:
  ```javascript
  case types.LOGOUT:
    return {
      ...state,
      accessToken: null,
      isAuthenticated: false,
      user: null,
      loading: false,
    };
  ```
- In `PublicNavbar.js`:
  ```javascript
  const handleLogout = () => {
    
  };
  ```

### Step 9 - Show blog detail

In this step, we will implement a new page to show detail of a specific blog that user clicked on. On that page, authenticated user can write review, interact by emoji icons.

- Create a empty `src/containers/BlogDetailPage/index.js`: `rface`, then put  `<h1>Blog Detail</h1>` in the `return`.
- Add a new route `\blogs\:id` in `PublicLayout`: `<Route exact path="/blogs/:id" component={BlogDetailPage} />`
- In `HomePage/index.js`, create a function to handle click event, and pass it to the `<BlogCard>` component
  ```javascript
  import { useHistory } from "react-router-dom";
  ...
  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };
  ...
  <BlogCard
    blog={blog}
    key={blog._id}
    handleClick={handleClickOnBlog}
  />
  ```
- In `src/components/BlogCard.js`
  ```javascript
  const BlogCard = ({ blog, handleClick }) => {
    return (
      <Card onClick={() => handleClick(blog._id)}
  ```
- Now you can click on a blog and the app will lead you to the Blog Detail Page. 

Next, we will capture the blog id in the url that links to Blog Detail Page. Then we can dispatch a new action to get detail information of the blog:

- In `blog.constants.js`:
  ```javascript
  export const GET_SINGLE_BLOG_REQUEST = "BLOG.GET_SINGLE_BLOG_REQUEST";
  export const GET_SINGLE_BLOG_REQUEST_SUCCESS = "BLOG.GET_SINGLE_BLOG_REQUEST_SUCCESS";
  export const GET_SINGLE_BLOG_REQUEST_FAILURE = "BLOG.GET_SINGLE_BLOG_REQUEST_FAILURE";
  ```
- In `blog.actions.js`, create `getSingleBlog()` (remember to add it to `export const blogActions = {...}`)
  ```javascript
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
  ```
- Add the new action types into `blog.reducer.js`
  ```javascript
  case types.BLOG_REQUEST:
  case types.GET_SINGLE_BLOG_REQUEST:
    return { ...state, loading: true };

  case types.BLOG_REQUEST_SUCCESS:
    return { ...state, blogs: payload, loading: false };

  case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
    return { ...state, selectedBlog: payload, loading: false};
    
  case types.BLOG_REQUEST_FAILURE:
  case types.GET_SINGLE_BLOG_REQUEST_FAILURE
    return { ...state, loading: false };
  ```
- Trigger the fetching process in `BlogDetail/index.js`
  ```javascript
  const BlogDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog.selectedBlog);

    useEffect(() => {
      if (params?.id) {
        dispatch(blogActions.getSingleBlog(params.id));
      }
    }, [dispatch]);

    return (
      <div>
        <h1>{blog.title}</h1>
      </div>
    );
  };
  ```
- You should see the title of the blog that you clicked on. More info of the blog is in the variable `blog`. Time for design a nice page. Or you can use this minimal version:
  ```javascript
  return (
    <>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h1>{blog.title}</h1>
              <span className="text-muted">
                @{blog?.user?.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>
              <hr />
              <Markdown source={blog.content} />
              <hr />
              <ReviewList reviews={blog.reviews} />
            </div>
          )}
        </>
      )}
    </>
  );
  ```
- `Markdown` component is imported from `react-markdown`. `ReviewList` is a stateless component to show the reviews. In `src/components/ReviewList.js`:
  ```javascript
  const ReviewList = ({ reviews }) => {
    return (
      <>
        {reviews?.length > 0 && (
          <ul className="list-unstyled">
            {reviews.map((review) => (
              <ReviewContent review={review} key={review._id} />
            ))}
          </ul>
        )}
      </>
    );
  };

  const ReviewContent = ({ review }) => {
    return (
      <div>
        <span className="text-muted">@{review?.user?.name}: </span>
        <span> {review.content} </span>
      </div>
    );
  };

  export default ReviewList;
  ```

### Step 10 - Adding review to a blog

In this step, we will add a form to submit review in the Blog Detail Page. The review will be post to the backend API `blogs\:id\reviews` which `id` is the blog's ID. First, let's prepare the action to post review:

- In `blog.constants.js`:
  ```javascript
  export const CREATE_REVIEW_REQUEST = "BLOG.CREATE_REVIEW_REQUEST";
  export const CREATE_REVIEW_SUCCESS = "BLOG.CREATE_REVIEW_SUCCESS";
  export const CREATE_REVIEW_FAILURE = "BLOG.CREATE_REVIEW_FAILURE";
  ```
- In `blog.actions.js`: (remember to add the new actions to `export const blogActions = {...}`)
  ```javascript
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
  ```
- In `blog.reducer.js`:
  ```javascript
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
  ```

Now let create the form in the Blog Detail Page and handle the submit event by dispatching the `createReview()` action. 
- In `BlogDetailPage/index.js`:
  ```javascript
  const BlogDetailPage = () => {
    ...
    const submitReviewLoading = useSelector(
      (state) => state.blog.submitReviewLoading
    );
    const [reviewText, setReviewText] = useState("");

    const handleInputChange = (e) => {
      setReviewText(e.target.value);
    };

    const handleSubmitReview = (e) => {
      e.preventDefault();
      dispatch(blogActions.createReview(blog._id, reviewText));
      setReviewText("");
    };
    ...
    return (
      ...
      {blog && ( 
        ...
      )}

      {isAuthenticated && (
        <ReviewBlog
          reviewText={reviewText}
          handleInputChange={handleInputChange}
          handleSubmitReview={handleSubmitReview}
          loading={submitReviewLoading}
        />
      )}
    );
  };
  ```
- Create `src/components/ReviewBlog.js`:
  ```javascript
  import React from "react";
  import { Form, Button, Row, Col } from "react-bootstrap";

  const ReviewBlog = ({
    reviewText,
    handleInputChange,
    handleSubmitReview,
    loading,
  }) => {
    return (
      <Form onSubmit={handleSubmitReview}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="review" column sm="2">
            Review:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              id="review"
              type="text"
              value={reviewText}
              onChange={handleInputChange}
            />
          </Col>
          {loading ? (
            <Button variant="primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </Button>
          ) : (
            <Button type="submit" disabled={!reviewText}>
              Submit
            </Button>
          )}
        </Form.Group>
      </Form>
    );
  };

  export default ReviewBlog;
  ```

### Step 11 - Create & Edit your own blog

In this step, we will implement Create, Edit, and Delete Blog features for authenticated user.

#### Actions & Reducers
- In `blog.constants.js`:
  ```javascript
  export const CREATE_BLOG_REQUEST = "BLOG.CREATE_BLOG_REQUEST";
  export const CREATE_BLOG_SUCCESS = "BLOG.CREATE_BLOG_SUCCESS";
  export const CREATE_BLOG_FAILURE = "BLOG.CREATE_BLOG_FAILURE";

  export const UPDATE_BLOG_REQUEST = "BLOG.UPDATE_BLOG_REQUEST";
  export const UPDATE_BLOG_SUCCESS = "BLOG.UPDATE_BLOG_SUCCESS";
  export const UPDATE_BLOG_FAILURE = "BLOG.UPDATE_BLOG_FAILURE";

  export const DELETE_BLOG_REQUEST = "BLOG.DELETE_BLOG_REQUEST";
  export const DELETE_BLOG_SUCCESS = "BLOG.DELETE_BLOG_SUCCESS";
  export const DELETE_BLOG_FAILURE = "BLOG.DELETE_BLOG_FAILURE";
  ```

- In `blog.actions.js`:
  ```javascript
  const createNewBlog = (title, content) => async (dispatch) => {
    dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      const res = await api.post("/blogs", formData);

      dispatch({
        type: types.CREATE_BLOG_SUCCESS,
        payload: res.data.data,
      });
      dispatch(alertActions.setAlert("New blog has been created!", "success"));
    } catch (error) {
      dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
    }
  };

  const updateBlog = (blogId, title, content) => async (dispatch) => {
    dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
    try {
      // let formData = new FormData();
      // formData.set("title", title);
      // formData.set("content", content);
      const res = await api.put(`/blogs/${blogId}`, { title, content });

      dispatch({
        type: types.UPDATE_BLOG_SUCCESS,
        payload: res.data.data,
      });
      dispatch(alertActions.setAlert("The blog has been updated!", "success"));
    } catch (error) {
      dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
    }
  };

  const deleteBlog = (blogId) => async (dispatch) => {
    dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
    try {
      const res = await api.delete(`/blogs/${blogId}`);
      console.log(res);
      dispatch({
        type: types.DELETE_BLOG_SUCCESS,
        payload: res.data,
      });
      dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
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
  ```

- In `blog.reducer.js`:
  ```javascript
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

      case types.UPDATE_BLOG_SUCCESS:
      case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
        return { ...state, selectedBlog: payload, loading: false };

      case types.BLOG_REQUEST_FAILURE:
      case types.GET_SINGLE_BLOG_REQUEST_FAILURE:
      case types.CREATE_BLOG_FAILURE:
      case types.CREATE_BLOG_SUCCESS:
      case types.UPDATE_BLOG_FAILURE:
      case types.DELETE_BLOG_FAILURE:
        return { ...state, loading: false };

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
      default:
        return state;
    }
  };
  ```

#### Integrate with the UI

- In `HomePage/index.js`, let create a button for user to start writing:
  ```javascript
  <h1>Social Blog</h1>
  <p>Write about your amazing experiences.</p>
  {isAuthenticated && (
    <Link to="/blog/add">
      <Button variant="primary">Write now</Button>
    </Link>
  )}
  ```
- Add in `PublicLayout.js`:
  ```javascript
  <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
  <PrivateRoute exact path="/blog/edit/:id" component{AddEditBlogPage}/>
  ```
- We are going to use one page for create, edit and also delete. Let's create `src/containers/AddEditBlogPage/index.js`:
  ```javascript
  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    Form,
    Button,
    Container,
    Row,
    Col,
    ButtonGroup,
  } from "react-bootstrap";
  import { useHistory, useParams, Redirect } from "react-router-dom";
  import { blogActions } from "../../redux/actions";

  const AddEditBlogPage = () => {
    const [formData, setFormData] = useState({
      title: "",
      content: "",
    });
    const loading = useSelector((state) => state.blog.loading);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const selectedBlog = useSelector((state) => state.blog.selectedBlog);
    const redirectTo = useSelector((state) => state.blog.redirectTo);
    const addOrEdit = params.id ? "Edit" : "Add";

    useEffect(() => {
      if (addOrEdit === "Edit") {
        setFormData((formData) => ({
          ...formData,
          title: selectedBlog.title,
          content: selectedBlog.content,
        }));
      }
    }, [addOrEdit, selectedBlog]);

    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
      e.preventDefault();
      const { title, content } = formData;
      if (addOrEdit === "Add") {
        dispatch(blogActions.createNewBlog(title, content));
      } else if (addOrEdit === "Edit") {
        dispatch(blogActions.updateBlog(selectedBlog._id, title, content));
      }
    };

    const handleCancel = () => {
      history.goBack();
    };

    const handleDelete = () => {
      // TODO : popup confirmation modal
      dispatch(blogActions.deleteBlog(selectedBlog._id));
    };

    if (redirectTo) return <Redirect to={redirectTo} />;

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h1 className="text-primary">{addOrEdit} blog</h1>
                <p className="lead">
                  <i className="fas fa-user" />
                </p>
              </div>
              <Form.Group>
                <Form.Control
                  type="text"
                  required
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="10"
                  placeholder="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </Form.Group>
              <ButtonGroup className="d-flex mb-3">
                {loading ? (
                  <Button
                    className="mr-3"
                    variant="primary"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </Button>
                ) : (
                  <Button className="mr-3" type="submit" variant="primary">
                    Submit
                  </Button>
                )}
                <Button variant="light" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
              </ButtonGroup>
              {addOrEdit === "Edit" && (
                <ButtonGroup className="d-flex">
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Delete Blog
                  </Button>
                </ButtonGroup>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default AddEditBlogPage;
  ```

- In `BlogDetailPage/index.js`, let's add a button for owner to edit the blog:
  ```javascript
  const currentUser = useSelector((state) => state.auth.user);
  ...
  {currentUser?._id === blog?.user?._id ? (
    <Link to={`/blog/edit/${blog._id}`}>
      <Button variant="primary">Edit</Button>
    </Link>
  ) : (
    <span className="text-muted">
      @{blog?.user?.name} wrote{" "}
      <Moment fromNow>{blog.createdAt}</Moment>
    </span>
  )}
  ```

### Step 12 - Build your own features

Congratulation, you have done a great job to go to this point. It's time for you to walk on your own feet. Look at the backend API documentation and figure out any feature you can add to the app. Some suggestions:

- Blog Pagination
- User can see a list of users with pagination
- User can add friends
- User can react with blogs or reviews with emoji icon (called `reactions` in the backend API)
- User can see his/her profile and update it
- User has a dashboard layout to manage his/her blogs, friends