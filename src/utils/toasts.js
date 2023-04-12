import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { BsAirplane, BsBellFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

import { cardColor, mutedBackground, mutedText } from './color_pallate'



const ErrorToast = ({show,onClose}) => {
    return (
        <ToastContainer  className='p-3' position='top-end'>
          <Toast   show={show} onClose={onClose} style={{borderRadius:30}} animation="true" autohide="true" bg='danger' >
          <Toast.Header closeVariant='white' style={{backgroundColor:"red"}}>
           
            <strong style={{color:"#ffffff",fontSize:12}} className='me-auto'>Empty fields</strong>
            
          </Toast.Header>
          <Toast.Body  style={{backgroundColor:cardColor,borderBottomLeftRadius:"5px",borderBottomRightRadius:"5px",fontWeight:300, color:mutedText,fontSize:12}}>
            Please fill all fields before you proceed
          </Toast.Body>
          </Toast>
        </ToastContainer>
       
    )
}

export default ErrorToast
