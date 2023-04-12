import React from 'react'
import { mutedText } from '../utils/color_pallate'

const Muted = ({text,size}) => {
    return (
        <h1 style={{fontSize:size??10,color:mutedText,fontWeight:400}}>{text}</h1>
    )
}

export default Muted
