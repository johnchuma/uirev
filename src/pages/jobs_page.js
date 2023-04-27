import React, { useContext, useEffect, useRef, useState } from 'react'
import Heading from '../widgets/heading'
import { cardColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import Paragraph from '../widgets/paragraph'
import { BsCheck } from 'react-icons/bs'
import { AuthContext } from '../providers/auth_provider'
import { useRedirect } from '../utils/redirect'
import { updateDoc } from 'firebase/firestore'
import { updateStep } from '../controllers/job_controller'
import { getTestProject, getTestProjects } from '../controllers/project_test_controller'
import Lottie from 'lottie-web'
import Button from '../widgets/button'
import CustomButton from '../widgets/button'
import { useNavigate } from 'react-router-dom'
import ErrorToast from '../utils/toasts'
import DesignUploadModal from '../widgets/design_upload_modal'
// import { findUser } from '../controllers/app_controller'
import { auth } from '../controllers/firebase'
import { findUser } from '../controllers/auth_controller'

const JobsPage = () => {
    const {user,setUser} = useContext(AuthContext)
    const [testProject, setTestProject] = useState(null);
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [refresh, setRefresh] = useState(0);
    
    
    const steps = [
        {title:"Introduction",details:`We know that finding the right job can be a challenge, and we want to make it easier for you to showcase your skills and find great opportunities. Our platform offers a unique opportunity for designers to showcase their talent by uploading designs for review. Our team of experts will then evaluate your work and provide you with a verification badge that shows potential employers that you have the skills they are looking for. 
        To be eligible for the verification badge, you will need to have at least 10 designs in your portfolio, including ecommerce, landing pages, dashboards, and mobile app UI. Our experts will review your designs to ensure that they meet our high standards for quality and creativity. Once you have earned your badge, we will feature your profile on our website and recommend you to employers who are looking for talented designers like you.
        <br/> We believe that this feature will help you find the job you deserve and give you the exposure you need to succeed in your career. So why wait? Start uploading your designs today and let us help you take your career to the next level!`},
        {title:"Vetting process",details:``},
        {title:"Project test",details:``},
        {title:"Get hired",details:``},

    ];
    const designs =["E-commerce websites", "Mobile app interfaces", "Landing pages", "Dashboards", "Social media graphics", "Infographics", "Email templates", "Product packaging", "Brand identity", "Illustrations"];
    const [currentStep, setCurrentStep] = useState(0);
    const [canGoNextStep,setCanGoNextStep] = useState(false);
   
    const navigate = useNavigate()
    const checkIfCanGoNextStep = ()=>{
         if(currentStep<3){
            if(currentStep == 0){
                if(user){
                    setCanGoNextStep(true)
                }
            }
            if(currentStep<= user.step ){
                if(currentStep == 1){
                    if(user.skills.length >= designs.length ){
                      setCanGoNextStep(true)
                    }
                    else{
                        setCanGoNextStep(false)
                    }
                }
                if(currentStep == 2){
                    if(user.verified){
                        setCanGoNextStep(true)
                    }
                    else{
                        setCanGoNextStep(false)
                    }
                }
            }
            else{
             setCanGoNextStep(false)  
            }
         }
         else{
            setCanGoNextStep(false)
         }
    }
    const congratsAnimationController = useRef(null)

    useEffect(() => {
        checkIfCanGoNextStep()
        Lottie.destroy()
        Lottie.loadAnimation({
         container:congratsAnimationController.current,
         autoplay:true,
         path:'confetti.json',
         loop:true,
         renderer:'svg'
        })
    }, [currentStep]);
    useEffect(()=>{
       getTestProject(user.testprojectid).then((value)=>{
        setTestProject(value)
       })
     
    },[])
    useEffect(() => {
       findUser(auth.currentUser).then((response)=>{
        // console.log(response)
        setUser(response)
       })
       
    }, [refresh]);
    return (
        <>
      
        <div className=''>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading size={15} className="" text="UI/UX designing job for you"/>
        </Container>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        </div>
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
                {currentStep == 0 && <div  className=' px-5 py-5' style={{backgroundColor:mutedBackground,borderRadius:15}}>
                <Heading size={15} text={`Hi, ${user.name}`} />

                                        <h1 className='mt-3' dangerouslySetInnerHTML={{__html:steps[currentStep].details.replace(/\n/g,"<br/>")}}  style={{fontSize:12,color:mutedText,fontWeight:300,lineHeight:2}}></h1>

                                        </div>
 }
                                        
            </Row>
            {currentStep == 1 && 
                <div  className=' px-5 py-5' style={{backgroundColor:mutedBackground,borderRadius:15}}>

                <Paragraph text={`Ready to showcase your design skills and take your career to the next level?`}/>
        <Stack direction='horizontal'>
        <Heading onClick={()=> navigate('/user')} fontWeight={400} size={12} className="me-2 btn px-0 " color={primaryColor}  text={`Start submitting your designs for review now!`}/>
                             <Paragraph text={` Our team will evaluate each design and check the skill
                             related to it below`}/>
        </Stack>
           
            </div> }
            {currentStep == 1&&  <Row className='text-center d-flex justify-content-center my-3'>
            
                        {
                            
                            designs.map((type)=><Col xs="auto" className='mx-0 m-2'>
                            <div className='py-3 px-3'  style={{backgroundColor:mutedBackground,borderRadius:50}}>
                                <Stack direction='horizontal'>
                                <Paragraph  className="py-0 m-0 text-white" text={type} /> <div className='rounded-circle ms-1 d-flex justify-content-center align-items-center  ' style={{height:20,width:20,backgroundColor: user.skills.includes(type)&&secondaryColor}}>
                                    <BsCheck/>
                                </div>

                                </Stack>
                            </div>
                        </Col>)
                        }
                        
                        
                    </Row> }
                    {currentStep == 2&&
                    
                    <div>
                        <div  className=' px-5 py-5' style={{backgroundColor:mutedBackground,borderRadius:15}}>
                       
                       {
                        user.testStatus == "not-submitted"? 
                        <Row>
                        <Col md={9}>
                        
                        <Heading size={15} text={`Project name: `+testProject.name} />
                        <Paragraph className="pt-1" text={testProject.introduction}/>
                        <Paragraph className="pt-1" text={testProject.audience}/>
                        <Heading size={15} className="mt-3" text={`Objectives`} />
                     <ul>
                        {testProject.objectives.map((objective)=><li style={{color:secondaryColor}}><Paragraph text={objective} /></li>)}
                     </ul>
                     <Heading size={15} className="mt-3" text={`Deliverables`} />
                     <ul>
                        {testProject.deliverables.map((value)=><li style={{color:secondaryColor}}><Paragraph text={value} /></li>)}
                     </ul>
                     <Heading size={15} className="mt-3" text={`Timeline`} />
                     <Paragraph className="pt-1" text={testProject.timeline}/>
                     <Heading size={15} className="mt-3" text={`Submission requirements`} />
                     <Paragraph className="pt-1" text={'To submit your design for review, please make sure to include the following: A high-quality front image of your design in JPG or PNG format also link to your design in Figma, where we can review the entire project. Please note that incomplete submissions may result in delays in the review process. We recommend that you double-check your submission to ensure that you have included all the required materials. Thank you for your cooperation!'}/>
                      
                        </Col>
                        <Col className='text-end'>
                        <CustomButton onClick={()=>setShow} className="mb-2 border-0" text="Submit project" />

                        </Col>                   
                    </Row>:user.testStatus == "submitted"? <>
                    <Heading size={15} className="mb-3" text="Project submitted successfully" />
                    <Paragraph text="Thank you for submitting your test project. We appreciate the time and effort you put into creating the design solution for our challenge. Our team of experts is currently reviewing your submission to ensure that it meets our high standards for quality and creativity."/>
                    <Paragraph text="We understand that waiting for feedback can be challenging, but we want to assure you that we are working diligently to review your project and provide you with our assessment as soon as possible. In the meantime, if you have any questions or concerns, please don't hesitate to reach out to us."/>
                    </>:<></>
                       }
                       
                        </div>
                        
                      
                       
                        </div>}
                        {
                            currentStep == 3 && 
                            <div  className=' px-5 py-5' style={{backgroundColor:mutedBackground,borderRadius:15}}>
                                       <div className='text-center my-3'>
                                <div style={{height:150}} ref={congratsAnimationController}></div>
                                <Heading size={15} text={`Congrats, ${user.name}` }/>
                                <Paragraph text="Congratulations on being verified as a talented designer on our website! We were impressed by the quality and creativity of your designs, and we are confident that you will continue to excel in your career. Your verification badge is a testament to your hard work and dedication, and we are excited to feature your profile on our website and recommend you to potential employers. Keep up the great work, and we wish you all the best in your future endeavors!" />
                            </div>
                                        </div>

                           
                        }
                        
            <Stack direction='horizontal' className='d-flex justify-content-end mt-3'>
                {/* {user.testStatus} */}
                <Heading fontWeight={400} size={12} onClick={()=>{currentStep>0&&setCurrentStep(currentStep-1)}} color={currentStep >0?primaryColor:mutedText} className="pe-3 btn border-0" text="Prev"/>
                <Heading fontWeight={400} size={15} className="px-3 " text={currentStep+1}/>
                <Heading fontWeight={400} size={12} onClick={()=>{
                    canGoNextStep&&setCurrentStep(currentStep+1)
                    if(user.step == 0){
                       updateStep(1)
                    }
                    }} color={canGoNextStep?primaryColor:mutedText}  className="ps-3 btn border-0" text="Next"/>

            </Stack>
            
            
        </Container>
            <DesignUploadModal show={show} setShow={setShow} setShowToast={setShowToast} refresh={refresh} setRefresh={setRefresh} type="test" />
        </>
    )
}

export default JobsPage
