import React, { useContext, useEffect, useRef } from 'react'
import { Image, Modal, Stack } from 'react-bootstrap'
import { mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { BsGoogle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import Lottie from 'lottie-web'
import { textSize } from '../utils/font_size'
import { useRedirect } from '../utils/redirect'
import Paragraph from './paragraph'
import { AuthContext } from '../providers/auth_provider'
import { googleSignIn } from '../controllers/auth_controller'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({show,onHide,path=""}) => {
    const animationController = useRef(null)
  const {setUser} = useContext(AuthContext)
    const redirect = useRedirect()
    const navigate = useNavigate()
    useEffect(() => {
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
               <Paragraph className="px-5" text={`Use your Google account to sign in and access all of our features and benefits.`}/>

               <div onClick={()=>{onHide(); googleSignIn().then((value)=>{
                if(value){
                    setUser(value)
                    if(path == ""){
                        redirect(value)
                    }
                    else{
                          navigate(path)
                    }
                    
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
