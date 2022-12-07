import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionReview from "../../store/actions/actionReview";
import empty from "../../assets/images/empty-image.jpg";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function AdminReviews() {
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const reviewList = useSelector((state) => state.reviewList);
  const { getAllReviews, addReview, deleteReview } = bindActionCreators(
    actionReview,
    useDispatch()
  );
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  useEffect(() => {
    getAllReviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      const requestBody = {
        reviewAuthor: author,
        description: description,
      };

      addReview(requestBody);
      setAuthor("");
      setDescription("");
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if author is valid
    if (author.match("^$|^.*@.*..*$")) {
      setInvalidAuthor(true);
      isValid = false;
    } else {
      setInvalidAuthor(false);
    }

    // Check if description is valid
    if (description.match("^$|^.*@.*..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(review) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload to s3
      axios
        .put(
          `https://online-food-delivery-be-production.up.railway.app/review/${review.reviewId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          console.log("file uploaded successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    // Return statement
    return (
      <MDBCard
        className="rounded-3 mb-4 border border-danger"
        key={review.reviewId}
      >
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="1" lg="1" xl="1">
              <MDBCardImage
                className="rounded-3"
                fluid
                src={
                  review.imageLink
                    ? `https://online-food-delivery-be-production.up.railway.app/review/${review.reviewId}/download`
                    : empty
                }
                alt={review.reviewAuthor}
                {...getRootProps()}
              />
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2">
              <p className="lead fw-normal mb-2 text-red fw-bold">
                {review.reviewAuthor}
              </p>
            </MDBCol>

            <MDBCol md="6" lg="6" xl="6" className="offset-lg-1">
              <MDBTypography tag="h5" className="mb-0 text-red fw-bold">
                {review.description}
              </MDBTypography>
            </MDBCol>
            <MDBCol md="1" lg="1" xl="1" className="text-end">
              <MDBIcon
                fas
                icon="trash text-red"
                size="lg"
                onClick={() => deleteReview(review.reviewId)}
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }

  const renderReviews = (category) => {
    return (
      <>
        {reviewList
          .filter((review) => review.category === category)
          .map((review) => (
            <React.Fragment key={review.reviewId}>
              <div>
                <MyDropzone {...review} />
              </div>
            </React.Fragment>
          ))}
      </>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="row">
        <Form.Group controlId="formAuthor" className="w-100">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            isInvalid={invalidAuthor}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid author name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Enter Review"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            Please input a review
          </Form.Control.Feedback>
        </Form.Group>

        <div className="col-12 d-flex flex-wrap justify-content-center">
          <button
            className="addTOCart__btn text-center text-white w-50"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </Form>

      <br />
      <h3 className="text-start fw-bold text-red pt-5 pb-2">
        Uploaded Reviews
      </h3>
      <div className="row justify-content-center">{renderReviews()}</div>
    </>
  );
}
