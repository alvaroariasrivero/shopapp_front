import React, { useContext } from "react";
import {productContext} from '../../context/productContext';
import {Link} from 'react-router-dom';
import Card from '../Card';
import './Home.css';

const Home = () => {

  const {currentProducts, handleNextPage, currentPage, handlePrevPage, handleSort, searchProduct} = useContext(productContext);

  const paintCards = () => {
    return currentProducts.map((item, i)  => <Link to={`/product/?id=${item.id}`} key={i} className="cardLink"><Card product={item}  className="cardLink"/></Link>
    )}

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = event.target.search.value
    searchProduct(search);
  }

  return <>
          <div className="search">
            <form onSubmit={handleSubmit}>
              <div className="txtInput">
                <label htmlFor="search">Search: </label>
                <input type="text" name="search"/>
              </div>
              <div>
                <input type="submit" value="Search" className="submitbtn"/>
              </div>
              <div>
                <select defaultValue='Sort' onChange={handleSort} className="sort">
                  <option value="Sort">Sort</option>
                  <option value="Cheap">Cheapest</option>
                  <option value="Expensive">Most expensive</option>
                  <option value="Best">Best Rated</option>
                  <option value="Worst">Worst Rated</option>
                  <option value="Ascending">Alphabetically Ascending</option>
                  <option value="Descending">Alphabetically Descending</option>
                </select>
              </div>
            </form>
          </div>
          <div className="cardflex">{paintCards()}</div>
          <div className="pagination">
            <button onClick={handlePrevPage}>Prev</button>
            <p>Page {currentPage}</p>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>;
};

export default Home;
