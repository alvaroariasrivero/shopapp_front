import React from "react";

const Card = ({product}) => {

  const {name, price, provider, rating} = product;

  return <div>
    <p>Name: {name}</p>
    <p>Price: {price}$</p>
    <p>Provider: {provider}</p>
    <p>Rating: {rating}/5 Stars</p>
  </div>;
};

export default Card;
