import React from 'react'
import { textColor } from '../utils/color_pallate'

const Heading = ({text,size,onClick,className,color}) => {
    return (
        <h1 onClick={onClick} className={className}  style={{fontSize:size??20,color:color??textColor,fontWeight:600}}>{text}</h1>
    )
}

export default Heading
