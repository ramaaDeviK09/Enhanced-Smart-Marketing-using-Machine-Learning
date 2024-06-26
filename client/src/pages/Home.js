import React, { useEffect } from 'react'
import './home.css'
import {LinkContainer} from 'react-router-bootstrap'
import categories from '../categories'
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice'
import axios from '../axios';
import ProductPreview from '../components/ProductPreview';

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
  return (
    <div>
        <div className='homeCover'></div>
        <marquee behavior="" direction="">Recently added products</marquee>
        <div className='home-preview'>
        {lastProducts.map(product => {
            return <>
                    <ProductPreview {...product}/>
                    </>
        })}
        </div>
        <h1>explore</h1>
        <div className='category'>
            { categories.map((item ,value) => {
                return (
                    <div className='category' key={value}>
                        <LinkContainer to={`/category/${item.name.toLocaleLowerCase()}`}>
                        <img src={item.img} alt="" className='category-img' />
                        </LinkContainer>
                    </div>
                )
                    
                
            })}
        </div>
    </div>
  )
}
