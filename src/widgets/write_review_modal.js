import React,{useEffect,useState} from 'react'
import UserNavigationBar from '../widgets/user_navigation_bar'
import {Row,Col,Container,Stack,Form,Button,Spinner, Modal,Carousel,Image} from 'react-bootstrap'
import { backgroundColor, cardColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
// import { getAllUserDesigns } from '../controllers/app_controller'
import {MdClose, MdDetails} from 'react-icons/md'

import { textSize } from '../utils/font_size'
import { BsCheck, BsFileMinus, BsFilePlus, BsPlus, BsSubscript, BsSubtract } from 'react-icons/bs'
import { designFeatures } from '../utils/design_features'
import { getDesignFeedbacks, submitDesignReview, submitFeedback } from '../controllers/review_controller'
import Heading from './heading'
import Paragraph from './paragraph'

const WriteReviewModal = ({showModal, onHide,selectedDesign}) => {
    const [details, setDetails] = useState("");
    const [type, setType] = useState("Layout");
    const [percent, setPercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState("");
  
    const features = ['Layout','Navigation',  'Accessibility',  'Branding',  'Functionality',  'Performance',  'User Experience',  'Consistency',  'Imagery',  'Interactivity',  'Mobile optimization',  'Copywriting',  'Call to action',  'Visual hierarchy',  'User feedback',  'Emotional design',  'Micro-interactions',  'Localization',  'Brand voice',  'Innovation',  'SEO'];
    const [reviewFeatures, setReviewFeatures] = useState(features);
    const [feedback, setFeedback] = useState([]);
    const [finished, setFinished] = useState(false);

useEffect(() => {
    setFeedback([])
    selectedDesign && getDesignFeedbacks(selectedDesign.id).then((data)=>{
        setFeedback(data)  
    })
   
    
}, [reviewFeatures,showModal]);

    const addPercent =()=>{
        if(percent<100){
          setPercent(percent+5);
          
        }
    }
    const substractPercent =()=>{
      if(percent>0){
        setPercent(percent-5);
        
      }

      
  }
  const filteredArray= ()=>{
      let array = reviewFeatures;
      feedback.forEach(item => {
        if(array.includes(item.type)){
          array = array.filter((value)=>value !== item.type)
        }
      });
      return array;
  }
   const finishReview = ()=>{
      setUploading(true)
      submitDesignReview(selectedDesign.id,feedback).then((value)=>{
          setUploading(false)
          setFinished(true)
          onHide()
      })
   }
  const submitDesignFeedback = ()=>{
      setUploading(true)
      const data  = {
          designID:selectedDesign.id,
          userID:selectedDesign.userID,
          type:type,
          percent:percent,
          review:details
      }
      submitFeedback(data).then(()=>{
      setUploading(false)
      setReviewFeatures(features.filter((value)=>value !== selectedFeature))
      setDetails("")
      setPercent(0)
      })
    }

  const formStyles = {backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}

    return (
        <Modal dialogClassName='my-modal' id={`expertModal`} size='xl' borderRadius='60px'  show={showModal} onHide={onHide} >
        <Modal.Header className='border-0'  >
         <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
         <Modal.Title style={{fontSize:14,color:textColor}}>Review design</Modal.Title>
         <MdClose onClick={onHide} size={20} color='white'/>
         </Stack>
        </Modal.Header>
        <Modal.Body  >
        <Row>
         <Col>
        {selectedDesign&&<><Image src={selectedDesign.downloadUrl} fluid/>
        <Modal.Title className='mt-4 ' style={{fontSize:12,color:textColor}}>Design details</Modal.Title>
         <Paragraph text={selectedDesign.designDetails}/>
         <a href={selectedDesign.figmaLink} style={{fontSize:12,color:"blue"}}>{selectedDesign.figmaLink}</a>
         
         <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Reviewed features</Modal.Title>
         <Row className='flex-wrap mt-2 my-component-row' noGutters >
             {feedback.map((item)=>{
                 return <Col className=' m-0 p-0' xs="auto">
                 <Stack direction='horizontal' style={{backgroundColor:"#ffffff5",borderRadius:30}} className='py-1 px-2 '>
                     <div className='px-3 py-2'  style={{fontSize:12,borderRadius:40, backgroundColor:secondaryColor, color:backgroundColor,maxLines:1}}>
                     {item.type}
                     </div>
                 </Stack>
                 
                 </Col>
             })}
             
         </Row>
        </> } 
        
         </Col>
         <Col>
         <Modal.Title className='mt-0 mb-1' style={{fontSize:12,color:textColor}}>Select review feature</Modal.Title>
          <Form.Group>
          <Form.Select  onChange={(event)=>setType(event.currentTarget.value)} style={formStyles} className='mt-2 py-3 shadow-none text-white'>
             {designFeatures.map((feature,index)=>{
                 return  <option id={index} value={feature.title}>{feature.title}</option>
             })}
             
           </Form.Select>
          </Form.Group>
          
         <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Enter review</Modal.Title>

         <Form.Control as="textarea" maxLines={5} rows={5}  value={details} onChange={(event)=>setDetails(event.currentTarget.value)} className='mt-2 py-3 text-white shadow-none' style={formStyles} placeholder='Write your reviews on the design here'></Form.Control>
         <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Give success percent on this feature</Modal.Title>
        <Stack direction='horizontal' className='d-flex justify-content-between mt-3'>
        
        <div className='btn p-0'>
        <BsFileMinus onClick={()=>substractPercent()} size={30} color={primaryColor}/>
        </div>
            <Heading size={40} className="p-0 m-0" text={`${percent}%`}/>
          <div className='btn p-0'>
          <BsFilePlus  onClick={()=>addPercent()}  size={30} color={primaryColor}/>

          </div>
        </Stack>
        

       
        <Stack>
       {
         feedback.length <2?<Button onClick={()=>submitDesignFeedback()}  className='border-0 mt-5 py-3 '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
         {  
         uploading ?<Spinner size='sm'/>:'Submit' 
         } 
    </Button>:<Button onClick={()=>finishReview()}  className='border-0 mt-5 py-3  '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
               {  
               uploading ?<Spinner size='sm'/>:'Finish' 
               } 
          </Button>
       }
       
        
        </Stack>
        
         </Col>
         
        </Row>
        </Modal.Body>
</Modal>
    )
}

export default WriteReviewModal
