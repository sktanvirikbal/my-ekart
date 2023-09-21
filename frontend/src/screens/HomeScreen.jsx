import React from 'react'

import {Row,Col} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom'
import Product from '../Components/Product';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';
const HomeScreen = () => {
  const {pageNumber,keyword}=useParams();
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});

 

  return (
    <>
    {!keyword ?<ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>
      Go back</Link>}
    {isLoading?(
      <Loader/>
    ):error?(
<Message variant="danger">{error?.data?.message ||error.error}</Message>
    ):(
      <>
    
    <h1>Latest Products</h1>
    
    <Row>
{data.products.map((product)=>(
    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product}/>
    </Col>
))}
    </Row>
    <Paginate 
    pages={data.pages}
    page={data.page}
    keyword={keyword? keyword:''}/>

      </>
    )}

    </>
    
  )
}

export default HomeScreen