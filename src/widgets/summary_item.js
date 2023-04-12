import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { textSize } from '../utils/font_size'

const SummaryItem = (props) => {
    const {title,number} = props
    return (
        <Row className='d-flex justify-content-between'>
        <Col md={10}>
        <div className=' text-start py-2  ' style={{fontWeight:400, color:"#ffffff60",fontSize:textSize}}>
    {title}
    </div>
        </Col>
        <Col className='text-end' md={2}>
        <div className=' text-start py-2  ' style={{fontWeight:400, color:"#ffffff60",fontSize:textSize}}>
    {number}
    </div>
        </Col>
    </Row>
    )
}

export default SummaryItem
