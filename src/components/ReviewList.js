import React from "react";

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
