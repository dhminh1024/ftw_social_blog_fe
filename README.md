# Social Blog app

## Introduction

## Implementation

### Project setup

- Create project with `create-react-app`

  ```javascript
  npx create-react-app social-app
  cd social-app
  npm i redux react-redux redux-thunk redux-devtools-extension
  npm i react-router-dom
  npm i bootstrap react-bootstrap
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
    const handleSubmit = async (e) => {
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



