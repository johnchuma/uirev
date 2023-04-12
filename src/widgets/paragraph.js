import React from 'react'
import { mutedText, textColor } from '../utils/color_pallate'

const Paragraph = ({text,size,onClick,className,color}) => {
    return (
        <h1 onClick={onClick} className={className}  style={{fontSize:size??12,color:color??mutedText,fontWeight:400,lineHeight:2}}>{text}</h1>
    )
}

export default Paragraph
