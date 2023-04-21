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
import DesignUploadModal from '../widgets/design_upload_modal'


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
   const [loading, setLoading] = useState(false);

   const {user} = useContext(AuthContext)

 
   const uploadFile = ()=>{
    setStep(3)
    if(file && detail != ""){
        console.log('condition iko fresh')
        setUploading(true)
        const data = {
            figmaLink:link,
            designDetails:detail,
        }
       uploadDesign(file,data).then(()=>{
        const value = refresh+1;
        setRefresh(value);
        setUploading(false)
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
                <Paragraph text="
                Upload your latest design We're excited to see what you've been working on! Once you do, you'll get feedback from our team within 24 hours "
              
              />
                <Button className='border-0  mt-3'  onClick={()=>setShow(true)}  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Upload</Button>
                 
                </div>
               <div>
               </div>

                </div>
                
               {
                loading == true?<Spinner/>:<ScrollContainer autoScroll={true} style={{borderRadius:10}}  autoScrollSpeed={0.5} hideScrollbars={true} className="scroll-container mt-5">
                {designs.map((design, index) => (
               <div key={index} className="scroll-item me-2"  style={{ position: 'relative', width: '250px', height: '250px' }}>
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
               }
                

                <FeebackModal show={showReviewModal} selectedDesign={selectedDesign} onHide={()=>setShowReviewModal(false)} />
            </Col>
            <Col md="4" className='py-4 text-center' style={{backgroundColor:mutedBackground,borderRadius:10}}>
                <Container>
                <div style={{width:"100%",height:200}} ref={animationController}></div>
                <div style={{fontSize:18}} className='text-white'>Statistics</div>
                <Paragraph text=" Keep track of your designs"/>
                <Row className='text-center'>
                
                <Col  className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts?counts.inReview:"0"}</h1>
                <Paragraph text="In review"/>

                    </Col>
                    <Col className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts?counts.reviewed:"0"}</h1>
                <Paragraph text="Reviewed"/>

                    </Col>
                    <Col className='mt-2' md={4} >
                    <h1 style={{color:textColor}}>{counts?counts.totalDesigns:"0"}</h1>
                <Paragraph text="Total designs"/>

                    </Col>
                </Row>
                </Container>
            </Col>
        </Row>
              
          
                        
                  
      
       
                 

      
        
        </Container>
     
        <DesignUploadModal show={show} setShow={setShow} setShowToast={setShowToast} refresh={refresh} setRefresh={setRefresh}/>
        </>
    )
}

export default UserPage
