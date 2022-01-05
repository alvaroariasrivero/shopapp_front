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

  const searchProduct = (search) => {
    setSearch(search);
    setCurrentPage(1);
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
            'provider': element.provider.name
          }
        })
        console.log(productArray)
        setProduct(productArray);
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchProducts();
  }, [search])

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

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
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
