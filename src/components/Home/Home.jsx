import React, { useContext } from "react";
import {productContext} from '../../context/productContext';
import Card from '../Card';

const Home = () => {

  const {currentProducts, handleNextPage, currentPage, handlePrevPage, searchProduct} = useContext(productContext);

  const paintCards = () => {
    return currentProducts.map((item, i) => <Card product={item} key={i}></Card>)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = event.target.search.value
    searchProduct(search);
  }

  return <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input type="text" name="search"/>
            <input type="submit" value="search"/>
          </form>
          <div>{paintCards()}</div>
          <div>
            <button onClick={handlePrevPage}>Prev</button>
            <p>Page {currentPage}</p>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>;
};

export default Home;
