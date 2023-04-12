import React, { useEffect, useRef } from 'react'
import { Image, Modal, Stack } from 'react-bootstrap'
import { mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { BsGoogle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import Lottie from 'lottie-web'
import { googleSignIn } from '../controllers/app_controller'
import { textSize } from '../utils/font_size'
import { useRedirect } from '../utils/redirect'

const LoginModal = ({show,onHide}) => {
    const animationController = useRef(null)
    const redirect = useRedirect()
    useEffect(() => {
        console.log('hi there')
        Lottie.loadAnimation({
            container:animationController.current,
            autoplay:true,
            path:'login.json',
            renderer:'svg',
            loop:true
        })
        
    }, [show]);
   
    return (
        
        <Modal className='my-modal' size='md' show={show} onHide={onHide}>
            <Modal.Header className='border-0' closeLabel='close'>
            <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-end'>
                    {/* <Modal.Title style={{fontSize:14,color:textColor}}>Welcome!</Modal.Title> */}
                    <MdClose onClick={onHide} size={20} color='white'/>
                    </Stack>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <div className='' style={{height:160,width:"100%"}} ref={animationController}></div>
               <div className='mt-1' style={{color:textColor,fontSize:20}}>Sign in to UIrev</div>
               <div className='mt-1' style={{color:mutedText,fontSize:12,}}>Use your Google account to sign in and access <br/>all of our features and benefits.</div>

               <div onClick={()=>{onHide(); googleSignIn().then((value)=>{
                if(value){
                    redirect(value)
                }
               })}} className='btn py-3 px-5 my-5' style={{borderColor:primaryColor,backgroundColor:primaryColor, borderRadius:10}}>
                <Stack direction='horizontal'>
                  
                 <Image src='google.png'  style={{height:17,width:17}} />
                 <div className='ms-2'  style={{fontSize:textSize,color:'white'}}>Continue with google</div>
                </Stack>
               </div>
            </Modal.Body>
        </Modal>
        
    )
}

export default LoginModal
