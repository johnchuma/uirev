import React, { useContext, useEffect, useRef, useState } from 'react'
import {Col,Row,Container,Button,Image,Stack, Modal, Card} from 'react-bootstrap'
import { backgroundColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor, vibrantColors } from '../utils/color_pallate'
import {useNavigate} from 'react-router-dom'
import { textSize } from '../utils/font_size'
// import { findUser, googleSignIn} from '../controllers/app_controller'
import { auth } from '../controllers/firebase'
import { AuthContext } from '../providers/auth_provider'
import LoginModal from '../widgets/login_modal'
import { redirect, useRedirect } from '../utils/redirect'
import Heading from '../widgets/heading'
import Paragraph from '../widgets/paragraph'
import Muted from '../widgets/muted'
import { BsCheck } from 'react-icons/bs'
import Lottie from 'lottie-web'
const HomePage = () => {
   
    const navigate = useNavigate()
    const [signing, setSigning] = useState(false)
    const [moreAboutUs, setMoreAboutUs] = useState(false)

    const {user} = useContext(AuthContext)
    const [showLoginModal, setShowLoginModal] = useState(false);

  const redirect = useRedirect()
   
  const designFeatures = [
    {
      title: "Layout and Composition",
      description: "The arrangement of visual elements on the page, including the use of grids, whitespace, and other layout techniques to create a balanced and visually appealing design.",
      emoji: "📐"
    },
    {
      title: "Navigation and Flow",
      description: "The way in which users move through the design, including the use of menus, buttons, links, and other navigational elements to create a clear and intuitive user journey.",
      emoji: "🧭"
    },
    {
      title: "Accessibility and Inclusivity",
      description: "The design's ability to be used by people with different abilities, including those with visual, auditory, or physical impairments, and its adherence to relevant accessibility guidelines and standards.",
      emoji: "♿️"
    },
    {
      title: "Color Scheme",
      description: "The selection and use of colors throughout the design, including the choice of a primary color palette, the use of accent colors, and the overall visual impact of the color scheme.",
      emoji: "🎨"
    },
    {
      title: "Typography",
      description: "The selection and use of fonts throughout the design, including the choice of font families, font sizes, and other typographical elements to create a cohesive and legible visual language.",
      emoji: "🔤"
    },
    {
      title: "Consistency",
      description: "The degree to which design elements, such as typography, color, and layout, are consistent throughout the design to create a coherent and recognizable visual language.",
      emoji: "🤝"
    },
    {
      title: "Interactivity",
      description: "The use of interactive elements, such as animations, hover effects, and other user-triggered actions, to engage users and create a more dynamic user experience.",
      emoji: "🕹️"
    },
    {
      title: "Whitespace",
      description: "The use of whitespace, or empty space, around design elements to create a sense of balance and clarity, and to help guide the user's eye through the design.",
      emoji: "⚪"
    },
    {
      title: "Images and Graphics",
      description: "The use of images, illustrations, and other visual graphics to enhance the design and convey information to the user, including the quality and appropriateness of the graphics used.",
      emoji: "🖼️"
    },
    {
      title: "Microinteractions",
      description: "Small animations or interactions that provide feedback or create a sense of delight for the user, such as a subtle hover effect or a loading animation.",
      emoji: "💫"
    },
    {
      title: "Error Handling",
      description: "The way in which the design handles errors or other unexpected events, including the clarity and helpfulness of error messages, and the ease with which the user can recover from errors.",
      emoji: "⚠️"
    },
    {
      title: "Mobile Responsiveness",
      description: "The ability of the design to adapt and display appropriately on different mobile devices and screen sizes, including the use of responsive design techniques such as breakpoints and fluid layouts.",
      emoji: "📱"
    },
    {
      title: "Scalability",
      description: "The ability of the design to scale and adapt to future changes or growth, such as the addition of new features or an increase in user traffic or data volume.",
      emoji: "📈"
    },
    {
        title: "Brand Consistency",
        description: "The degree to which the design adheres to the brand guidelines and visual identity of the organization or product, including the use of consistent colors, fonts, and other brand elements.",
        emoji: "🚀"
      }
];

const animationController1 = useRef(null)
const animationController2 = useRef(null)
const animationController3 = useRef(null)

useEffect(() => {
    Lottie.destroy()
    Lottie.loadAnimation({
        container:animationController1.current,
        autoplay:true,
        path:'product-low-price.json',
        renderer:'svg',
        loop:true
    })
    Lottie.loadAnimation({
        container:animationController2.current,
        autoplay:true,
        path:'crm-evaluation.json',
        renderer:'svg',
        loop:true
    })
    Lottie.loadAnimation({
        container:animationController3.current,
        autoplay:true,
        path:'features-ui-monitor.json',
        renderer:'svg',
        loop:true
    })
    
}, []);
    return (
        <>
            <Container>
         
                    <Row id='home' className='mt-0'>
                        <Col md={6}  >
                       <div >
                       <div className=' text-start pt-3 pb-3  ' style={{fontWeight:600, color:textColor,fontSize:"48px"}}>
                        We offer <span style={{color:secondaryColor}}>UI/UX</span> professional review for just 1$
                        </div>
                       
                        
                       </div>
                     
                        <div className='small mt-2' style={{color:mutedText,fontSize:textSize}}>Upload your design for review now</div>
                       
                       {user?
                         <Button className='border-0 mt-5 ' onClick={()=>redirect(user)} style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Upload</Button>
                     :
                     <Button className='border-0 mt-5  ' onClick={()=>setShowLoginModal(true)} style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Get started</Button>
                    
                    }
                    <LoginModal show={showLoginModal} onHide={()=>setShowLoginModal(false)}/>
                    
                         <br/>
                         <br/>
                         <br/>
                        


                         <div className='mt-5'>
                            <Stack direction='horizontal'>
                                <div className='d-flex justify-content-center align-items-center' style={{height:20,width:20,borderRadius:20,backgroundColor:secondaryColor}}>
                                    <BsCheck color='black'/>
                                </div>
                                <small  className='text-white ps-1'style={{fontSize:textSize}}>Fast delivery</small>
                                
                                <div className='d-flex justify-content-center align-items-center ms-5' style={{height:20,width:20,borderRadius:20,backgroundColor:secondaryColor}}>
                                    <BsCheck color='black'/>
                                </div>
                                <small className='text-white ps-1' style={{fontSize:textSize}}>Very low price</small>
                            </Stack>
                         </div>
                        </Col>
                        <Col md={6}  className='px-0 mx-0 d-none d-md-block '>
                           <Image className='mt-4' src='home (2).png' fluid></Image>
                        </Col>

                    </Row>
                <br/>
                <div  id='about' className='text-center mt-5'>
                 <Heading  text="About us"/>
                 <Row>
                    <Col md={1}>
                    </Col>
                    <Col className='px-5' >
                    <Paragraph className="mt-2" text={`We are a team of experienced designers and developers who are passionate about creating beautiful,
                     functional, and user-friendly websites and applications. With years of experience in the industry, we have honed our skills and expertise to deliver high-quality design solutions that meet the unique needs of each of our clients.
                     ${moreAboutUs&&`
                     Our goal is to help businesses and individuals establish a strong online presence through stunning design and intuitive user experiences. We believe that great design is not just about aesthetics, but also about usability and accessibility. That's why we strive to create designs that are both visually appealing and easy to use. Let us help you bring your ideas to life with our design expertise and commitment to excellence
                       `}`} />
                    </Col>
                    <Col md={1}></Col>
                    <Paragraph onClick={()=>setMoreAboutUs(!moreAboutUs)} className=" border-0 btn" color={primaryColor} text={moreAboutUs?'Minimize':'Read more'}/>
                 </Row>
                   
                </div>
                <div className='py-5'>
                <Heading className="text-center mt-0" text="Why choose us ?"/>

<Row className='mt-5 align-items-stretch'>
    <Col md="4">
    <Card className='py-3 px-3  h-100' style={{backgroundColor:mutedBackground,borderRadius:20}}>
        <Card.Header>
            <div style={{height:150,backgroundColor:vibrantColors[7],borderRadius:20}}>
            <div ref={animationController1} style={{height:150}}></div>
            </div>
        </Card.Header>
        <Card.Body>
             <Paragraph color={secondaryColor} size={10} text="1$ per design"/>
            <Heading size={17} text="Low price"/>
            <Paragraph text="
We understand that design can be expensive, which is why we've made it our mission to provide top-quality UI/UX review services at an affordable price. For only $1 per design, you'll receive comprehensive feedback from our team of experienced designers, without breaking the bank. We believe that great design shouldn't be a luxury, and we're committed to making it accessible to everyone.

            "/>
        </Card.Body>
    </Card>
    </Col>
    <Col md="4">
    <Card className='py-3 px-3 h-100' style={{backgroundColor:mutedBackground,borderRadius:20}}>
        <Card.Header>
            <div style={{height:150,backgroundColor:vibrantColors[2],borderRadius:20}}>
            <div ref={animationController2} style={{height:150}}></div>

            </div>
        </Card.Header>
        <Card.Body>
             <Paragraph color={secondaryColor} size={10} text="Within 24 hours"/>
            <Heading size={17} text="Quick feedback"/>
            <Paragraph text="
We know that time is of the essence when it comes to design projects, which is why we guarantee fast delivery of your UI/UX review within 24 hours of your order. We understand that deadlines can be tight, and we're here to help you meet them. With our quick turnaround time, you can stay on schedule and keep your projects moving forward.            
            "/>
        </Card.Body>
    </Card>
    </Col>
    <Col md="4">
    <Card className='py-3 px-3 h-100' style={{backgroundColor:mutedBackground,borderRadius:20}}>
        <Card.Header>
            <div style={{height:150,backgroundColor:vibrantColors[1],borderRadius:20}}>
            <div ref={animationController3} style={{height:150}}></div>
            </div>
        </Card.Header>
        <Card.Body>
             <Paragraph color={secondaryColor} size={10} text="8+ design features/design"/>
            <Heading size={17}  text="Lot's of features"/>
            <Paragraph text="
Our UI/UX review service covers 8+ design features, providing you with a comprehensive analysis of your design's strengths and areas for improvement. From user flow to visual design, we've got you covered. Our team of experienced designers will provide you with detailed feedback that you can use to enhance your design and create a better user experience.            
            "/>
        </Card.Body>
    </Card>
    </Col>
</Row>
                </div>
                <div  id='review' className='text-center mt-5'>
                 <Heading  text="Design features we cover"/>
                 <Row>
                    <Col md={1}>
                    </Col>
                    <Col >
                    <Paragraph className="mt-2" text={`
                    Our Comprehensive UI/UX Review Service Helps You Create a Better User Experience by Analyzing Key Elements of Your Design. Here's How We Can Help Improve Your Design:
                     `} />
                    
                    <Row className='text-center d-flex justify-content-center mt-4'>
                        {
                            designFeatures.map((feature)=><Col xs="auto" className='mx-0 m-2'>
                            <div  style={{backgroundColor:mutedBackground,borderRadius:50}}>
                                <Paragraph className="px-3 py-3 text-white" text={`${feature.emoji} ${feature.title}`} />
                            </div>
                        </Col>)
                        }
                        
                        
                    </Row>
                    </Col>
                    <Col md={1}></Col>
                 </Row>
                   
                </div>
            </Container>
            
            <div className='py-5 mt-5 ' style={{backgroundColor:mutedBackground}}>
              <Container className=''>
                 <Heading text="Disclaimer"/>
                 <Paragraph className="mt-3" text="The information provided on this website is for general 
                 informational purposes only. While we strive to keep the information up to date
                  and correct, we make no representations or warranties of any kind, express or 
                  implied, about the completeness, accuracy, reliability, suitability or availability
                   with respect to the website or the information, products, services, or related graphics 
                   contained on the website for any purpose. Any reliance you place on such information is 
                   therefore strictly at your own risk.
                 In no event will we be liable for any loss or damage including without limitation, indirect or
                  consequential loss or damage, or any loss or damage whatsoever arising from loss of data or 
                  profits arising out of, 
                 or in connection with, the use of this website."/>
                 <Paragraph text="Through this website you are able to link to other websites which are not under our control. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.

Remember to modify this disclaimer as necessary to fit your website's specific circumstances and any applicable laws or regulations. It's always a good idea to have a legal professional review your disclaimer to ensure that it provides adequate protection for your business"/>
              </Container>
            </div>
        </>
    )
}

export default HomePage
