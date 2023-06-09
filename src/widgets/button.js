import React from 'react'
import { Button } from 'react-bootstrap'
import { primaryColor, textColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import { click } from '@testing-library/user-event/dist/click'

const CustomButton = ({redirect,text,className,onClick,backgroundColor,textColor,as}) => {
    return (
        <Button as={as??`button`} className={className??'border-0 mt-0'} onClick={onClick&&onClick} style={{color:textColor??textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:backgroundColor??primaryColor,padding:"10px 30px"}}>{text}</Button>

    )
}

export default CustomButton
