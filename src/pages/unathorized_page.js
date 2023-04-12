import React from 'react'
import { Container } from 'react-bootstrap'
import { secondaryColor } from '../utils/color_pallate'

const UnathorizedPage = () => {
    return (
        <div>
            <Container  className='d-flex justify-content-center align-items-center'>
                 <div className='display-1' style={{color:secondaryColor}}>
                Sorry you are not authorized! 
                </div>
            </Container>
            
        </div>
    )
}

export default UnathorizedPage
