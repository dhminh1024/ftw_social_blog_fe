import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../redux/actions";
import { Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import Markdown from "react-markdown";
import ReviewList from "../../components/ReviewList";
import ReviewBlog from "../../components/ReviewBlog";
import Reactions from "../../components/Reactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const submitLoading = useSelector((state) => state.blog.subReviewLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  const [reviewText, setReviewText] = useState("");
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {currentUser?._id === blog?.author?._id ? (
          <Link to={`/blog/edit/${blog._id}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h4>{blog.title}</h4>

              <span className="text-muted">
                @{blog?.author?.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>

              <hr />
              <Markdown source={blog.content} />
              <hr />
              <Reactions
                reactionsData={blog.reactions}
                targetType="Blog"
                target={blog._id}
                size="lg"
              />
              <hr />
              <ReviewList reviews={blog.reviews} />
            </div>
          )}

          {isAuthenticated && (
            <ReviewBlog
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default BlogDetailPage;
