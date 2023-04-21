import React from 'react'
import { Button } from 'react-bootstrap'
import { primaryColor, textColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import { click } from '@testing-library/user-event/dist/click'

const CustomButton = ({redirect,text,className,onClick}) => {
    return (
        <Button className={className??'border-0 mt-0'} onClick={onClick&&onClick} style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>{text}</Button>

    )
}

export default CustomButton
