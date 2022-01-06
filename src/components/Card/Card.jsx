import React from "react";
import './Card.css';

const Card = ({product}) => {

  const {name, price, provider, rating} = product;

  return <section>
            <div className="card">
            <p className="title">{name}</p>
            <p className="content">Price: {price}$</p>
            <p className="content">Provider: {provider}</p>
            <p className="content">Rating: {rating}/5 Stars</p>
          </div>
        </section>;
};

export default Card;
