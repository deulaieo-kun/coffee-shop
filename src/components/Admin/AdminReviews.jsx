import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionReview from "../../store/actions/actionReview";
import empty from "../../assets/images/empty-image.jpg"

export default function AdminReviews() {
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const reviewList = useSelector((state) => state.reviewList)
    const {getAllReviews } = bindActionCreators(actionReview, useDispatch());
    
    // Validation
    const [invalidAuthor, setInvalidAuthor] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);

    useEffect(() => {
      getAllReviews()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkIfValid();
        // if(checkIfValid()) {
        //   const requestBody = {
        //     blogName: blogName,
        //     blogAuthor: author,
        //     description: description,
        //   };
  
        //   addBlog(requestBody);
        // } 
    };
  
    const checkIfValid = () => {
      let isValid = true;
  
     // Check if author is valid
     if(author.match("^$|^.*@.*\..*$")) {
      setInvalidAuthor(true);
      isValid = false;
    } else {
      setInvalidAuthor(false);
    }
  
      // Check if description is valid
      if(description.match("^$|^.*@.*\..*$")) {
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
        const file = acceptedFiles[0]
  
        const formData  = new FormData();
        formData.append("file", file);
      }, []);
  
      // React Dropzone
      const { getRootProps } = useDropzone({ onDrop });
  
      // Return statement
      return (
        <div className="card h-150 text-center p-4">
          <img src={review.imageLink ? review.imageLink : empty} alt={review.author} {...getRootProps()}/>
          <div className="card-body">
            <h5 className="card-title mb-0">{review?.reviewAuthor.substring(0, 12)}...</h5>
            <p className="card-text lead fw-bold">${review.price}</p>
            <button>DELETE</button>
          </div>
        </div>
      )
    }
  
  
    const renderReviews = (category) => {
      return (
        <>
        {reviewList
        .filter((review) => review.category === category)
        .map((review) => (
          <React.Fragment key={review.reviewId}>
            <div className="col-md-8 mb-4" style={{ height: "300px", width: "250px" }}>
              <MyDropzone {...review} />
            </div>
          </React.Fragment>
        ))
        }</>
      )
    }

  return (
    <>
  <hr />
  <Form onSubmit={handleSubmit} className="row">
    {/* BLOG AUTHOR */}
    <Form.Group controlId="formAuthor" className="w-100">
      <Form.Control 
      type="text" 
      size="sm" 
      placeholder="Enter Author Name" 
      value={author} 
      onChange={(e) => setAuthor(e.target.value)}
      isInvalid={invalidAuthor}></Form.Control>
      <Form.Control.Feedback type="invalid">
        Please input a valid author name
      </Form.Control.Feedback>
    </Form.Group>

    {/* DESCRIPTION */}
    <Form.Group controlId="formDescription" className="mb-3">
      <Form.Control 
      as="textarea"
      placeholder="Enter Review" 
      value={description} 
      onChange={(e) => setDescription(e.target.value)}
      rows={3}
      isInvalid={invalidDescription} />
      <Form.Control.Feedback type="invalid">
        Please input a review
      </Form.Control.Feedback>
    </Form.Group>

    <div className="col-12 d-flex flex-wrap justify-content-center">
      <button className="bg-primary text-center text-white w-50" onClick={handleSubmit}>
        Upload
      </button>
    </div>
    
  </Form>
  <hr />
  <div className="row justify-content-center">{renderReviews()}</div>
  </>
  )
}
