import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { textSize } from '../utils/font_size'

const FeedbackItem = (props) => {
    const {title,number,color} = props
    return (
        <>
         <Row className='d-flex justify-content-between'>
        <Col md={10}>
        <div className=' text-start py-2  ' style={{fontWeight:400, color:"#ffffff60",fontSize:textSize}}>
    {title}
    </div>
        </Col>
        <Col className='text-end' md={2}>
        <div className=' text-start py-2  ' style={{fontWeight:400, color,fontSize:textSize}}>
    {number}%
    </div>
        </Col>
    </Row>

    <div style={{width:"100%",height:"5px",backgroundColor:"white"}}>
    <div style={{width:`${number}%`,height:"5px",backgroundColor:color}}>
        </div>
    </div>
        </>
       
    
    )
}

export default FeedbackItem
