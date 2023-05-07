import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useState } from 'react'
import { Button, Form, Image, Modal, Spinner, Stack } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { secondaryColor, textColor,cardColor,primaryColor, backgroundColor } from '../utils/color_pallate';
import Heading from './heading';
import Paragraph from './paragraph';
import { BsCheck, BsCloudUpload } from 'react-icons/bs';
import { textSize } from '../utils/font_size';
import { storePaymentInfo } from '../controllers/payment_controller';
import { uploadDesign } from '../controllers/design_controller';
import { updateTestStatus } from '../controllers/job_controller';
import { updateStep } from '../controllers/challenge_controller';
import CustomButton from './button';

const DesignUploadModal = ({show, setShow,setShowToast,type,refresh,setRefresh,challengeId,participants}) => {
 const titles = ["Upload design","Pay 1$ to continue","Final"]
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [link, setLink] = useState("");
  const [detail, setDetail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);

  const handleFileInputChange = (event)=>{
    setFile(event.target.files[0])
    if(event.target.files[0]){
        console.log("inafika")
        setImagePreview(URL.createObjectURL(event.target.files[0]))
        console.log(imagePreview)
    }
}
    const validateFormContinue = ()=>{
    if(imagePreview != "" & detail !=""){
    setStep(2)
    // uploadFile();
    }
    else{
    setShowToast(true)
    }
    }
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 1,
            },
          },
        ],
      });
    };
  
    const onApprove = (data, actions) => {
      return actions.order.capture().then((details) => {
        if(details.status == "COMPLETED"){
           uploadFile();
           storePaymentInfo().then((value)=>{
              setUploading(false)
              setImagePreview("")
           })
        }
      });
    };
    const uploadFile = ()=>{
      setStep(3)
      if(file && detail != ""){
          setUploading(true)
          const data = {
              figmaLink:link,
              designDetails:detail,
              type:type??'normal'
          }
          if(type == "challenge"){
            uploadDesign(file,data,challengeId).then(()=>{
                 updateStep(challengeId,2,participants).then(()=>setRefresh())
                 setUploading(false)
           })
          }
          else{
            uploadDesign(file,data).then(()=>{
              const value = refresh+1;
              if(type == "test"){
                updateTestStatus('submitted').then((value)=>{
                  setRefresh(value);
                })
               }
               else{
                setRefresh(value);
               }
               setUploading(false)
           })
          }
         

       

      }
      else{
          console.log("Error")
      }
      
     }
    return (
       <div>
        <Modal dialogClassName={step==2?'payment':'my-modal'} centered className='uploadModal' id="modal1" size='md'  borderRadius='0px'  show={show} onHide={()=>{setShow(false);setStep(1)}} >
                   <Modal.Header className='border-0'  >
                    <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                        <div>
                        <Modal.Title style={{fontSize:14,color:step==2?backgroundColor:textColor}}>  {titles[step-1]}  <span className='py-2 ms-2 px-2' style={{fontSize:10,borderRadius:40, backgroundColor:"orange", color:"black"}}>{step}/3 steps</span></Modal.Title>
                       
                        </div>
                    <MdClose onClick={()=>{setShow(false); setStep(1); setImagePreview("")}} size={20} color={step==2?backgroundColor:textColor}/>
                    </Stack>
                   </Modal.Header>
                   { 
                    step == 1 ?
                   <Modal.Body>
                   <Modal.Title style={{fontSize:12,color:textColor,fontWeight:300}}>Pick your design image</Modal.Title>
                   <div className='d-flex justify-content-center align-items-center mt-3 px-3' style={{height:100,width:"100%",border:'1px dotted #ffffff00',borderRadius:10,}}>
                    {imagePreview == ""?
                    <BsCloudUpload  onClick={()=>document.getElementById('file').click()}  color={secondaryColor} size={50} />
                    
                   : <Image src={imagePreview} onClick={()=>document.getElementById('file').click()} fluid style={{height:80}}/>}
                    
                    <Form.Control  onChange={handleFileInputChange} id='file' style={{display:'none'}} className='mx-5 py-3 bs-dark' type='file'/>
                  </div>
                    <Modal.Title className='mt-3' style={{fontSize:12,color:textColor,fontWeight:300}}>Figma link (optional)</Modal.Title>
                     <Form>
                     {/* <input type="file" onChange={handleFileInputChange} /> */}

                        <Form.Control onChange={(event)=>setLink(event.target.value)} className='mt-2 py-3 text-white shadow-none' style={{backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}} placeholder='Link'></Form.Control>
                        <Modal.Title className='mt-3' style={{fontSize:12,color:textColor,fontWeight:300}}>Design description?</Modal.Title>
                        <Form.Control as='textarea' rows={4} onChange={(event)=>setDetail(event.target.value)} className='mt-2 py-3 text-white shadow-none' style={{backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}} placeholder='Enter design description'></Form.Control>
                     </Form>
                     <Stack>
                     <CustomButton onClick={validateFormContinue} className="mt-4 border-0 py-3" text={`Continue`}/>
                     </Stack>
                   </Modal.Body>:
                 step ==2?
                  <Modal.Body>
                        <PayPalScriptProvider   onError ={(error)=>console.log(error)} options={{ "client-id": "ASYgGsuQca4aUJvRdoFffzj-kdpo_2890MLCcbmAgexcpdSPnuDmdihXlP0-_WEA5zn-t0XzBtX0zEKU" }} >
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove}  />
                        </PayPalScriptProvider>
                   </Modal.Body>
                   :
                   <Modal.Body className='d-flex justify-content-center align-items-center py-5'>
                    {
                      uploading?<div className='text-center'>
                        <Spinner style={{color:secondaryColor}} size="lg"/>
                     <Paragraph  text="Uploading, please wait.." className="mt-3"/>
                          
                        </div>: <div className='text-center '>
                      {/* <div className='rounded-circle mb-3 me-auto ms-auto d-flex justify-content-center align-items-center' style={{backgroundColor:secondaryColor,height:70,width:70}}> */}
                      <BsCheck size={60} color={secondaryColor}/>
                     
                     <Heading size={17} text="Uploaded successfully" className="mt-2"/>
                      <Paragraph size={12} text="We will review your design and send feedback withing 24 hours"/>
                    </div>
                    }
                   </Modal.Body>
                   }
                </Modal>
       </div>
    )
}

export default DesignUploadModal
