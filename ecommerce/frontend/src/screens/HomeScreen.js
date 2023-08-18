import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'



import products from '../products'
import Product from '../components/Product'



function HomeScreen() {
  return (
    <div>
            <h1>Latest Products</h1>
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            
        </div>
  )
}

export default HomeScreen