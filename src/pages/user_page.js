import React, { useContext, useEffect, useRef, useState } from 'react'
import UserNavigationBar from '../widgets/user_navigation_bar'
import {Row,Modal,Col,Container,Button,Image,Stack,Form,Spinner} from 'react-bootstrap'
import { textSize } from '../utils/font_size'
import { backgroundColor, cardColor, colors, mutedBackground, mutedText, primaryColor, randomColor, secondaryColor, textColor } from '../utils/color_pallate'
import { auth } from '../controllers/firebase'
import { BsCheck, BsCloudUpload, BsFileMinus, BsPlus } from 'react-icons/bs'
import { MdClose} from 'react-icons/md'
import { getDesigns, uploadDesign } from '../controllers/app_controller'
import SummaryItem from '../widgets/summary_item'
import FeedbackItem from '../widgets/feedback_item'
import ScrollContainer from 'react-indiana-drag-scroll'
import { designsCounts, getAllFeedbacks } from '../controllers/user_controller'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AuthContext } from '../providers/auth_provider'
import Lottie from 'lottie-web'
import FeebackModal from '../widgets/feedback_modal'
import { storePaymentInfo } from '../controllers/payment_controller'
import ErrorToast from '../utils/toasts'
import Heading from '../widgets/heading'
import Paragraph from '../widgets/paragraph'


const UserPage = () => {

   const [show, setShow] = useState(false);
   const [file, setFile] = useState(null);
   const [selectedDesign, setSelectedDesign] = useState(null);
   const [imagePreview, setImagePreview] = useState("");
   const [link, setLink] = useState("");
   const [detail, setDetail] = useState("");
   const [uploading, setUploading] = useState(false);
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [designs, setDesigns] = useState([]);
   const [refresh, setRefresh] = useState(0);
   const [counts,setCounts] = useState(null);
   const [allFeedbacks,setAllFeedbacks] = useState([]);
   const [feebackTypeAvarages,setFeedbackTypeAvarages] = useState([]);
   const [step, setStep] = useState(1);
   const {user} = useContext(AuthContext)

  
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
        setStep(3)
       }
       else{
        setShowToast(true)
       }
   }
   const uploadFile = ()=>{
    setStep(3)
    if(file && detail != ""){
        console.log('condition iko fresh')
        setUploading(true)
        const data = {
            figmaLink:link,
            designDetails:detail,
        }
       uploadDesign(file,data,user).then(()=>{
        const value = refresh+1;
        setRefresh(value);
        
       })
    }
    else{
        console.log("Comes here")
    }
    
   }
   const animationController = useRef(null)
   useEffect(() => {
   
       Lottie.destroy()
       Lottie.loadAnimation({
           container:animationController.current,
           autoplay:true,
           path:'finance-management.json',
           renderer:'svg',
           loop:true
       })
       
   }, []);
   useEffect(() => {
         setDesigns([])
         getDesigns().then((response)=>{
            if(JSON.stringify(response) != JSON.stringify(designs)){
                setDesigns(response)
            }
         });
         designsCounts().then((result)=>{
            if(JSON.stringify(result) != JSON.stringify(designs)){
                setCounts(result)
            }
    })
 }, [refresh]);
 const titles = ["Upload design","Payment (1$ only)","Final"]


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
  const [showToast, setShowToast] = useState(false);
    return (
        < >
        <div style={{overflow:"hidden"}}>

        </div>
        <UserNavigationBar/>
        <ErrorToast show={showToast}  onClose={()=>setShowToast(false)}/>
        <Container>
        <Row className='mt-5'>
            <Col md="8 text-white">
                <div className='d-flex justify-content-between align-items-start'>
                <div>
                <h5>Hi 👋, {user.name} </h5>
                <p style={{fontSize:12,color:mutedText}}>
                Upload your latest design 
                <span style={{color:'#fff'}}>👀🎨</span>
                . We're excited to see what you've been working on! <br/>Once you do, you'll get feedback from our team within 24 hours 
                <span style={{color:'#fff'}}>⏰👍</span>
                </p>
                <Button className='border-0  mt-3'  onClick={()=>setShow(true)}  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Upload</Button>
                 
                </div>
               <div>
               </div>

                </div>
                
               
                <ScrollContainer autoScroll={true} style={{borderRadius:10}}  autoScrollSpeed={0.5} hideScrollbars={true} className="scroll-container mt-5">
                    {designs.map((design, index) => (
                   <div key={index} className="scroll-item me-2"  style={{ position: 'relative', maxWidth: '250px', height: '250px' }}>
                   <Image onClick={()=>{setShowReviewModal(true);setSelectedDesign(design)}} fluid src={design.downloadUrl} alt={`Design ${index + 1}`} style={{ maxWidth: '250px', height: '250px', borderRadius: '10px', objectFit: 'cover', zIndex: '0' }} />
                  {
                    design.inReview && <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '1', width:"100%", height: '250px', borderRadius: '10px', backgroundColor: '#00000099' }}
                    className='d-flex justify-content-center text-center align-items-center'> 
                    <div>
                    <p className='py-0 my-0' style={{fontSize:textSize,fontWeight:400, color:secondaryColor,fontSize:textSize}} >In review</p>
                    </div>
                    </div>
                  } 
                   
                 </div>
                    ))}
                </ScrollContainer>

                <FeebackModal show={showReviewModal} selectedDesign={selectedDesign} onHide={()=>setShowReviewModal(false)} />
            </Col>
            <Col md="4" className='py-4 text-center' style={{backgroundColor:mutedBackground,borderRadius:10}}>
                <Container>
                <div style={{width:"100%",height:200}} ref={animationController}></div>
                <div style={{fontSize:18}} className='text-white'>Statistics</div>
                <p style={{color:mutedText,fontSize:textSize}}>Keep track of your <span style={{}}>designs</span></p>
                <Row className='text-center'>
                
                <Col  className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts&&counts.inReview}</h1>
                    <p style={{fontSize:textSize,color:mutedText,fontSize:textSize}} >In review</p>
                    </Col>
                    <Col className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts&&counts.reviewed}</h1>
                    <p style={{fontSize:textSize,color:mutedText,fontSize:textSize}} >Reviewed</p>
                    </Col>
                    <Col className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts&&counts.totalDesigns}</h1>
                    <p style={{fontSize:textSize,color:mutedText,fontSize:textSize}} >Total designs</p>
                    </Col>
                </Row>
                </Container>
            </Col>
        </Row>
              
          
                        
                  
      
       
                 

      
        
        </Container>
     
        <Modal dialogClassName='my-modal' id="modal1" size='md' borderRadius='0px'  show={show} onHide={()=>{setShow(false);setStep(1)}} >
                   <Modal.Header className='border-0'  >
                    <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                        <div>
                        <Modal.Title style={{fontSize:14,color:textColor}}>  {titles[step-1]}  <span className='py-2 ms-2 px-2' style={{fontSize:10,borderRadius:40, backgroundColor:"orange", color:"black"}}>{step}/3 steps</span></Modal.Title>
                       
                        </div>
                    <MdClose onClick={()=>{setShow(false); setStep(1); setImagePreview("")}} size={20} color='white'/>
                    </Stack>
                   </Modal.Header>
                   { 
                    step == 1 ?
                   <Modal.Body>
                   <Modal.Title style={{fontSize:12,color:textColor}}>Pick your design image</Modal.Title>
                   <div className='d-flex justify-content-center align-items-center mt-3 px-3' style={{height:100,width:"100%",border:'1px dotted #ffffff00',borderRadius:10,}}>
                    {imagePreview == ""?
                    <BsCloudUpload  onClick={()=>document.getElementById('file').click()}  color={secondaryColor} size={50} />
                    
                   : <Image src={imagePreview} onClick={()=>document.getElementById('file').click()} fluid style={{height:80}}/>}
                    
                    <Form.Control  onChange={handleFileInputChange} id='file' style={{display:'none'}} className='mx-5 py-3 bs-dark' type='file'/>
                  </div>

                    <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Figma link (optional)</Modal.Title>
            
                     <Form>
                     {/* <input type="file" onChange={handleFileInputChange} /> */}

                        <Form.Control onChange={(event)=>setLink(event.target.value)} className='mt-2 py-2 text-white shadow-none' style={{backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}} placeholder='Link'></Form.Control>
                        <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Tell us what is your design about ?</Modal.Title>
                        <Form.Control as='textarea' rows={4} onChange={(event)=>setDetail(event.target.value)} className='mt-2  text-white shadow-none' style={{backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}} placeholder='Enter design descriptions'></Form.Control>
                     </Form>
                     <Stack>
                     <Button onClick={validateFormContinue} className='border-0 mt-3 py-3'  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
                          {  
                          uploading ?<Spinner size='sm'/>:'Continue' 
                          } 
                     </Button>
                     </Stack>
                   </Modal.Body>:
                 step ==2?
                  <Modal.Body>
                        <PayPalScriptProvider   onError ={(error)=>console.log(error)} options={{ "client-id": "AZ0M6lEnryJLoQHlqbMhW34OG-WMs9mfMAKUKcvnOo8uleuq-Q98NOf9-wpgnJJdG-vvd0EaYC4JDmbv" }} >
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
                     
                     <Heading text="Uploaded successfully" className="mt-2"/>
                      <Paragraph size={10} text="We will review your design and send feedback withing 24 hours"/>
                    </div>
                    }


                   </Modal.Body>
                   }
                </Modal>
        </>
    )
}

export default UserPage
