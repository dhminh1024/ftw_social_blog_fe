import React, { useEffect } from "react";
import { Container, Jumbotron, CardDeck, Button } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import { useHistory, Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    dispatch(blogActions.blogsRequest());
  }, [dispatch]);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
        {isAuthenticated && (
          <Link to="/blog/add">
            <Button variant="primary">Write now</Button>
          </Link>
        )}
      </Jumbotron>
      <div className="d-flex justify-content-center">
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <>
            {blogs.length ? (
              <CardDeck>
                {blogs.map((blog) => (
                  <BlogCard
                    blog={blog}
                    key={blog._id}
                    handleClick={handleClickOnBlog}
                  />
                ))}
              </CardDeck>
            ) : (
              <p>There are no blogs.</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
