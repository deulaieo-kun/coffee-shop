import React, { useState, useEffect, useCallback } from "react";
import "../../styles/all-foods.css";
import empty from "../../assets/images/empty-image.jpg";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import * as actionProduct from "../../store/actions/actionProduct";
import { useDropzone } from "react-dropzone";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function AdminProducts() {
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Burger");
  const [description, setDescription] = useState("");
  const [invalidProductTitle, setInvalidProductTitle] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const { getAllProducts, addProduct, deleteProduct } = bindActionCreators(
    actionProduct,
    useDispatch()
  );
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIfValid()) {
      const requestBody = {
        productTitle: productTitle,
        price: price,
        category: category,
        description: description,
      };
      addProduct(requestBody);
      setProductTitle("");
      setPrice("");
      setDescription("");
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if productName is valid
    if (productTitle.match("^$|^.*@.*..*$")) {
      setInvalidProductTitle(true);
      isValid = false;
    } else {
      setInvalidProductTitle(false);
    }

    // Check if price has value
    if (price.match("^$|^.*@.*..*$") || isNaN(price) || price <= 0) {
      setInvalidPrice(true);
      isValid = false;
    } else {
      setInvalidPrice(false);
    }

    // Check if description has an input
    if (description.match("^$|^.*@.*..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(product) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload Image
      axios
        .put(
          `https://snackbreak.herokuapp.com/product/${product.productId}/upload`,
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
        key={product.productId}
      >
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="1" lg="1" xl="1">
              <MDBCardImage
                className="rounded-3"
                fluid
                src={
                  product.imageLinkOne
                    ? `https://snackbreak.herokuapp.com/product/${product.productId}/download`
                    : empty
                }
                alt={product.productTitle}
                {...getRootProps()}
              />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <p className="lead fw-normal mb-2 text-red fw-bold">
                {product.productTitle}
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
              <MDBTypography tag="h5" className="mb-0 text-red fw-bold">
                ₱ {product.price}
              </MDBTypography>
            </MDBCol>
            <MDBCol md="1" lg="1" xl="1" className="text-end">
              <MDBIcon
                fas
                icon="trash text-red"
                size="lg"
                onClick={() => deleteProduct(product.productId)}
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }

  const renderProducts = (category) => {
    return (
      <>
        {productList
          .filter((product) => product.category === category)
          .map((product) => (
            <React.Fragment key={product.productId}>
              <div>
                <MyDropzone {...product} />
              </div>
            </React.Fragment>
          ))}
      </>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="row">
        <Form.Group controlId="formProductName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Name"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            isInvalid={invalidProductTitle}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a product name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPrice" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={invalidPrice}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Price must be a number
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formType" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Burger">Burgers</option>
            <option value="Pizza">Pizzas</option>
            <option value="Dessert">Desserts</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            Please input a product description
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
        Uploaded Products
      </h3>
      <h4 className="text-red">BURGERS</h4>
      <div className="row justify-content-center">
        {renderProducts("Burger")}
      </div>
      <h4 className="text-red">PIZZAS</h4>
      <div className="row justify-content-center">
        {renderProducts("Pizza")}
      </div>
      <h4 className="text-red">DESSERTS</h4>
      <div className="row justify-content-center">
        {renderProducts("Dessert")}
      </div>
    </>
  );
}
