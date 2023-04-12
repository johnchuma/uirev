import React,{useEffect,useState} from 'react'
import UserNavigationBar from '../widgets/user_navigation_bar'
import {Row,Col,Container,Stack,Form,Button,Spinner, Modal,Carousel,Image} from 'react-bootstrap'
import { cardColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { getAllUserDesigns } from '../controllers/app_controller'
import {MdClose, MdDetails} from 'react-icons/md'

import ScrollContainer from 'react-indiana-drag-scroll'
import { textSize } from '../utils/font_size'
import { BsCheck, BsFileMinus, BsFilePlus, BsPlus, BsSubscript, BsSubtract } from 'react-icons/bs'
import { getDesignFeedbacks, submitDesignReview, submitFeedback } from '../controllers/review_controller'

const ExpertPage = () => {
    const [designs, setDesigns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState("");
    const [type, setType] = useState("Layout");
    const [percent, setPercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState("");
    const features = ['Layout','Navigation',  'Accessibility',  'Branding',  'Functionality',  'Performance',  'User Experience',  'Consistency',  'Imagery',  'Interactivity',  'Mobile optimization',  'Copywriting',  'Call to action',  'Visual hierarchy',  'User feedback',  'Emotional design',  'Micro-interactions',  'Localization',  'Brand voice',  'Innovation',  'SEO'];
    const [reviewFeatures, setReviewFeatures] = useState(features);
    const [feedback, setFeedback] = useState([]);
    const [finished, setFinished] = useState(false);

    const [selectedDesign, setSelectedDesign] = useState(null);
    useEffect(() => {
          setDesigns([])
          getAllUserDesigns().then((res)=>{
            setDesigns(res)
           }
    );
  
  
},[finished]);
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
            setShowModal(false)
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
      const designFeatures = [
        {
          title: "Layout and Composition",
          description: "The arrangement of visual elements on the page, including the use of grids, whitespace, and other layout techniques to create a balanced and visually appealing design."
        },
        {
          title: "Navigation and Flow",
          description: "The way in which users move through the design, including the use of menus, buttons, links, and other navigational elements to create a clear and intuitive user journey."
        },
        {
          title: "Accessibility and Inclusivity",
          description: "The design's ability to be used by people with different abilities, including those with visual, auditory, or physical impairments, and its adherence to relevant accessibility guidelines and standards."
        },
        {
          title: "Color Scheme",
          description: "The selection and use of colors throughout the design, including the choice of a primary color palette, the use of accent colors, and the overall visual impact of the color scheme."
        },
        {
          title: "Typography",
          description: "The selection and use of fonts throughout the design, including the choice of font families, font sizes, and other typographical elements to create a cohesive and legible visual language."
        },
        {
            title: "Consistency",
            description: "The degree to which design elements, such as typography, color, and layout, are consistent throughout the design to create a coherent and recognizable visual language."
          },
          {
            title: "Interactivity",
            description: "The use of interactive elements, such as animations, hover effects, and other user-triggered actions, to engage users and create a more dynamic user experience."
          },
          {
            title: "Whitespace",
            description: "The use of whitespace, or empty space, around design elements to create a sense of balance and clarity, and to help guide the user's eye through the design."
          },
          {
            title: "Images and Graphics",
            description: "The use of images, illustrations, and other visual graphics to enhance the design and convey information to the user, including the quality and appropriateness of the graphics used."
          },
          {
            title: "Microinteractions",
            description: "Small animations or interactions that provide feedback or create a sense of delight for the user, such as a subtle hover effect or a loading animation."
          },
          {
            title: "Error Handling",
            description: "The way in which the design handles errors or other unexpected events, including the clarity and helpfulness of error messages, and the ease with which the user can recover from errors."
          },
          {
            title: "Mobile Responsiveness",
            description: "The ability of the design to adapt and display appropriately on different mobile devices and screen sizes, including the use of responsive design techniques such as breakpoints and fluid layouts."
          },
          {
            title: "Scalability",
            description: "The ability of the design to scale and adapt to future changes or growth, such as the addition of new features or an increase in user traffic or data volume."
          },
          {
            title: "Brand Consistency",
            description: "The degree to which the design adheres to the brand guidelines and visual identity of the organization or product, including the use of consistent colors, fonts, and other brand elements."
          }
      ];
      
    const formStyles = {backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}
    return (
        <>
        <UserNavigationBar/>
        <Container>
        <Row className='mt-5'>
            <Col md="8 text-white">
                <h5>Work zone 🧑‍💼</h5>
                <p style={{fontSize:12,color:mutedText}}>You will have to carefully analyse and give <span style={{color:secondaryColor}}>feedback review</span> on these designs</p>
                
                
                <ScrollContainer autoScroll={true}  autoScrollSpeed={0.5} hideScrollbars={true} className="scroll-container mt-5">
                    {designs.map((design, index) => (
                    <div key={index} className="scroll-item"  >
                        <Image fluid src={design.downloadUrl} onClick={()=>{setShowModal(true); setSelectedDesign(design)}}  alt={`Design ${index + 1}`} style={{ height: "250px",maxWidth:"250px",paddingRight:"0px",marginRight:"10px", borderRadius:"0px", objectFit: "cover" }} />
                    
                        
                    </div>
                    ))}
                </ScrollContainer>

                
            </Col>
            <Col md="4" className='py-4' style={{backgroundColor:"#ffffff20",borderRadius:0}}>
                <Container>
                <div style={{fontSize:18}} className='text-white'>Summary</div>
                <p style={{color:mutedText,fontSize:12}}>Total stats today</p>
                <Row className='text-center'>
                
                <Col  className='mt-2' md={6} >
                    <h1 style={{color:"orange"}}>{designs.length}</h1>
                    <p style={{fontSize:textSize}}  className='text-white'>Pending designs</p>
                    </Col>
                    <Col className='mt-2' md={6} >
                    <h1 style={{color:secondaryColor}}>100</h1>
                    <p style={{fontSize:textSize}}  className='text-white'>Designs reviewed</p>
                    </Col>
                    <Col className='mt-2' md={6} >
                    <h1 style={{color:secondaryColor}}>100$</h1>
                    <p style={{fontSize:textSize}} className='text-white'>Total earnings</p>
                    </Col>
                </Row>
                </Container>
                
              
             
            </Col>
        </Row>
              
        </Container>

        <Modal dialogClassName='my-modal' id={`expertModal`} size='lg' borderRadius='60px'  show={showModal} onHide={()=>setShowModal(false)} >
                   <Modal.Header className='border-0'  >
                    <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                    <Modal.Title style={{fontSize:14,color:textColor}}>Review design</Modal.Title>
                    <MdClose onClick={()=>{setShowModal(false)}} size={20} color='white'/>
                    </Stack>
                   </Modal.Header>
                   <Modal.Body  >
                   <Row>
                    <Col>
                   {selectedDesign&&<><Image src={selectedDesign.downloadUrl} style={{maxHeight:"300px",borderRadius:"15px", width:"100%",objectFit:'contain'}} fluid/>
                   <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Design details</Modal.Title>
                    <p style={{fontSize:10,color:mutedText}}>{selectedDesign.designDetails}</p>
                    <a href={selectedDesign.figmaLink} style={{fontSize:10,color:"blue"}}>{selectedDesign.figmaLink}</a>
                    
                    <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Reviewed features</Modal.Title>
                    <Row className='flex-wrap mt-2 my-component-row' noGutters >
                        {feedback.map((item)=>{
                            return <Col className='flex-grow-0 px-1 my-component-col'>
                            <Stack direction='horizontal' style={{backgroundColor:"#ffffff5",borderRadius:30}} className='py-1 px-2 '>
                                <div  style={{fontSize:8,color:textColor,maxLines:1}}>
                                {item.type}
                                </div>
                                 <BsCheck color={secondaryColor}/>
                            </Stack>
                            
                            </Col>
                        })}
                        
                    </Row>
                   </> } 
                   
                    </Col>
                    <Col>
                    <Modal.Title className='mt-0' style={{fontSize:12,color:textColor}}>Select review feature</Modal.Title>
                     <Form.Group>
                     <Form.Select  onChange={(event)=>setType(event.currentTarget.value)} style={formStyles} className='mt-2 shadow-none text-white'>
                        {designFeatures.map((feature,index)=>{
                            return  <option id={index} value={feature.title}>{feature.title}</option>
                        })}
                        
                      </Form.Select>
                     </Form.Group>
                     
                    <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Enter review</Modal.Title>

                    <Form.Control as="textarea" maxLines={5} rows={5}  value={details} onChange={(event)=>setDetails(event.currentTarget.value)} className='mt-2  text-white shadow-none' style={formStyles} placeholder='Write your reviews on the design here'></Form.Control>
                    <Modal.Title className='mt-3' style={{fontSize:12,color:textColor}}>Give success percent on this feature</Modal.Title>
                   <Stack direction='horizontal' className='d-flex justify-content-between'>

                   <BsFileMinus onClick={()=>substractPercent()} size={20} color='white'/>
                     <Modal.Title className='mt-3' style={{fontSize:40,color:secondaryColor}}>{percent}%</Modal.Title>
                     <BsFilePlus onClick={()=>addPercent()}  size={20} color='white'/>
                   </Stack>
                   

                  
                   <Stack>
                  {
                    feedback.length <8?<Button onClick={()=>submitDesignFeedback()}  className='border-0 mt-3 '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
                    {  
                    uploading ?<Spinner size='sm'/>:'Submit' 
                    } 
               </Button>:<Button onClick={()=>finishReview()}  className='border-0 mt-3 '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
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
        </>
     
    )
}

export default ExpertPage
