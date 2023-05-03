import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import { isRouteErrorResponse, useRouteError,useNavigate } from 'react-router-dom'
import { primaryColor, secondaryColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import Lottie from 'lottie-web'

const ErrorBoundary = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    const animationController = useRef(null)
    const [action, setAction] = useState(null);
    useEffect(() => {
        Lottie.destroy()
       Lottie.loadAnimation({
        path:'error.json',
        autoplay:true,
        container:animationController.current
       })
        
    }, [action]);
    
    return (
        <>
        <div style={{height:"100vh"}} className='d-flex justify-content-center align-items-center text-center'>
            <div>
            <div className='' style={{height:200,width:"100%"}} ref={animationController}></div>
            <div className='display-4 mt-2 text-white' style={{fontWeight:600}}>Oops!</div>
            <p className='pt-3' style={{color:"#ffffff50",fontSize:textSize}}>Sorry, you can't view this page, <span onClick={()=>navigate("/")} className='btn border-0 shadow-none' style={{color:primaryColor,textDecoration:'underline'}}>Go back</span></p>
            </div>
         
        </div>
        </>
    )
}

export default ErrorBoundary
