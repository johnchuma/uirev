import React from 'react'
import { Image } from 'react-bootstrap'

const Avatar = ({image,size}) => {
    return (
        <Image src={image}  className='rounded-circle' style={{height:size, width:size,backgroundSize:'cover',objectFit:'cover'}}/>

    )
}

export default Avatar
