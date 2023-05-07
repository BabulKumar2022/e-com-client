import { } from 'antd'
import {Card, CardImg} from 'react-bootstrap'
import React from 'react'





const SliderCard = (props) => {
    let {imagSrc, price, title} = props.data;
  return (
    <Card className='p-0 overflow-hidden h-100 shadow'>
        <div className=" overflow-hidden rounded p-0 bg-light">
            <Card.Img variant="top" src={imagSrc}/>
        </div>
            <Card.Body className='text-center'>
                <Card.Title className='display-6 '>{price}</Card.Title>
                <Card.Title className='display-6 '>{title}</Card.Title>
            </Card.Body>
            <button className=" w-100 rounded-0" variant="success">ADD TO CART</button>
    </Card>
  )
}

export default SliderCard