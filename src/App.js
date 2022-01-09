import React, {useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import {productContext} from './context/productContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';


function App() {

  const [search, setSearch] = useState('');
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sort, setSort] = useState('');

  const searchProduct = (search) => {
    setSearch(search);
    setCurrentPage(1);
  }

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  useEffect(() => {
    async function fetchProducts(){
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${search}`);
        const json = res.data
        const productArray = json.map(element => {
          return{
            'name': element.name,
            'price': element.price,
            'rating': element.rating,
            'provider': element.provider.name,
            'id': element.id
          }
        })
        setProduct(productArray);
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchProducts();
  }, [search])

  const sorted = product.sort((a, b) => {
    if(sort === 'Cheap'){
      return a.price - b.price
    } else if(sort === 'Expensive'){
      return b.price - a.price
    } else if(sort === 'Best'){
      return b.rating - a.rating
    } else if(sort === 'Worst'){
      return a.rating - b.rating
    } else if(sort === 'Ascending'){
      return a.name.localeCompare(b.name)
    } else if(sort === 'Descending'){
      return b.name.localeCompare(a.name)
    }
  })

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sorted.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if(currentPage !== Math.ceil(product.length/productsPerPage) && product.length/productsPerPage >= 1){
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    } 
  }

  const prodObj = {
    searchProduct,
    handleNextPage,
    handlePrevPage,
    handleSort,
    currentProducts,
    currentPage
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <productContext.Provider value={prodObj}>
          <Main/>
        </productContext.Provider>
      </BrowserRouter>
      <div id="footer"><Footer/></div>
    </div>
  );
}

export default App;
