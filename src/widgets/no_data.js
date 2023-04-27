import Lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react'
import Paragraph from './paragraph';

const NoData = ({className}) => {
    const animationController = useRef(null)
    useEffect(() => {
        Lottie.destroy()
        Lottie.loadAnimation({
            container:animationController.current,
            path:"bored-cat.json",
            loop:true,
            autoplay:true
        })
        
    }, []);
    return (
        <div className= {className}>
        <div style={{height:150}} ref={animationController}></div>
         <Paragraph className="p-0 m-0 mt-3 ms-3 text-center" text={`No data to show at the moment`}/>
        </div>

    )
}

export default NoData
