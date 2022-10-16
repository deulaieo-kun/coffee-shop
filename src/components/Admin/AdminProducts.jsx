import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionProduct from "../../store/actions/actionProduct";
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import empty from "../../assets/images/empty-image.jpg"

export default function AdminProducts() {
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("burger");
  const [description, setDescription] = useState("");
  const { getAllProducts, addProduct, deleteProduct } = bindActionCreators(actionProduct, useDispatch());
  const productList = useSelector((state) => state.productList)

  // Validation
  const [invalidProductTitle, setInvalidProductTitle] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

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
    }
  }

  const checkIfValid = () => {
    let isValid = true;

    // Check if productName is valid
    if(productTitle.match("^$|^.*@.*\..*$")) {
      setInvalidProductTitle(true);
      isValid = false;
    } else {
      setInvalidProductTitle(false);
    }

    // Check if price has value
    if(price.match("^$|^.*@.*\..*$") || isNaN(price) || price <= 0) {
      setInvalidPrice(true);
      isValid = false;
    } else {
      setInvalidPrice(false);
    }

    // Check if description has an input
    if(description.match("^$|^.*@.*\..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid
  };

  function MyDropzone(product) {
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
        <img src={product.imageLinkOne ? product.imageLinkOne : empty} alt={product.productTitle} {...getRootProps()}/>
        {/* <img src={product.imageLinkTwo ? product.imageLinkTwo : empty} alt={product.productTitle} {...getRootProps()}/>
        <img src={product.imageLinkThree ? product.imageLinkThree : empty} alt={product.productTitle} {...getRootProps()}/> */}
        <div className="card-body">
          <h5 className="card-title mb-0">{product?.productTitle.substring(0, 12)}...</h5>
          <p className="card-text lead fw-bold">${product.price}</p>
          <button onClick={() => deleteProduct(product.productId)}>DELETE</button>
        </div>
      </div>
    )
  }


  const renderProducts = (category) => {
    return (
      <>
      {productList
      .filter((product) => product.category === category)
      .map((product) => (
        <React.Fragment key={product.productId}>
          <div className="col-md-8 mb-4" style={{ height: "300px", width: "250px" }}>
            <MyDropzone {...product} />
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
        {/* PRODUCT TITLE */}
        <Form.Group controlId="formProductName" className="w-50">
            <Form.Control 
            type="text" 
            size="sm" 
            placeholder="Enter Product Name" 
            value={productTitle} 
            onChange={(e) => setProductTitle(e.target.value)} 
            isInvalid={invalidProductTitle}>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please input a product name
            </Form.Control.Feedback>
        </Form.Group>

         {/* PRODUCT PRICE */}
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

        {/* CATEGORY */}
        <Form.Group controlId="formType" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="burger">Burgers</option>
            <option value="pizza">Pizzas</option>
            <option value="dessert">Desserts</option>
          </Form.Select>
        </Form.Group>

        {/* DESCRIPTION */}
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
            className="bg-primary text-center text-white w-50"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
    </Form>
    <hr />
    <h4 className="text-danger">BURGERS</h4>
    <div className="row justify-content-center">
      {renderProducts("burger")}
    </div>
    <h4 className="text-danger">PIZZAS</h4>
    <div className="row justify-content-center">
      {renderProducts("pizza")}
    </div>
    <h4 className="text-danger">DESSERTS</h4>
    <div className="row justify-content-center">
      {renderProducts("dessert")}
    </div>
    </>
  )
}
