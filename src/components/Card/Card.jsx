import React from "react";

const Card = ({product}) => {

  const {name, price, provider, rating} = product;

  return <div>
    <p>Name: {name}</p>
    <p>Price: {price}$</p>
    <p>Provider: {provider}</p>
    <p>Rating: {rating}</p>
  </div>;
};

export default Card;
