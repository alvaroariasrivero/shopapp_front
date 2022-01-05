import React, { useContext } from "react";
import {productContext} from '../../context/productContext';
import {Link} from 'react-router-dom';
import Card from '../Card';

const Home = () => {

  const {currentProducts, handleNextPage, currentPage, handlePrevPage, handleSort, searchProduct} = useContext(productContext);

  const paintCards = () => {
    return currentProducts.map((item, i)  => <Link to={`/product/?id=${item.id}`} key={i}><Card product={item}/></Link>
    )}

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
            <select defaultValue='Sort' onChange={handleSort}>
              <option value="Sort">Sort</option>
              <option value="Cheap">Cheapest</option>
              <option value="Expensive">Most expensive</option>
              <option value="Best">Best Rated</option>
              <option value="Worst">Worst Rated</option>
              <option value="Ascending">Alphabetically Ascending</option>
              <option value="Descending">Alphabetically Descending</option>
            </select>
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
