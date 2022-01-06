import React from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useDataLoader } from 'react-use-data-loader';
import './Details.css';

const productDetails = async(id) =>{
  try {
    const res = await axios.get(`http://localhost:5000/api/products/product_id/${id}`)
    return res.data[0]
  } catch (error) {
    console.log('Error', error);
  }
}

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading } = useDataLoader(productDetails, searchParams.get('id'))
  return <section className="details">
    {loading 
    ? <div>Loading...</div>
    : <div className="cardDetails">
        <h2>{data.name} {data.provider.name}</h2>
        <p>Price: {data.price}$</p>
        <p>Rating: {data.rating}/5 Stars</p>
        <h3>Description:</h3>
        <p className="description">{data.description}</p>
        <h3>Provider data:</h3>
        <p>{data.provider.name}</p>
        <p>CIF: {data.provider.cif}</p>
        <p>Direction: {data.provider.direction}</p>
      </div>
  }
  </section>;
};

export default Details;
