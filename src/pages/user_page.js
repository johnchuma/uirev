import React, { useContext, useEffect, useRef, useState } from 'react'
import UserNavigationBar from '../widgets/user_navigation_bar'
import {Row,Modal,Col,Container,Button,Image,Stack,Form,Spinner} from 'react-bootstrap'
import { textSize } from '../utils/font_size'
import { backgroundColor, cardColor, colors, mutedBackground, mutedText, primaryColor, randomColor, secondaryColor, textColor } from '../utils/color_pallate'
import { auth } from '../controllers/firebase'
import { BsCheck, BsCloudUpload, BsFileMinus, BsPlus } from 'react-icons/bs'
import { MdClose} from 'react-icons/md'
// import { getDesigns, uploadDesign } from '../controllers/app_controller'
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
import { getDesigns, uploadDesign } from '../controllers/design_controller'
import NoData from '../widgets/no_data'


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

 const steps = [
    {title:"Upload design"},
    {title:"Pending designs",details:``},
    {title:"Reviewed designs",details:``}
];
 const [currentStep, setCurrentStep] = useState(0);

  const [showToast, setShowToast] = useState(false);
    return (
        < >
        <div style={{overflow:"hidden"}}>

        </div>

        <UserNavigationBar/>
        <div style={{height:1,backgroundColor:mutedBackground}} className=' w-100 mb-4'></div>
        <Container>
        <Heading size={15} className="" text="My designs"/>
        </Container>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        <ErrorToast show={showToast}  onClose={()=>setShowToast(false)}/>
        <Container>
            <Row>

        {
                 steps.map((item,index)=>{
                return <Col className='px-0 mb-3'>
                    <Stack direction='horizontal' style={{display:"flex",alignItems:"center"}} >
                    <div  style={{height:50,width:50,borderColor:currentStep>=index?secondaryColor:mutedText,borderWidth:2,borderStyle:"solid"}} className='rounded-circle d-flex justify-content-center align-items-center mt-4'>
                          <Heading className="p-0 m-0" fontWeight={400} color={currentStep>=index?secondaryColor:mutedText} size={15} text={index+1}/>
                    </div>
                    <div style={{flex:1}}>
                    <Heading className="p-0 m-0  text-center" fontWeight={400}  color={currentStep>=index?secondaryColor:mutedText} size={12} text={item.title}/>
                    <div style={{height:3, backgroundColor:currentStep>=index?secondaryColor:mutedText}} className=' rounded-circle mt-2'></div>
                    </div>
                    </Stack> 
                </Col>

                 })   
                }
            </Row>

        <div className='p-5 mt-2 mb-3' style={{backgroundColor:cardColor,borderRadius:15}}>
        
        <Row className=''>
            {
                currentStep == 0 && <Col md="10 text-white">
                <div className='d-flex justify-content-between align-items-start'>
                <div>
                <Heading size={15} text={`Hi! ${user.name}`}/>
                <Paragraph text="
                Upload your latest design, We're excited to see what you've been working on! Once you do, you'll get feedback from our team within 24 hours "
              />
                <Button className='border-0  mt-3'  onClick={()=>setShow(true)}  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Upload</Button>
                </div>
               <div>
               </div>

                </div>
                
              
                

                <FeebackModal show={showReviewModal} selectedDesign={selectedDesign} onHide={()=>setShowReviewModal(false)} />
            </Col>
            }

            {
              currentStep == 1? designs.filter((design)=>design.inReview == true).length == 0?<NoData/>: designs.filter((design)=>design.inReview == true).map((design)=>
                <Col md="4">
                <Image style={{borderRadius:10}} src={design.downloadUrl} fluid />
                </Col>
                ):<></>
            }
            
            {
             currentStep == 2? designs.filter((design)=>design.inReview == false).length == 0?<NoData/>: designs.filter((design)=>design.inReview==false).map((design)=>
                <Col md="4">
                <Image onClick={()=>{setShowReviewModal(true); setSelectedDesign(design)}} style={{borderRadius:10}} src={design.downloadUrl} fluid />
                </Col>
                ):<></>
            }
            
           
        </Row>
        </div>
      
        <Stack direction='horizontal' className='d-flex justify-content-end '>
                {/* {user.testStatus} */}
                <Heading fontWeight={400} size={12} onClick={()=>{currentStep>0&&setCurrentStep(currentStep-1)}} color={currentStep >0?primaryColor:mutedText} className="pe-3 btn border-0" text="Prev"/>
                <Heading fontWeight={400} size={15} className="px-3 " text={currentStep+1}/>
                <Heading fontWeight={400} size={12} onClick={()=>{
                      currentStep<steps.length-1&& setCurrentStep(currentStep+1)
                    
                    }} color={currentStep==steps.length-1?mutedText: primaryColor}  className="ps-3 btn border-0" text="Next"/>

            </Stack>
          
                        
                  
      
       
                 

      
        
        </Container>
       <FeebackModal show={showReviewModal} onHide={()=>{setShowReviewModal(false)}} selectedDesign={selectedDesign}/>
        <DesignUploadModal show={show} setShow={setShow} setShowToast={setShowToast} refresh={refresh} setRefresh={setRefresh}/>
        </>
    )
}

export default UserPage
